import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    allVariants: {
      color: "#040607",
    },
  },
  palette: {
    primary: {
      main: "#2a3e44",
      dark: "#223236",
      light: "#6a787c",
      common: "#040607",
      withOpacity: "rgba(42, 62, 68,.4)",
      darkWithOpacity: "rgba(34, 50, 54,.2)",
    },
    secondary: {
      main: "#54f2b0",
      common: "#081812",
      dark: "#43c28d",
      light: "#87f6c8",
    },
    yellowGreen: {
      main: "#e0ff6e",
      dark: "#b3cc58",
      light: "#e9ff9a",
      common: "#16190b",
      withOpacity: "rgba(224, 255, 110,.9)",
    },
    purple: {
      main: "#dc58fd",
      dark: "#b046ca",
      light: "#e78afe",
    },
    darkBlue: {
      main: "#25238B",
      dark: "#0c0a78",
      light: "#ABAAE6",
      widhOpacity: "rgba(67.1, 66.7, 90.2,.3)",
    },
    error: {
      main: "#F51720",
    },
  },
});
