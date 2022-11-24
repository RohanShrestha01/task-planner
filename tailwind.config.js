const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      colors: {
        blackText: colors.neutral[900],
        whiteText: colors.gray[100],
        lightVioletBg: colors.violet[100],
        darkVioletBg: colors.violet[200],
        violetHover: colors.violet[300],
        slateHover: colors.slate[600],
        lightSlateBg: colors.slate[700],
        darkSlateBg: colors.slate[800],
      },
    },
  },
  plugins: [],
};
