const router = require("express");
const app = router();
const { user } = require("../middleware/AuthMiddleware");
const controller = require("../Controller/TaskController");

app.post("/api/addTask", user, controller.postTask);
app.get("/api/getTaskById/:id", user, controller.getTaskById);
app.get("/api/getAllTask", user, controller.getAllTask);
app.put("/api/updateTask/:id", user, controller.updateTask);
app.delete("/api/deleteTask/:id", user, controller.deleteTask);

module.exports = app;
