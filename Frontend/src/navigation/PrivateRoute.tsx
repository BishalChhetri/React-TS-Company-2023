import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";

const PrivateRoute = () => {
  const auth = useAppSelector((state) => state.user.isLoggedIn);
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
