import React from "react";
import Layout from "./pages/Layout";
import { Routes, Route } from "react-router-dom";

import {
  LoginPage,
  AuthWrapper,
  Dashboard,
  UserPage,
  TasksPage,
  CreateTaskPage,
  CreateNewExpansePage,
  ExpansePage,
} from "./pages";

import TestMui from "./pages/TestMui";

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <AuthWrapper>
                <Dashboard />
              </AuthWrapper>
            }
          />
          <Route
            path="/user"
            element={
              <AuthWrapper>
                <UserPage />
              </AuthWrapper>
            }
          />
          <Route path="/tasks" element={<AuthWrapper />}>
            <Route
              index
              element={
                <AuthWrapper>
                  <TasksPage />
                </AuthWrapper>
              }
            />
            <Route path="create-new" element={<CreateTaskPage />} />
            <Route path=":taskId" element={<div>Single task</div>} />
          </Route>
          <Route path="/expanses" element={<AuthWrapper />}>
            <Route
              index
              element={
                <AuthWrapper>
                  <ExpansePage />
                </AuthWrapper>
              }
            />
            <Route path="create-new" element={<CreateNewExpansePage />} />
          </Route>
        </Route>
      </Routes>
      {/* <LoginPage /> */}
      {/* <TestMui /> */}
    </div>
  );
};

export default App;
