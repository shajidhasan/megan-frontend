const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const nesting = require("postcss-nesting")

const config = {
  plugins: {
    'tailwindcss/nesting': nesting,
    tailwindcss,
    autoprefixer,
  },
};

module.exports = config;

