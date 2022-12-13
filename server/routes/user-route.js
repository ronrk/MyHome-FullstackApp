const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  getAllUsers,
  getSingleUser,
  updateUser,
  updateUserPassword,
  getCurrentUser,
} = require("../controllers/user-control");

router.route("/").get(authenticateUser, getAllUsers);

router.route("/showUser").get(authenticateUser, getCurrentUser);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);

router.route("/:id").get(authenticateUser, getSingleUser);

module.exports = router;
