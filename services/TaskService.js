const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const validate = require("../validator/TaskValidator");

module.exports.postTask = (taskData, userId) => {
  const myPromise = new Promise((resolve, reject) => {
    try {
      const validator = validate.postTask(taskData);
      validator.check().then(async (matched) => {
        if (!matched) {
          reject({ errors: validator.errors, success: false });
        } else {
          const allData = { ...taskData };
          allData["userId"] = userId;

          await prisma.task.create({ data: allData });

          resolve({ message: "Task added successfully", success: true });
        }
      });
    } catch (err) {
      reject({ message: "Some problem occured", success: false });
    }
  });

  return myPromise;
};

module.exports.getTaskById = (taskId, userId) => {
  const myPromise = new Promise(async (resolve, reject) => {
    try {
      const data = await prisma.task.findFirst({
        select: {
          title: true,
          createdAt: true,
          priority: true,
          status: true,
          description: true,
        },
        where: {
          AND: [{ userId: userId }, { id: taskId }],
        },
      });

      resolve({
        message: "Data fetched successfully",
        success: true,
        data: data,
      });
    } catch (err) {
      reject({ message: "Some problem occured", success: false });
    }
  });

  return myPromise;
};

module.exports.getAllTask = (userId) => {
  const myPromise = new Promise(async (resolve, reject) => {
    try {
      const data = await prisma.task.findMany({
        select: {
          title: true,
          createdAt: true,
          priority: true,
          status: true,
          description: true,
        },
        where: {
          userId: userId,
        },
      });
      resolve({
        message: "Data fetched successfully",
        success: true,
        data: data,
      });
    } catch (err) {
      reject({ message: "Some problem occured", success: false });
    }
  });
  return myPromise;
};

module.exports.updateTask = (taskId, userId, taskData) => {
  const myPromise = new Promise(async (resolve, reject) => {
    try {
      const findData = await prisma.task.findFirst({
        select: {
          title: true,
        },
        where: {
          AND: [{ userId: userId }, { id: taskId }],
        },
      });

      if (findData) {
        const updatedData = { ...taskData };

        const data = await prisma.task.update({
          data: updatedData,
          where: {
            userId: userId,
            id: taskId,
          },
        });

        resolve({ message: "Data updated successfully", success: true });
      } else {
        reject({ message: "Task not found", success: false });
      }
    } catch (err) {
      reject({ message: "Some problem occured" + err, success: false });
    }
  });

  return myPromise;
};

module.exports.deleteTask = (taskId, userId) => {
  const myPromise = new Promise(async (resolve, reject) => {
    try {
      const findTask = await prisma.task.findFirst({
        select: {
          id: true,
          title: true,
        },
        where: {
          id: taskId,
          userId: userId,
        },
      });
      if(findTask){
        const deleteTask = await prisma.task.delete({
            where:{
                id:taskId
            }
        })

        resolve({message:"Task deleted successfully",success:true})
      }
      else{
        reject({message:"Task not found",success:false})
      }
    } catch (err) {
      reject({ message: "Some problem occured", success: false });
    }
  });

  return myPromise;
};
