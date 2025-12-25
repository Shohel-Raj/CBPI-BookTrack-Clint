import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { toast } from "react-toastify";
import LoaderSpainer from "../../Components/Loader/LoaderSpainer";
import { useAuth } from "../../Context/useAuth";
import { UserUtils } from "../../utilities/UserUtils";

const DashboardHome = () => {
  const { user } = useAuth();
  const [loggedUser, setLoggedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const token = await user.getIdToken();
        const data = await UserUtils.getCurrentUser(token);
        setLoggedUser(data);
      } catch (err) {
        toast.error("Error fetching logged user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  if (loading || !loggedUser) {
    return <LoaderSpainer />;
  }

  if (!user) {
    return <Navigate to="/register" replace />;
  }

  // Admin redirect
  if (loggedUser?.role === "admin") {
    return <Navigate to="/dashboard/admin" replace />;
  }

  // Teacher logic with status check
  if (loggedUser?.role?.toLowerCase() === "teacher") {
    if (loggedUser?.status === "active") {
      return <Navigate to="/dashboard/teacher" replace />;
    }

    // pending teacher goes to student dashboard
    return <Navigate to="/dashboard/member" replace />;
  }

  // Default student
  return <Navigate to="/dashboard/member" replace />;
};

export default DashboardHome;
