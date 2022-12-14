import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography, Paper } from "@mui/material";
import AddShoppingCartSharpIcon from "@mui/icons-material/AddShoppingCartSharp";
import { useExpanseContext } from "../../context/expanse-context";

const ExpansePageActions = ({ lastYearExpanses, loading }) => {
  if (loading) return;

  const { year, count, totalCost } = lastYearExpanses;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        p: 1,
        mt: 1,
      }}
    >
      <Button
        variant="contained"
        endIcon={<AddShoppingCartSharpIcon />}
        component={Link}
        to="/home/expanses/create-new"
        sx={{ textTransform: "capitalize" }}
      >
        Add New Expanse
      </Button>

      <Paper
        elevation={10}
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          bgcolor: "primary.light",
          p: 1,
          textTransform: "uppercase",
        }}
      >
        <Typography variant="h6" color="#dde">
          in {year}
        </Typography>
        <Typography variant="h6" color="#dde">
          you had {count} expanses
        </Typography>
        <Typography variant="h6" color="#dde">
          total: {totalCost}
        </Typography>
      </Paper>
    </Box>
  );
};

export default ExpansePageActions;
