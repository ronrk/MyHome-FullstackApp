const BadRequestError = require("./bad-request");
const CustomAPIError = require("./custom-api");
const NotFoundError = require("./not-found");
const UnauthenticatedError = require("./unauthenticated");
const UnauthorizedError = require("./unautorized");

module.exports = {
  CustomAPIError,
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
  UnauthorizedError,
};
