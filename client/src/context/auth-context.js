import React, { useReducer, useContext, useEffect } from "react";
import { customFetch } from "../utils/axios";
import {
  rememberUserOnLocaleStorage,
  getUserFromLocaleStorage,
  removeUserFromLocaleStorage,
} from "../utils/functions";

import reducer from "../reducer/auth-reducer";

const authContext = React.createContext();

const initialState = {
  user: getUserFromLocaleStorage(),
  isLoading: true,
  error: { status: false },
  isAuth: false,
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initilizeError = () => {
    dispatch({ type: "INITIAL_ERROR" });
  };

  const login = async (email, password, rememberUser) => {
    try {
      // console.log(email, password);
      dispatch({ type: "SET_LOADING" });
      const {
        data: { user },
      } = await customFetch.post("/auth/login", {
        email,
        password,
      });
      dispatch({ type: "USER_LOGIN", payload: user });
      if (rememberUser) {
        rememberUserOnLocaleStorage(user);
      }
      dispatch({ type: "END_LOADING" });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.response.data.msg });
      dispatch({ type: "END_LOADING" });
    }
  };
  const register = async (name, email, password, rememberUser) => {
    try {
      dispatch({ type: "SET_LOADING" });
      const {
        data: { user },
      } = await customFetch.post("/auth/register", {
        name,
        email,
        password,
      });

      dispatch({ type: "USER_REGISTER", payload: user });
      if (rememberUser) {
        rememberUserOnLocaleStorage(user);
      }
      dispatch({ type: "END_LOADING" });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.response.data.msg });
      dispatch({ type: "END_LOADING" });
    }
  };

  const logout = () => {
    removeUserFromLocaleStorage();
    dispatch({ type: "LOGOUT_USER" });
  };

  return (
    <authContext.Provider
      value={{
        ...state,
        login,
        register,
        initilizeError,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(authContext);
};

export default AuthContextProvider;
