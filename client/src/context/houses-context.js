import React, { useContext, useState, useEffect } from "react";
import { authorizedFetch } from "../utils/axios";

const housesContext = React.createContext();

const HousesContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("HOUSES EFFECT");
  }, []);

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
  return (
    <housesContext.Provider value={{ searchNewUser, loading, loading }}>
      {children}
    </housesContext.Provider>
  );
};

export const useHousesContext = () => useContext(housesContext);

export default HousesContextProvider;
