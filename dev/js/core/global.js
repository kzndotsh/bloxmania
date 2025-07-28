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

    console.log("SimpleScrollFadeController: Found", sections.length, "sections to animate");

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("SimpleScrollFadeController: Animating section", entry.target);
            entry.target.classList.add("fade-in-visible");
            // Unobserve after animation to prevent re-triggering
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "0px 0px -50px 0px", // Start animation slightly before element is fully in view
      },
    );

    // Observe all sections
    sections.forEach((section) => {
      observer.observe(section);
      console.log("SimpleScrollFadeController: Observing section", section);
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

    button.style.position = "relative";
    button.style.overflow = "hidden";
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
    // Add skip to content link
    const skipLink = document.createElement("a");
    skipLink.href = "#main-content";
    skipLink.textContent = "Skip to main content";
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
      transition: top var(--duration-normal);
    `;

    skipLink.addEventListener("focus", () => {
      skipLink.style.top = "6px";
    });

    skipLink.addEventListener("blur", () => {
      skipLink.style.top = "-40px";
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  initFocusManagement() {
    // Trap focus in modals
    document.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        const modals = document.querySelectorAll('[role="dialog"]');
        modals.forEach((modal) => {
          if (modal.style.display !== "none") {
            const focusableElements = modal.querySelectorAll(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        });
      }
    });
  }

  initKeyboardNavigation() {
    // Enhanced keyboard navigation
    document.addEventListener("keydown", (e) => {
      // Escape key closes modals
      if (e.key === "Escape") {
        const modals = document.querySelectorAll('[role="dialog"]');
        modals.forEach((modal) => {
          if (modal.style.display !== "none") {
            modal.style.display = "none";
          }
        });
      }
    });
  }
}

// ===== INITIALIZATION =====

class BloxManiaCore {
  constructor() {
    this.animationController = null;
    this.interactionController = null;
    this.performanceController = null;
    this.accessibilityController = null;
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    // Initialize controllers
    this.animationController = new SimpleScrollFadeController();
    this.interactionController = new InteractionController();
    this.performanceController = new PerformanceController();
    this.accessibilityController = new AccessibilityController();

    // Initialize theme features
    this.initThemeFeatures();
  }

  initThemeFeatures() {
    // Initialize view toggles
    this.initViewToggles();

    // Initialize search functionality
    this.initSearch();

    // Initialize cart functionality
    this.initCart();
  }

  initViewToggles() {
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
    localStorage.setItem("collection-view-preference", view);

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
        console.log("Search submitted");
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
    console.log("Adding product to cart:", productId);
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
