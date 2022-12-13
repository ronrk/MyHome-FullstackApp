const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  createUserToken,
  attachCookiesToResponse,
  checkPermissions,
} = require("../utils");

const getAllUsers = async (req, res) => {
  let users = await User.find({}).select("-password");
  if (req.user.role === "user") {
    users = await User.find({ role: "user" }).select("-password");
  }

  res.status(StatusCodes.OK).json({ users, count: users.length });
};

const getSingleUser = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findOne({ _id: userId }).select("-password");

  if (!user) {
    throw new CustomError.NotFoundError(`No user with id: ${userId}`);
  }
  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};

const updateUser = async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    throw new CustomError.BadRequestError("Please provide name and email");
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { ...req.body },
    { new: true, runValidators: true }
  );
  const tokenUser = createUserToken({ user });
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Please provide both values");
  }
  const user = await User.findOne({ _id: req.user.userId });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Wrong Password");
  }

  user.password = newPassword;
  user.save();
  res.status(StatusCodes.OK).json({ msg: "Success! password updated" });
};
const getCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  updateUser,
  updateUserPassword,
  getCurrentUser,
};
