const express = require("express");
const router = express.Router();

const {
  createMessage,
  getAllIncomingMessages,
  getAllSentMessages,
  updateMessageStatus,
} = require("../controllers/message-control");
const { authenticateUser } = require("../middleware/authentication");

router
  .route("/")
  .post(authenticateUser, createMessage)
  .get(authenticateUser, getAllIncomingMessages);

router.route("/out").get(authenticateUser, getAllSentMessages);

router.route("/:id").patch(authenticateUser, updateMessageStatus);

module.exports = router;
