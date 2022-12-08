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

  return <Card>EXPANSE CARD</Card>;
};

export default ExpanseCard;
