const plugin = require("tailwindcss/plugin");

const utilities = plugin(function ({ addUtilities }) {
  addUtilities({
    ".backface-hidden": {
      "backface-visibility": "hidden",
      "-moz-backface-visibility": "hidden",
      "-webkit-backface-visibility": "hidden",
      "-ms-backface-visibility": "hidden",
    },
    ".translateZ-0": {
      "-webkit-transform": "translateZ(0)",
    },
  });
});

module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  screens: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
  plugins: [
    utilities,
    require('@tailwindcss/forms'),
  ],
};
