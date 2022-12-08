import React, { useEffect } from "react";
import { useNavigate, Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthContext } from "../context/auth-context";

const AuthWrapper = ({ children }) => {
  const { isAuth, user } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

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

  if (!user || user?.token === undefined) {
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
