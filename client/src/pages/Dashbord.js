import React, { useEffect } from "react";

import {
  ExpanseDashbaord,
  TaskDashboard,
  UserProfileDashboard,
  MyHouseDashboard,
} from "../components";

import { Grid, Paper } from "@mui/material";

import { useExpanseContext } from "../context/expanse-context";
import { useTaskContext } from "../context/task-context";
import { useAuthContext } from "../context/auth-context";

const Dashbord = () => {
  const { getAllExpanses, loading: loadingExpanses } = useExpanseContext();
  const { getAllTasks, loading: loaingTasks } = useTaskContext();
  const { user } = useAuthContext();

  useEffect(() => {
    getAllExpanses(user.token);
    getAllTasks(user.token, "all");
  }, []);
  return (
    <Paper sx={{ display: "flex", gap: 3, m: 3, mt: 2, p: 1 }}>
      <Grid container direction="column" width="40%" sx={{ m: "2rem auto" }}>
        <Grid item>
          <UserProfileDashboard />
        </Grid>
        <Grid item>
          <TaskDashboard loading={loadingExpanses} />
        </Grid>
      </Grid>
      <Grid container direction="column" width="60%">
        <Grid item>
          <MyHouseDashboard />
        </Grid>
        <Grid item>
          <ExpanseDashbaord loading={loadingExpanses} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Dashbord;
