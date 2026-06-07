/** @type {import('tailwindcss').Config} */
module.exports = {
  // TODO double check this
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}

