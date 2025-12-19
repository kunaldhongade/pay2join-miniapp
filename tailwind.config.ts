import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        telegram: {
          blue: '#0088cc',
          'blue-dark': '#0066aa',
        },
        ton: {
          primary: '#0088cc',
          secondary: '#0066aa',
        },
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'telegram': '0 4px 20px rgba(0, 136, 204, 0.15)',
        'telegram-lg': '0 8px 32px rgba(0, 136, 204, 0.2)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

