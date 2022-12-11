const { searchNewUser } = require("../controllers/houses-control");

const express = require("express");
const router = express.Router();

router.route("/user/search-new").post(searchNewUser);

module.exports = router;
