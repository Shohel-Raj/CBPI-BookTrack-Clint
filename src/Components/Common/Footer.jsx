import React from "react";
import { NavLink } from "react-router";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import MainLogo from "./MainLogo";

const Footer = () => {
  const activeStyle = "text-primary font-semibold";

  const quickLinks = [
    { name: "Home", route: "/" },
    { name: "All Books", route: "/all-books" },
    { name: "About Us", route: "/about-us" },
  ];

  const resources = [
    { name: "Contact", route: "/contuct-us" },
    // { name: "Privacy Policy", route: "/privacy-policy" },
    // { name: "Terms of Service", route: "/terms-of-service" },
  ];

  const socialLinks = [
    { icon: FaFacebookF, url: "https://www.facebook.com/", label: "Facebook" },
    { icon: FaTwitter, url: "https://twitter.com/", label: "Twitter" },
    { icon: FaInstagram, url: "https://www.instagram.com/", label: "Instagram" },
    { icon: FaLinkedinIn, url: "https://www.linkedin.com/", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-base-200 text-base-content pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div className="space-y-4">
            <MainLogo />
            <p className="text-base-content/80 text-sm leading-relaxed">
              Your gateway to knowledge. Explore thousands of books, connect with readers, and grow every day!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-5 text-base-content">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(({ name, route }) => (
                <li key={name}>
                  <NavLink
                    to={route}
                    className={({ isActive }) =>
                      `block text-base-content/70 hover:text-primary transition-colors duration-200 font-medium ${
                        isActive ? "text-primary font-semibold" : ""
                      }`
                    }
                  >
                    {name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-5 text-base-content">Resources</h3>
            <ul className="space-y-3">
              {resources.map(({ name, route }) => (
                <li key={name}>
                  <NavLink
                    to={route}
                    className={({ isActive }) =>
                      `block text-base-content/70 hover:text-primary transition-colors duration-200 font-medium ${
                        isActive ? "text-primary font-semibold" : ""
                      }`
                    }
                  >
                    {name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-5 text-base-content">Follow Us</h3>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${label}`}
                  className="p-3 rounded-lg bg-base-300 hover:bg-primary hover:text-primary-content transition-all duration-300 transform hover:scale-110 shadow-sm"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="mt-12 pt-8 border-t border-base-300">
          <p className="text-center text-base-content/60 text-sm">
            © {new Date().getFullYear()} CBPI Library. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;