const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");

const {
  createFriendRequest,
  getAllIncomingFriendRequest,
  getAllSentFriendReq,
  responseToFriendRequest,
} = require("../controllers/friendReq-control");

router
  .route("/")
  .get(authenticateUser, getAllIncomingFriendRequest)
  .post(authenticateUser, createFriendRequest);
router.route("/out").get(authenticateUser, getAllSentFriendReq);
router.route("/:id").patch(authenticateUser, responseToFriendRequest);

module.exports = router;
