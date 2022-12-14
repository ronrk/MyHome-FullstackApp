import React, { useEffect, useState } from "react";

import { useLocation, useNavigate, Link } from "react-router-dom";

import { useAuthContext } from "../context/auth-context";

import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  FormGroup,
} from "@mui/material";

import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useUserContext } from "../context/user-context";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const LoginPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    name: "",
    password: "",
  });
  const { login, register, authError, initilizeError, authLoading } =
    useAuthContext();
  const { isAuth, userLoading } = useUserContext();
  const { email, name, password } = values;

  const handleChange = (e) => {
    const { name, value } = e.target;
    initilizeError();

    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleFocus = (e) => {
    initilizeError();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (pathname === "/login") {
      login(email, password);
      return;
    }
    if (pathname === "/register") {
      register(name, email, password);
      return;
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/home");
    }
  }, [isAuth]);

  useEffect(() => {
    initilizeError();
  }, [pathname]);

  if (userLoading || authLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: 500,
          minWidth: 300,
          m: "0 auto",
          mt: 2,
          p: 2,
        }}
      >
        <LoadingSpinner />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: 500,
        minWidth: 300,
        m: "0 auto",
        mt: 2,
        p: 2,
      }}
    >
      <Avatar sx={{ m: 1, p: 3, bgcolor: "primary.main" }}>
        <LockOpenIcon fontSize="large" color="secondary" />
      </Avatar>
      <Typography component="h1" variant="h5" p="0 3rem" textAlign="center">
        {pathname === "/login"
          ? "Welcome Back, Please Sign In"
          : "Welcome! Sign Up and be able to use the app"}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1, width: "100%" }}
        display="flex"
        flexDirection="column"
      >
        <FormGroup>
          {pathname === "/login" ? null : (
            <TextField
              error={authError.status}
              margin="normal"
              fullWidth
              required
              id="name"
              autoComplete="first-name"
              name="name"
              label="Name"
              value={name}
              onChange={handleChange}
              onFocus={handleFocus}
            />
          )}
          <TextField
            error={authError.status}
            fullWidth
            required
            margin="normal"
            id="email"
            name="email"
            label="Email Address"
            autoComplete="email"
            value={email}
            onChange={handleChange}
            type="email"
            onFocus={handleFocus}
          />
          <TextField
            error={authError.status}
            fullWidth
            required
            margin="normal"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            label="Password"
            value={password}
            onChange={handleChange}
            onFocus={handleFocus}
            helperText={authError.status ? authError.message : ""}
          />
        </FormGroup>
        <Box display="flex" alignItems="center">
          <Button
            type="submit"
            variant="contained"
            sx={{
              p: 1,
              mt: 3,
              mb: 2,
              alignSelf: "center",
              width: 150,
              flexGrow: 1,
            }}
          >
            {pathname === "/login" ? "Sign In" : "Sign Up"}
          </Button>
        </Box>
        <Button
          variant="outlined"
          color="darkBlue"
          fullWidth
          component={Link}
          to={pathname === "/login" ? "/register" : "/login"}
        >
          {pathname === "/login"
            ? `Don't have an account? Sign Up`
            : "Already have an account? Sign In"}
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
