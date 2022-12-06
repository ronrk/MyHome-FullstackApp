import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";

import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import ThumbUpAltSharpIcon from "@mui/icons-material/ThumbUpAltSharp";

import { useExpanseContext } from "../../context/expanse-context";
import { useAuthContext } from "../../context/auth-context";

const ExpanseCard = ({ name, value, bills, _id, createdAt }) => {
  const [values, setValues] = useState({ name: "", value: "", bills: "" });
  const dateCreated = new Date(Date.parse(createdAt)).toLocaleDateString();
  const { user } = useAuthContext();
  const { editExpanse, deleteExpanse } = useExpanseContext();
  const [onEdit, setOnEdit] = useState(false);

  const handleInputChange = (e) => {
    const { value, name } = e.target;

    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onEditHandler = () => {
    setValues({ name: name, value: value, bills: bills });
    setOnEdit(true);
  };

  if (onEdit) {
    return (
      <Card sx={{ minWidth: 350 }}>
        <CardContent>
          <TextField
            margin="normal"
            required
            fullWidth
            autoFocus
            label="Expanse Value"
            type="number"
            autoComplete="value"
            name="value"
            id="value"
            value={values.value}
            onChange={handleInputChange}
          >
            {value}
          </TextField>
          <TextField
            margin="normal"
            required
            fullWidth
            autoFocus
            label="Expanse Title"
            autoComplete="name"
            name="name"
            id="name"
            value={values.name}
            onChange={handleInputChange}
          >
            {name}
          </TextField>
          <TextField
            margin="normal"
            required
            disabled
            fullWidth
            autoFocus
            label="Expanse Date"
            autoComplete="date"
            name="date"
            id="date"
            value={dateCreated}
          >
            {dateCreated}
          </TextField>
          <TextField
            margin="normal"
            required
            fullWidth
            autoFocus
            label="Expanse Bills"
            name="bills"
            autoComplete="bills"
            id="bills"
            type="number"
            value={values.bills}
            onChange={handleInputChange}
          >
            {bills}
          </TextField>
        </CardContent>
        <CardActions>
          <IconButton
            size="small"
            onClick={() => {
              editExpanse({ ...values, _id }, user.token);
              setOnEdit(false);
            }}
          >
            <ThumbUpAltSharpIcon color="tertiary" />
          </IconButton>
        </CardActions>
      </Card>
    );
  }

  return (
    <Card sx={{ minWidth: 350 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {dateCreated}
        </Typography>
        {bills > 0 ? (
          <Typography variant="body2" color="text.secondary">
            {bills} bills
          </Typography>
        ) : null}
      </CardContent>
      <CardActions>
        <IconButton size="small" onClick={() => deleteExpanse(_id, user.token)}>
          <DeleteForeverSharpIcon color="secondary" />
        </IconButton>
        <IconButton size="small" onClick={onEditHandler}>
          <EditSharpIcon color="tertiary" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ExpanseCard;
