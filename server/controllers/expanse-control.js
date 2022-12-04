const Expanse = require("../models/Expanse");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

const getAllExpanses = async (req, res) => {
  const expanses = await Expanse.find({ createdBy: req.user.userId });

  res.status(StatusCodes.OK).json({ expanses });
};

const createExpanse = async (req, res) => {
  req.body.createdBy = req.user.userId;

  // check if value is 0
  if (Number(req.body.value) <= 0) {
    throw new BadRequestError("Value cannot be lower or equal than 0");
  }
  const expense = await Expanse.create(req.body);

  res.status(StatusCodes.CREATED).json({ expense });
};

const getExpanse = async (req, res) => {
  const expanse = await Expanse.findOne({
    createdBy: req.user.userId,
    _id: req.params.expanseId,
  });
  if (!expanse) {
    throw new NotFoundError(`No Expense with the id : ${id}`);
  }
  res.status(StatusCodes.OK).json({ expanse });
};

const updateExpanse = async (req, res) => {
  const { name, value } = req.body;
  if (!name || !value) {
    throw new BadRequestError("Name and value cannnot be empty");
  }

  const expanse = await Expanse.findOneAndUpdate(
    { createdBy: req.user.userId, _id: req.params.expanseId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!expanse) {
    throw new NotFoundError(`No Expense with the id : ${id}`);
  }

  res.status(StatusCodes.OK).json({ expanse });
};

const deleteExpanse = async (req, res) => {
  const expense = await Expanse.findOneAndDelete({
    createdBy: req.user.userId,
    _id: req.params.expanseId,
  });

  if (!expense) {
    throw new NotFoundError(`No Expense with the id : ${id}`);
  }
  res.status(StatusCodes.OK).json({ expense });
};

module.exports = {
  getAllExpanses,
  createExpanse,
  getExpanse,
  updateExpanse,
  deleteExpanse,
};
