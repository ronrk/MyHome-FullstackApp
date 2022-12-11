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
import { useHousesContext } from "../../context/houses-context";

const MyHouseDashboard = () => {
  const [searchResult, setSearchResult] = useState([]);
  const { searchNewUser, loading } = useHousesContext();
  const { user } = useAuthContext();

  const handleSearch = async (e) => {
    try {
      if (e.target.value === "") {
        setSearchResult([]);
      }
      const users = await searchNewUser(user.token, e.target.value);
      console.log(users);
      setSearchResult((prev) => [...users]);
    } catch (error) {}
  };
  if (!user.houses) {
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
            {user.name} seems you didn't connect to any house yet
          </Typography>
          <Typography variant="body1">
            can't find friends in friends list..
          </Typography>
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
