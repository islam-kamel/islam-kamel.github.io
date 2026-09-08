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
        canvas: "#000000",
        primary: {
          DEFAULT: "#d94724", // Primary accent color
          hover: "#E55633",
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
        surface: {
          DEFAULT: "#0A0D14",
          resting: "#0A0D14",
          elevated: "#111622",
          hover: "#111622",
        },
        border: {
          DEFAULT: "#1A2234",
          resting: "#1A2234",
          hover: "#283550",
        },
        text: {
          DEFAULT: "#FFFFFF",
          heading: "#FFFFFF",
          body: "#8899A6",
          muted: "#8899A6",
        },
        heading: "#FFFFFF",
        body: "#8899A6",
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
          DEFAULT: "#8899A6",
          50: "#f0f2f3",
          100: "#d6dcde",
          200: "#aeb6ba",
          300: "#8e989c",
          400: "#77878B",
          500: "#8899A6",
          600: "#475255",
          700: "#333c3e",
          800: "#212828",
          900: "#151919",
        },
        linkedin: "#0077B5",
        black: "#000000",
        white: "#FFFFFF",
      },
      borderRadius: {
        "2xl": "1rem",
        full: "9999px",
        card: "1rem",
        container: "1rem",
        pill: "9999px",
        button: "9999px",
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
