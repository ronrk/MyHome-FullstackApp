import React, { useContext, useReducer, useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { customFetch } from "../utils/axios";
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
  const [expanseLoading, setExpanseLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("EXPANSE EFFECT");
  }, []);

  const getCurrentYearExpenses = async () => {
    setExpanseLoading(true);
    try {
      const { data } = await customFetch.get("/expanse/by-date");
      dispatch({ type: "GET_EXPENSES_BY_DATE", payload: { ...data } });

      setExpanseLoading(false);
    } catch (error) {
      console.log(error);
      setExpanseLoading(false);
    }
  };

  const getAllExpanses = async () => {
    try {
      setExpanseLoading(true);
      const {
        data: { expanses },
      } = await customFetch.get(`/expanse`);

      dispatch({ type: "GET_ALL_EXPANSES", payload: expanses });
      getCurrentYearExpenses();
      setExpanseLoading(false);
    } catch (error) {
      console.log(error);
      setExpanseLoading(false);
    }
  };

  const createNewExpanse = async (newExpanse) => {
    try {
      setExpanseLoading(true);

      await customFetch.post("/expanse", newExpanse);
      navigate("/home/expanses");
      setExpanseLoading(false);
    } catch (error) {
      console.log(error);
      setExpanseLoading(false);
    }
  };

  const editExpanse = async (updatedExpanse) => {
    let { _id, name, value, bills } = updatedExpanse;

    try {
      dispatch({ type: "SET_LOADING" });
      await customFetch.patch(`/expanse/${_id}`, {
        name,
        value,
        bills,
      });
      getAllExpanses();
      setExpanseLoading(false);
    } catch (error) {
      console.log(error);
      setExpanseLoading(false);
    }
  };

  const deleteExpanse = async (expanseId) => {
    try {
      setExpanseLoading(false);
      await customFetch.delete("/expanse/" + expanseId);
      getAllExpanses();
      setExpanseLoading(false);
    } catch (error) {
      console.log(error);
      setExpanseLoading(false);
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
        expanseLoading,
        // deleteAllCompletedExpanses,
      }}
    >
      {children}
    </ExpanseContext.Provider>
  );
};

export const useExpanseContext = () => useContext(ExpanseContext);

export default ExpanseContextProvider;
