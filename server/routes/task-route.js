const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  deleteCompletedTasks,
} = require("../controllers/task-control");

const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(getAllTasks)
  .post(createTask)
  .delete(deleteCompletedTasks);
router.route("/:taskId").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
