const { register, login, updateUser } = require("../controllers/auth-control");
const authenticatedMiddleware = require("../middleware/authentication");

const express = require("express");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/updateUser", authenticatedMiddleware, updateUser);

module.exports = router;
