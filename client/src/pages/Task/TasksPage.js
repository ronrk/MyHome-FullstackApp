import React, { useEffect } from "react";

import { useLocation } from "react-router-dom";

import { Box, Paper, Divider } from "@mui/material";

import { useTaskContext } from "../../context/task-context";
import { useAuthContext } from "../../context/auth-context";

import {
  TaskPageActions,
  TaskPageContent,
  TaskPageHeader,
} from "../../components";

const TasksPage = () => {
  const { getAllTasks, tasks } = useTaskContext();
  const { user } = useAuthContext();
  let query = useQuery();

  useEffect(() => {
    if (user) {
      getAllTasks(user.token, query.get("status"));
    }
  }, [query]);

  return (
    <Paper elevation={20} sx={{ m: 5, bgcolor: "primary.darkWithOpacity" }}>
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          flexGrow: 1,
          // maxWidth: 1000,
          m: "2rem auto",
        }}
      >
        <TaskPageHeader tasks={tasks} />
        <Divider />
        <TaskPageActions filter={query.get("status")} />
        <Divider />
        <TaskPageContent tasks={tasks} />
      </Box>
    </Paper>
  );
};

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default TasksPage;
