import React from "react";

import { useAuthContext } from "../../context/auth-context";

import {
  Card,
  CardActions,
  CardHeader,
  ButtonGroup,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";

import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ErrorIcon from "@mui/icons-material/Error";

const MyHouseDashboard = () => {
  const { user } = useAuthContext();

  return <Card>MyHouseDashboard</Card>;
};

export default MyHouseDashboard;
