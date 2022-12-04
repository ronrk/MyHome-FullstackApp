const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const User = require("../models/User");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create(req.body);
  const token = await user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name, email: user.email, token } });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credntials");
  }
  const isPasswordCorrect = await user.comparePasswords(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Wrong password");
  }
  const token = user.createJWT();

  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name, email: user.email, token } });
};

const updateUser = async (req, res) => {
  res.send("Update user");
};

module.exports = { register, login, updateUser };
