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
  Container,
} from "@mui/material";

import LockOpenIcon from "@mui/icons-material/LockOpen";

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        MyHome App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const LoginPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", name: "", password: "" });
  const { user, login, register } = useAuthContext();
  const { email, name, password } = values;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user) {
      console.error("user already login");
      return;
    }
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
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, p: 3, bgcolor: "secondary.dark" }}>
          <LockOpenIcon fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h5">
          {pathname === "/login" ? "Sign in" : "Sign up"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {pathname === "/login" ? null : (
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="first-name"
              autoFocus
              onChange={handleChange}
              value={name}
            />
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
            value={email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            value={password}
          />
          {pathname === "/login" ? (
            <FormControlLabel
              control={
                <BpCheckbox
                  value="remember"
                  color="primary"
                  name="remember"
                  id="remember"
                />
              }
              label="Remember me"
            />
          ) : null}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {pathname === "/login" ? "Sign In" : "Sign Up"}
          </Button>

          {pathname === "/login" ? (
            <Link to="/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          ) : (
            <Link to="/login" variant="body2">
              {"Already have an account? Sign In"}
            </Link>
          )}
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default LoginPage;
