import React, { useState } from "react";
import { Paper, TextField, Typography, Box } from "@mui/material";

import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { AddNewUserCard } from "../../components";

import { useSocialContext } from "../../context/social-context";

const SearchNewUserPage = () => {
  const [searchResult, setSearchResult] = useState([]);
  const { searchNewUser, socialLoading } = useSocialContext();

  const handleSearch = async (e) => {
    try {
      if (e.target.value === "") {
        setSearchResult([]);
      }
      const users = await searchNewUser(e.target.value);
      setSearchResult((prev) => [...users]);
    } catch (error) {}
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        m: 3,
        mt: 2,
        p: 1,
        minHeight: "80%",
        alignItems: "center",
      }}
    >
      <Box component="form" onSubmit={(e) => e.preventDefault()}>
        <Typography variant="h3">Search to find a new friend</Typography>
        <TextField
          variant="standard"
          label="Search"
          id="search"
          fullWidth
          onChange={handleSearch}
        />
      </Box>
      <Box display="flex" flexWrap="wrap" gap={3}>
        {socialLoading ? (
          <LoadingSpinner />
        ) : (
          searchResult.map((user) => (
            <AddNewUserCard key={user._id} {...user} />
          ))
        )}
      </Box>
    </Paper>
  );
};

export default SearchNewUserPage;
