import React from "react";
import { NavLink } from "react-router";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import MainLogo from "./MainLogo";

const Footer = () => {
  const activeStyle = "text-primary font-semibold";

  return (
    <footer className="bg-base-200 text-base-content dark:bg-gray-900 dark:text-gray-200 pt-10 pb-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Logo + Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <MainLogo/>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your gateway to knowledge. Explore books, connect with the community, and grow every day!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className={({ isActive }) => isActive ? activeStyle : "hover:text-primary transition"}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/all-books" className={({ isActive }) => isActive ? activeStyle : "hover:text-primary transition"}>
                  All Books
                </NavLink>
              </li>
              <li>
                <NavLink to="/community-hub" className={({ isActive }) => isActive ? activeStyle : "hover:text-primary transition"}>
                  Community Hub
                </NavLink>
              </li>
              <li>
                <NavLink to="/about-us" className={({ isActive }) => isActive ? activeStyle : "hover:text-primary transition"}>
                  About Us
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Resources</h2>
            <ul className="space-y-2">
              <li>
                <NavLink to="/contact" className={({ isActive }) => isActive ? activeStyle : "hover:text-primary transition"}>
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/privacy" className={({ isActive }) => isActive ? activeStyle : "hover:text-primary transition"}>
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink to="/terms" className={({ isActive }) => isActive ? activeStyle : "hover:text-primary transition"}>
                  Terms of Service
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Follow Us</h2>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-primary hover:text-white transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-primary hover:text-white transition"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-primary hover:text-white transition"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-primary hover:text-white transition"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-gray-300 dark:border-gray-700 pt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} All rights reserved by CBPI.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
