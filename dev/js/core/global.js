/**
 * BloxMania Core - Global JavaScript
 * Professional animation and interaction system
 */

// ===== SIMPLE ANIMATION SYSTEM =====

class SimpleScrollFadeController {
  constructor() {
    this.isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.init();
  }

  init() {
    if (this.isReducedMotion) return;

    this.setupScrollFade();
  }

  setupScrollFade() {
    // Get all sections that should fade in
    const sections = document.querySelectorAll("section, .section-fade-in");

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-visible");
            // Unobserve after animation to prevent re-triggering
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.01, // Trigger when just 1% of element is visible (very responsive)
        rootMargin: "0px 0px -200px 0px", // Start animation 200px before element enters viewport
      },
    );

    // Observe all sections
    sections.forEach((section) => {
      observer.observe(section);
    });
  }
}

// ===== INTERACTION SYSTEM =====

class InteractionController {
  constructor() {
    this.init();
  }

  init() {
    this.initHoverEffects();
    this.initFocusEffects();
    this.initClickEffects();
  }

  initHoverEffects() {
    // Add hover effects to elements with data-hover attribute
    document.querySelectorAll("[data-hover]").forEach((element) => {
      const hoverType = element.dataset.hover;
      element.classList.add(`hover-${hoverType}`);
    });
  }

  initFocusEffects() {
    // Add focus effects to interactive elements
    document.querySelectorAll("button, a, input, select, textarea").forEach((element) => {
      element.classList.add("focus-ring");
    });
  }

  initClickEffects() {
    // Add click effects to buttons
    document.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", (e) => {
        this.createRippleEffect(e);
      });
    });
  }

  createRippleEffect(event) {
    const button = event.currentTarget;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
}

// ===== PERFORMANCE SYSTEM =====

class PerformanceController {
  constructor() {
    this.init();
  }

  init() {
    this.initLazyLoading();
    this.initSmoothScrolling();
    this.initDebouncedResize();
  }

  initLazyLoading() {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            img.classList.remove("lazy");
          }
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }

  initSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }

  initDebouncedResize() {
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      const resizeDelay = window.THEME_CONFIG?.PERFORMANCE?.debounce?.resize || 250;
      resizeTimeout = setTimeout(() => {
        // Handle resize events
        this.handleResize();
      }, resizeDelay);
    });
  }

  handleResize() {
    // Handle responsive behavior
    const isMobile = window.innerWidth <= 768;
    document.body.classList.toggle("mobile", isMobile);
  }
}

// ===== ACCESSIBILITY SYSTEM =====

class AccessibilityController {
  constructor() {
    this.init();
  }

  init() {
    this.initSkipLinks();
    this.initFocusManagement();
    this.initKeyboardNavigation();
  }

  initSkipLinks() {
    // Create skip links for accessibility
    const skipLinks = [
      { href: "#main-content", text: "Skip to main content" },
      { href: "#navigation", text: "Skip to navigation" },
    ];

    skipLinks.forEach((link) => {
      const skipLink = document.createElement("a");
      skipLink.href = link.href;
      skipLink.textContent = link.text;
      skipLink.className = "skip-link";
      skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 1000;
        transition: top 0.3s;
      `;

      skipLink.addEventListener("focus", () => {
        skipLink.style.top = "6px";
      });

      skipLink.addEventListener("blur", () => {
        skipLink.style.top = "-40px";
      });

      document.body.appendChild(skipLink);
    });
  }

  initFocusManagement() {
    // Manage focus for modals and dropdowns
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        // Close modals, dropdowns, etc.
        const activeModals = document.querySelectorAll("[data-modal].active");
        activeModals.forEach((modal) => {
          modal.classList.remove("active");
        });
      }
    });
  }

  initKeyboardNavigation() {
    // Enhanced keyboard navigation
    document.addEventListener("keydown", (e) => {
      // Handle keyboard shortcuts
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "k":
            e.preventDefault();
            // Open search
            const searchInput = document.querySelector("[data-search-input]");
            if (searchInput) searchInput.focus();
            break;
          case "/":
            e.preventDefault();
            // Toggle help
            break;
        }
      }
    });
  }
}

// ===== MAIN CORE SYSTEM =====

class BloxManiaCore {
  constructor() {
    this.animationController = null;
    this.interactionController = null;
    this.performanceController = null;
    this.accessibilityController = null;
    this.creatorsCarousel = null;
    this.init();
  }

  init() {
    this.setup();
  }

  setup() {
    // Initialize all controllers
    this.animationController = new SimpleScrollFadeController();
    this.interactionController = new InteractionController();
    this.performanceController = new PerformanceController();
    this.accessibilityController = new AccessibilityController();

    // Initialize theme features
    this.initThemeFeatures();
  }

  initThemeFeatures() {
    this.initViewToggles();
    this.initSearch();
    this.initCart();
  }

  initViewToggles() {
    // Handle view toggles (grid/list view)
    const viewToggles = document.querySelectorAll("[data-view-toggle]");
    viewToggles.forEach((toggle) => {
      toggle.addEventListener("click", (e) => {
        e.preventDefault();
        const view = toggle.dataset.view;
        this.setView(view);
      });
    });
  }

  setView(view) {
    // Update view state
    localStorage.setItem("product-view", view);

    // Update UI
    document.querySelectorAll("[data-view]").forEach((element) => {
      element.dataset.view = view;
    });
  }

  initSearch() {
    const searchForms = document.querySelectorAll("[data-search-form]");
    searchForms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        // Handle search submission
      });
    });
  }

  initCart() {
    const cartButtons = document.querySelectorAll("[data-cart-add]");
    cartButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const productId = button.dataset.productId;
        this.addToCart(productId);
      });
    });
  }

  addToCart(productId) {
    // Add to cart logic
  }
}

// ===== GLOBAL UTILITIES =====

// Format price utility
function formatPrice(price, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(price);
}

// Show notification utility
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    border-radius: 8px;
    color: white;
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;

  // Set background color based on type
  const colors = {
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
  };
  notification.style.backgroundColor = colors[type] || colors.info;

  document.body.appendChild(notification);

  // Animate in
  requestAnimationFrame(() => {
    notification.style.transform = "translateX(0)";
  });

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// ===== EXPORT =====

// Initialize core system
const bloxManiaCore = new BloxManiaCore();

// Export for use in other modules
window.BloxManiaCore = {
  animation: bloxManiaCore.animationController,
  interaction: bloxManiaCore.interactionController,
  performance: bloxManiaCore.performanceController,
  accessibility: bloxManiaCore.accessibilityController,
  formatPrice,
  showNotification,
};
