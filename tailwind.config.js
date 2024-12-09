/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        'inter-tight': ['Inter Tight', 'sans-serif']
      },
    },
  },
  plugins: [
    forms,
  ],
};
