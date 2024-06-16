const {
  postTask,
  getTaskById,
  getAllTask,
  updateTask,
  deleteTask,
} = require("../services/TaskService");

module.exports.postTask = async (req, res) => {
  try {
    const result = await postTask(req.body, req.userId);
    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports.getTaskById = async (req, res) => {
  try {
    const result = await getTaskById(req.params.id, req.userId);

    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports.getAllTask = async (req, res) => {
  try {
    const result = await getAllTask(req.userId);
    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports.updateTask = async (req, res) => {
  try {
    const result = await updateTask(req.params.id, req.userId, req.body);

    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports.deleteTask = async (req, res) => {
  try {
    const result = await deleteTask(req.params.id, req.userId);
    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};
