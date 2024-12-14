import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { auth } = useAuth();

  if (!auth) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
