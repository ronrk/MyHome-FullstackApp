import React from "react";

import { useUIContext } from "../../context/ui-context";

import { Toolbar, IconButton, Divider, List } from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { mainListItems } from "../../utils/linkItems";
import { StyledSidebar } from "./StyledSidebar";

import SidebarListItem from "./SidebarListItem";

const Sidebar = () => {
  const { drawerWidth, isDrawerOpen, toggleDrawer } = useUIContext();

  return (
    <StyledSidebar
      variant="permanent"
      open={isDrawerOpen}
      drawerwidth={drawerWidth}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
          height: 79,
          bgcolor: "primary.main",
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon fontSize="large" sx={{ color: "primary.common" }} />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {mainListItems.map((item) => (
          <SidebarListItem key={item.label} {...item} />
        ))}
      </List>
    </StyledSidebar>
  );
};

export default Sidebar;
