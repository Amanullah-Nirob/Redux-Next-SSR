module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primaryGreen": "rgb(30, 215, 96)"
      },
      screens: {
        "xs": "480px"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ]
}