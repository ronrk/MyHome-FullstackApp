import React from "react";

import { useUIContext } from "../../context/ui-context";

import { Menu, MenuItem, Typography } from "@mui/material";

const UserMenu = () => {
  const { userMenuAnchorElement, open, handleCloseUserMenu } = useUIContext();

  return (
    <Menu
      id="menu-appbar"
      sx={{ mt: "50px" }}
      open={open}
      onClose={handleCloseUserMenu}
      keepMounted
      anchorEl={userMenuAnchorElement}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <MenuItem onClick={handleCloseUserMenu}>
        <Typography textAlign="center">demo</Typography>
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;
