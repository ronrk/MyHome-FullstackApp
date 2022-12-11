import React from "react";

import TaskCard from "./TaskCard";
import LoadingSpinner from "../UI/LoadingSpinner";

import { Box } from "@mui/material";

import { useTaskContext } from "../../context/task-context";

const TaskPageContent = ({ tasks }) => {
  const { loading } = useTaskContext();
  if (loading) {
    return <LoadingSpinner />;
  }

  if (tasks.length <= 0) {
    return <div>No Tasks</div>;
  }
  return (
    <Box>
      {tasks.map((item) => (
        <TaskCard key={item.name} {...item} />
      ))}
    </Box>
  );
};

export default TaskPageContent;
