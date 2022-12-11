import React from "react";
import { Grid, Box } from "@mui/material";
import ExpanseCardContainer from "./ExpanseCardContainer";

import LoadingSpinner from "../UI/LoadingSpinner";

import ExpanseChart from "./ExpanseChart";

const ExpansePageContent = ({ expanses, loading, lastMonthsExpanses }) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box sx={{ mt: 5 }}>
      <Grid container>
        <Grid item xs={5}>
          <ExpanseCardContainer expanses={expanses} />
        </Grid>
        <Grid xs={6} item sx={{ margin: "4vh auto" }}>
          <ExpanseChart lastMonthsExpanses={lastMonthsExpanses} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExpansePageContent;
