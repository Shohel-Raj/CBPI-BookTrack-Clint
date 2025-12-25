// src/Components/AdminRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import LoaderSpainer from "../Components/Loader/LoaderSpainer";
import { useAuth } from "../Context/useAuth";
import { UserUtils } from "../utilities/UserUtils";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  const [loggedUser, setLoggedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const token = await user.getIdToken();
        const data = await UserUtils.getCurrentUser(token);
        setLoggedUser(data);
      } catch (err) {
        console.error("AdminRoute error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  if (loading) return <LoaderSpainer />;

  if (!user || loggedUser?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
