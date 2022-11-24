const colors = require('tailwindcss/colors');
const { fontFamily } = require('tailwindcss/defaultTheme');

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
      fontFamily: {
        serif: ['var(--font-alegreya)', ...fontFamily.serif],
        sans: ['var(--font-montserrat)', ...fontFamily.sans],
      },
      colors: {
        blackText: colors.neutral[900],
        whiteText: colors.gray[100],
        lightVioletBg: colors.violet[100],
        darkVioletBg: colors.violet[200],
        violetHover: colors.violet[300],
        neutralHover: colors.neutral[700],
        lightNeutralBg: colors.neutral[800],
        darkNeutralBg: colors.neutral[900],
      },
    },
  },
  plugins: [],
};
