/**
 * BloxMania Theme Configuration
 * Centralized configuration and constants for the BloxMania Shopify theme
 * Following Dawn's patterns for maintainable theme architecture
 */

// Theme Information
const THEME_INFO = {
  name: 'BloxMania',
  version: '1.0.0',
  author: 'BloxMania',
  description: 'Gaming-focused Shopify theme for digital products'
};

// Color Palette - Primary brand colors
const COLORS = {
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
    900: '#78350f'
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
    900: '#1e3a8a'
  },
  background: {
    DEFAULT: '#1d1e26',
    surface: '#252730',
    card: '#252730'
  },
  text: {
    DEFAULT: '#ffffff',
    muted: '#94a3b8'
  },
  accent: {
    DEFAULT: '#59bab9',
    foreground: '#ffffff'
  },
  border: '#333441',
  input: '#333441',
  ring: '#59bab9',
  destructive: '#ef4444',
  success: '#10b981',
  warning: '#f59e0b'
};

// Typography Configuration
const TYPOGRAPHY = {
  fonts: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    heading: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['ui-monospace', 'SFMono-Regular', 'monospace']
  },
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem'
  },
  weights: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800'
  }
};

// Layout and Spacing
const LAYOUT = {
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  containers: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  spacing: {
    sections: '52px',
    gridVertical: '32px',
    gridHorizontal: '32px',
    pageWidth: '1200px'
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    notification: 10000
  }
};

// Animation Configuration
const ANIMATIONS = {
  durations: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '1000ms'
  },
  easings: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)'
  },
  keyframes: {
    fadeInUp: {
      '0%': { opacity: '0', transform: 'translateY(30px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' }
    },
    slideInLeft: {
      '0%': { opacity: '0', transform: 'translateX(-30px)' },
      '100%': { opacity: '1', transform: 'translateX(0)' }
    },
    slideInRight: {
      '0%': { opacity: '0', transform: 'translateX(30px)' },
      '100%': { opacity: '1', transform: 'translateX(0)' }
    },
    scroll: {
      '0%': { transform: 'translateX(0)' },
      '100%': { transform: 'translateX(-50%)' }
    },
    float: {
      '0%, 100%': { transform: 'translateY(0px)' },
      '50%': { transform: 'translateY(-10px)' }
    },
    gradientFlow: {
      '0%, 100%': { 'background-position': '0% 50%' },
      '50%': { 'background-position': '100% 50%' }
    }
  }
};

// Component Styling Defaults
const COMPONENTS = {
  card: {
    borderRadius: '16px',
    borderThickness: '1px',
    borderOpacity: '5%',
    shadowOpacity: '10%',
    shadowOffset: { x: '0px', y: '4px' },
    shadowBlur: '6px',
    padding: '1rem'
  },
  button: {
    borderRadius: '50px',
    borderThickness: '1px',
    borderOpacity: '0%',
    shadowOpacity: '10%',
    shadowOffset: { x: '0px', y: '4px' },
    shadowBlur: '6px',
    padding: { x: '1.5rem', y: '0.75rem' }
  },
  input: {
    borderRadius: '8px',
    borderThickness: '1px',
    borderOpacity: '55%',
    shadowOpacity: '0%',
    padding: { x: '1rem', y: '0.75rem' }
  },
  modal: {
    borderRadius: '8px',
    borderThickness: '1px',
    borderOpacity: '10%',
    shadowOpacity: '5%',
    backdropOpacity: '50%'
  }
};

// Performance Configuration
const PERFORMANCE = {
  lazyLoading: {
    rootMargin: '200px 0px',
    threshold: 0.01,
    enableWebP: true,
    enableBlur: true
  },
  animation: {
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1,
    reducedMotion: true
  },
  caching: {
    apiCacheTimeout: 5 * 60 * 1000, // 5 minutes
    imageCacheTimeout: 24 * 60 * 60 * 1000, // 24 hours
    enableServiceWorker: true
  },
  optimization: {
    deferNonCritical: true,
    preloadCritical: true,
    enableResourceHints: true,
    criticalResources: [
      '/assets/base.css',
      '/assets/global.js',
      '/assets/theme-utilities.js'
    ]
  }
};

// API Configuration
const API = {
  endpoints: {
    cart: '/cart.js',
    cartAdd: '/cart/add.js',
    cartUpdate: '/cart/update.js',
    cartChange: '/cart/change.js',
    search: '/search/suggest.json',
    recommendations: '/recommendations/products.json',
    contact: '/contact'
  },
  defaults: {
    timeout: 10000,
    retries: 2,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  },
  search: {
    limit: 10,
    resources: 'product,collection,page,article',
    section: 'predictive-search'
  }
};

// Accessibility Configuration
const ACCESSIBILITY = {
  announcements: {
    polite: 'polite',
    assertive: 'assertive'
  },
  focusManagement: {
    trapFocus: true,
    skipLinks: true,
    keyboardNavigation: true
  },
  reducedMotion: {
    respectPreference: true,
    fallbackDuration: '0.01ms'
  }
};

// Form Configuration
const FORMS = {
  validation: {
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address'
    },
    required: {
      message: 'This field is required'
    }
  },
  newsletter: {
    successMessage: 'Successfully subscribed to newsletter',
    errorMessage: 'Failed to subscribe. Please try again.',
    loadingMessage: 'Subscribing...'
  }
};

// Notification Configuration
const NOTIFICATIONS = {
  types: {
    success: {
      background: '#10b981',
      color: '#ffffff',
      icon: 'check'
    },
    error: {
      background: '#ef4444',
      color: '#ffffff',
      icon: 'x'
    },
    warning: {
      background: '#f59e0b',
      color: '#ffffff',
      icon: 'warning'
    },
    info: {
      background: '#3b82f6',
      color: '#ffffff',
      icon: 'info'
    }
  },
  duration: 3000,
  position: {
    top: '20px',
    right: '20px'
  },
  animation: {
    enter: 'slideInRight',
    exit: 'slideOutRight'
  }
};

// E-commerce Specific Configuration
const ECOMMERCE = {
  cart: {
    type: 'notification', // 'notification' or 'drawer'
    showOnAdd: true,
    autoClose: true,
    autoCloseDelay: 3000
  },
  product: {
    imageAspectRatio: '1:1',
    enableZoom: true,
    enableVariantImages: true,
    showInventory: true,
    showReviews: true
  },
  collection: {
    productsPerPage: 24,
    enableFiltering: true,
    enableSorting: true,
    enableInfiniteScroll: false
  },
  search: {
    enablePredictive: true,
    showSuggestions: true,
    maxSuggestions: 5
  }
};

// Social Media and External Services
const EXTERNAL_SERVICES = {
  socialMedia: {
    platforms: ['facebook', 'twitter', 'instagram', 'youtube', 'tiktok'],
    shareButtons: true
  },
  analytics: {
    googleAnalytics: true,
    shopifyAnalytics: true,
    customEvents: true
  },
  thirdParty: {
    chatWidget: true,
    reviewsApp: true,
    loyaltyProgram: false
  }
};

// Development and Debug Configuration
const DEBUG = {
  enabled: false, // Set to true in development
  logLevel: 'warn', // 'error', 'warn', 'info', 'debug'
  showPerformanceMetrics: false,
  enableConsoleWarnings: true
};

// Utility Functions for Configuration Access
const getColor = (colorPath) => {
  const keys = colorPath.split('.');
  let value = COLORS;
  for (const key of keys) {
    value = value[key];
    if (value === undefined) return null;
  }
  return value;
};

const getBreakpoint = (size) => {
  return LAYOUT.breakpoints[size] || null;
};

const getAnimation = (name) => {
  return ANIMATIONS.keyframes[name] || null;
};

const getComponent = (componentName) => {
  return COMPONENTS[componentName] || null;
};

// CSS Custom Properties Generator
const generateCSSCustomProperties = () => {
  const cssVars = [];
  
  // Helper function to convert camelCase to kebab-case
  const kebabCase = (str) => {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  };
  
  // Colors
  Object.entries(COLORS).forEach(([category, colors]) => {
    if (typeof colors === 'object' && colors !== null && !Array.isArray(colors)) {
      Object.entries(colors).forEach(([shade, value]) => {
        const varName = shade === 'DEFAULT' ? 
          `--color-${kebabCase(category)}` : 
          `--color-${kebabCase(category)}-${shade}`;
        cssVars.push(`${varName}: ${value};`);
      });
    } else {
      cssVars.push(`--color-${kebabCase(category)}: ${colors};`);
    }
  });
  
  // Typography
  Object.entries(TYPOGRAPHY.sizes).forEach(([size, value]) => {
    cssVars.push(`--font-size-${size}: ${value};`);
  });
  
  Object.entries(TYPOGRAPHY.weights).forEach(([weight, value]) => {
    cssVars.push(`--font-weight-${weight}: ${value};`);
  });
  
  Object.entries(TYPOGRAPHY.fonts).forEach(([family, value]) => {
    const fontStack = Array.isArray(value) ? value.join(', ') : value;
    cssVars.push(`--font-family-${family}: ${fontStack};`);
  });
  
  // Layout
  Object.entries(LAYOUT.spacing).forEach(([property, value]) => {
    cssVars.push(`--spacing-${kebabCase(property)}: ${value};`);
  });
  
  Object.entries(LAYOUT.zIndex).forEach(([layer, value]) => {
    cssVars.push(`--z-${kebabCase(layer)}: ${value};`);
  });
  
  // Animations
  Object.entries(ANIMATIONS.durations).forEach(([speed, value]) => {
    cssVars.push(`--duration-${speed}: ${value};`);
  });
  
  Object.entries(ANIMATIONS.easings).forEach(([easing, value]) => {
    cssVars.push(`--easing-${kebabCase(easing)}: ${value};`);
  });
  
  // Components
  Object.entries(COMPONENTS).forEach(([component, styles]) => {
    Object.entries(styles).forEach(([property, value]) => {
      if (typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(([subProp, subValue]) => {
          cssVars.push(`--${kebabCase(component)}-${kebabCase(property)}-${subProp}: ${subValue};`);
        });
      } else {
        cssVars.push(`--${kebabCase(component)}-${kebabCase(property)}: ${value};`);
      }
    });
  });
  
  return `:root {\n  ${cssVars.join('\n  ')}\n}`;
};

// Configuration Validation
const validateConfig = () => {
  const errors = [];
  
  // Check required colors
  const requiredColors = ['primary', 'secondary', 'background', 'text'];
  requiredColors.forEach(color => {
    if (!COLORS[color]) {
      errors.push(`Missing required color: ${color}`);
    }
  });
  
  // Check breakpoints
  const requiredBreakpoints = ['sm', 'md', 'lg', 'xl'];
  requiredBreakpoints.forEach(bp => {
    if (!LAYOUT.breakpoints[bp]) {
      errors.push(`Missing required breakpoint: ${bp}`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Export all configuration as a single object for convenience
const THEME_CONFIG = {
  THEME_INFO,
  COLORS,
  TYPOGRAPHY,
  LAYOUT,
  ANIMATIONS,
  COMPONENTS,
  PERFORMANCE,
  API,
  ACCESSIBILITY,
  FORMS,
  NOTIFICATIONS,
  ECOMMERCE,
  EXTERNAL_SERVICES,
  DEBUG,
  // Utility functions
  getColor,
  getBreakpoint,
  getAnimation,
  getComponent,
  generateCSSCustomProperties,
  validateConfig
};

// Make configuration available globally
if (typeof window !== 'undefined') {
  window.THEME_CONFIG = THEME_CONFIG;
  window.BloxManiaConfig = THEME_CONFIG; // Alternative global name
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = THEME_CONFIG;
}