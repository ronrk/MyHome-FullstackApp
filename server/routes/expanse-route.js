const {
  getAllExpanses,
  createExpanse,
  getExpanse,
  updateExpanse,
  deleteExpanse,
} = require("../controllers/expanse-control");

const express = require("express");
const router = express.Router();

router.route("/").get(getAllExpanses).post(createExpanse);
router
  .route("/:expanseId")
  .get(getExpanse)
  .patch(updateExpanse)
  .delete(deleteExpanse);

module.exports = router;
