import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PendingIcon from "@mui/icons-material/Pending";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { Tooltip } from "@mui/material";
import FriendRequest from "./FriendRequest";
import { useUserContext } from "../../context/user-context";

const AddNewUserCard = ({ name, _id, image }) => {
  const { userProfile } = useUserContext();
  const [openFriendRequest, setOpenFriednRequest] = useState(false);
  const handleClose = () => {
    setOpenFriednRequest(false);
  };
  const handleToggle = () => {
    setOpenFriednRequest((prev) => !prev);
  };
  return (
    <Card sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h6">
            {name}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <Tooltip
            title={
              userProfile.pendingFriendRequest.includes(_id)
                ? "cancel friend request"
                : userProfile.friendList.includes(_id)
                ? "remove friend"
                : "send friend request"
            }
          >
            <IconButton aria-label="add" onClick={handleToggle}>
              {userProfile.pendingFriendRequest.includes(_id) ? (
                <PendingIcon />
              ) : userProfile.friendList.includes(_id) ? (
                <PersonRemoveIcon />
              ) : (
                <PersonAddAltIcon />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Send new message">
            <IconButton aria-label="play/pause">
              <ContactMailIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      {image ? (
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={image}
          alt="Live from space album cover"
        />
      ) : (
        <AccountCircleIcon fontSize="large" sx={{ fontSize: 50 }} />
      )}
      <FriendRequest
        handleClose={handleClose}
        user={{ name, _id, image }}
        open={openFriendRequest}
      />
    </Card>
  );
};

export default AddNewUserCard;

/* 


import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

export default function MediaControlCard() {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Live From Space
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Mac Miller
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="/static/images/cards/live-from-space.jpg"
        alt="Live from space album cover"
      />
    </Card>
  );
}

*/
