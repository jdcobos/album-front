import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isTokenValid } from './../utils/isTokenValid.util';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");

  if (!token || !isTokenValid(token)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>; // fragment para envolver los children
};

export default ProtectedRoute;
