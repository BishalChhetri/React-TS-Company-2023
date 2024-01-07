/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        neutralSilver: "#F5F7FA",
        neutralDGrey: "#4D4D4D",
        brandPrimary: "#ee4e6a",
        darkBrandPrimary: "#be3e54",
        neutralGrey: "#717171",
        gray900: "#18191F",
        neutralBlack: "#263238",
        navyBlue: "#0F52BA",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  exclude: ["node_modules"],
};
