const { Validator } = require("node-input-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.register = (data) => {
  const validate = new Validator(data, {
    name: "required",
    email: "required|email",
    password: "required|same:confirm_password",
    confirm_password: "required",
  });


  // custom rules
  validate.addPostRule(async (provider) => {
    const datas =await prisma.user.findFirst({
      select: {
        email: true,
      },
      where: {
        email: data.email,
      },
    });

    if(datas){
        provider.error("email", "custom", "Email already exists. Enter new one");
    
    }
  });

  return validate;
};

module.exports.login = (data) => {
    const validate = new Validator(data, {
      email: "required|email",
      password:"required"
     
    });

    validate.addPostRule(async (provider) => {
        const datas =await prisma.user.findFirst({
          select: {
            email: true,
          },
          where: {
            email: data.email,
          },
        });
    
        if(!datas){
            provider.error("email", "custom", "Email doesn't exists. Enter valid email");
        
        }
      });
  
    return validate;
  };