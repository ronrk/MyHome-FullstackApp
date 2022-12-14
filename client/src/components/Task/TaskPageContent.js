import React from "react";

import TaskCard from "./TaskCard";
import LoadingSpinner from "../UI/LoadingSpinner";

import { Box } from "@mui/material";

import { useTaskContext } from "../../context/task-context";

const TaskPageContent = ({ tasks, filter }) => {
  const { taskLoading } = useTaskContext();

  if (taskLoading) {
    return <LoadingSpinner />;
  }

  if (tasks.length <= 0) {
    return <div>No Tasks</div>;
  }
  return (
    <Box>
      {tasks.map((item) => (
        <TaskCard key={item._id} {...item} query={filter} />
      ))}
    </Box>
  );
};

export default TaskPageContent;
