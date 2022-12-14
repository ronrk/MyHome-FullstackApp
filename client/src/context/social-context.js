import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { customFetch } from "../utils/axios";

import { useUserContext } from "./user-context";

const socialContext = React.createContext();

const SocialContextProvider = ({ children }) => {
  const [socialLoading, setSocialLoading] = useState();
  const [newFriendRequest, setNewFriendRequest] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const navigate = useNavigate();

  const { getCurrentUser } = useUserContext();

  useEffect(() => {
    console.log("SOCIAL EFFECR");
  }, []);

  const getAllFriendListUser = async () => {
    try {
      const {
        data: { users },
      } = await customFetch.get("/houses/friends");

      setFriendList(users);
      setSocialLoading(false);
    } catch (error) {
      console.log(error);
      setSocialLoading(false);
    }
  };

  const searchNewUser = async (query) => {
    try {
      setSocialLoading(true);
      console.log(query);
      const {
        data: { users },
      } = await customFetch.post("/houses/user/search-new", {
        query: query,
      });
      setSocialLoading(false);
      return users;
    } catch (error) {
      console.log(error);
      setSocialLoading(false);
      return [];
    }
  };

  const sendFriendRequest = async ({ toUser }) => {
    try {
      setSocialLoading(true);
      console.log(toUser);
      const data = await customFetch.post("/friendRequest", {
        toUser,
      });
      console.log(data);
      await getCurrentUser();
      setSocialLoading(false);
    } catch (error) {
      setSocialLoading(false);
      console.log(error);
    }
  };

  const getFriendRequestUsers = async () => {
    setSocialLoading(true);
    try {
      const {
        data: { friendReq },
      } = await customFetch.get("/friendRequest");

      setNewFriendRequest(friendReq);
    } catch (error) {
      console.log(error);
    }
  };

  const responseToFriendRequest = async ({ reqId, status }) => {
    console.log({ reqId, status });
    setSocialLoading(true);
    try {
      await customFetch.patch("/friendRequest/" + reqId, { status });
      await getAllFriendListUser();
      setSocialLoading(false);
    } catch (error) {
      setSocialLoading(false);
      console.log(error);
    }
  };

  return (
    <socialContext.Provider
      value={{
        searchNewUser,
        sendFriendRequest,
        getFriendRequestUsers,
        responseToFriendRequest,
        getAllFriendListUser,
        newFriendRequest,
        socialLoading,
      }}
    >
      {children}
    </socialContext.Provider>
  );
};

export const useSocialContext = () => useContext(socialContext);

export default SocialContextProvider;
