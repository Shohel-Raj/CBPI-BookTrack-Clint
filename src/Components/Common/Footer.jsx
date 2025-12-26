import React from "react";
import { NavLink } from "react-router";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import MainLogo from "./MainLogo";

const Footer = () => {
  const activeStyle = "text-primary font-semibold";

  return (
    <footer className="bg-base-200 text-base-content pt-10 pb-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <MainLogo />
            <p className="text-sm mt-2">
              Your gateway to knowledge. Explore books, connect with the community, and grow every day!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
            <ul className="space-y-2">
              {["Home", "All Books", "Community Hub", "About Us"].map((link) => (
                <li key={link}>
                  <NavLink
                    to={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                    className={({ isActive }) =>
                      isActive
                        ? activeStyle
                        : "hover:text-primary transition-colors duration-200"
                    }
                  >
                    {link}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Resources</h2>
            <ul className="space-y-2">
              {["Contact", "Privacy Policy", "Terms of Service"].map((link) => (
                <li key={link}>
                  <NavLink
                    to={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                    className={({ isActive }) =>
                      isActive
                        ? activeStyle
                        : "hover:text-primary transition-colors duration-200"
                    }
                  >
                    {link}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Follow Us</h2>
            <div className="flex gap-3">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-300 hover:bg-primary hover:text-white transition-colors duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-gray-300 pt-6 text-center text-sm text-gray-600 transition-colors duration-300">
          © {new Date().getFullYear()} All rights reserved by CBPI.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
