import React from "react";

import { useUIContext } from "../../context/ui-context";

import { Menu, MenuItem, Typography } from "@mui/material";

const ActionsMenu = ({ children }) => {
  const { actionsMenuAnchorElement, open, handleCloseActionsMenu } =
    useUIContext();

  return (
    <Menu
      id="actions-menu"
      sx={{ mt: "50px" }}
      open={open}
      onClose={handleCloseActionsMenu}
      keepMounted
      anchorEl={actionsMenuAnchorElement}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      MenuListProps={{
        "aria-labelledby": "actions-button",
      }}
    >
      {children}
    </Menu>
  );
};

export default ActionsMenu;
