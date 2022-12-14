const {
  searchNewUser,
  getAllUserFriends,
} = require("../controllers/houses-control");
const { authenticateUser } = require("../middleware/authentication");

const express = require("express");
const router = express.Router();

router.route("/user/search-new").post(searchNewUser);
router.route("/friends").get(authenticateUser, getAllUserFriends);

module.exports = router;
