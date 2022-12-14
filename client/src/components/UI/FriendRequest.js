import React, { useEffect, useState } from "react";
import {
  Backdrop,
  Paper,
  Box,
  Typography,
  TextField,
  TextareaAutosize,
  Button,
  FormControl,
  ButtonGroup,
} from "@mui/material";
import { useSocialContext } from "../../context/social-context";
import { useUserContext } from "../../context/user-context";
import { Link } from "react-router-dom";

const FriendRequest = ({ handleClose, open, user }) => {
  const { sendFriendRequest, cancelFriendRequest, removeFriend } =
    useSocialContext();
  const { userProfile } = useUserContext();
  const [status, setStatus] = useState("new");

  useEffect(() => {
    if (userProfile.pendingFriendRequest.includes(user._id)) {
      setStatus("cancel");
    }
    if (userProfile.friendList.includes(user._id)) {
      setStatus("remove");
    }
  }, [status]);

  const handleClick = () => {
    if (status === "new") {
      sendFriendRequest({ toUser: user._id });
    }
    if (status === "cencel") {
      cancelFriendRequest();
    }
    if (status === "remove") {
      removeFriend();
    }
  };

  return (
    <Backdrop
      open={open}
      sx={{ color: "#eee", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Paper
        sx={{
          minWidth: "40%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
          pt: 5,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          color="primary.common"
          textTransform="uppercase"
          mb={4}
        >
          {status === "new"
            ? "Send New Friend Request"
            : status === "cancel"
            ? "Cancel Friend Request"
            : "Remove Friend From List"}
        </Typography>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          width="50%"
          sx={{ m: "0 auto" }}
        >
          <FormControl>
            <Typography variant="body2" sx={{ m: 1, mb: 2 }}>
              Optional message
            </Typography>
            <TextField label="Subject" placeholder={`Hello ${user.name}`} />
          </FormControl>
          <TextareaAutosize minRows={8} placeholder={`Hi ${user.name} ... `} />
        </Box>
        <ButtonGroup sx={{ m: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            compononet={Link}
            to="/user/search-new"
            onClick={handleClick}
          >
            {status === "new"
              ? "Send Request"
              : status === "cancel"
              ? "Cancel Request"
              : "Remove Friend"}
          </Button>
          <Button variant="text" color="error" onClick={handleClose}>
            Cancel
          </Button>
        </ButtonGroup>
      </Paper>
    </Backdrop>
  );
};

export default FriendRequest;
