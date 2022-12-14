import { Typography, Container, Stack, Button } from "@mui/material";
import React, { useEffect } from "react";

import { useUserContext } from "../context/user-context";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  const { isAuth, user, getCurrentUser } = useUserContext();

  useEffect(() => {
    console.log("WELCOM EFFECT");
    getCurrentUser();
  }, []);

  if (!isAuth) {
    return (
      <Stack
        sx={{ textAlign: "center", height: "100%" }}
        justifyContent="center"
      >
        <Typography variant="h2">Welcome Guset</Typography>
        <Typography variant="h3">
          Please sign in or sign up to explore our great app.
        </Typography>
        <Container
          sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 3 }}
        >
          <Stack width={"200"}>
            <Typography variant="body1">Already have an account?</Typography>
            <Button variant="contained" component={Link} to="login">
              Click to sign in
            </Button>
          </Stack>
          <Stack width={"300"}>
            <Typography variant="body1">New at the app?</Typography>
            <Button variant="contained" component={Link} to="/register">
              Click to sign up
            </Button>
          </Stack>
        </Container>
      </Stack>
    );
  }
  return (
    <Container>
      <Typography variant="h1">Welcome</Typography>
    </Container>
  );
};

export default WelcomePage;
