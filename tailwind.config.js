/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          B6B6B6: '#B6B6B6',
          DADADA: '#DADADA',
          D9D9D9: '#D9D9D9',
          '3A3A3A': '#3A3A3A',
          '3D3D3D': '#3D3D3D',
          '4E4E4E': '#4E4E4E',
          464646: '#464646',
          696969: '#696969',
          777777: '#777777',
        },
        error: '#FF0000',
        info: '#006F92',
        'info-dark': '#0096C6',
        notecard: '#EFE9D4',
        primary: '#456DBA',
        secondary: '#A245BA',
        success: '#00920F',
        'success-dark-mode': '#7ED988',
      },
      fontFamily: {
        main: 'BioRhyme',
        secondary: 'Gotu',
      },
    },
  },
  plugins: [],
};
