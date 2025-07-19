// Import centralized theme configuration
const THEME_CONFIG = require('./theme.config.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layout/*.liquid',
    './sections/*.liquid',
    './snippets/*.liquid',
    './templates/*.liquid',
    './templates/**/*.liquid',
    './assets/*.js',
    './src/components/*.css',
  ],
  safelist: [
    // Dawn-style component classes that might be dynamically generated
    'card--standard',
    'card--media',
    'card--horizontal',
    'btn--primary',
    'btn--secondary',
    'text-gradient',
    // Animation classes from centralized config
    'animate-fade-in-up',
    'animate-slide-in-left',
    'animate-slide-in-right',
    'animate-float',
    'animate-gradient-flow',
    // Responsive utilities that might be used conditionally
    'hover:bg-primary',
    'hover:text-primary',
    'hover:border-primary',
    'focus:bg-primary',
    'focus:text-primary',
    'focus:border-primary',
    'active:bg-primary',
    'active:text-primary',
    'active:border-primary',
    'hover:bg-secondary',
    'hover:text-secondary',
    'hover:border-secondary',
    'focus:bg-secondary',
    'focus:text-secondary',
    'focus:border-secondary',
  ],
  theme: {
    extend: {
      // Use CSS variables for colors instead of hardcoded values
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          50: 'rgb(255 248 220 / <alpha-value>)',
          100: 'rgb(255 241 185 / <alpha-value>)',
          200: 'rgb(255 234 150 / <alpha-value>)',
          300: 'rgb(255 227 115 / <alpha-value>)',
          400: 'rgb(255 220 80 / <alpha-value>)',
          500: 'rgb(var(--color-primary) / <alpha-value>)',
          600: 'rgb(217 184 0 / <alpha-value>)',
          700: 'rgb(184 156 0 / <alpha-value>)',
          800: 'rgb(150 128 0 / <alpha-value>)',
          900: 'rgb(117 100 0 / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary) / <alpha-value>)',
          50: 'rgb(239 246 255 / <alpha-value>)',
          100: 'rgb(219 234 254 / <alpha-value>)',
          200: 'rgb(191 219 254 / <alpha-value>)',
          300: 'rgb(147 197 253 / <alpha-value>)',
          400: 'rgb(96 165 250 / <alpha-value>)',
          500: 'rgb(var(--color-secondary) / <alpha-value>)',
          600: 'rgb(37 99 235 / <alpha-value>)',
          700: 'rgb(29 78 216 / <alpha-value>)',
          800: 'rgb(30 64 175 / <alpha-value>)',
          900: 'rgb(30 58 138 / <alpha-value>)',
        },
        background: {
          DEFAULT: 'rgb(var(--color-background) / <alpha-value>)',
          surface: 'rgb(var(--color-surface) / <alpha-value>)',
        },
        foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        white: 'rgb(255 255 255 / <alpha-value>)',
        black: 'rgb(0 0 0 / <alpha-value>)',
      },

      // Use centralized typography configuration
      fontFamily: THEME_CONFIG.TYPOGRAPHY.fonts,
      fontSize: THEME_CONFIG.TYPOGRAPHY.sizes,
      fontWeight: THEME_CONFIG.TYPOGRAPHY.weights,

      // Use centralized layout configuration
      screens: THEME_CONFIG.LAYOUT.breakpoints,
      spacing: {
        section: THEME_CONFIG.LAYOUT.spacing.sections,
        'grid-v': THEME_CONFIG.LAYOUT.spacing.gridVertical,
        'grid-h': THEME_CONFIG.LAYOUT.spacing.gridHorizontal,
      },
      maxWidth: {
        page: THEME_CONFIG.LAYOUT.spacing.pageWidth,
      },

      // Use centralized animation configuration
      transitionDuration: THEME_CONFIG.ANIMATIONS.durations,
      transitionTimingFunction: THEME_CONFIG.ANIMATIONS.easings,
      keyframes: THEME_CONFIG.ANIMATIONS.keyframes,
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        scroll: 'scroll 30s linear infinite',
        float: 'float 3s ease-in-out infinite',
        'gradient-flow': 'gradientFlow 3s ease-in-out infinite',
      },

      // Use centralized component configuration for border radius
      borderRadius: {
        card: THEME_CONFIG.COMPONENTS.card.borderRadius,
        button: THEME_CONFIG.COMPONENTS.button.borderRadius,
        input: THEME_CONFIG.COMPONENTS.input.borderRadius,
        modal: THEME_CONFIG.COMPONENTS.modal.borderRadius,
      },

      // Z-index scale from centralized config
      zIndex: THEME_CONFIG.LAYOUT.zIndex,
    },
  },
  plugins: [],
};
