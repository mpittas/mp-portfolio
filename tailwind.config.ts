import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./posts/**/*.{md,mdx}",
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
        xl: "960px",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
export default config;
