import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router";

import { customFetch } from "../utils/axios";
import reducer from "../reducer/task-reducer";

const TaskContext = React.createContext();

const initialState = {
  _tasks: [],
  tasks: [],
  totalTasks: 0,
  error: false,
};

const TaskContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [taskLoading, setTaskLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("TASK EFFECT");
  }, []);

  const getAllTasks = async (query = "all") => {
    setTaskLoading(true);
    try {
      const {
        data: { tasks },
      } = await customFetch.get(`/task?status=${query}`);

      dispatch({ type: "GET_ALL_TASKS", payload: tasks });
      setTaskLoading(false);
    } catch (error) {
      console.log(error);
      setTaskLoading(false);
    }
  };

  const createNewTask = async (newTask) => {
    try {
      setTaskLoading(true);
      newTask.status = newTask.status === true ? "done" : "pending";
      await customFetch.post("/task", newTask);
      navigate("/home/tasks?status=all");
      setTaskLoading(false);
    } catch (error) {
      console.log(error);
      setTaskLoading(false);
    }
  };

  const editTask = async (updatedTask, query = "all") => {
    setTaskLoading(true);
    let { _id, name, status } = updatedTask;

    try {
      await customFetch.patch(`/task/${_id}`, {
        name,
        status,
      });
      await getAllTasks(query);
      setTaskLoading(false);
    } catch (error) {
      console.log(error);
      setTaskLoading(false);
    }
  };

  const deleteTask = async (taskId, query) => {
    setTaskLoading(true);
    try {
      await customFetch.delete("/task/" + taskId);

      await getAllTasks(query);
      setTaskLoading(false);
    } catch (error) {
      console.log(error);
      setTaskLoading(false);
    }
  };
  const deleteAllCompletedTasks = async () => {
    setTaskLoading(true);
    try {
      await customFetch.delete("/task");
      navigate("/home/tasks?status=all");
      setTaskLoading(false);
    } catch (error) {
      console.log(error);
      setTaskLoading(false);
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
        taskLoading,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);

export default TaskContextProvider;
