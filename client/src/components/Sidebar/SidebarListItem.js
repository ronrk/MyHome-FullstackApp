import React, { useState } from "react";

import { Link } from "react-router-dom";

import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
} from "@mui/material";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const SidebarListItem = ({ label, path, icon, sublinks }) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  if (label.toLowerCase() === "home") {
    return (
      <ListItemButton
        component={Link}
        to={path}
        sx={{ bgcolor: "tertiary.withOpacity" }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    );
  }

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        sx={{ bgcolor: "primary.darkWithOpacity" }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {sublinks.map((item) => (
            <ListItemButton
              sx={{ pl: 4 }}
              component={Link}
              to={item.path}
              key={item.label}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default SidebarListItem;
