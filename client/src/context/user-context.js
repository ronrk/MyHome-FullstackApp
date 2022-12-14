import React, { useContext, useReducer, useState, useEffect } from "react";
import { authorizedFetch, customFetch } from "../utils/axios";
import reducer from "../reducer/user-reducer";

const initialState = {
  user: {},
  userProfile: null,
};

const userContext = React.createContext();

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [userLoading, setUserLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    console.log("USER EFFECT");
  }, []);

  const setUser = (user) => {
    setUserLoading(true);
    dispatch({ type: "SET_USER", payload: user });
    // setUserLoading(false);
  };

  const getCurrentUser = async () => {
    setUserLoading(true);
    try {
      const {
        data: { user },
      } = await customFetch.get("/users/showUser");
      setUser(user);
      await getCurUserProfile(user.userId);
      await setIsAuth(true);
      setUserLoading(false);
    } catch (error) {
      console.error(error.response);
      setUser(null);
      setIsAuth(false);
      setUserLoading(false);
    }
  };

  const getCurUserProfile = async (userId) => {
    try {
      const {
        data: { user },
      } = await customFetch.get("/users/" + userId);

      dispatch({ type: "SET_USER_PROFILE", payload: user });
    } catch (error) {
      console.log(error);
      setUserLoading(false);
    }
  };

  const editUserProfile = async ({ newUser }) => {
    setUserLoading(true);
    try {
      await customFetch.patch("/users/updateUser", newUser);
      setUserLoading(false);
    } catch (error) {
      console.log(error);
      setUserLoading(false);
    }
  };

  const changeUserPassword = async ({ oldPassword, newPassword }) => {
    try {
      const data = await customFetch.patch("/users/updateUserPassword", {
        oldPassword,
        newPassword,
      });
      console.log(data);
      return { success: true };
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        return { success: false, msg: error.response.data.msg, code: 1 };
      }
      if (error.response.status === 400) {
        return {
          success: false,
          msg: "New password is not valid,must be longer than 6 char",
          code: 5,
        };
      }
      // wrong - 401
    }
  };

  return (
    <userContext.Provider
      value={{
        ...state,
        userLoading,
        getCurrentUser,
        setUser,
        getCurUserProfile,
        editUserProfile,
        isAuth,
        changeUserPassword,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => useContext(userContext);

export default UserContextProvider;
