const { searchNewUser } = require("../controllers/houses-control");
const { sendFriendRequest } = require("../controllers/user-control");

const express = require("express");
const router = express.Router();

// router.route("/user/search-new").post(searchNewUser);
router.route("/send-request").post(sendFriendRequest);

module.exports = router;
