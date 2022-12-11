import React, { useState } from "react";
import {
  FormControl,
  InputBase,
  styled,
  Typography,
  Select,
  MenuItem,
  Box,
} from "@mui/material";

import { useExpanseContext } from "../../context/expanse-context";
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.darkBlue.common,
    border: "1px solid #ced4da",
    fontSize: 18,
    padding: "7px 20px 2px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    color: theme.palette.primary.common,

    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

const ExpanseHeaderContent = () => {
  const [numberOfExpanses, setNumberOfExpanses] = useState(5);
  const { handleGetExpanses } = useExpanseContext();

  const handleChange = (e) => {
    setNumberOfExpanses(e.target.value);
    handleGetExpanses(e.target.value);
  };

  return (
    <Box display="flex" alignItems="baseline" gap={1} sx={{}}>
      <Typography variant="body1" sx={{ color: "primary.dark" }}>
        Show:
      </Typography>
      <FormControl variant="standard">
        <Select
          value={numberOfExpanses}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={0}>All</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default ExpanseHeaderContent;
