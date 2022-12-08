import React, { useState } from "react";

import { Link } from "react-router-dom";

import { styled } from "@mui/material";

import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
} from "@mui/material";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const LisItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiListItemIcon-root": {
    color: theme.palette.primary.common,
  },
  "& .MuiListItemText-primary": {
    color: theme.palette.primary.common,
    fontWeight: 500,
    fontSize: "1.1rem",
  },
}));

const SidebarListItem = ({ label, path, icon, sublinks }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  if (label.toLowerCase() === "home") {
    return (
      <LisItem component={Link} to={path} sx={{}}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </LisItem>
    );
  }

  return (
    <>
      <LisItem onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </LisItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {sublinks.map((item) => (
            <ListItemButton
              sx={{ pl: 4 }}
              component={Link}
              to={item.path}
              key={item.label}
            >
              <ListItemIcon sx={{ color: "secondary.common" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default SidebarListItem;
