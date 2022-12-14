import {
  MenuItem,
  Box,
  Typography,
  ButtonGroup,
  IconButton,
  Tooltip,
  Avatar,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CancelIcon from "@mui/icons-material/Cancel";
import { AccountCircle } from "@mui/icons-material";
import { useSocialContext } from "../../context/social-context";
import LoadingSpinner from "../UI/LoadingSpinner";

const FriendRequestNavbar = ({ reqId, user }) => {
  const { responseToFriendRequest, socialLoading } = useSocialContext();

  if (socialLoading) {
    return <LoadingSpinner />;
  }

  return (
    <MenuItem sx={{ width: "100%", p: 0, m: 0 }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        {user.image ? <Avatar></Avatar> : <AccountCircle fontSize="large" />}
        <Typography flexGrow={1} sx={{ ml: 1 }}>
          {user.name}
        </Typography>
        <ButtonGroup sx={{ ml: "auto" }}>
          <Tooltip title="accept">
            <IconButton
              onClick={() =>
                responseToFriendRequest({ reqId, status: "accept" })
              }
            >
              <PersonAddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="cancel">
            <IconButton
              onClick={() =>
                responseToFriendRequest({ reqId, status: "reject" })
              }
            >
              <CancelIcon />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      </Box>
    </MenuItem>
  );
};

export default FriendRequestNavbar;
