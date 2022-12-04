const mongoose = require("mongoose");

const ExpanseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Expanse must contain a name"],
    },
    value: {
      type: Number,
      required: [true, "Expanse must contin a value"],
    },
    bills: {
      type: Number,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please login"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expanse", ExpanseSchema);
