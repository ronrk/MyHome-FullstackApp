import React, { useEffect } from "react";
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
  NotFoundPage,
  UserUpdatePage,
  WelcomePage,
  SearchNewUserPage,
  ChangePasswordPage,
} from "./pages";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<LoginPage />} />
          <Route element={<AuthWrapper />}>
            <Route path="/home" element={<Dashboard />} />

            <Route path="/home/tasks" element={<TasksPage />} />

            <Route path="/home/tasks/create-new" element={<CreateTaskPage />} />

            <Route path="/home/expanses" element={<ExpansePage />} />
            <Route
              path="/home/expanses/create-new"
              element={<CreateNewExpansePage />}
            />

            <Route path="/home/user" element={<UserPage />} />
            <Route
              path="/home/user/search-new"
              element={<SearchNewUserPage />}
            />
            <Route
              path="/home/user/password"
              element={<ChangePasswordPage />}
            />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
