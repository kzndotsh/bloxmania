// BloxMania Theme - Global JavaScript

// Wait for critical initialization to complete before starting main features
document.addEventListener("theme:page:loaded", function () {
  // Initialize utility modules
  if (window.HeaderUtils) window.bloxManiaHeader = new window.HeaderUtils();
  if (window.CartUtils) window.bloxManiaCart = new window.CartUtils();
  if (window.SearchUtils) window.bloxManiaSearch = new window.SearchUtils();

  // Initialize theme features
  initializeThemeFeatures();
});

// Fallback initialization for DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  // Wait for utilities to load, then initialize
  document.addEventListener("theme:utilities:loaded", initializeThemeFeatures);

  // Fallback initialization if utilities are already loaded
  if (window.ThemeUtilities && window.ThemeUtilities.initialized) {
    initializeThemeFeatures();
  }

  // Trigger page loaded event if init.js hasn't already
  setTimeout(() => {
    if (!document.documentElement.classList.contains("page-loaded")) {
      document.dispatchEvent(new CustomEvent("theme:page:loaded"));
    }
  }, 500);
});

// Initialize theme features using enhanced utilities
function initializeThemeFeatures() {
  const utilities = window.ThemeUtilities;

  if (!utilities) {
    console.warn("ThemeUtilities not available, falling back to basic initialization");
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
  const animationUtil = utilities.getUtility("animation");

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = this.getAttribute("href");

      if (animationUtil) {
        animationUtil.scrollTo(target);
      } else {
        // Fallback
        const element = document.querySelector(target);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });
}

// Enhanced newsletter form with utilities
function initNewsletterForm(utilities) {
  const newsletterForm = document.querySelector(".newsletter-form");
  if (!newsletterForm) return;

  const formUtil = utilities.getUtility("form");
  const a11yUtil = utilities.getUtility("a11y");

  newsletterForm.addEventListener("submit", function (e) {
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    // Validate form if utility is available
    if (formUtil) {
      const validation = formUtil.validate(this, {
        email: {
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Please enter a valid email address",
        },
      });

      if (!validation.isValid) {
        e.preventDefault();
        if (a11yUtil) {
          a11yUtil.announce("Please correct the form errors", "assertive");
        }
        return;
      }
    }

    setButtonState(submitButton, "Subscribing...", true);

    // Form will be handled by Shopify's customer form
    setTimeout(() => {
      setButtonState(submitButton, "Subscribed!", true, "#10b981");

      if (a11yUtil) {
        a11yUtil.announce("Successfully subscribed to newsletter");
      }

      setTimeout(() => {
        setButtonState(submitButton, originalText, false);
      }, 2000);
    }, 1000);
  });
}

// Enhanced animations using utilities
function initAnimations(utilities) {
  const animationUtil = utilities.getUtility("animation");

  if (animationUtil) {
    const elements = document.querySelectorAll(".product-card, .feature-card, .hero-content");
    animationUtil.observeForAnimation(elements, "animate-fade-in-up");
  } else {
    // Fallback to basic animation
    initBasicAnimations();
  }
}

// Enhanced lazy loading using utilities
function initLazyLoading(utilities) {
  const performanceUtil = utilities.getUtility("performance");

  if (performanceUtil) {
    // Use enhanced lazy loading with multiple selectors
    performanceUtil.lazyLoadImages(".product-image[data-src], img[data-src], [data-background-image]");
    performanceUtil.lazyLoadSections("[data-lazy-section]");

    // Add resource hints for better performance
    performanceUtil.addResourceHints();
  } else {
    // Fallback to basic lazy loading
    initBasicLazyLoading();
  }
}

// Initialize accessibility features
function initAccessibilityFeatures(utilities) {
  const a11yUtil = utilities.getUtility("a11y");

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
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function initBasicNewsletterForm() {
  const newsletterForm = document.querySelector(".newsletter-form");
  if (!newsletterForm) return;

  newsletterForm.addEventListener("submit", function () {
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    setButtonState(submitButton, "Subscribing...", true);

    setTimeout(() => {
      setButtonState(submitButton, "Subscribed!", true, "#10b981");
      setTimeout(() => {
        setButtonState(submitButton, originalText, false);
      }, 2000);
    }, 1000);
  });
}

function initBasicAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in-up");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".product-card, .feature-card, .hero-content").forEach((el) => {
    observer.observe(el);
  });
}

function initBasicLazyLoading() {
  const productImages = document.querySelectorAll(".product-image[data-src], img[data-src]");
  if (productImages.length === 0) return;

  const imageObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
        }
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  productImages.forEach((img) => imageObserver.observe(img));
}

// Utility function for button states
function setButtonState(button, text, disabled, backgroundColor = "") {
  button.textContent = text;
  button.disabled = disabled;
  if (backgroundColor) button.style.background = backgroundColor;
}

// Import centralized theme configuration
const config = window.THEME_CONFIG || {};

// Theme settings from centralized config
const themeSettings = {
  primaryColor: config.COLORS?.primary?.DEFAULT || "#ffd800",
  secondaryColor: config.COLORS?.secondary?.DEFAULT || "#4791f0",
  backgroundColor: config.COLORS?.background?.DEFAULT || "#1d1e26",
  textColor: config.COLORS?.text?.DEFAULT || "#ffffff",
  // Animation settings
  animationDuration: config.ANIMATIONS?.durations?.normal || "300ms",
  animationEasing: config.ANIMATIONS?.easings?.smooth || "cubic-bezier(0.4, 0, 0.2, 1)",
  // Layout settings
  pageWidth: config.LAYOUT?.spacing?.pageWidth || "1200px",
  sectionSpacing: config.LAYOUT?.spacing?.sections || "52px",
};

// Global theme utilities
window.BloxManiaTheme = {
  config: config,
  themeSettings: themeSettings,
  showNotification: showNotification,
  formatPrice: formatPrice,
};

// Show notification utility
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => notification.classList.add("show"), 100);

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => document.body.removeChild(notification), 300);
  }, 3000);
}

// Format price utility
function formatPrice(price, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(price);
}

// Initialize notification styles
function initNotificationStyles() {
  const notificationStyles = document.createElement("style");
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
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    document.body.classList.add("page-hidden");
  } else {
    document.body.classList.remove("page-hidden");
  }
});

// Handle window resize
let resizeTimeout;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function () {
    // Trigger resize event for any components that need it
    window.dispatchEvent(new CustomEvent("themeResize"));
  }, 250);
});

// Export for use in other scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = window.BloxManiaTheme;
}
