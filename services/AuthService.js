const validate = require("../validator/AuthValidator");
const saltRounds = 10;
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const logger = require("pino")();

module.exports.register = (registerData) => {
  const myPromise = new Promise((resolve, reject) => {
    try {
      const validator = validate.register(registerData);
      validator.check().then(async (matched) => {
        if (!matched) {
          logger.error("Validation error on register")
          logger.error(validator.errors)
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
              logger.error("Error while register")
              logger.error(err)
              reject({ message: "Some problem occured", success: false });
            }
          });

          const allData = {
            password: await hashedPass,
            email: registerData.email,
            name: registerData.name,
          };

          //   data['password'] = await hashedPass

          await prisma.user.create({ data: allData });

          resolve({ message: "User registered successfully", success: true });
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
          logger.error("Validation error in login" );
          logger.error(validator.errors)
          reject({ errors: validator.errors, success: false });
        } else {
          const email = loginData.email;
          const result = await prisma.user.findFirst({
            select: { password: true, userId: true, name: true, email: true },
            where: {
              email: loginData.email,
            },
          });

          bcrypt.compare(
            loginData.password,
            result.password,
            function (err, results) {
              // result == true
              if (results) {
                const token = jwt.sign(
                  {
                    email: loginData.email,
                    name: result.name,
                    userId: result.userId,
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
                logger.error("Invalid Email/password");
                reject({ message: "Invalid email/password", success: false });
              }
            }
          );
        }
      });
    } catch (err) {
      logger.error("Error while login " + err);
      reject({ message: "Some problem occured", success: false });
    }
  });

  return myPromise;
};
