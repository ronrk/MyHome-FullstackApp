import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ArrowRight from "@mui/icons-material/ArrowRight";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Home from "@mui/icons-material/Home";
import Settings from "@mui/icons-material/Settings";
import People from "@mui/icons-material/People";
import PermMedia from "@mui/icons-material/PermMedia";
import Dns from "@mui/icons-material/Dns";
import Public from "@mui/icons-material/Public";
import DeleteIcon from "@mui/icons-material/Delete";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Tab, Tabs, Typography } from "@mui/material";

import { useTaskContext } from "../../context/task-context.js";
import { useAuthContext } from "../../context/auth-context";

import FormatListBulletedSharpIcon from "@mui/icons-material/FormatListBulletedSharp";
import AddTaskSharpIcon from "@mui/icons-material/AddTaskSharp";

const TaskDashboard = () => {
  const [open, setOpen] = React.useState(true);
  const { tasks, editTask, getAllTasks } = useTaskContext();
  const { user } = useAuthContext();
  const [value, setValue] = useState(0);
  const [filterValue, setFilterValue] = useState("all");

  const handleChange = (event, newValue) => {
    const newFilter = event.target.textContent.toLowerCase();
    setFilterValue(() => {
      if (newFilter === "completed") {
        return "done";
      }
      if (newFilter === "active") {
        return "pending";
      }
      if (newFilter === "all tasks") {
        return "all";
      }
    });
    setValue(newValue);
  };

  return <Box sx={{ display: "flex" }}>TASK DASHBOARD SECTION</Box>;
};

export default TaskDashboard;
