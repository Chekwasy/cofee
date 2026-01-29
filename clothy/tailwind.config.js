/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#FFFFFF",
          dark: "#000000",
          silver: '#D1D5DB',
          onboardGrayDark: '#464447',
          onboardGrayLight: '#E7E8E9',
        },
      },
      fontFamily: {
        dm: ["DMSans-Regular"],
        "dm-medium": ["DMSans-Medium"],
        "dm-semibold": ["DMSans-SemiBold"],
        "dm-bold": ["DMSans-Bold"],
      },
    },
  },
  plugins: [],
}