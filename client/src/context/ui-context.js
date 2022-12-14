import React, { useState, useContext, useEffect } from "react";
import { useAuthContext } from "./auth-context";

const UIContext = React.createContext();

const UIContextProvider = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(240);
  const [actionsMenuAnchorElement, setActionsMenuAnchorElement] =
    useState(null);
  const open = Boolean(actionsMenuAnchorElement);

  useEffect(() => {
    console.log("UI EFFECT");
  }, []);

  const handleOpenActionsMenu = (event) => {
    setActionsMenuAnchorElement(event.currentTarget);
  };

  const handleCloseActionsMenu = () => {
    setActionsMenuAnchorElement(null);
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
        handleOpenActionsMenu,
        handleCloseActionsMenu,
        actionsMenuAnchorElement,
        open,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => useContext(UIContext);

export default UIContextProvider;
