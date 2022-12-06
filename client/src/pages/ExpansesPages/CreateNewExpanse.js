import React, { useState } from "react";

import { useAuthContext } from "../../context/auth-context";
import { useExpanseContext } from "../../context/expanse-context";

import { BpCheckbox } from "../../components";
import AddShoppingCartSharpIcon from "@mui/icons-material/AddShoppingCartSharp";

import {
  Typography,
  Avatar,
  Box,
  TextField,
  FormControlLabel,
  Button,
} from "@mui/material";

const CreateNewExpansePage = () => {
  const [values, setValues] = useState({ name: "", value: 0, bills: 0 });
  const { user } = useAuthContext();
  const { createNewExpanse } = useExpanseContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewExpanse(values, user.token);
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
        <AddShoppingCartSharpIcon />
      </Avatar>
      <Typography component="h1" variant="h3">
        Create new Expanse
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Expanse Title"
          name="name"
          autoComplete="name"
          autoFocus
          onChange={handleChange}
          value={values.name}
        />
        <TextField
          type="number"
          margin="normal"
          required
          fullWidth
          id="value"
          label="Expanse Value"
          name="value"
          autoComplete="value"
          autoFocus
          onChange={handleChange}
          value={values.value}
        />
        <TextField
          type="number"
          margin="normal"
          fullWidth
          id="value"
          label="Expanse Bills"
          name="bills"
          autoComplete="bills"
          autoFocus
          onChange={handleChange}
          value={values.bills}
        />
        {/*   <FormControlLabel
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
        /> */}
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

export default CreateNewExpansePage;
