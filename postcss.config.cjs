const autoprefixer = require("autoprefixer");

const config = {
  plugins: [autoprefixer, require("tailwindcss")],
};

module.exports = config;
