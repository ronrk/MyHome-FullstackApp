const Message = require("../models/Message");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

const createMessage = async (req, res) => {
  const { messageTo } = req.body;

  if (!messageTo) {
    throw new CustomError.BadRequestError(
      "Cant send a message without a address"
    );
  }

  if (messageTo === req.user.userId) {
    throw new CustomError.BadRequestError("Cant send message to yourself");
  }

  const user = await User.findOne({ _id: messageTo });

  if (!user) {
    throw new CustomError.NotFoundError(
      `Cand found user with id: ${messageTo}`
    );
  }

  req.body.user = req.user.userId;
  req.body.toUser = user._id;

  const message = await Message.create(req.body);

  res.status(StatusCodes.CREATED).json({ message });
};

const getAllIncomingMessages = async (req, res) => {
  const { userId } = req.user;
  const messages = await Message.find({ toUser: userId })
    .populate({
      path: "user",
      select: "name",
    })
    .populate({
      path: "toUser",
      select: "name",
    });
  res.status(StatusCodes.OK).json({ messages, count: messages.length });
};

const getAllSentMessages = async (req, res) => {
  const { userId } = req.user;
  const messages = await Message.find({ user: userId })
    .populate({
      path: "user",
      select: "name",
    })
    .populate({
      path: "toUser",
      select: "name",
    });
  res.status(StatusCodes.OK).json({ messages, count: messages.length });
};

const updateMessageStatus = async (req, res) => {
  const { id: messageId } = req.params;
  const message = await Message.findOne({ _id: messageId });
  if (!message) {
    throw new CustomError.NotFoundError(
      `Cant found message with id: ${messageId}`
    );
  }

  checkPermissions(req.user, message.toUser);
  message.newMessage = !message.newMessage;
  message.save();

  res.status(StatusCodes.OK).json({ message });
};

module.exports = {
  createMessage,
  getAllIncomingMessages,
  getAllSentMessages,
  updateMessageStatus,
};
