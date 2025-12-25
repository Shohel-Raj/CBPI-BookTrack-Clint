import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import {
  FiMenu,
  FiX,
  FiHome,
  FiUser,
  FiBook,
  FiStar,
  FiMoon,
  FiSun,
} from "react-icons/fi";
import { BiBookAdd } from "react-icons/bi";

import { motion } from "framer-motion";
import { useAuth } from "../Context/useAuth";
import LoaderSpainer from "../Components/Loader/LoaderSpainer";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { UserUtils } from "../utilities/UserUtils";
import ThemeToggleButton from "../Buttons/ThemeToggleButton";

const DashboardLayout = () => {
  const { loading, user } = useAuth();
  const [loggedUser, setLoggedUser] = useState(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  const dashboardHomePath =
    loggedUser?.role === "admin"
      ? "/dashboard/admin"
      : loggedUser?.role === "teacher"
      ? "/dashboard/teacher"
      : "/dashboard/member";

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchUser = async () => {
      const token = await user.getIdToken();
      const data = await UserUtils.getCurrentUser(token);
      setLoggedUser(data);
    };
    fetchUser();
  }, [user]);

  if (loading) return <LoaderSpainer />;

  return (
    <div className="min-h-screen flex bg-base-200">
      {/* MOBILE OVERLAY */}
      {isMobile && mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          bg-base-100 shadow-md border-r border-base-300 w-65
          ${
            isMobile
              ? "fixed z-50 h-full transition-transform duration-300"
              : "relative"
          }
          ${isMobile && !mobileOpen ? "-translate-x-full" : "translate-x-0"}
        `}
      >
        <div className="py-6 px-3">
          {/* LOGO */}
          <div className="text-xl font-bold mb-6 flex items-center gap-2">
            {isMobile && (
              <button
                onClick={() => setMobileOpen(false)}
                className="bg-primary text-white p-2 rounded-full"
              >
                <FiX size={18} />
              </button>
            )}
            <h1>CBPI BOOKTRACK</h1>
          </div>

          {/* MENU */}
          <nav className="flex flex-col gap-3">
            {/* Home link for all roles */}
            <SidebarLink
              to={dashboardHomePath}
              icon={<FiHome />}
              label="Home"
              isMobile={isMobile}
              setMobileOpen={setMobileOpen}
              isActive={
                location.pathname === "/dashboard/member" ||
                location.pathname === "/dashboard/teacher" ||
                location.pathname === "/dashboard/admin"
              }
            />

            {/* Profile - all roles */}
            <SidebarLink
              to="/dashboard/profile"
              icon={<FiUser />}
              label="My Profile"
              isMobile={isMobile}
              setMobileOpen={setMobileOpen}
            />

            {/* Student Links */}
            {loggedUser?.role === "student" && (
              <>
                <SidebarLink
                  to="/dashboard/my-books"
                  icon={<FiBook />}
                  label="My Borrowed Books"
                  isMobile={isMobile}
                  setMobileOpen={setMobileOpen}
                />
                <SidebarLink
                  to="/dashboard/favorites"
                  icon={<FiStar />}
                  label="My Favorites"
                  isMobile={isMobile}
                  setMobileOpen={setMobileOpen}
                />
              </>
            )}

            {/* Teacher Links */}
            {loggedUser?.role === "teacher" && (
              <>
                <SidebarLink
                  to="/dashboard/my-books"
                  icon={<FiBook />}
                  label="My Books"
                  isMobile={isMobile}
                  setMobileOpen={setMobileOpen}
                />
              </>
            )}

            {/* Admin Links */}
            {loggedUser?.role === "admin" && (
              <>
                <SidebarLink
                  to="/dashboard/admin/manage-users"
                  icon={<FiUser />}
                  label="Manage Users"
                  isMobile={isMobile}
                  setMobileOpen={setMobileOpen}
                />
                <SidebarLink
                  to="/dashboard/admin/manage-books"
                  icon={<FiBook />}
                  label="Manage Books"
                  isMobile={isMobile}
                  setMobileOpen={setMobileOpen}
                />
                <SidebarLink
                  to="/dashboard/admin/reported-books"
                  icon={<FiStar />}
                  label="Reported Books"
                  isMobile={isMobile}
                  setMobileOpen={setMobileOpen}
                />
                <SidebarLink
                  to="/dashboard/admin/add-books"
                  icon={<BiBookAdd />}
                  label="Add Books"
                  isMobile={isMobile}
                  setMobileOpen={setMobileOpen}
                />
              </>
            )}

            <div className="border-t border-base-300 mt-6" />
            <SidebarLink
              to="/"
              icon={<FaArrowLeft />}
              label="Go Home"
              isMobile={isMobile}
              setMobileOpen={setMobileOpen}
            />
          </nav>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">
        {/* TOP NAV */}
        <div className="navbar bg-base-100 shadow-sm px-6">
          <div className="flex-1 flex items-center gap-2">
            {isMobile && (
              <button
                onClick={() => setMobileOpen(true)}
                className="btn btn-ghost btn-sm"
              >
                <FiMenu size={22} />
              </button>
            )}
            <p className="text-lg font-semibold">Dashboard</p>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-end ml-5 gap-4">
              <ThemeToggleButton />
              <div className="avatar">
                <div className="w-10 rounded-full border">
                  <img src={user?.photoURL} alt="user" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="p-6">
          <Outlet />
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};

export default DashboardLayout;

/* =============================
   SIDEBAR LINK
============================= */
const SidebarLink = ({
  to,
  icon,
  label,
  end = false,
  isMobile,
  setMobileOpen,
  isActive,
}) => (
  <NavLink
    to={to}
    end={end}
    onClick={() => isMobile && setMobileOpen(false)}
    className={({ isActive: navActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-lg transition
      ${
        isActive ?? navActive
          ? "bg-primary/20 text-primary font-semibold"
          : "hover:bg-base-300"
      }`
    }
  >
    <span className="text-xl">{icon}</span>
    <span>{label}</span>
  </NavLink>
);
