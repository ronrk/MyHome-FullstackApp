import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, Route, BrowserRouter } from "react-router-dom";

import App from "./App";
import TestMui from "./pages/TestMui";

import AuthContextProvider from "./context/auth-context";
import UIContextProvider from "./context/ui-context";
import TaskContextProvider from "./context/task-context";
import ExpanseContextProvider from "./context/expanse-context";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
} from "@mui/material";

const theme = createTheme({
  typography: {
    allVariants: {
      color: "#292732",
    },
  },
  palette: {
    primary: {
      main: "#7A4269",
      dark: "#855677",
      light: "#C086AF",
      common: "#913475",
      withOpacity: "hsla(318, 32%, 64%,.9)",
      darkWithOpacity: "hsla(318, 21%, 43%,.3)",
    },
    secondary: {
      main: "#C24400",
      common: "#883000",
      dark: "#A73A00",
      light: "#E57F48",
    },
    tertiary: {
      main: "#363343",
      dark: "#312E3C",
      light: "#373346",
      common: "#292732",
      withOpacity: "hsla(253, 16%, 24%,.1)",
    },
  },
});

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(
  <UIContextProvider>
    <AuthContextProvider>
      <BrowserRouter>
        <TaskContextProvider>
          <ExpanseContextProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {/* <TestMui /> */}

              <App />
            </ThemeProvider>
          </ExpanseContextProvider>
        </TaskContextProvider>
      </BrowserRouter>
    </AuthContextProvider>
  </UIContextProvider>
);
