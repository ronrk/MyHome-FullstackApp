import React, { useReducer, useContext } from "react";
import { customFetch } from "../utils/axios";

import reducer from "../reducer/auth-reducer";

const authContext = React.createContext();

const initialState = {
  user: null,
  isLoading: true,
  isError: false,
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email, password) => {
    try {
      const {
        data: { user },
      } = await customFetch.post("/auth/login", {
        email,
        password,
      });
      dispatch({ type: "USER_LOGIN", payload: user });
    } catch (error) {
      console.error(error);
    }
  };
  const register = async (name, email, password) => {
    try {
      const {
        data: { user },
      } = await customFetch.post("/auth/register", {
        name,
        email,
        password,
      });

      dispatch({ type: "USER_REGISTER", payload: user });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <authContext.Provider value={{ ...state, login, register }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(authContext);
};

export default AuthContextProvider;
