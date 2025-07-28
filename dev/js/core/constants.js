/**
 * BloxMania Theme Constants
 * Following Dawn's patterns for maintainable theme architecture
 */

// Debounce timer for input changes
const ON_CHANGE_DEBOUNCE_TIMER = 300;

// Pub/Sub event system following Dawn's pattern
const PUB_SUB_EVENTS = {
  cartUpdate: "cart-update",
  quantityUpdate: "quantity-update",
  optionValueSelectionChange: "option-value-selection-change",
  variantChange: "variant-change",
  cartError: "cart-error",
  searchUpdate: "search-update",
  modalOpen: "modal-open",
  modalClose: "modal-close",
  drawerOpen: "drawer-open",
  drawerClose: "drawer-close",
  sectionRefresh: "section-refresh",
  themeEditor: "theme-editor",
};

// Simple scroll fade animation constants
const SCROLL_FADE_DURATION = 600; // 0.6s fade duration
const SCROLL_FADE_THRESHOLD = 0.1; // 10% visibility threshold

// Breakpoint constants
const BREAKPOINTS = {
  mobile: 750,
  tablet: 990,
  desktop: 1200,
};

// Z-index constants
const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  notification: 10000,
};

// API endpoints
const API_ENDPOINTS = {
  cart: "/cart.js",
  cartAdd: "/cart/add.js",
  cartUpdate: "/cart/update.js",
  cartChange: "/cart/change.js",
  search: "/search/suggest.json",
  productRecommendations: "/recommendations/products.json",
};

// Theme settings keys
const THEME_SETTINGS = {
  predictiveSearch: "predictive_search_enabled",
  cartType: "cart_type",
  stickyHeader: "sticky_header_type",
  menuType: "menu_type_desktop",
};

// CSS custom properties for theme settings
const CSS_CUSTOM_PROPERTIES = {
  pageWidth: "--page-width",
  colorBackground: "--color-background",
  colorForeground: "--color-foreground",
  colorPrimary: "--color-primary",
  colorSecondary: "--color-secondary",
  fontBodyScale: "--font-body-scale",
  fontHeadingScale: "--font-heading-scale",
  spacingSectionsMobile: "--spacing-sections-mobile",
  spacingSectionsDesktop: "--spacing-sections-desktop",
};

// ===== THEME CONFIGURATION =====

// Color palette
const COLORS = {
  primary: {
    DEFAULT: "#ffd800",
    dark: "#e6c200",
    light: "#ffed4e",
  },
  secondary: {
    DEFAULT: "#4791f0",
    dark: "#3b7dd9",
    light: "#6ba3f2",
  },
  background: {
    DEFAULT: "#1d1e26",
    light: "#2a2b35",
    dark: "#15161a",
  },
  text: {
    DEFAULT: "#ffffff",
    muted: "#9ca3af",
    primary: "#ffd800",
  },
  success: "#10b981",
  error: "#ef4444",
  warning: "#f59e0b",
  info: "#3b82f6",
};

// Typography configuration
const TYPOGRAPHY = {
  fontFamily: {
    sans: ["Inter", "system-ui", "sans-serif"],
    mono: ["JetBrains Mono", "monospace"],
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
};

// Layout configuration
const LAYOUT = {
  spacing: {
    pageWidth: "1200px",
    sections: "52px",
    container: "1rem",
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
};

// Performance configuration
const PERFORMANCE = {
  lazyLoading: {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  },
  debounce: {
    resize: 250,
    scroll: 100,
    input: 300,
  },
};

// Accessibility configuration
const ACCESSIBILITY = {
  focusRing: {
    color: "rgba(255, 216, 0, 0.3)",
    width: "3px",
  },
  skipLinks: {
    enabled: true,
    target: "#main-content",
  },
  reducedMotion: {
    enabled: true,
    duration: "0.01ms",
  },
};

// API Configuration
const API = {
  endpoints: API_ENDPOINTS,
  defaults: {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },
  search: {
    limit: 10,
    resources: "product,collection,page,article",
    section: "predictive-search",
  },
};

// ===== CSS CUSTOM PROPERTIES =====

const CSS_PROPERTIES = {
  // Color properties
  primaryColor: "--color-primary",
  secondaryColor: "--color-secondary",
  backgroundColor: "--color-background",
  textColor: "--color-text",

  // Typography properties
  fontFamily: "--font-family",
  fontSize: "--font-size",
  fontWeight: "--font-weight",
  lineHeight: "--line-height",

  // Layout properties
  pageWidth: "--page-width",
  sectionSpacing: "--section-spacing",
  containerPadding: "--container-padding",

  // Animation properties
  animationDuration: "--animation-duration",
  animationEasing: "--animation-easing",
  transitionDuration: "--transition-duration",

  // Spacing properties
  spacing: "--spacing",
  borderRadius: "--border-radius",
  boxShadow: "--box-shadow",

  // Z-index properties
  zIndex: "--z-index",

  // Typography scale properties
  fontBodyScale: "--font-body-scale",
  fontHeadingScale: "--font-heading-scale",
};

// Utility functions
const getFocusableElements = (container) => {
  return Array.from(
    container.querySelectorAll(
      "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe",
    ),
  );
};

const debounce = (fn, wait) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
};

const throttle = (fn, delay) => {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn.apply(this, args);
  };
};

// ===== EXPORT =====

const THEME_CONFIG = {
  COLORS,
  TYPOGRAPHY,
  LAYOUT,
  PERFORMANCE,
  ACCESSIBILITY,
  CSS_PROPERTIES,
  API,
  ON_CHANGE_DEBOUNCE_TIMER,
  PUB_SUB_EVENTS,
  SCROLL_FADE_DURATION,
  SCROLL_FADE_THRESHOLD,
  BREAKPOINTS,
  Z_INDEX,
  API_ENDPOINTS,
  THEME_SETTINGS,
  CSS_CUSTOM_PROPERTIES,
  getFocusableElements,
  debounce,
  throttle,
};

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = THEME_CONFIG;
} else {
  window.THEME_CONFIG = THEME_CONFIG;
  window.BloxManiaConstants = THEME_CONFIG;
}
