const router = require("express");
const app = router();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require('./Database/connection')

app.use(router.json({ limit: "20000mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "20000mb" }));
app.use(router.static("./public"));
app.use(
  cors({
    origin: "*",
  })
);

const AuthRoute = require('./routes/AuthRoute')
const TaskRoute = require('./routes/TaskRoute')

app.use([AuthRoute,TaskRoute])

app.listen(8000, (err) => {
    if (err) {
      console.log("Server not started");
    }
    else{
      console.log("Server started at 8000")
    }
  });
  