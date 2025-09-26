/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#a2d0ff',
        'primary-hover': '#7bb8ff',
        'primary-light': '#b8dcff',
      },
    },
  },
  plugins: [],
};
