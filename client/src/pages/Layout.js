import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Box, Toolbar, Grid, Container } from "@mui/material";
import { Navbar, Sidebar } from "../components";

const Layout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Sidebar />

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.primary.darkWithOpacity
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Outlet />
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
