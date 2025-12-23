// tailwind.config.js
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        bg: "rgb(var(--color-bg) / <alpha-value>)",
        text: "rgb(var(--color-text) / <alpha-value>)",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: "oklch(74.75% 0.139 226.06)",
          secondary: "oklch(74.88% 0.186 338.41)",
          accent: "oklch(66.11% 0.198 24.35)",
          neutral: "oklch(97.39% 0.015 222.68)",
          "base-100": "oklch(97.39% 0.015 222.68)",
          info: "oklch(14.88% 0.025 225.6)",
        },
      },
      {
        dark: {
          primary: "oklch(71.85% 0.137 227.03)",
          secondary: "oklch(41.86% 0.173 343.45)",
          accent: "oklch(47.34% 0.189 28.61)",
          neutral: "oklch(15.23% 0.025 220.26)",
          "base-100": "oklch(15.23% 0.025 220.26)",
          info: "oklch(97.19% 0.015 228.96)",
        },
      },
    ],
  },
};
