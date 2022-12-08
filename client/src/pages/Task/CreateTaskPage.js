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
  Paper,
  Collapse,
  FormGroup,
  Container,
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
    <Paper
      elevation={20}
      sx={{
        m: 5,
        bgcolor: "primary.darkWithOpacity",

        maxWidth: 850,
        ml: "auto",
        mr: "auto",
      }}
    >
      <Collapse />
      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Container sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
          <Avatar sx={{ m: 1, p: 3, bgcolor: "primary.dark" }}>
            <AddTaskSharpIcon />
          </Avatar>
          <Typography component="h1" variant="h3">
            Create new Task
          </Typography>
        </Container>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, width: "100%" }}
        >
          <FormGroup
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 5,
            }}
          >
            <TextField
              margin="normal"
              required
              autoFocus
              label="Task Title"
              autoComplete="name"
              id="name"
              name="name"
              onChange={handleChange}
              value={values.name}
              sx={{ flexGrow: 1 }}
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
          </FormGroup>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            CREATE
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default CreateTaskPage;
