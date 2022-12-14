import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  FormGroup,
  Paper,
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useUserContext } from "../../context/user-context";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const ChangePasswordPage = () => {
  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({ status: false, message: "", code: 0 });

  const { changeUserPassword, userLoading } = useUserContext();
  const navigate = useNavigate();

  const handleCompare = () => {
    if (values.newPassword !== values.confirmPassword) {
      setError({ status: true, message: "Both passwords must match", code: 2 });
      return;
    }
    setError({ status: false, message: "", code: 0 });
  };

  const handleFocus = () => {
    setError({ status: false, message: "", code: 0 });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const { oldPassword, newPassword, confirmPassword } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !oldPassword ||
      !newPassword ||
      !confirmPassword ||
      oldPassword.trim() === "" ||
      newPassword.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      setError({ status: true, message: "Must provide all values", code: 3 });
      return;
    }
    if (error.status) {
      return;
    }
    const data = await changeUserPassword({ oldPassword, newPassword });
    if (!data.success) {
      setError({ status: true, message: data.msg, code: data.code });
      return;
    }
    navigate("/home/user", { replace: true });
  };

  if (userLoading) {
    return (
      <Paper
        sx={{
          display: "flex",
          gap: 3,
          m: "0 auto",
          mt: 10,
          p: 3,
          flexDirection: "column",
          alignItems: "center",
          minHeight: 600,
          width: "70%",
        }}
      >
        <LoadingSpinner />
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        display: "flex",
        gap: 3,
        m: "0 auto",
        mt: 10,
        p: 3,
        flexDirection: "column",
        alignItems: "center",
        minHeight: 600,
        width: "70%",
      }}
    >
      <Avatar sx={{ m: 1, p: 3, bgcolor: "primary.main" }}>
        <LockOpenIcon fontSize="large" color="secondary" />
      </Avatar>
      <Typography component="h1" variant="h5" p="0 3rem" textAlign="center">
        Change Passwored
      </Typography>
      <Box
        component="form"
        noValidate
        sx={{ mt: 1, width: "100%" }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        onSubmit={handleSubmit}
      >
        <FormGroup sx={{ width: "40%" }}>
          <TextField
            error={error.code === 1 || error.code === 3 || error.code === 1}
            required
            margin="normal"
            id="oldPassword"
            name="oldPassword"
            label="old Password"
            autoComplete="oldPassword"
            autoFocus
            value={oldPassword}
            onChange={handleChange}
            type="password"
            fullWidth
            onFocus={handleFocus}
            helperText={error.status && error.code === 1 ? error.message : ""}
          />
          <TextField
            error={error.code === 2 || error.code === 3 || error.code === 5}
            required
            margin="normal"
            id="newPassword"
            name="newPassword"
            type="password"
            autoComplete="current-password"
            label="new password"
            value={newPassword}
            onChange={handleChange}
            onFocus={handleFocus}
            helperText={error.status && error.code === 5 ? error.message : ""}
          />
          <TextField
            error={error.code === 2 || error.code === 3}
            required
            margin="normal"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="current-password"
            label="confirm password"
            value={confirmPassword}
            onChange={handleChange}
            onBlur={handleCompare}
            onFocus={handleFocus}
            helperText={
              error.status && (error.code === 2 || error.code === 3)
                ? error.message
                : ""
            }
          />
        </FormGroup>
        <Box display="flex" alignItems="center">
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onSubmit={handleSubmit}
            sx={{
              p: ".7rem 3rem",
              mt: 3,
              mb: 2,
              alignSelf: "center",
              fontSize: 20,
              flexGrow: 1,
            }}
          >
            Confirm
          </Button>
        </Box>
        <Button
          variant="outlined"
          color="error"
          size="large"
          sx={{ fontSize: 20 }}
        >
          go back
        </Button>
      </Box>
    </Paper>
  );
};

export default ChangePasswordPage;
