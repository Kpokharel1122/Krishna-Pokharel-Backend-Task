const { Validator } = require("node-input-validator");


module.exports.postTask = (data) => {
    const validate = new Validator(data, {
      title: "required",
      status:"required",
      priority:"required",
      description:"required"
     
    });
  
    return validate;
  };