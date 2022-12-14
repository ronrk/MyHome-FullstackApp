import React, { useEffect } from "react";

import { useLocation } from "react-router-dom";

import { Divider, Typography } from "@mui/material";

import { useTaskContext } from "../../context/task-context";

import ItemPage from "../../components/UI/ItemPage";

import { TaskPageActions, TaskPageContent } from "../../components";
import { useUserContext } from "../../context/user-context";

const TasksPage = () => {
  const { getAllTasks, tasks } = useTaskContext();
  const { user } = useUserContext();
  let query = useQuery();

  useEffect(() => {
    console.log("TASKPAGE");
    if (user) {
      console.log("Task page use effect");
      getAllTasks(query.get("status"));
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
      <TaskPageContent tasks={tasks} filter={query.get("status")} />
    </ItemPage>
  );
};

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default TasksPage;
