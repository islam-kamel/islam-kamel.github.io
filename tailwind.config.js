import { heroui } from "@heroui/theme";

/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F34F29", // Main Primary Color
          50: "#ffeae5",
          100: "#ffcec5",
          200: "#ffac96",
          300: "#f97d61",
          400: "#f34f29",
          500: "#d94724",
          600: "#b2361e",
          700: "#8c2918",
          800: "#662313",
          900: "#4c1a0f",
        },
        warning: {
          DEFAULT: "#F3B700",
          50: "#fff8e6",
          100: "#ffebba",
          200: "#fddb7a",
          300: "#fcca3a",
          400: "#f3b700",
          500: "#c99300",
          600: "#a07200",
          700: "#775300",
          800: "#503600",
          900: "#3a2800",
        },
        muted: {
          DEFAULT: "#77878B",
          50: "#f0f2f3",
          100: "#d6dcde",
          200: "#aeb6ba",
          300: "#8e989c",
          400: "#77878B",
          500: "#5f6d72",
          600: "#475255",
          700: "#333c3e",
          800: "#212828",
          900: "#151919",
        },
        linkedin: "#0077B5",
        black: "#000000",
        white: "#FFFFFF",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        logo: ["var(--font-logo)"],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui({ prefix: "ik" })],
};
