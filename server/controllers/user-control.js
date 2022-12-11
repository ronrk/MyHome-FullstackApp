const User = require("../models/User");

const sendFriendRequest = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findOneAndUpdate(
    { _id: req.body.userId },
    { $push: { friendRequest: userId } }
  );

  res.json({ path: "FRIEND REQUEST", user });
};

module.exports = {
  sendFriendRequest,
};
