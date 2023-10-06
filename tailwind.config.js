/** @type {import('tailwindcss').Config} */
const {nextui} =  require("@nextui-org/react")
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#1B62D6',
        abu: '#9FA1B5',
      },
      backgroundColor: {
        primary: '#3B82F6',
        secondary: '#1B62D6',
        abu: '#9FA1B5',
      },
    },
  },
  plugins: [nextui()],
};
