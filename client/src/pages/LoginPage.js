import React, { useEffect, useState } from "react";

import { useLocation, useNavigate, Link } from "react-router-dom";

import { useAuthContext } from "../context/auth-context";

import { BpCheckbox } from "../components";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Box,
  Typography,
  FormGroup,
} from "@mui/material";

import LockOpenIcon from "@mui/icons-material/LockOpen";

const LoginPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    name: "",
    password: "",
    checked: false,
  });
  const { user, isAuth, login, register, error, initilizeError } =
    useAuthContext();
  const { email, name, password, checked } = values;

  const handleChange = (e) => {
    const { name, value } = e.target;
    initilizeError();

    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleRememberMeChange = (e) => {
    setValues((prev) => ({ ...prev, checked: e.target.checked }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit");
    if (isAuth) {
      console.error("user already login");
      return;
    }
    if (pathname === "/login") {
      login(email, password, checked);
      return;
    }
    if (pathname === "/register") {
      register(name, email, password, checked);
      return;
    }
  };

  useEffect(() => {
    if (user && user.token) {
      navigate("/home");
    }
  }, [user]);

  useEffect(() => {
    initilizeError();
  }, [pathname]);

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
              error={error.status}
              margin="normal"
              fullWidth
              required
              id="name"
              autoComplete="first-name"
              name="name"
              label="Name"
              value={name}
              onChange={handleChange}
            />
          )}
          <TextField
            error={error.status}
            fullWidth
            required
            margin="normal"
            id="email"
            name="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleChange}
            type="email"
          />
          <TextField
            error={error.status}
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
            helperText={error.status ? error.message : ""}
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
          <FormControlLabel
            sx={{ marginLeft: "auto" }}
            onChange={handleRememberMeChange}
            control={
              <BpCheckbox value="remember" name="remember" id="remember" />
            }
            label="Remember me"
          />
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
