import React, { useEffect } from "react";

import ActionsMenu from "./ActionsMenu";
import FriendRequestNavbar from "./FriendRequestNavbar";

import {
  Box,
  Tooltip,
  IconButton,
  Badge,
  Button,
  Typography,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MailIcon from "@mui/icons-material/Mail";

import { useUserContext } from "../../context/user-context";
import { useUIContext } from "../../context/ui-context";
import { useAuthContext } from "../../context/auth-context";
import { useSocialContext } from "../../context/social-context";

const AuthNavbarBox = () => {
  const { userProfile } = useUserContext();
  const { logout } = useAuthContext();
  const { open, handleOpenActionsMenu } = useUIContext();
  const { getFriendRequestUsers, newFriendRequest } = useSocialContext();

  useEffect(() => {
    getFriendRequestUsers();
  }, []);

  return (
    <Box display="flex" alignItems="center" gap={3}>
      {userProfile.newFriendRequest.length > 0 ? (
        <Tooltip title="New friend request">
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleOpenActionsMenu}
          >
            <Badge variant="dot" color="error">
              <PersonAddIcon color="secondary" />
            </Badge>
          </IconButton>
        </Tooltip>
      ) : null}
      {userProfile.newMessage?.length > 0 ? (
        <Tooltip title="New message">
          <IconButton>
            <Badge variant="dot" color="error">
              <MailIcon color="secondary" />
            </Badge>
          </IconButton>
        </Tooltip>
      ) : null}
      <ActionsMenu>
        <Box textAlign="center" p={2}>
          <Typography variant="h5" color="error">
            New Friend Request
          </Typography>
          <Typography variant="body2" color="success">
            Count:{newFriendRequest.length}
          </Typography>
        </Box>
        <Box width="100%">
          {userProfile
            ? newFriendRequest.map((item) => (
                <FriendRequestNavbar
                  key={item._id}
                  reqId={item._id}
                  user={item.user}
                />
              ))
            : null}
        </Box>
      </ActionsMenu>

      <Button onClick={logout} color="error" variant="outlined" edge="end">
        Logout
      </Button>
    </Box>
  );
};

export default AuthNavbarBox;
