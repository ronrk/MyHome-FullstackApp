import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useAuthContext } from "../context/auth-context";

import { useUserContext } from "../context/user-context";

const AuthWrapper = ({ children }) => {
  const { user, getCurrentUser, isAuth, userLoading } = useUserContext();
  const { authLoading } = useAuthContext();
  const location = useLocation();

  // TODO-GET USER LOCATION
  //   let location = useLocation();

  // CHECK FOR USER!

  //   if (!auth.user) {
  // Redirect them to the /login page, but save the current location they were
  // trying to go to when they were redirected. This allows us to send them
  // along to that page after they login, which is a nicer user experience
  // than dropping them off on the home page.
  // return <Navigate to="/login" state={{ from: location }} replace />;
  //   }

  const getUser = async () => {
    await getCurrentUser();
  };

  useEffect(() => {
    console.log("AUTHWRAPPER");
    if (!isAuth) {
      getUser();
    }
  }, []);

  if (!isAuth) {
    console.log({ el: "AUTHWRAPPER", auth: "USER IS NOT EXIST", user });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  console.log({ el: "AUTHWRAPPER", auth: "USER IS  EXIST", user });
  return (
    <>
      <Outlet />
      {/* {children} */}
    </>
  );
};

export default AuthWrapper;
