const {register,Login} = require('../services/AuthService')


module.exports.register = async(req,res) =>{
    try{
      const result = await register(req.body)

      if(result){
        return res.status(200).json(result)
      }
    }
    catch(err){
        return res.status(400).json(err)
    }
}


module.exports.login = async(req,res) =>{
try{
    const result = await Login(req.body)

    if(result){
        return res.status(200).json(result)
    }
}
catch(err){
    return res.status(400).json(err)
}
}