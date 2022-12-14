const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: [true, "Please provide a email"],
      unique: [true, "The email you entered is already in the database"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
    },
    city: {
      type: String,
      minlength: [3, "City must be longer than 3 char"],
    },
    state: {
      type: String,
      minlength: [2, "State must be longer than 2 char"],
    },
    website: {
      type: String,
      minlength: [5, "Website must be longer than 5 char"],
    },
    description: {
      type: String,
      minlength: [5, "Description must be longer than 2 char"],
      maxlength: [1000, "Description cant be longer than 1000 char"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    friendList: {
      type: [mongoose.Types.ObjectId],
      ref: "User",
    },
    newFriendRequest: {
      type: [mongoose.Types.ObjectId],
      ref: "User",
    },
    pendingFriendRequest: {
      type: [mongoose.Types.ObjectId],
      ref: "User",
    },
    image: {
      type: String,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

UserSchema.methods.comparePassword = async function (canditatPassword) {
  const isMatch = await bcrypt.compare(canditatPassword, this.password);

  return isMatch;
};

UserSchema.pre("remove", async function () {
  await this.model("Friend Request").deleteMany({ toUser: this._id });
});

module.exports = mongoose.model("User", UserSchema);
