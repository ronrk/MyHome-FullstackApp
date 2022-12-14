const CustomError = require("../errors");

const checkPermissions = (requestUser, resourcesUserId) => {
  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourcesUserId.toString()) return;
  console.log({ requestUser, resourcesUserId });

  throw new CustomError.UnauthorizedError("Unauthorized to access this route");
};

module.exports = checkPermissions;
