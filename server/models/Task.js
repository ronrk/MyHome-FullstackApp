const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Task must contain a name"],
    },
    status: {
      type: String,
      enum: ["pending", "done"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please login"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
