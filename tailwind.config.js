const colors = require('tailwindcss/colors');
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-alegreya)', ...fontFamily.serif],
        sans: ['var(--font-montserrat)', ...fontFamily.sans],
      },
      colors: {
        // text colors
        blackText: colors.neutral[900],
        whiteText: colors.gray[100],
        violetText: colors.violet[600],
        violetTextLight: colors.violet[400],
        // bg colors
        lightVioletBg: colors.violet[100],
        darkVioletBg: colors.violet[200],
        lightNeutralBg: colors.neutral[800],
        darkNeutralBg: colors.neutral[900],
        // hover colors
        violetHover: colors.violet[300],
        violetHoverDark: colors.violet[600],
        neutralHover: colors.neutral[700],
        // primary colors
        primary: colors.violet[500],
        primaryHover: colors.violet[600],
        primaryDark: colors.violet[700],
      },
    },
  },
  plugins: [],
};
