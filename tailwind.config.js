/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  // In Tailwind CSS, the theme and extend sections are used in the configuration file (tailwind.config.js) to customize default design system provided by Tailwind. 
  // in this section we add the customize theme . and in extend we tell what is this , i.e is this a color, border or it is other thing.

  theme: {
    extend: {
      colors: {
        blue: "#2997FF",
        gray: {
          DEFAULT: "#86868b",
          100: "#94928d",
          200: "#afafaf",
          300: "#42424570",
        },
        zinc: "#101010",
      },
      fontWeight: {
        fontcustom: '480',
      },
    },
  },
  plugins: [],
};