import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import React from "react";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Carregando...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

export default PrivateRoute;