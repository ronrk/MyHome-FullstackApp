import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import { Navbar, Sidebar } from "../components";
import { useUserContext } from "../context/user-context";

const Layout = () => {
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
