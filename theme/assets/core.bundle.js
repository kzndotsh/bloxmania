/*
 * BloxMania Theme - CORE Bundle
 * Generated: 2025-07-21T06:12:34.940Z
 * Mode: development
 */

(function() {
  'use strict';

  // Bundle: core
  const BUNDLE_NAME = 'core';
  const BUNDLE_VERSION = '1.0.0';

  // Bundle initialization
  if (window.BloxMania && window.BloxMania.bundles) {
    window.BloxMania.bundles[BUNDLE_NAME] = {
      version: BUNDLE_VERSION,
      loaded: true,
      timestamp: Date.now()
    };
  }


// core-constants.js
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



// core-dom.js
/**
 * DOM Utilities - Following Dawn's utility patterns
 * Provides common DOM manipulation and query functions
 */

class DOMUtils {
  /**
   * Get focusable elements within a container (Dawn pattern)
   * @param {Element} container - Container element to search within
   * @returns {NodeList} - List of focusable elements
   */
  static getFocusableElements(container = document) {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'textarea:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      'details summary',
      '[contenteditable="true"]'
    ].join(', ');

    return container.querySelectorAll(focusableSelectors);
  }

  /**
   * Trap focus within a container (Dawn pattern)
   * @param {Element} container - Container to trap focus within
   * @param {Element} elementToFocus - Element to focus initially
   */
  static trapFocus(container, elementToFocus = null) {
    const focusableElements = this.getFocusableElements(container);
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    // Focus the specified element or first focusable element
    if (elementToFocus) {
      elementToFocus.focus();
    } else if (firstFocusable) {
      firstFocusable.focus();
    }

    // Handle tab key navigation
    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);

    // Return cleanup function
    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }

  /**
   * Remove focus trap from container
   * @param {Element} container - Container to remove focus trap from
   */
  static removeTrapFocus(container) {
    const focusableElements = this.getFocusableElements(container);
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  }

  /**
   * Animate element height (Dawn pattern)
   * @param {Element} element - Element to animate
   * @param {boolean} show - Whether to show or hide
   */
  static animateHeight(element, show = true) {
    if (show) {
      element.style.height = 'auto';
      const height = element.offsetHeight;
      element.style.height = '0px';
      element.offsetHeight; // Force reflow
      element.style.transition = 'height 0.3s ease';
      element.style.height = height + 'px';
      
      setTimeout(() => {
        element.style.height = 'auto';
        element.style.transition = '';
      }, 300);
    } else {
      element.style.height = element.offsetHeight + 'px';
      element.offsetHeight; // Force reflow
      element.style.transition = 'height 0.3s ease';
      element.style.height = '0px';
      
      setTimeout(() => {
        element.style.transition = '';
      }, 300);
    }
  }

  /**
   * Check if element is visible in viewport
   * @param {Element} element - Element to check
   * @returns {boolean} - Whether element is visible
   */
  static isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  /**
   * Debounce function calls (Dawn pattern)
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} - Debounced function
   */
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Throttle function calls
   * @param {Function} func - Function to throttle
   * @param {number} limit - Limit in milliseconds
   * @returns {Function} - Throttled function
   */
  static throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Export for use in global scope
window.DOMUtils = DOMUtils;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DOMUtils;
}


// core-api.js
/**
 * API Utilities - Consolidated Shopify API interaction utilities
 * Handles common API patterns with proper error handling and caching
 */

class APIUtils {
  constructor() {
    this.cache = new Map();
    this.abortControllers = new Map();
    this.baseUrl = window.shopUrl || '';
    this.config = window.THEME_CONFIG?.API || {};
  }

  /**
   * Generic fetch wrapper with error handling and caching
   * @param {string} url - API endpoint URL
   * @param {Object} options - Fetch options
   * @param {boolean} useCache - Whether to use caching
   * @returns {Promise} - Response promise
   */
  async fetchWithErrorHandling(url, options = {}, useCache = false) {
    const cacheKey = `${url}_${JSON.stringify(options)}`;
    
    // Return cached response if available
    if (useCache && this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // Cancel previous request if exists
    if (this.abortControllers.has(url)) {
      this.abortControllers.get(url).abort();
    }

    // Create new abort controller
    const abortController = new AbortController();
    this.abortControllers.set(url, abortController);

    const defaultOptions = {
      method: 'GET',
      headers: this.config.defaults?.headers || {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      signal: abortController.signal,
      ...options
    };

    try {
      const response = await fetch(url, defaultOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Cache successful responses
      if (useCache && response.status === 200) {
        this.cache.set(cacheKey, data);
        // Auto-expire cache after 5 minutes
        setTimeout(() => this.cache.delete(cacheKey), 5 * 60 * 1000);
      }

      return data;
    } catch (error) {
      if (error.name === 'AbortError') {
        // Request aborted
        return null;
      }
      
      console.error('API request failed:', error);
      throw error;
    } finally {
      this.abortControllers.delete(url);
    }
  }

  /**
   * Add item to cart
   * @param {FormData|Object} formData - Product form data
   * @returns {Promise} - Cart response
   */
  async addToCart(formData) {
    const url = `${this.baseUrl}${this.config.endpoints?.cartAdd || '/cart/add.js'}`;
    
    const options = {
      method: 'POST',
      body: formData instanceof FormData ? formData : JSON.stringify(formData),
      headers: formData instanceof FormData ? {} : {
        'Content-Type': 'application/json'
      }
    };

    return this.fetchWithErrorHandling(url, options);
  }

  /**
   * Update cart
   * @param {Object} updates - Cart updates object
   * @returns {Promise} - Cart response
   */
  async updateCart(updates) {
    const url = `${this.baseUrl}${this.config.endpoints?.cartUpdate || '/cart/update.js'}`;
    
    const options = {
      method: 'POST',
      body: JSON.stringify({ updates }),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    return this.fetchWithErrorHandling(url, options);
  }

  /**
   * Get current cart
   * @param {boolean} useCache - Whether to use caching
   * @returns {Promise} - Cart data
   */
  async getCart(useCache = true) {
    const url = `${this.baseUrl}${this.config.endpoints?.cart || '/cart.js'}`;
    return this.fetchWithErrorHandling(url, {}, useCache);
  }

  /**
   * Change cart item quantity
   * @param {string} variantId - Variant ID
   * @param {number} quantity - New quantity
   * @returns {Promise} - Cart response
   */
  async changeCartItem(variantId, quantity) {
    const url = `${this.baseUrl}${this.config.endpoints?.cartChange || '/cart/change.js'}`;
    
    const options = {
      method: 'POST',
      body: JSON.stringify({
        id: variantId,
        quantity: quantity
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    return this.fetchWithErrorHandling(url, options);
  }

  /**
   * Search products
   * @param {string} query - Search query
   * @param {Object} options - Search options
   * @returns {Promise} - Search results
   */
  async searchProducts(query, options = {}) {
    const {
      limit = this.config.search?.limit || 10,
      resources = this.config.search?.resources || 'product,collection,page,article',
      section = this.config.search?.section || 'predictive-search'
    } = options;

    const params = new URLSearchParams({
      q: query,
      limit: limit,
      resources: resources,
      section_id: section
    });

    const url = `${this.baseUrl}/search/suggest.json?${params}`;
    return this.fetchWithErrorHandling(url, {}, true);
  }

  /**
   * Get product recommendations
   * @param {string} productId - Product ID
   * @param {number} limit - Number of recommendations
   * @returns {Promise} - Product recommendations
   */
  async getProductRecommendations(productId, limit = 4) {
    const url = `${this.baseUrl}/recommendations/products.json?product_id=${productId}&limit=${limit}`;
    return this.fetchWithErrorHandling(url, {}, true);
  }

  /**
   * Get collection products
   * @param {string} collectionHandle - Collection handle
   * @param {Object} options - Query options
   * @returns {Promise} - Collection products
   */
  async getCollectionProducts(collectionHandle, options = {}) {
    const {
      limit = 50,
      sort_by = 'created-descending',
      page = 1
    } = options;

    const params = new URLSearchParams({
      limit: limit,
      sort_by: sort_by,
      page: page
    });

    const url = `${this.baseUrl}/collections/${collectionHandle}/products.json?${params}`;
    return this.fetchWithErrorHandling(url, {}, true);
  }

  /**
   * Submit contact form
   * @param {FormData} formData - Form data
   * @returns {Promise} - Submission response
   */
  async submitContactForm(formData) {
    const url = `${this.baseUrl}/contact`;
    
    const options = {
      method: 'POST',
      body: formData
    };

    return this.fetchWithErrorHandling(url, options);
  }

  /**
   * Subscribe to newsletter
   * @param {string} email - Email address
   * @param {Object} additionalData - Additional form data
   * @returns {Promise} - Subscription response
   */
  async subscribeNewsletter(email, additionalData = {}) {
    const formData = new FormData();
    formData.append('contact[email]', email);
    formData.append('contact[tags]', 'newsletter');
    
    // Add additional data
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const url = `${this.baseUrl}/contact`;
    
    const options = {
      method: 'POST',
      body: formData
    };

    return this.fetchWithErrorHandling(url, options);
  }

  /**
   * Clear all caches
   */
  clearCache() {
    this.cache.clear();
  }

  /**
   * Abort all pending requests
   */
  abortAllRequests() {
    this.abortControllers.forEach(controller => controller.abort());
    this.abortControllers.clear();
  }

  /**
   * Get cache statistics
   * @returns {Object} - Cache stats
   */
  getCacheStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
      pendingRequests: this.abortControllers.size
    };
  }
}

// Create global instance
window.APIUtils = new APIUtils();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = APIUtils;
}


// core-global.js
// BloxMania Theme - Global JavaScript

// Wait for critical initialization to complete before starting main features
document.addEventListener('theme:page:loaded', function () {
  // Initialize utility modules
  if (window.HeaderUtils) window.bloxManiaHeader = new window.HeaderUtils();
  if (window.CartUtils) window.bloxManiaCart = new window.CartUtils();
  if (window.SearchUtils) window.bloxManiaSearch = new window.SearchUtils();

  // Initialize theme features
  initializeThemeFeatures();
});

// Fallback initialization for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
  // Wait for utilities to load, then initialize
  document.addEventListener('theme:utilities:loaded', initializeThemeFeatures);
  
  // Fallback initialization if utilities are already loaded
  if (window.ThemeUtilities && window.ThemeUtilities.initialized) {
    initializeThemeFeatures();
  }
  
  // Trigger page loaded event if init.js hasn't already
  setTimeout(() => {
    if (!document.documentElement.classList.contains('page-loaded')) {
      document.dispatchEvent(new CustomEvent('theme:page:loaded'));
    }
  }, 500);
});

// Initialize theme features using enhanced utilities
function initializeThemeFeatures() {
  const utilities = window.ThemeUtilities;
  
  if (!utilities) {
    console.warn('ThemeUtilities not available, falling back to basic initialization');
    initBasicFeatures();
    return;
  }

  // Initialize smooth scrolling using animation utility
  initSmoothScrolling(utilities);
  
  // Initialize newsletter form
  initNewsletterForm(utilities);
  
  // Initialize animations using animation utility
  initAnimations(utilities);
  
  // Initialize lazy loading using performance utility
  initLazyLoading(utilities);
  
  // Initialize accessibility features
  initAccessibilityFeatures(utilities);
}

// Enhanced smooth scrolling using utilities
function initSmoothScrolling(utilities) {
  const animationUtil = utilities.getUtility('animation');
  
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = this.getAttribute('href');
      
      if (animationUtil) {
        animationUtil.scrollTo(target);
      } else {
        // Fallback
        const element = document.querySelector(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

// Enhanced newsletter form with utilities
function initNewsletterForm(utilities) {
  const newsletterForm = document.querySelector('.newsletter-form');
  if (!newsletterForm) return;

  const formUtil = utilities.getUtility('form');
  const a11yUtil = utilities.getUtility('a11y');

  newsletterForm.addEventListener('submit', function (e) {
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    // Validate form if utility is available
    if (formUtil) {
      const validation = formUtil.validate(this, {
        email: {
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Please enter a valid email address'
        }
      });

      if (!validation.isValid) {
        e.preventDefault();
        if (a11yUtil) {
          a11yUtil.announce('Please correct the form errors', 'assertive');
        }
        return;
      }
    }

    setButtonState(submitButton, 'Subscribing...', true);

    // Form will be handled by Shopify's customer form
    setTimeout(() => {
      setButtonState(submitButton, 'Subscribed!', true, '#10b981');
      
      if (a11yUtil) {
        a11yUtil.announce('Successfully subscribed to newsletter');
      }
      
      setTimeout(() => {
        setButtonState(submitButton, originalText, false);
      }, 2000);
    }, 1000);
  });
}

// Enhanced animations using utilities
function initAnimations(utilities) {
  const animationUtil = utilities.getUtility('animation');
  
  if (animationUtil) {
    const elements = document.querySelectorAll('.product-card, .feature-card, .hero-content');
    animationUtil.observeForAnimation(elements, 'animate-fade-in-up');
  } else {
    // Fallback to basic animation
    initBasicAnimations();
  }
}

// Enhanced lazy loading using utilities
function initLazyLoading(utilities) {
  const performanceUtil = utilities.getUtility('performance');
  
  if (performanceUtil) {
    // Use enhanced lazy loading with multiple selectors
    performanceUtil.lazyLoadImages('.product-image[data-src], img[data-src], [data-background-image]');
    performanceUtil.lazyLoadSections('[data-lazy-section]');
    
    // Add resource hints for better performance
    performanceUtil.addResourceHints();
  } else {
    // Fallback to basic lazy loading
    initBasicLazyLoading();
  }
}

// Initialize accessibility features
function initAccessibilityFeatures(utilities) {
  const a11yUtil = utilities.getUtility('a11y');
  
  if (a11yUtil) {
    a11yUtil.setupSkipLinks();
  }
}

// Fallback functions for when utilities aren't available
function initBasicFeatures() {
  initBasicSmoothScrolling();
  initBasicNewsletterForm();
  initBasicAnimations();
  initBasicLazyLoading();
}

function initBasicSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function initBasicNewsletterForm() {
  const newsletterForm = document.querySelector('.newsletter-form');
  if (!newsletterForm) return;

  newsletterForm.addEventListener('submit', function () {
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    setButtonState(submitButton, 'Subscribing...', true);

    setTimeout(() => {
      setButtonState(submitButton, 'Subscribed!', true, '#10b981');
      setTimeout(() => {
        setButtonState(submitButton, originalText, false);
      }, 2000);
    }, 1000);
  });
}

function initBasicAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.product-card, .feature-card, .hero-content').forEach((el) => {
    observer.observe(el);
  });
}

function initBasicLazyLoading() {
  const productImages = document.querySelectorAll('.product-image[data-src], img[data-src]');
  if (productImages.length === 0) return;

  const imageObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  productImages.forEach((img) => imageObserver.observe(img));
}

// Utility function for button states
function setButtonState(button, text, disabled, backgroundColor = '') {
  button.textContent = text;
  button.disabled = disabled;
  if (backgroundColor) button.style.background = backgroundColor;
}

// Import centralized theme configuration
const config = window.THEME_CONFIG || {};

// Theme settings from centralized config
const themeSettings = {
  primaryColor: config.COLORS?.primary?.DEFAULT || '#ffd800',
  secondaryColor: config.COLORS?.secondary?.DEFAULT || '#4791f0',
  backgroundColor: config.COLORS?.background?.DEFAULT || '#1d1e26',
  textColor: config.COLORS?.text?.DEFAULT || '#ffffff',
  // Animation settings
  animationDuration: config.ANIMATIONS?.durations?.normal || '300ms',
  animationEasing: config.ANIMATIONS?.easings?.smooth || 'cubic-bezier(0.4, 0, 0.2, 1)',
  // Layout settings
  pageWidth: config.LAYOUT?.spacing?.pageWidth || '1200px',
  sectionSpacing: config.LAYOUT?.spacing?.sections || '52px'
};

// Global theme utilities
window.BloxManiaTheme = {
  config: config,
  themeSettings: themeSettings,
  showNotification: showNotification,
  formatPrice: formatPrice,
};

// Show notification utility
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => notification.classList.add('show'), 100);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => document.body.removeChild(notification), 300);
  }, 3000);
}

// Format price utility
function formatPrice(price, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price);
}

// Initialize notification styles
function initNotificationStyles() {
  const notificationStyles = document.createElement('style');
  notificationStyles.textContent = `
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      color: white;
      font-weight: 600;
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    }
    .notification.show { transform: translateX(0); }
    .notification-success { background: #10b981; }
    .notification-error { background: #ef4444; }
    .notification-warning { background: #f59e0b; }
  `;
  document.head.appendChild(notificationStyles);
}

// Initialize notification styles immediately
initNotificationStyles();

// Handle page visibility changes
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    document.body.classList.add('page-hidden');
  } else {
    document.body.classList.remove('page-hidden');
  }
});

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', function () {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function () {
    // Trigger resize event for any components that need it
    window.dispatchEvent(new CustomEvent('themeResize'));
  }, 250);
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.BloxManiaTheme;
}



// core-init.js
/**
 * BloxMania Theme Initialization
 * Loads all theme utilities and components in the correct order
 */

// Load order: Constants -> Utilities -> Components -> Performance -> Global
const loadScript = (src, type = 'module') => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.type = type;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// Initialize theme with proper loading sequence
async function initializeTheme() {
  try {
    // Mark initialization start
    if (window.PerformanceMonitor) {
      window.PerformanceMonitor.mark('theme:init:start');
    }

    // Wait for critical scripts to load
    await new Promise((resolve) => {
      const checkScripts = () => {
        if (window.BloxManiaConstants && window.DawnUtilities) {
          resolve();
        } else {
          setTimeout(checkScripts, 10);
        }
      };
      checkScripts();
    });

    // All scripts are loaded via theme.liquid, just initialize
    // Mark initialization complete
    if (window.PerformanceMonitor) {
      window.PerformanceMonitor.mark('theme:init:complete');
      window.PerformanceMonitor.measure(
        'theme:full:init',
        'theme:init:start',
        'theme:init:complete'
      );
    }

    // Trigger theme loaded event
    document.documentElement.classList.add('theme-loaded');
    document.dispatchEvent(
      new CustomEvent('theme:loaded', {
        detail: {
          constants: window.BloxManiaConstants,
          utilities: window.DawnUtilities,
          components: window.BloxManiaComponents,
          performance: window.PerformanceMonitor,
        },
      })
    );

    console.log('BloxMania theme initialized successfully');
  } catch (error) {
    console.error('Theme initialization failed:', error);
  }
}

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTheme);
} else {
  initializeTheme();
}

// Handle hot reload reconnections
if (window.Shopify?.designMode) {
  document.addEventListener('shopify:section:load', () => {
    // Re-initialize components when sections are reloaded
    setTimeout(initializeTheme, 100);
  });
}

// Export for debugging
window.BloxManiaInit = {
  initializeTheme,
  loadScript,
};



  // Bundle completion
  if (window.BloxMania && window.BloxMania.bundles && window.BloxMania.bundles[BUNDLE_NAME]) {
    window.BloxMania.bundles[BUNDLE_NAME].initialized = true;
  }

  console.log(`✅ ${BUNDLE_NAME} bundle loaded`);
})();