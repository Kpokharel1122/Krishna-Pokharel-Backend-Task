const router = require("express");
const app = router();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require('./Database/connection')
const path = require('path');
const logger = require('pino')()

app.use(router.json({ limit: "20000mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "20000mb" }));
app. use(router. static(path. join(__dirname, 'public')));
app.use(
  cors({
    origin: "*",
  })
);

app.get('/',async(req,res)=>{
  res.sendFile(path. join(__dirname, 'public', 'login.html'))
})
app.get('/login',async(req,res)=>{
  res.sendFile(path. join(__dirname, 'public', 'login.html'))
})
app.get('/register',async(req,res)=>{
  res.sendFile(path. join(__dirname, 'public', 'register.html'))
})
app.get('/dashboard',async(req,res)=>{
  res.sendFile(path. join(__dirname, 'public', 'dashboard.html'))
})
app.get('/addtask',async(req,res)=>{
  res.sendFile(path. join(__dirname, 'public', 'addtask.html'))
})
app.get('/viewalltask',async(req,res)=>{
})

app.get('/edittask',async(req,res)=>{
  res.sendFile(path. join(__dirname, 'public', 'edittask.html'))

})

const AuthRoute = require('./routes/AuthRoute')
const TaskRoute = require('./routes/TaskRoute')

app.use([AuthRoute,TaskRoute])

app.listen(8000, (err) => {
    if (err) {
      logger.info("This was problem starting server ")

    }
    else{
      logger.info("Server Started at 8000")
      // console.log("Server started at 8000")
    }
  });
  