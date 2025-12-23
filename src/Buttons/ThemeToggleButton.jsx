// src/components/ThemeToggleButton.jsx
import { useState, useEffect } from "react";
import { toggleTheme } from "../utilities/ThemeToggle";

const ThemeToggleButton = ({ className = "" }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setTheme(toggleTheme()); // set initial theme
  }, []);

  const handleToggle = () => {
    const newTheme = toggleTheme();
    setTheme(newTheme);
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-black hover:opacity-90 transition ${className}`}
    >
      {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default ThemeToggleButton;
