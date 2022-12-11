const Expanse = require("../models/Expanse");
const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");
const moment = require("moment");

const getAllExpanses = async (req, res) => {
  const expanses = await Expanse.find({ createdBy: req.user.userId });

  res.status(StatusCodes.OK).json({ expanses });
};

const getExpansesByDate = async (req, res) => {
  let expansesByDate = await Expanse.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
        totalCost: { $sum: "$value" },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  expansesByDate = expansesByDate.map((item) => {
    const {
      _id: { year, month },
      count,
      totalCost,
    } = item;

    const date = moment()
      .year(year)
      .month(month - 1)
      .format("MMM Y");

    return { date, count, totalCost };
  });

  const currentYear = new Date().getFullYear();

  let lastYearExpenses = await Expanse.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" } },
        count: { $sum: 1 },
        totalCost: { $sum: "$value" },
      },
    },
    { $sort: { "_id.year": -1 } },
  ]);

  lastYearExpenses = lastYearExpenses.map((item) => {
    const {
      _id: { year },
      count,
      totalCost,
    } = item;

    if (year === currentYear) {
      return { year, count, totalCost };
    } else {
      return;
    }
  });

  res.status(StatusCodes.OK).json({ expansesByDate, lastYearExpenses });
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
  getExpansesByDate,
};
