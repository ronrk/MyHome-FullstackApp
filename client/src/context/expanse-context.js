import React, { useContext, useReducer } from "react";
import { useNavigate } from "react-router";

import axios from "axios";
import reducer from "../reducer/expanse-reducer";

const ExpanseContext = React.createContext();

const initialState = {
  _expanses: [],
  expanses: [],
  totalExpanses: 0,
  loading: false,
  error: false,
};

const ExpanseContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const getAllExpanses = async (token) => {
    try {
      dispatch({ type: "SET_LOADING" });
      const {
        data: { expanses },
      } = await axios.get(`http://localhost:5010/api/v1/expanse`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: "GET_ALL_EXPANSES", payload: expanses });
      dispatch({ type: "END_LOADING" });
    } catch (error) {
      console.log(error);
      dispatch({ type: "END_LOADING" });
    }
  };

  const createNewExpanse = async (newExpanse, token) => {
    try {
      dispatch({ type: "SET_LOADING" });

      const {
        data: { expanse },
      } = await axios.post("http://localhost:5010/api/v1/expanse", newExpanse, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "CREATE_NEW_EXPANSE", payload: expanse });
      navigate("/expanses");
      dispatch({ type: "END_LOADING" });
    } catch (error) {
      console.log(error);
      dispatch({ type: "END_LOADING" });
    }
  };

  const editExpanse = async (updatedExpanse, token) => {
    let { _id, name, value, bills } = updatedExpanse;

    try {
      dispatch({ type: "SET_LOADING" });
      const { data } = await axios.patch(
        `http://localhost:5010/api/v1/expanse/${_id}`,
        { name, value, bills },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "EDIT_EXPANSE", payload: data });
      getAllExpanses(token);
      dispatch({ type: "END_LOADING" });
    } catch (error) {
      console.log(error);
      dispatch({ type: "END_LOADING" });
    }
  };

  const deleteExpanse = async (expanseId, token) => {
    try {
      dispatch({ type: "SET_LOADING" });
      const data = await axios.delete(
        "http://localhost:5010/api/v1/expanse/" + expanseId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getAllExpanses(token);
      dispatch({ type: "END_LOADING" });
    } catch (error) {
      console.log(error);
      dispatch({ type: "END_LOADING" });
    }
  };
  /* const deleteAllCompletedTasks = async (token) => {
    try {
      dispatch({ type: "SET_LOADING" });
      const data = await axios.delete("http://localhost:5010/api/v1/task", {
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
  }; */

  return (
    <ExpanseContext.Provider
      value={{
        ...state,
        createNewExpanse,
        getAllExpanses,
        editExpanse,
        deleteExpanse,
        // deleteAllCompletedExpanses,
      }}
    >
      {children}
    </ExpanseContext.Provider>
  );
};

export const useExpanseContext = () => useContext(ExpanseContext);

export default ExpanseContextProvider;
