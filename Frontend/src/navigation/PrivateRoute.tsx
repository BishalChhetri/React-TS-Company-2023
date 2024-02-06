import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";

const PrivateRoute = () => {
  const auth = useAppSelector((state) => state.user.isLoggedIn);
  const location = useLocation();
  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
