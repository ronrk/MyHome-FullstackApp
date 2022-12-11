import React, { useContext, useState } from "react";
import { authorizedFetch } from "../utils/axios";

const userContext = React.createContext();

const UserContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const searchNewUser = async (token, query) => {
    try {
      setLoading(true);
      console.log(query);
      const {
        data: { users },
      } = await authorizedFetch(token).post("/houses/user/search-new", {
        query: query,
      });
      setLoading(false);
      return users;
    } catch (error) {
      console.log(error);
      setLoading(false);
      return [];
    }
  };

  const sendFriendRequest = async (token, userId) => {
    try {
      setLoading(true);
      const data = await authorizedFetch(token).post("/user/send-request", {
        userId,
      });
      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <userContext.Provider value={{ loading, sendFriendRequest }}>
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => useContext(userContext);

export default UserContextProvider;
