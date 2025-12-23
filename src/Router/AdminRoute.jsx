// src/Components/AdminRoute.jsx
import React, { useEffect, useState } from "react";
// import { useAuth } from "../Context/useAuth";
// import { RoleUtils } from "../Utils/RoleUtils"; // adjust path if needed
// import LoaderSpainer from "./Loader/LoaderSpainer";
import { Navigate } from "react-router";
import { RoleUtils } from "../Utils/RoleUtils";
import LoaderSpainer from "../Components/Loader/LoaderSpainer";
import { useAuth } from "../Context/useAuth";
import axios from "axios";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(null);

  console.log(isAdmin)

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      const token = await user.getIdToken();
      const hasAdminRole = await axios.get(`${import.meta.env.VITE_API_URL}/users/role`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setIsAdmin(hasAdminRole);
      setLoading(false);
    };

    checkAdmin();
  }, [user]);

  if (loading) return <LoaderSpainer />;

  if (!isAdmin) {
    return (
      <div className="p-6 min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          You do not have permission to view this page.
        </p>
        <Navigate to="/dashboard" replace />
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminRoute;
