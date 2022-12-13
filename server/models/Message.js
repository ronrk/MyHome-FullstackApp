const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide message title"],
    minlength: 3,
    maxlength: [50, "title can not be more than 50 char"],
  },
  text: {
    type: String,
    required: [true, "Please provide message text"],
    minlength: 3,
    maxlength: [1000, "message text can not be more than 1000 char"],
  },
  newMessage: {
    type: Boolean,
    default: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  toUser: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Must provide a path"],
  },
});

module.exports = new mongoose.model("Message", MessageSchema);
