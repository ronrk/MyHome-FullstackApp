import React, { useContext, useReducer } from "react";
import { useNavigate } from "react-router";

import { authorizedFetch } from "../utils/axios";
import reducer from "../reducer/expanse-reducer";

const ExpanseContext = React.createContext();

const initialState = {
  _expanses: [],
  expanses: [],
  lastMonthsExpanses: [],
  lastYearExpanses: [],
  totalExpanses: 0,
  loading: false,
  error: false,
  numbersPerPage: 0,
};

const ExpanseContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const getCurrentYearExpenses = async (token) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const { data } = await authorizedFetch(token).get("/expanse/by-date");
      dispatch({ type: "GET_EXPENSES_BY_DATE", payload: { ...data } });

      dispatch({ type: "END_LOADING" });
    } catch (error) {
      console.log(error);
      dispatch({ type: "END_LOADING" });
    }
  };

  const getAllExpanses = async (token) => {
    try {
      dispatch({ type: "SET_LOADING" });
      const {
        data: { expanses },
      } = await authorizedFetch(token).get(`/expanse`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: "GET_ALL_EXPANSES", payload: expanses });
      getCurrentYearExpenses(token);
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
      } = await authorizedFetch(token).post("/expanse", newExpanse, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "CREATE_NEW_EXPANSE", payload: expanse });
      navigate("/home/expanses");
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
      const { data } = await authorizedFetch(token).patch(
        `/expanse/${_id}`,
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
      const data = await authorizedFetch(token).delete(
        "/expanse/" + expanseId,
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
  const handleGetExpanses = (value) => {
    dispatch({ type: "HANDLE_GET_EXPANSES", payload: value });
  };

  return (
    <ExpanseContext.Provider
      value={{
        ...state,
        createNewExpanse,
        getAllExpanses,
        getCurrentYearExpenses,
        editExpanse,
        deleteExpanse,
        handleGetExpanses,
        // deleteAllCompletedExpanses,
      }}
    >
      {children}
    </ExpanseContext.Provider>
  );
};

export const useExpanseContext = () => useContext(ExpanseContext);

export default ExpanseContextProvider;
