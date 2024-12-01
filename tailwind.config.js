/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman',
      romanLower: 'lower-roman',
      alpha: 'upper-alpha',
      alphaLower: 'lower-alpha',
      numeric: 'decimal',
    },
    extend: {
      backgroundImage: {
        'header-image': "url('/src/assets/images/header-background.webp')",
        'localization-image': "url('/src/assets/images/localization.svg')",
      },
    },
  },
  plugins: [],
}
