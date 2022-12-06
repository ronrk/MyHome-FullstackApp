import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useUIContext } from "../../context/ui-context";

import {
  IconButton,
  styled,
  Toolbar,
  Typography,
  Box,
  Tooltip,
  MenuItem,
  Avatar,
  Menu,
  Container,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MenuOpenSharpIcon from "@mui/icons-material/MenuOpenSharp";
import RoofingSharpIcon from "@mui/icons-material/RoofingSharp";

const Navbar2 = () => {
  const { isDrawerOpen, toggleDrawer } = useUIContext();
  const [open, setOpen] = useState(true);

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.target);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const drawerWidth = 240;

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <AppBar position="absolute" open={isDrawerOpen} sx={{ pl: 2 }}>
      <Toolbar
        disableGutters
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(isDrawerOpen && { display: "none" }),
          }}
        >
          <MenuOpenSharpIcon sx={{ transform: "rotate(180deg)" }} />
        </IconButton>

        <Typography
          component={Link}
          to="/"
          variant="h6"
          noWrap
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
            flexGrow: 1,
          }}
        >
          <RoofingSharpIcon
            fontSize="large"
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              color: "secondary.main",
            }}
          />
          My Houses
        </Typography>
        {/* Navbar2 */}

        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          elevation={1}
          sx={{ mt: "45px" }}
          id="menu-appbar"
          //   anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {[{ name: "demo", path: "demo" }].map((setting) => (
            <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
              <Typography
                textAlign="center"
                component={Link}
                to={setting.path}
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {setting.name}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar2;
