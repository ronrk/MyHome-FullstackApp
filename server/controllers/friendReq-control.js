const FriendReq = require("../models/FriendReq");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions, checkFriendship } = require("../utils");

const createFriendRequest = async (req, res) => {
  const { toUser } = req.body;
  const { userId } = req.user;

  if (toUser === userId) {
    throw new CustomError.BadRequestError(
      "Cant send friend request to yourself"
    );
  }
  const user = await User.findOne({ _id: toUser });

  if (!user) {
    throw new CustomError.NotFoundError(`Cant found user with id: ${toUser}`);
  }

  const isFriends = await checkFriendship({
    curUserId: req.user.userId,
    reqUserId: toUser,
  });

  if (isFriends) {
    throw new CustomError.BadRequestError("already a friend");
  }

  const alreadySendRequest = await FriendReq.findOne({
    user: userId,
    toUser,
  });

  if (alreadySendRequest) {
    throw new CustomError.BadRequestError("Already send a friend req");
  }

  req.body.user = userId;
  const friendReq = await FriendReq.create(req.body);

  res.status(StatusCodes.CREATED).json({ friendReq });
};

const getAllIncomingFriendRequest = async (req, res) => {
  const friendReq = await FriendReq.find({ toUser: req.user.userId }).populate({
    path: "user",
    select: "name",
  });

  res.status(StatusCodes.OK).json({ friendReq, count: friendReq.length });
};

const getAllSentFriendReq = async (req, res) => {
  const friendReq = await FriendReq.find({ user: req.user.userId }).populate({
    path: "toUser",
    select: "name",
  });
  res.status(StatusCodes.OK).json({ friendReq, count: friendReq.length });
};

const responseToFriendRequest = async (req, res) => {
  const { id: friendReqId } = req.params;
  const { status } = req.body;

  if (!status) {
    throw new CustomError.BadRequestError("Must provide status");
  }

  if (status !== "pending" && status !== "reject" && status !== "accept") {
    throw new CustomError.BadRequestError("Bad Value for status");
  }

  const friendRequest = await FriendReq.findOne({ _id: friendReqId }).populate({
    path: "user",
    select: "name",
  });

  if (!friendRequest) {
    throw new CustomError.NotFoundError(
      `Cant found request with id: ${friendReqId}`
    );
  }

  checkPermissions(req.user, friendRequest.toUser);
  const isFriends = await checkFriendship({
    curUserId: req.user.userId,
    reqUserId: friendRequest.user._id,
  });

  if (isFriends) {
    throw new CustomError.BadRequestError("already friends");
  }
  // return res.json({ isFriends });

  const curUser = await User.findOne({ _id: req.user.userId });
  const reqUser = await User.findOne({ _id: friendRequest.user.id });

  let newUserFriends = [...curUser.friendList];
  let newUserReqFriends = [...reqUser.friendList];

  if (status === "accept") {
    newUserFriends.push(friendRequest.user);
    newUserReqFriends.push(friendRequest.toUser);
  }
  const newUserFriendsRequest = curUser.newFriendRequest.filter((req) => {
    return req.toString() !== friendRequest.user.id;
  });
  const newUserReqPendingRequest = reqUser.pendingFriendRequest.filter(
    (req) => {
      console.log(typeof friendRequest.toUser);
      return req.toString() !== friendRequest.toUser.toString();
    }
  );

  await curUser.updateOne({
    newFriendRequest: newUserFriendsRequest,
    friendList: newUserFriends,
  });
  await reqUser.updateOne({
    friendList: newUserReqFriends,
    pendingFriendRequest: newUserReqPendingRequest,
  });

  const friendReq = await FriendReq.findOne({ _id: friendReqId });
  friendReq.remove();

  res.status(StatusCodes.OK).json({ msg: status });
};

module.exports = {
  createFriendRequest,
  getAllIncomingFriendRequest,
  getAllSentFriendReq,
  responseToFriendRequest,
};
