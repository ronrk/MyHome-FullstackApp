import React from "react";
import { Link } from "react-router-dom";
import { Paper, Typography, Button } from "@mui/material";
import ExpanseChart from "./ExpanseChart";
import AddShoppingCartSharpIcon from "@mui/icons-material/AddShoppingCartSharp";

import { useExpanseContext } from "../../context/expanse-context";
import LoadingSpinner from "../UI/LoadingSpinner";

const ExpanseDashbaord = ({ loading }) => {
  const { lastMonthsExpanses } = useExpanseContext();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Paper sx={{ bgcolor: "#eee", m: 1, p: 1 }} elevation={4}>
      <Typography
        variant="h3"
        fontFamily="'Kenia', cursive"
        color="secondary.dark"
      >
        Expanses{" "}
        <Button
          variant="contained"
          endIcon={<AddShoppingCartSharpIcon />}
          component={Link}
          to="/home/expanses/create-new"
          sx={{ textTransform: "capitalize", ml: 1 }}
          size="small"
        >
          Add New Expanse
        </Button>
      </Typography>

      <ExpanseChart lastMonthsExpanses={lastMonthsExpanses} />
    </Paper>
  );
};
export default ExpanseDashbaord;
