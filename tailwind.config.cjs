/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        notehub: {
          dark: "#000000",
          light: "#ffffff",
          primary: "#49306B",
          secondary: "#635380",
          tertiary: "#CEBACF",
          highlightedLight: "#F3F4F6",
          highlightedDark: "#4B5563",
        },
      },
    },
  },
  plugins: [],
};
