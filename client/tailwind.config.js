const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    fontSize: {
      "phone-paragraph": ["20px"],
      "tablet-paragraph": ["25px"],
      "desktop-paragraph": ["30px"],
      "phone-heading": ["30px"],
      "tablet-heading": ["35px"],
      "desktop-heading": ["40px"],
      "phone-mega-heading": ["35px"],
      "tablet-mega-heading": ["40px"],
      "desktop-mega-heading": ["60px"],
    },
    screens: {
      phone: "0px",
      tablet: "500px",
      desktop: "1000px",
    },
    fontFamily: {
      montserrat: ["Montserrat Alternates", "sans-serif"],
      abeezee: ["ABeeZee", "sans-serif"],
    },
    colors: {
      primary: "#01050C",
      secondary: "#1F1D2D",
      thirdly: "#383552",
      accent: "#6C45BD",
      paragraph: "#F3F2F3",
    },
    borderRadius: {
      primary: "25px",
      full: "100%",
    },
  },
  variants: {
    extend: {
      fontSize: ["responsive"],
    },
  },
};
