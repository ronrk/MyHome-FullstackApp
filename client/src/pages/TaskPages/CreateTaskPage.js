import React, { useState } from "react";

import { useAuthContext } from "../../context/auth-context";
import { useTaskContext } from "../../context/task-context";

import { BpCheckbox } from "../../components";
import AddTaskSharpIcon from "@mui/icons-material/AddTaskSharp";

import {
  Typography,
  Avatar,
  Box,
  TextField,
  FormControlLabel,
  Button,
} from "@mui/material";

const CreateTaskPage = () => {
  const [values, setValues] = useState({ name: "", status: false });
  const { user } = useAuthContext();
  const { createNewTask } = useTaskContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewTask(values, user.token);
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (checked) {
      setValues((prev) => {
        return { ...prev, [name]: checked };
      });
      return;
    }
    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Avatar sx={{ m: 1, p: 3, bgcolor: "primary.dark" }}>
        <AddTaskSharpIcon />
      </Avatar>
      <Typography component="h1" variant="h3">
        Create new Task
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Task Title"
          name="name"
          autoComplete="name"
          autoFocus
          onChange={handleChange}
          value={values.name}
        />
        <FormControlLabel
          control={
            <BpCheckbox
              value="status"
              color="primary"
              name="status"
              id="status"
              onChange={handleChange}
            />
          }
          label="completed"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          CREATE
        </Button>
      </Box>
    </Box>
  );
};

export default CreateTaskPage;
