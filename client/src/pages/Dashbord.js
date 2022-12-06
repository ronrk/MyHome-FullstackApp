import React from "react";

import {
  ExpanseDashbaord,
  TaskDashboard,
  UserProfileDashboard,
  MyHouseDashboard,
} from "../components";

import { Grid } from "@mui/material";

const Dashbord = () => {
  return (
    <Grid container>
      <Grid item xs={8}>
        <UserProfileDashboard />
      </Grid>
      <Grid item xs={4}>
        <MyHouseDashboard />
      </Grid>
      <Grid item xs={8}>
        <ExpanseDashbaord />
      </Grid>
      <Grid item xs={4}>
        <TaskDashboard />
      </Grid>
    </Grid>
  );
};

export default Dashbord;
