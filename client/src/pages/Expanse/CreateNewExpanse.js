import React, { useState } from "react";

import CreateNewItemPage from "../../components/UI/CreateNewItemPage";

import { useExpanseContext } from "../../context/expanse-context";

import AddShoppingCartSharpIcon from "@mui/icons-material/AddShoppingCartSharp";

import { TextField } from "@mui/material";

const CreateNewExpansePage = () => {
  const [values, setValues] = useState({ name: "", value: 0, bills: 0 });
  const { createNewExpanse } = useExpanseContext();

  const handleSubmit = (e) => {
    console.log("submit");
    e.preventDefault();
    createNewExpanse(values);
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
    <CreateNewItemPage
      headerIcon={<AddShoppingCartSharpIcon />}
      headerTitle="Create New Expanse"
      submitHandler={handleSubmit}
    >
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
    </CreateNewItemPage>
  );
};

export default CreateNewExpansePage;
