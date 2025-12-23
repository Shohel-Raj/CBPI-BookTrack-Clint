// src/hooks/useTheme.js
import { useEffect, useState } from "react";
import { getTheme, setTheme, toggleTheme } from "./ThemeToggle";

const useTheme = () => {
  const [theme, setThemeState] = useState(getTheme());

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  return {
    theme,
    setTheme: setThemeState,
    toggleTheme: () => setThemeState(toggleTheme()),
  };
};

export default useTheme;
