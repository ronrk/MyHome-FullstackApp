import React, { useState } from "react";
import { Link } from "react-router-dom";

import userPhoto from "../../assets/IMG_0099.jpg";

import { useAuthContext } from "../../context/auth-context";

import {
  Card,
  ButtonGroup,
  Backdrop,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions,
} from "@mui/material/";

import FormatListBulletedSharpIcon from "@mui/icons-material/FormatListBulletedSharp";
import PointOfSaleSharpIcon from "@mui/icons-material/PointOfSaleSharp";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import { bgcolor } from "@mui/system";

const UserProfileDashboard = () => {
  const { user } = useAuthContext();
  const [showBackdrop, setShowBackdrop] = useState(false);

  const backdropShowShow = () => {
    setShowBackdrop(true);
  };

  const backdropShowClose = () => {
    setShowBackdrop(false);
  };

  return <Card>USER PROFILE DASHBOARD SECTION</Card>;
};

export default UserProfileDashboard;
