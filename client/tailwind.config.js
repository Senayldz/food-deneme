/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "green": "#9BBA34",
        "red": "#FF6868",
        "secondary": "#555",
        "prigmayBG": "#FCFCFC",
        "drkGreen": "#062714"
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

