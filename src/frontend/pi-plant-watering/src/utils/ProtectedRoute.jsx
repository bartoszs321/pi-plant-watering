import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "./auth-context";

const ProtectedRoute = () => {
  const [auth] = useContext(AuthContext);

  if (!auth.user.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
