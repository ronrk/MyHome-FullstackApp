import React, { useContext, useReducer } from "react";
import { useNavigate } from "react-router";

import { authorizedFetch } from "../utils/axios";
import reducer from "../reducer/task-reducer";

const TaskContext = React.createContext();

const initialState = {
  _tasks: [],
  tasks: [],
  totalTasks: 0,
  loading: false,
  error: false,
};

const TaskContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const getAllTasks = async (token, query) => {
    try {
      dispatch({ type: "SET_LOADING" });
      const {
        data: { tasks },
      } = await authorizedFetch(token).get(`/task?status=${query}`);

      dispatch({ type: "GET_ALL_TASKS", payload: tasks });
      dispatch({ type: "END_LOADING" });
    } catch (error) {
      console.log(error);
      dispatch({ type: "END_LOADING" });
    }
  };

  const createNewTask = async (newTask, token) => {
    try {
      dispatch({ type: "SET_LOADING" });
      newTask.status = newTask.status === true ? "done" : "pending";

      const {
        data: { task },
      } = await authorizedFetch(token).post("/task", newTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "CREATE_NEW_TASK", payload: task });
      navigate("/home/tasks?status=all");
      dispatch({ type: "END_LOADING" });
    } catch (error) {
      console.log(error);
      dispatch({ type: "END_LOADING" });
    }
  };

  const editTask = async (updatedTask, token) => {
    let { _id, name, status } = updatedTask;

    status = status === "pending" ? "done" : "pending";

    try {
      dispatch({ type: "SET_LOADING" });
      const { data } = await authorizedFetch(token).patch(
        `/task/${_id}`,
        { name, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "EDIT_TASK", payload: data });
      getAllTasks(token, "all");
      dispatch({ type: "END_LOADING" });
    } catch (error) {
      console.log(error);
      dispatch({ type: "END_LOADING" });
    }
  };

  const deleteTask = async (taskId, token) => {
    try {
      dispatch({ type: "SET_LOADING" });
      const data = await authorizedFetch(token).delete("/task/" + taskId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getAllTasks(token, "all");
      dispatch({ type: "END_LOADING" });
    } catch (error) {
      console.log(error);
      dispatch({ type: "END_LOADING" });
    }
  };
  const deleteAllCompletedTasks = async (token) => {
    try {
      dispatch({ type: "SET_LOADING" });
      const data = await authorizedFetch(token).delete("/task", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getAllTasks(token, "all");
      dispatch({ type: "END_LOADING" });
    } catch (error) {
      console.log(error);
      dispatch({ type: "END_LOADING" });
    }
  };

  return (
    <TaskContext.Provider
      value={{
        ...state,
        createNewTask,
        getAllTasks,
        editTask,
        deleteTask,
        deleteAllCompletedTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);

export default TaskContextProvider;
