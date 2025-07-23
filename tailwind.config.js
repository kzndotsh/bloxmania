/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './dev/layout/*.liquid',
    './dev/sections/*.liquid',
    './dev/snippets/*.liquid',
    './dev/templates/*.liquid',
    './dev/templates/**/*.liquid',
    './dev/js/**/*.js',
    './dev/css/**/*.css',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ffd800',
          50: '#fffbeb',
          100: '#fff3c4',
          200: '#ffe285',
          300: '#ffca46',
          400: '#ffb31b',
          500: '#ffd800',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        secondary: {
          DEFAULT: '#4791f0',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#4791f0',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        background: {
          DEFAULT: '#1d1e26',
          surface: '#252730',
        },
        foreground: '#ffffff',
        accent: '#59bab9',
        border: '#333441',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        float: 'float 3s ease-in-out infinite',
        scroll: 'scroll 20s linear infinite',
      },
    },
  },
  plugins: [],
};
