import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { isAuthenticated } from "../api/authenticationApi";

const PrivateRoute = () => {
  const auth = isAuthenticated();
  return auth ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;
