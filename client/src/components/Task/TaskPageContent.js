import React from "react";

import TaskCard from "./TaskCard";

import { Box, CircularProgress } from "@mui/material";

import { useTaskContext } from "../../context/task-context";

const TaskPageContent = ({ tasks }) => {
  const { loading } = useTaskContext();
  if (loading) {
    return (
      <Box sx={{ flexGrow: 1, maxWidth: 752, m: "auto auto" }}>
        <CircularProgress color="purple" />
      </Box>
    );
  }

  if (tasks.length <= 0) {
    return <div>No Tasks</div>;
  }
  return (
    <Box>
      {tasks.map((item) => (
        <TaskCard key={item.label} {...item} />
      ))}
    </Box>
  );
};

export default TaskPageContent;
