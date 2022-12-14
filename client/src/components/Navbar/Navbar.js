import React from "react";
import { Link } from "react-router-dom";

import { useUIContext } from "../../context/ui-context";

import UserMenu from "./UserMenu";
import AuthNavbarBox from "./AuthNavbarBox";

import { IconButton, Toolbar, Typography } from "@mui/material";
import { StyledNavbar } from "./StyledNavbar";
import MenuOpenSharpIcon from "@mui/icons-material/MenuOpenSharp";
import RoofingSharpIcon from "@mui/icons-material/RoofingSharp";
import { AccountCircle } from "@mui/icons-material";

import { useUserContext } from "../../context/user-context";

const Navbar = () => {
  const { isDrawerOpen, toggleDrawer, drawerWidth } = useUIContext();

  const { isAuth } = useUserContext();

  return (
    <StyledNavbar
      position="fixed"
      open={isDrawerOpen}
      drawerwidth={drawerWidth}
    >
      <Toolbar disableGutters sx={{ mt: 1, mb: 1, pl: 2, pr: 2 }}>
        {isAuth && (
          <IconButton
            onClick={toggleDrawer}
            edge="start"
            aria-label="open drawer"
            sx={{
              marginRight: "36px",
              color: "primary.common",
              transform: "rotate(180deg)",
              ...(isDrawerOpen && { display: "none" }),
            }}
          >
            <MenuOpenSharpIcon />
          </IconButton>
        )}

        <IconButton
          component={Link}
          to={"/home"}
          sx={{
            // bgcolor: "darkBlue.light",
            mr: 1,

            backgroundImage: "linear-gradient(to left top, #040607, #16190b)",
          }}
        >
          <RoofingSharpIcon fontSize="large" color="secondary" sx={{}} />
        </IconButton>
        <Typography
          flexGrow={1}
          variant="h3"
          noWrap
          fontFamily="'Kenia', cursive"
          sx={{
            mr: 2,
            fontWeight: 700,
            letterSpacing: ".4rem",
            color: "secondary.main",
            textDecoration: "none",
          }}
        >
          My Houses
        </Typography>
        {isAuth ? <AuthNavbarBox /> : null}
      </Toolbar>
    </StyledNavbar>
  );
};

export default Navbar;
