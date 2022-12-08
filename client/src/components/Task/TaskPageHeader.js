import React from "react";
import { Box, Typography } from "@mui/material";

const TaskPageHeader = ({ tasks }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="baseline" gap={3}>
      <Typography
        variant="h2"
        component="h2"
        noWrap
        sx={{
          textTransform: "uppercase",
          letterSpacing: ".2rem",
          fontFamily: "'Zen Dots', cursive",
          fontWeight: 700,
          color: "darkBlue.light",
        }}
      >
        Your Tasks
      </Typography>
      <Typography
        variant="body2"
        component="legend"
        sx={{
          fontFamily: "'Zen Dots', cursive",
        }}
      >
        Found: {tasks.length}
      </Typography>
    </Box>
  );
};

export default TaskPageHeader;
