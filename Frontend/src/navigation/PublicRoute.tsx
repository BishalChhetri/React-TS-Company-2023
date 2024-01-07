import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";

interface PublicProps {
  component: React.ComponentType<any>;
}

const PublicRoute: React.FC<PublicProps> = ({ component: Component }) => {
  const auth = useAppSelector((state) => state.user.isLoggedIn);
  return !auth ? <Component /> : <Navigate to="/app" />;
};

export default PublicRoute;
