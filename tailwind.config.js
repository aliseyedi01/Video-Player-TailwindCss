/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "main-light": "#fbc531",
        "main-dark": "#74b9ff",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true }), require("prettier-plugin-tailwindcss")],
};
