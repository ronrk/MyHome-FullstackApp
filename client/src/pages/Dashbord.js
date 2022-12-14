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
import { useUserContext } from "../context/user-context";
import { useSocialContext } from "../context/social-context";

const Dashbord = () => {
  const { getAllExpanses, expanseLoading } = useExpanseContext();
  const { getAllTasks, taskLoading } = useTaskContext();
  const { getCurrentUser } = useUserContext();
  const { getAllFriendListUser } = useSocialContext();

  useEffect(() => {
    console.log("DASHBOARD");
    getAllTasks();
    getAllExpanses();
    getAllFriendListUser();
  }, []);
  return (
    <Paper sx={{ display: "flex", gap: 3, m: 3, mt: 2, p: 1 }}>
      <Grid container direction="column" width="40%" sx={{ m: "2rem auto" }}>
        <Grid item>
          <UserProfileDashboard />
        </Grid>
        <Grid item>
          <TaskDashboard loading={taskLoading} />
        </Grid>
      </Grid>
      <Grid container direction="column" width="60%" sx={{ m: "2rem auto" }}>
        <Grid item>
          <MyHouseDashboard />
        </Grid>
        <Grid item>
          <ExpanseDashbaord loading={expanseLoading} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Dashbord;
