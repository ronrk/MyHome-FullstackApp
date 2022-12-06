import React, { useEffect } from "react";

import { useLocation, Link } from "react-router-dom";

import {
  Box,
  Typography,
  Button,
  Container,
  CircularProgress,
} from "@mui/material";

import { useTaskContext } from "../../context/task-context";
import { useAuthContext } from "../../context/auth-context";

import { TaskCard } from "../../components";

const TasksPage = () => {
  const { getAllTasks, tasks, loading, deleteAllCompletedTasks } =
    useTaskContext();
  const { user } = useAuthContext();
  let query = useQuery();

  useEffect(() => {
    if (user) {
      getAllTasks(user.token, query.get("status"));
    }
  }, [query]);

  if (loading) {
    return (
      <Box sx={{ flexGrow: 1, maxWidth: 752, m: "2rem auto" }}>
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  if (tasks.length <= 0) {
    return (
      <Box sx={{ flexGrow: 1, maxWidth: 752, m: "2rem auto" }}>
        <Typography variant="h4">
          Your Tasks List currently empty, click to add a new task
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/tasks/create-new"
        >
          Add new task
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752, m: "2rem auto" }}>
      <Container sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/tasks/create-new"
        >
          Add new task
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => deleteAllCompletedTasks(user.token)}
          sx={{}}
        >
          Delete All Completed Tasks
        </Button>
      </Container>
      <Container>
        {tasks.map((item) => (
          <TaskCard key={item.name} {...item} />
        ))}
      </Container>
    </Box>
  );
};

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default TasksPage;
