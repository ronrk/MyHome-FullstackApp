import React, { useState, useContext } from "react";
import { useAuthContext } from "./auth-context";

const UIContext = React.createContext();

const UIContextProvider = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(240);
  const [userMenuAnchorElement, setUserMenuAnchorElement] = useState(null);
  const open = Boolean(userMenuAnchorElement);

  const handleOpenUserMenu = (event) => {
    console.log(event.currentTarget);
    setUserMenuAnchorElement(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUserMenuAnchorElement(null);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <UIContext.Provider
      value={{
        isDrawerOpen,
        toggleDrawer,
        drawerWidth,
        handleOpenUserMenu,
        handleCloseUserMenu,
        userMenuAnchorElement,
        open,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => useContext(UIContext);

export default UIContextProvider;
