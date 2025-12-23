// src/utils/themeUtils.js

const THEME_KEY = "theme";

/**
 * Get saved theme from localStorage
 */
export const getTheme = () => {
  if (typeof window === "undefined") return "light";
  return localStorage.getItem(THEME_KEY) || "light";
};

/**
 * Apply theme to <html>
 */
export const applyTheme = (theme) => {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
};

/**
 * Set theme (save + apply)
 */
export const setTheme = (theme) => {
  localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
};

/**
 * Toggle theme
 */
export const toggleTheme = () => {
  const currentTheme = getTheme();
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
  return newTheme;
};
