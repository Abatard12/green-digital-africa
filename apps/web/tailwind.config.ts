import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2F6B4F",
        secondary: "#645F88",
        ink: "#1D1B33",
        surface: "#F6F5FC",
        brand: "#2F6B4F",
        "surface-alt": "#EBEAF5",
      },
      fontFamily: {
        heading: ["var(--font-worksans)", "sans-serif"],
        body: ["var(--font-worksans)", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
