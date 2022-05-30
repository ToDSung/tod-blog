const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, './pages/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, './components/**/*.{js,ts,jsx,tsx}'),
  ],
  theme: {
    extend: {
      colors: {
        'fountain-blue': '#4DB6AC',
        'default-text': '#c9d1d9',
        'link-text': '#8cb4ff',
        'default-canvas': '#0d1117',
        'sub-canvas': '#202124',
        'default-border': '#858585',
        'item-border': '#e5e7eb',
      },
      keyframes: {
        spin: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
      },
      animation: {
        progress: 'spin 2s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar'),
  ],
};
