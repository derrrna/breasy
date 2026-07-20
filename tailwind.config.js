/** @type {import('tailwindcss').Config} */
module.exports = {
  // TODO double check this
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        vividly: ['vividly'],
        interMedium: ['Inter_500Medium'],
        interRegular: ['Inter_400Regular'],
        interSemiBold: ['Inter_600SemiBold'],
        interBold: ['Inter_700Bold'],
      },
    },
  },
  plugins: [],
}

