const User = require("../models/User");
const CustomError = require("../errors");

const checkFriendship = async ({ curUserId, reqUserId }) => {
  console.log(curUserId, reqUserId);
  try {
    const user = await User.findOne({ _id: reqUserId });
    if (!user) {
      throw new CustomError.NotFoundError(
        `Cant found a user with id: ${reqUserId}`
      );
    }
    const isFriends = user.friendList.includes(curUserId);
    return isFriends;
  } catch (error) {
    console.log(error);
    throw new CustomError.BadRequestError("erro");
  }
};

module.exports = checkFriendship;
