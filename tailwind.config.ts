import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#0A0A0A",
        red: "#B00000",
        white: "#F1F1F1",
        grey: "#6A6A6A",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
      },
      letterSpacing: {
        wide: "0.2em",
      },
    },
  },
  plugins: [],
};

export default config;
