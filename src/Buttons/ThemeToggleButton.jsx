// src/components/ThemeToggleButton.jsx
import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { toggleTheme } from "../utilities/ThemeToggle";

const ThemeToggleButton = ({ className = "" }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setTheme(toggleTheme()); // initialize theme
  }, []);

  const handleToggle = () => {
    const newTheme = toggleTheme();
    setTheme(newTheme);
  };

  return (
    <button
      onClick={handleToggle}
      className={`my-btn p-3 rounded-full flex items-center justify-center transition-colors duration-300 ${className}`}
    >
      <AnimatePresence exitBeforeEnter>
        {theme === "dark" ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FaSun className="w-5 h-5 text-yellow-400" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FaMoon className="w-5 h-5 text-gray-800" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggleButton;
