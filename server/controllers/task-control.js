const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ tasks });
};

const createTask = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const task = await Task.create(req.body);
  res.status(StatusCodes.CREATED).json({ task });
};

const getTask = async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.taskId,
    createdBy: req.user.userId,
  });
  if (!task) {
    throw new NotFoundError(`No Task with the id : ${id}`);
  }
  res.status(StatusCodes.OK).json({ task });
};

const updateTask = async (req, res) => {
  if (req.body.status === "" || name === "") {
    throw new BadRequestError("wrong values for name or status");
  }

  const task = await Task.findOneAndUpdate(
    {
      createdBy: req.user.userId,
      _id: req.params.taskId,
    },
    req.body,
    { new: true, runValidators: true }
  );
  if (!task) {
    throw new NotFoundError(`No Task with the id : ${id}`);
  }
  res.status(StatusCodes.OK).json({ task });
};

const deleteTask = async (req, res) => {
  const task = await Task.findOneAndDelete({
    createdBy: req.user.userId,
    _id: req.params.taskId,
  });
  if (!task) {
    throw new NotFoundError(`No Task with the id : ${id}`);
  }
  res.status(StatusCodes.OK).json({ task });
};

const deleteCompletedTasks = async (req, res) => {
  const tasks = await Task.deleteMany({
    createdBy: req.user.userId,
    status: "done",
  });
  res.status(StatusCodes.OK).json({ tasks });
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  deleteCompletedTasks,
};
