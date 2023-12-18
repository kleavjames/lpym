import { Navigate, useLocation } from "react-router-dom";
// import { useAuthState } from "react-firebase-hooks/auth";
// import {auth} from '../firebase';
import React from "react";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // const [user] = useAuthState(auth);
  const user = undefined;
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};
