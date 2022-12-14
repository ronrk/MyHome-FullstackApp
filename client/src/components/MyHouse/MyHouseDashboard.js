import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useAuthContext } from "../../context/auth-context";

import {
  Paper,
  Typography,
  Box,
  TextField,
  AvatarGroup,
  Avatar,
  Button,
} from "@mui/material";

import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ErrorIcon from "@mui/icons-material/Error";
import { useUserContext } from "../../context/user-context";
import { useSocialContext } from "../../context/social-context";
import LoadingSpinner from "../UI/LoadingSpinner";

const MyHouseDashboard = () => {
  const [searchResult, setSearchResult] = useState([]);
  const { searchNewUser, userLoading, userProfile } = useUserContext();
  const { socialLoading } = useSocialContext();

  const handleSearch = async (e) => {
    try {
      if (e.target.value === "") {
        setSearchResult([]);
      }
      const users = await searchNewUser(e.target.value);
      console.log(users);
      setSearchResult((prev) => [...users]);
    } catch (error) {}
  };

  if (userLoading || socialLoading) {
    return <LoadingSpinner />;
  }

  if (!userProfile.houses) {
    return (
      <Paper sx={{ bgcolor: "ddd", m: 2, p: 1 }}>
        <Box>
          <Typography
            variant="h3"
            fontFamily="'Kenia', cursive"
            color="secondary.dark"
          >
            My Houses
          </Typography>
          <Typography variant="h6" textTransform="capitalize">
            {userProfile.name} seems you didn't connect to any house yet
          </Typography>
          {userProfile.friendList.length === 0 ? (
            <Typography variant="body1">
              can't find friends in friends list..
            </Typography>
          ) : (
            ""
          )}

          <Button
            variant="contained"
            size="small"
            component={Link}
            to="/home/user/search-new"
          >
            Click here to find a new friend
          </Button>
          {/*           <AvatarGroup total={searchResult.length}>
            {searchResult.map((user) => (
              <Box key={user._id}>
                <Typography
                  fontSize={10}
                  sx={{ zIndex: 10, position: "relative" }}
                >
                  {user.name}
                </Typography>
                <Avatar
                  alt={user.name}
                  src={user.img}
                  sx={{ mt: -1, zIndex: 0 }}
                />
              </Box>
            ))}
          </AvatarGroup> */}
        </Box>
      </Paper>
    );
  }

  return (
    <Paper sx={{ height: 300, bgcolor: "ddd", m: 1 }}>MyHouseDashboard</Paper>
  );
};

export default MyHouseDashboard;
