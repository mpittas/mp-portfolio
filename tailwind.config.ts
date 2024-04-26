import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        spacemono: ["var(--font-spacemono)"],
        clashdisplay: ["var(--font-clashdisplay)"],
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
      },
      screens: {
        xl: "860px",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
export default config;
