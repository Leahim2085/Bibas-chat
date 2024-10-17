const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    fontSize: {
      "phone-paragraph": ["2.5vw"],
      "tablet-paragraph": ["3vw"],
      "desktop-paragraph": ["4vw"],
      "phone-heading": ["3vw"],
      "tablet-heading": ["4vw"],
      "desktop-heading": ["5vw"],
      "phone-mega-heading": ["3.5vw"],
      "tablet-mega-heading": ["4vw"],
      "desktop-mega-heading": ["7vw"],
    },
    screens: {
      phone: '0px',
      tablet: '500px',
      desktop: '1000px',
    },
    fontFamily: {
      montserrat: ['Montserrat Alternates', 'sans-serif'],
      abeezee: ['ABeeZee', 'sans-serif'],
    },
  },
  variants: {
    extend: {
      fontSize: ['responsive'],
    },
  },
}
