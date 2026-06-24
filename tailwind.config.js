/** @type {import('tailwindcss').Config} */
module.exports = {
  // TODO double check this
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        vividly: ['vividly'],
      },
    },
  },
  plugins: [],
}

