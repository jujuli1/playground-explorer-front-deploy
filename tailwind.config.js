/** @type {import('tailwindcss').Config} */

import Colors from 'tailwindcss/colors';

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    variants: {
      extend: {
        gap: ['responsive'], // Active la propriété gap
      },
    },
    colors: {
      ...Colors,

      primary: {
        DEFAULT: '#57cba9',
        dark: '',
      },
      secondary: {
        DEFAULT: '#83adf1',
        dark: '',
      },
      accent: {
        DEFAULT: '#e6d1a2',
        dark: '',
      },
      text: {
        DEFAULT: '#031c14',
        dark: '',
      },
      background: {
        DEFAULT: '#f8fcfb',
        dark: '',
      },
      googleblue: {
        DEFAULT: '#055ef0',
        dark: '',
      },

      star: {
        DEFAULT: '#FFFF00',
        dark: '',
      },
      white: '#ffffff',
      black: '#000000',
    },

    fontFamily: {
      sans: ['Tahoma', 'sans-serif'],
      title: ['Shantell Sans', 'cursive'],
    },

    extend: {},
  },
  plugins: [],
};
