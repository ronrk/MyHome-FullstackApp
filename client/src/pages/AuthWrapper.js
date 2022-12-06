import React, { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

import { useAuthContext } from "../context/auth-context";

const AuthWrapper = ({ children }) => {
  const { user } = useAuthContext();
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

  useEffect(() => {
    if (!user?.token) {
      console.log("navigate from auth wraper");
      navigate("/login", { state: { from: location } });
    }
  }, [user]);

  return (
    <>
      <Outlet />
      {children}
    </>
  );
};

export default AuthWrapper;
