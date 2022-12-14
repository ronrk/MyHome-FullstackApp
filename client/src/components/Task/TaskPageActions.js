import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { Tabs, Tab, Box, Button } from "@mui/material";
import AssignmentReturnedSharpIcon from "@mui/icons-material/AssignmentReturnedSharp";
import TaskAltSharpIcon from "@mui/icons-material/TaskAltSharp";
import AssignmentLateSharpIcon from "@mui/icons-material/AssignmentLateSharp";
import AddTaskSharpIcon from "@mui/icons-material/AddTaskSharp";

import { useTaskContext } from "../../context/task-context";
import { useAuthContext } from "../../context/auth-context";

const mapQueryTabs = {
  all: 0,
  pending: 1,
  done: 2,
};

const TaskPageActions = ({ filter }) => {
  const [value, setValue] = useState(mapQueryTabs[filter]);
  const { deleteAllCompletedTasks } = useTaskContext();
  const { user } = useAuthContext();
  const handleChange = (event, newValue) => {
    // setValue(newValue);
  };

  useEffect(() => {
    console.log("TASKPAGE ACTIONS");
    setValue(mapQueryTabs[filter]);
  }, [filter]);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="flex-end"
      sx={{ p: 1 }}
    >
      <Button
        variant="contained"
        endIcon={<AddTaskSharpIcon />}
        component={Link}
        to="/home/tasks/create-new"
        sx={{ textTransform: "capitalize" }}
      >
        Add New Task
      </Button>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon label tabs example"
      >
        <Tab
          icon={<AssignmentReturnedSharpIcon />}
          label="All"
          component={Link}
          to="/home/tasks?status=all"
        />

        <Tab
          icon={<AssignmentLateSharpIcon />}
          label="Active"
          component={Link}
          to="/home/tasks?status=pending"
        />
        <Tab
          icon={<TaskAltSharpIcon />}
          label="Completed"
          component={Link}
          to="/home/tasks?status=done"
        />
      </Tabs>
      <Button
        variant="outlined"
        color="error"
        onClick={() => deleteAllCompletedTasks()}
      >
        Remove All Completed
      </Button>
    </Box>
  );
};

export default TaskPageActions;
