const mongoose = require("mongoose");

const FriendRequestSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  toUser: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: {
      values: ["pending", "reject", "accept"],
      message: "{VALUE} is not support",
    },
    required: true,
    default: "pending",
  },
});

FriendRequestSchema.index({ user: 1, toUser: 1 }, { unique: true });

FriendRequestSchema.statics.calculateNewFriendRequest = async function (
  toUserId
) {
  console.log("MODEL-REQ", { toUserId });

  const result = await this.aggregate([
    { $match: { toUser: toUserId, status: "pending" } },
    { $group: { _id: "$user" } },
  ]);

  try {
    const user = await this.model("User").findOne({ _id: toUserId });
    if (!result[0]?._id) {
      return;
    }
    const isAlreadySendReq = user.newFriendRequest.includes(result[0]?._id);

    if (isAlreadySendReq) {
      console.log("already request friend");
      return;
    }

    await user.updateOne(
      { newFriendRequest: [...user.newFriendRequest, result[0]?._id] },
      { new: true, runValidators: true }
    );
  } catch (error) {
    console.log(error);
  }
};

FriendRequestSchema.statics.calculatePendingFriendRequest = async function (
  userId
) {
  const result = await this.aggregate([
    { $match: { user: userId, status: "pending" } },
    { $group: { _id: "$toUser" } },
  ]);

  try {
    const user = await this.model("User").findOne({ _id: userId });
    if (!result[0]?._id) {
      return;
    }
    const isAlreadySendReq = user.pendingFriendRequest.includes(result[0]?._id);

    if (isAlreadySendReq) {
      console.log("already request friend");
      return;
    }

    await user.updateOne(
      { pendingFriendRequest: [...user.pendingFriendRequest, result[0]?._id] },
      { new: true, runValidators: true }
    );
  } catch (error) {
    console.log(error);
  }
};

FriendRequestSchema.post("save", async function () {
  console.log("save", { user: this.user });
  this.constructor.calculateNewFriendRequest(this.toUser);
});
FriendRequestSchema.post("save", async function () {
  console.log("save", { user: this.user });
  this.constructor.calculatePendingFriendRequest(this.user);
});

FriendRequestSchema.post("remove", async function () {
  console.log("delete", { user: this.user });
  this.constructor.calculateNewFriendRequest(this.toUser);
});
FriendRequestSchema.post("remove", async function () {
  console.log("delete", { user: this.user });
  this.constructor.calculatePendingFriendRequest(this.user);
});

module.exports = new mongoose.model("Friend Request", FriendRequestSchema);
