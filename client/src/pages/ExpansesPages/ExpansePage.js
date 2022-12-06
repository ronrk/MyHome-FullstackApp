import React, { useEffect } from "react";

import { Link } from "react-router-dom";

import { Box, Typography, Button, Container } from "@mui/material";

import { useExpanseContext } from "../../context/expanse-context";
import { useAuthContext } from "../../context/auth-context";

import { ExpanseCard } from "../../components";

const ExpansePage = () => {
  const { getAllExpanses, expanses, loading } = useExpanseContext();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      getAllExpanses(user.token);
    }
  }, []);

  if (loading) {
    return (
      <Box sx={{ flexGrow: 1, maxWidth: 752, m: "2rem auto" }}>
        <Typography variant="h2">LOading...</Typography>
      </Box>
    );
  }

  if (expanses.length <= 0) {
    return (
      <Box sx={{ flexGrow: 1, maxWidth: 752, m: "2rem auto" }}>
        <Typography variant="h4">
          Your Tasks List currently empty, click to add a new task
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/expanses/create-new"
        >
          Add new task
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752, m: "2rem auto" }}>
      <Container sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/expanses/create-new"
        >
          Add new expanse
        </Button>
        <Button
          variant="contained"
          color="secondary"
          //   onClick={() => deleteAllCompletedTasks(user.token)}
          sx={{}}
        >
          Delete All Completed Tasks
        </Button>
      </Container>
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "stretch",
          justifyContent: "space-around",
          alignContent: "center",
        }}
      >
        {expanses.map((item, idx) => (
          <ExpanseCard key={item.name + idx} {...item} />
        ))}
      </Container>
    </Box>
  );
};

export default ExpansePage;
