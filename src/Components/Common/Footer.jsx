import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content dark:bg-gray-900 dark:text-gray-200 pt-10 pb-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section: Logo + Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & description */}
          <div>
            <h1 className="text-2xl font-bold mb-3">LessonLab</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Empowering you to learn from real-life lessons. Save, share, and
              grow every day!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-primary transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/lessons" className="hover:text-primary transition">
                  Lessons
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-primary transition">
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/upgrade-plan"
                  className="hover:text-primary transition"
                >
                  Upgrade Plan
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Resources</h2>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="hover:text-primary transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-primary transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-primary transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-primary transition">
                  Terms of Service
                </a>
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

        {/* Bottom section */}
        <div className="mt-10 border-t border-gray-300 dark:border-gray-700 pt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} LessonLab. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
