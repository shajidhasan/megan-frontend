const colors = require("tailwindcss/colors")
const defaultTheme = require("tailwindcss/defaultTheme")

const config = {
  content: ["./index.html", "./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        primary: colors.rose
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans]
      }
    },
  },

  plugins: [],
};

module.exports = config;
