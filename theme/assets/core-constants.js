/**
 * BloxMania Theme Constants
 * Following Dawn's patterns for maintainable theme architecture
 */

// Debounce timer for input changes
const ON_CHANGE_DEBOUNCE_TIMER = 300;

// Pub/Sub event system following Dawn's pattern
const PUB_SUB_EVENTS = {
  cartUpdate: 'cart-update',
  quantityUpdate: 'quantity-update',
  optionValueSelectionChange: 'option-value-selection-change',
  variantChange: 'variant-change',
  cartError: 'cart-error',
  searchUpdate: 'search-update',
  modalOpen: 'modal-open',
  modalClose: 'modal-close',
  drawerOpen: 'drawer-open',
  drawerClose: 'drawer-close',
  sectionRefresh: 'section-refresh',
  themeEditor: 'theme-editor',
};

// Animation constants
const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 1000,
};

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
  cart: '/cart.js',
  cartAdd: '/cart/add.js',
  cartUpdate: '/cart/update.js',
  cartChange: '/cart/change.js',
  search: '/search/suggest.json',
  productRecommendations: '/recommendations/products.json',
};

// Theme settings keys
const THEME_SETTINGS = {
  predictiveSearch: 'predictive_search_enabled',
  cartType: 'cart_type',
  stickyHeader: 'sticky_header_type',
  menuType: 'menu_type_desktop',
};

// CSS custom properties for theme settings
const CSS_CUSTOM_PROPERTIES = {
  pageWidth: '--page-width',
  colorBackground: '--color-background',
  colorForeground: '--color-foreground',
  colorPrimary: '--color-primary',
  colorSecondary: '--color-secondary',
  fontBodyScale: '--font-body-scale',
  fontHeadingScale: '--font-heading-scale',
  spacingSectionsMobile: '--spacing-sections-mobile',
  spacingSectionsDesktop: '--spacing-sections-desktop',
};

// Utility functions
const getFocusableElements = (container) => {
  return Array.from(
    container.querySelectorAll(
      "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
    )
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

// Export for use in other modules
window.BloxManiaConstants = {
  ON_CHANGE_DEBOUNCE_TIMER,
  PUB_SUB_EVENTS,
  ANIMATION_DURATIONS,
  BREAKPOINTS,
  Z_INDEX,
  API_ENDPOINTS,
  THEME_SETTINGS,
  CSS_CUSTOM_PROPERTIES,
  getFocusableElements,
  debounce,
  throttle,
};
