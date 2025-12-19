import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isTokenValid } from './../utils/isTokenValid.util';

interface RedirectIfAuthenticatedProps {
  children: ReactNode;
  redirectTo?: string;
}

const RedirectIfAuthenticated = ({ 
  children, 
  redirectTo = "/dashboard" 
}: RedirectIfAuthenticatedProps) => {
  const token = localStorage.getItem("token");

  if (token && isTokenValid(token)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default RedirectIfAuthenticated;
