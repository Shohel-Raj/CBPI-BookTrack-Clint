import React, { useState, useEffect } from "react";
import { FiMoon, FiSunset } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../Context/useAuth";
import ThemeToggleButton from "../../Buttons/ThemeToggleButton";
import MainLogo from "./MainLogo";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { loading, user, signOutUser } = useAuth();
  const navigate = useNavigate();
  // const user="a";
  // const loading=false;

  // Apply theme
useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);


  const handleLogout = async () => {
    try {
      await signOutUser();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const activeStyle =
    "font-semibold text-primary relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-primary after:rounded-full";

  const menuItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? activeStyle : "hover:text-primary transition"
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/all-books"
          className={({ isActive }) =>
            isActive ? activeStyle : "hover:text-primary transition"
          }
        >
          All Books
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/community-hub"
          className={({ isActive }) =>
            isActive ? activeStyle : "hover:text-primary transition"
          }
        >
          Community Hub
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            isActive ? activeStyle : "hover:text-primary transition"
          }
        >
          About Us
        </NavLink>
      </li>

      

    </>
  );
  // if (loading) {
  //   return <LoaderSpainer />;
  // }

  return (
    <div className="relative">
      <div className="navbar  pl-0">
        {/* LEFT — LOGO */}
        <NavLink to="/" className="navbar-start  text-2xl font-bold pl-0">
          <MainLogo/>
        </NavLink>

        {/* MOBILE MENU BUTTON */}
        <div className="navbar-end lg:hidden flex items-center gap-2">
          <motion.button
            onClick={() => setOpen(true)}
            whileTap={{ scale: 0.9 }}
            className="btn btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </motion.button>
        </div>

        {/* DESKTOP MENU */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-[16px] font-medium gap-3">
            {menuItems}
          </ul>
        </div>

        {/* DESKTOP — Theme + Login/User */}
        <div className="navbar-end hidden lg:flex gap-3 items-center">
         <ThemeToggleButton/>
          {/* Conditional Login/Signup or User Dropdown */}
          {!loading && !user && (
            <>
              <NavLink to="/auth/login" className="btn btn-outline">
                Login
              </NavLink>
              <NavLink to="/auth/register" className="btn btn-primary">
                Signup
              </NavLink>
            </>
          )}

          {!loading && user && (
            
            <div className="dropdown dropdown-end">

              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={user?.photoURL || "/default-avatar.png"}
                    alt="User Avatar"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <span className="font-semibold">
                    {user.displayName || "User"}
                  </span>
                </li>
               
                <li>
                  <NavLink to="/dashboard/profile" className="hover:text-primary">
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard" className="hover:text-primary">
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="hover:text-red-500 text-left w-full"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE SLIDE MENU */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black z-50"
            ></motion.div>

            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className="fixed top-0 right-0 h-full w-1/2 bg-base-100 shadow-lg z-100"
            >
              <div className="p-4 flex justify-end">
                <motion.button
                  onClick={() => setOpen(false)}
                  whileTap={{ scale: 0.8 }}
                  className="btn btn-ghost"
                >
                  ✕
                </motion.button>
              </div>

              <ul className="menu p-4 text-lg font-medium">{menuItems}</ul>
              {!loading && !user && (
                <>
                  {" "}
                  <div className="flex flex-col gap-3 w-10/12 mx-auto mt-10">
                    <NavLink to="/auth/login" className="btn btn-outline">
                      Login
                    </NavLink>
                    <NavLink to="/auth/register" className="btn btn-primary">
                      Signup
                    </NavLink>
                  </div>
                </>
              )}
              {user && (
                <>
                  <div className="flex flex-col gap-3 w-10/12 mx-auto mt-10">
                    <button
                      onClick={handleLogout}
                      className="hover:text-red-500 text-left w-full btn btn-primary"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
              {/* Mobile Theme Toggle */}
              <div className="px-4 mt-4">
                <ThemeToggleButton/>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
