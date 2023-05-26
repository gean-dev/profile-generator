/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      screens: {
        xs: "448px",
      },
      fontFamily: {
        sans: [
          "Inconsolata Variable",
          "Inconsolata",
          ...defaultTheme.fontFamily.sans,
        ],
      },
      animation: {
        "fade-in": "fadeIn 2.5s linear",
      },
    },
  },
  plugins: [],
};
