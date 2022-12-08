import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Box, Toolbar, Grid, Container } from "@mui/material";
import { Navbar, Sidebar } from "../components";

import { useAuthContext } from "../context/auth-context";

const Layout = () => {
  const { user } = useAuthContext();
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          overflow: "auto",
          bgcolor: "primary.darkWithOpacity",
        }}
      >
        <Toolbar sx={{ m: 1 }} />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
