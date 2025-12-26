import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import { FiMenu, FiX, FiHome, FiUser, FiBook, FiStar } from "react-icons/fi";
import { BiBookAdd } from "react-icons/bi";
import { useAuth } from "../Context/useAuth";
import LoaderSpainer from "../Components/Loader/LoaderSpainer";
import { FaArrowLeft } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { UserUtils } from "../utilities/UserUtils";
import ThemeToggleButton from "../Buttons/ThemeToggleButton";

const DashboardLayout = () => {
  const { loading, user } = useAuth();
  const [loggedUser, setLoggedUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const dashboardHomePath =
    loggedUser?.role === "admin"
      ? "/dashboard/admin"
      : loggedUser?.role === "teacher"
      ? "/dashboard/teacher"
      : "/dashboard/member";

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
    <div className="min-h-screen flex bg-base-200 relative">
      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`bg-base-100 shadow-md border-r border-base-300 w-64
        fixed  z-50 h-screen  top-0 left-0
        transform transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <div className="py-6 px-3 flex flex-col h-full">
          {/* LOGO */}
          <div className="text-xl font-bold mb-6 flex items-center justify-between">
            <h1>CBPI BOOKTRACK</h1>

            <button
              onClick={() => setMobileOpen(false)}
              className="bg-primary text-white p-2 rounded-full md:hidden"
            >
              <FiX size={18} />
            </button>
          </div>

          {/* MENU */}
          <nav className="flex flex-col gap-3 flex-1 overflow-y-auto">
            <SidebarLink
              to={dashboardHomePath}
              icon={<FiHome />}
              label="Home"
              setMobileOpen={setMobileOpen}
              isActive={
                location.pathname === "/dashboard/member" ||
                location.pathname === "/dashboard/teacher" ||
                location.pathname === "/dashboard/admin"
              }
            />

            <SidebarLink
              to="/dashboard/profile"
              icon={<FiUser />}
              label="My Profile"
              setMobileOpen={setMobileOpen}
            />

            {/* Student */}
            {loggedUser?.role === "student" && (
              <>
                <SidebarLink
                  to="/dashboard/manage-books"
                  icon={<FiBook />}
                  label="My Borrowed Books"
                  setMobileOpen={setMobileOpen}
                />
                <SidebarLink
                  to="/dashboard/favorites"
                  icon={<FiStar />}
                  label="My Favorites"
                  setMobileOpen={setMobileOpen}
                />
              </>
            )}

            {/* Teacher */}
            {loggedUser?.role === "teacher" && (
              <>
                {/* <SidebarLink
                  to="/dashboard/my-books"
                  icon={<FiBook />}
                  label="My Books"
                  setMobileOpen={setMobileOpen}
                /> */}

                <SidebarLink
                  to="/dashboard/manage-books"
                  icon={<FiBook />}
                  label="My Borrowed Books"
                  setMobileOpen={setMobileOpen}
                />
              </>
            )}

            {/* Admin */}
            {loggedUser?.role === "admin" && (
              <>
                <SidebarLink
                  to="/dashboard/admin/manage-users"
                  icon={<FiUser />}
                  label="Manage Users"
                  setMobileOpen={setMobileOpen}
                />
                <SidebarLink
                  to="/dashboard/admin/all-books"
                  icon={<FiBook />}
                  label="All Books"
                  setMobileOpen={setMobileOpen}
                />
                <SidebarLink
                  to="/dashboard/admin/manage-contuct-us"
                  icon={<FiBook />}
                  label="Manage Contuct"
                  setMobileOpen={setMobileOpen}
                />
                {/* <SidebarLink
                  to="/dashboard/admin/reported-books"
                  icon={<FiStar />}
                  label="Reported Books"
                  setMobileOpen={setMobileOpen}
                /> */}
                <SidebarLink
                  to="/dashboard/admin/add-books"
                  icon={<BiBookAdd />}
                  label="Add Books"
                  setMobileOpen={setMobileOpen}
                />
              </>
            )}

            <div className="border-t border-base-300 mt-5" />

            <SidebarLink
              to="/"
              icon={<FaArrowLeft />}
              label="Go Home"
              setMobileOpen={setMobileOpen}
            />
          </nav>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 md:ml-64 flex flex-col">
        {/* TOP NAV */}
        <div className="navbar bg-base-100 shadow-sm px-6">
          <div className="flex-1 flex items-center gap-2">
            <button
              onClick={() => setMobileOpen(true)}
              className="btn btn-ghost btn-sm md:hidden"
            >
              <FiMenu size={22} />
            </button>
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

        <main className="md:p-6 ">
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
  setMobileOpen,
  isActive,
}) => (
  <NavLink
    to={to}
    end={end}
    onClick={() => setMobileOpen(false)}
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
