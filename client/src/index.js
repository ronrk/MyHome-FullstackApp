import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { theme } from "./theme";

import App from "./App";
import "./index.css";

import AuthContextProvider from "./context/auth-context";
import UIContextProvider from "./context/ui-context";
import TaskContextProvider from "./context/task-context";
import ExpanseContextProvider from "./context/expanse-context";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";

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
