const {postTask} = require('../services/TaskService')

module.exports.postTask = async(req,res) =>{
  try{
    const result = await postTask(req.body)
    if(result){
        return res.status(200).json(result)
    }
  }
  catch(err){
    return res.status(400).json(err)
  }
}