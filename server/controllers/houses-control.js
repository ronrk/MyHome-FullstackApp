const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const searchNewUser = async (req, res) => {
  if (req.body.query === "") {
    return;
  }
  let users = await User.find({
    name: { $regex: req.body.query, $options: "i" },
  }).select("name");
  res.status(StatusCodes.OK).json({ users });
};

module.exports = { searchNewUser };
