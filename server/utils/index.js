const { createJWT, isTokenValid, attachCookiesToResponse } = require("./jwt");
const createUserToken = require("./createTokenUser");
const checkPermissions = require("./checkPermissions");
const checkFriendship = require("./checkFriendship");

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createUserToken,
  checkPermissions,
  checkFriendship,
};
