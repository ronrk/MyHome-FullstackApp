import React from "react";
import { Box, CircularProgress } from "@mui/material";

const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: 400,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress
        size="20%"
        sx={{ maxWidth: 100, color: "purple.dark" }}
      />
    </Box>
  );
};

export default LoadingSpinner;
