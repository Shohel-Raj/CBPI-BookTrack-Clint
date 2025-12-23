import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../Context/useAuth";
import LoaderSpainer from "../Components/Loader/LoaderSpainer";

const ProtectedRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoaderSpainer />;
  if (user) return children;            
  return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default ProtectedRoutes;
