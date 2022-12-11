import React, { useEffect } from "react";

import { useLocation } from "react-router-dom";

import { Divider, Typography } from "@mui/material";

import { useTaskContext } from "../../context/task-context";
import { useAuthContext } from "../../context/auth-context";

import ItemPage from "../../components/UI/ItemPage";

import { TaskPageActions, TaskPageContent } from "../../components";

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
    <ItemPage
      title="Your Tasks"
      headerContent={
        <Typography
          variant="body2"
          component="legend"
          sx={{
            fontFamily: "'Zen Dots', cursive",
          }}
        >
          Found: {tasks.length}
        </Typography>
      }
    >
      <TaskPageActions filter={query.get("status")} />
      <Divider />
      <TaskPageContent tasks={tasks} />
    </ItemPage>
  );
};

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default TasksPage;
