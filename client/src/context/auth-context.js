import axios from "axios";
import React, { useReducer, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { customFetch } from "../utils/axios";
import {
  rememberUserOnLocaleStorage,
  getUserFromLocaleStorage,
  removeUserFromLocaleStorage,
} from "../utils/functions";

import { useUserContext } from "./user-context";

const authContext = React.createContext();

const AuthContextProvider = ({ children }) => {
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState({ status: false });
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  useEffect(() => {
    console.log("AUTH EFFECT");
  }, []);

  const initilizeError = () => {
    setAuthError({ status: false, message: "" });
  };

  const login = async (email, password) => {
    setAuthLoading(true);

    try {
      // console.log(email, password);

      const {
        data: { user },
      } = await customFetch.post(
        "/auth/login",
        { email, password },
        {
          withCredentials: true,
        }
      );

      // console.log(user);
      setUser(user);
      navigate("/home", { replace: true });
      initilizeError();
      setAuthLoading(false);
    } catch (error) {
      console.log(error);
      setAuthLoading(false);
      setAuthError({ status: true, message: error.response.data.msg });
    }
  };
  const register = async (name, email, password) => {
    setAuthLoading(true);
    try {
      const {
        data: { user },
      } = await customFetch.post("/auth/register", {
        name,
        email,
        password,
      });

      console.log(user);

      await setUser(user);
      initilizeError();
      navigate("/home", { replace: true });
      setAuthLoading(false);
    } catch (error) {
      console.log(error);
      setAuthError({ status: true, message: error.response.data.msg });
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    setAuthLoading(true);
    try {
      await customFetch("/auth/logout");
      setUser(null);
      navigate("/", { replace: true });
      setAuthLoading(false);
    } catch (error) {
      console.log(error.response);
      setAuthLoading(false);
    }
  };

  return (
    <authContext.Provider
      value={{
        login,
        register,
        initilizeError,
        logout,
        authLoading,
        authError,
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
