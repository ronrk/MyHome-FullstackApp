const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { checkPermissions } = require("../utils");

const searchNewUser = async (req, res) => {
  if (req.body.query === "") {
    return;
  }
  let users = await User.find({
    name: { $regex: req.body.query, $options: "i" },
  }).select("name");
  res.status(StatusCodes.OK).json({ users });
};

const getAllUserFriends = async (req, res) => {
  const users = await User.find({ _id: req.user.userId }).select(
    "city description email friendList name role state website image"
  );

  res.status(StatusCodes.OK).json({ users });
};

module.exports = { searchNewUser, getAllUserFriends };
