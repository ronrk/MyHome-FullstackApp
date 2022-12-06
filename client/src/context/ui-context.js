import React, { useState, useContext } from "react";

const UIContext = React.createContext();

const UIContextProvider = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <UIContext.Provider value={{ isDrawerOpen, toggleDrawer }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => useContext(UIContext);

export default UIContextProvider;
