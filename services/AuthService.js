const validate = require("../validator/AuthValidator");
const saltRounds = 10;
const bcrypt = require("bcrypt");
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require("jsonwebtoken");

module.exports.register = (registerData) => {
  const myPromise = new Promise((resolve, reject) => {
    try {
      const validator = validate.register(registerData);
      validator.check().then(async (matched) => {
        if (!matched) {
          reject({ errors: validator.errors, success: false });
        } else {
          const data = registerData;
          const hashedPass = new Promise((resolve, reject) => {
            try {
              bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(registerData.password, salt, function (err, hash) {
                  resolve(hash);
                });
              });
            } catch (err) {
              reject({ message: "Some problem occured", success: false });
            }
          });

          const allData = {
            password:await hashedPass,
            email:registerData.email,
            name:registerData.name
          }

        //   data['password'] = await hashedPass 

          await prisma.user.create({data:allData})

          resolve({message:"User registered successfully",success:true})
        }
      });
    } catch (err) {
      reject({ message: "Some problem occured" + err, success: false });
    }
  });

  return myPromise;
};


module.exports.Login = (loginData) => {
    const myPromise = new Promise((resolve, reject) => {
      try {
        const validator = validate.login(loginData);
  
        validator.check().then(async (matched) => {
          if (!matched) {
           reject({ errors: validator.errors, success: false });
          } else {
            const email = loginData.email;
            const result = await prisma.user.findFirst({
              select: { password: true, name: true, email: true },
              where:{
                email:loginData.email
              }
            });
  
            bcrypt.compare(
              loginData.password,
              result.password,
              function (err, result) {
                // result == true
                if (result) {
                  const token = jwt.sign(
                    {
                      email: loginData.email,
                      name: loginData.name,
                    },
                    process.env.SECRET_KEY
                  );
  
                  resolve({
                    message: "Login successfull",
                    token: token,
                    data: { email: loginData.email, name: loginData.name },
                    success: true,
                  });
                } else {
                  reject({ message: "Invalid email/password", success: false });
                }
              }
            );
          }
        });
      } catch (err) {
        reject({ message: "Internal Server Error", success: false });
      }
    });
  
    return myPromise;
  };
