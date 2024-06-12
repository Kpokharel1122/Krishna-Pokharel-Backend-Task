const router = require('express');
const app = router(); 
const {user} =  require('../middleware/AuthMiddleware')
const controller = require('../Controller/TaskController')


app.post('/api/addTask',user,controller.postTask)


module.exports = app