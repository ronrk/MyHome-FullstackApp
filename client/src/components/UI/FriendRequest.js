import React from "react";
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
import { useUserContext } from "../../context/user-context";
import { useAuthContext } from "../../context/auth-context";

const FriendRequest = ({ handleClose, open, user }) => {
  const { sendFriendRequest } = useUserContext();
  const {
    user: { token },
  } = useAuthContext();
  return (
    <Backdrop
      open={open}
      sx={{ color: "#eee", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Paper
        sx={{
          minWidth: "60%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          color="primary.common"
          textTransform="uppercase"
          mb={4}
        >
          Send New Friend Request
        </Typography>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          width="50%"
          sx={{ m: "0 auto" }}
        >
          <FormControl>
            <Typography variant="body2">Optional message</Typography>
            <TextField label="Subject" placeholder={`Hello ${user.name}`} />
          </FormControl>
          <TextareaAutosize
            minRows={8}
            placeholder={`Hi ${user.name}, nice to meet you... `}
          />
        </Box>
        <ButtonGroup sx={{ m: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => sendFriendRequest(token, user._id)}
          >
            Send Request
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
