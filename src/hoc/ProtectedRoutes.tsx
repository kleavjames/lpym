import { Navigate, useLocation } from "react-router-dom";
import React from "react";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};
