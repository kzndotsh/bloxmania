/**
 * Accessibility Utilities
 * Enhances theme accessibility with focus management, ARIA support, and keyboard navigation
 */

class AccessibilityUtils {
  constructor() {
    // Use DOMUtils for consistent focusable element selection
    this.init();
  }

  /**
   * Initialize accessibility enhancements
   */
  init() {
    this.setupSkipLinks();
    this.setupFocusRing();
    this.setupKeyboardNavigation();
    this.setupScreenReaderAnnouncements();
    this.enhanceExistingElements();
  }

  /**
   * Setup skip links for keyboard navigation - DISABLED
   */
  setupSkipLinks() {
    // Skip links disabled for now
    return;
  }

  /**
   * Setup focus ring for keyboard navigation
   */
  setupFocusRing() {
    // Add class to body when using keyboard navigation
    document.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        document.body.classList.add("keyboard-focus");
      }
    });

    // Remove class when using mouse
    document.addEventListener("mousedown", () => {
      document.body.classList.remove("keyboard-focus");
    });
  }

  /**
   * Setup keyboard navigation for interactive elements
   */
  setupKeyboardNavigation() {
    // Add keyboard navigation to dropdowns
    document.querySelectorAll('.dropdown, [aria-haspopup="true"]').forEach((dropdown) => {
      if (dropdown.hasAttribute("data-keyboard-nav")) return;
      dropdown.setAttribute("data-keyboard-nav", "true");

      const trigger = dropdown.querySelector("button, [aria-expanded]");
      const menu = dropdown.querySelector('[role="menu"], .dropdown-menu');

      if (!trigger || !menu) return;

      // Ensure proper ARIA attributes
      if (!trigger.hasAttribute("aria-expanded")) {
        trigger.setAttribute("aria-expanded", "false");
      }

      if (!trigger.hasAttribute("aria-haspopup")) {
        trigger.setAttribute("aria-haspopup", "true");
      }

      if (!menu.hasAttribute("role")) {
        menu.setAttribute("role", "menu");
      }

      // Get menu items
      const menuItems = menu.querySelectorAll('a, button, [role="menuitem"]');
      menuItems.forEach((item) => {
        if (!item.hasAttribute("role")) {
          item.setAttribute("role", "menuitem");
        }
        if (!item.hasAttribute("tabindex")) {
          item.setAttribute("tabindex", "-1");
        }
      });

      // Handle keyboard navigation
      trigger.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          trigger.setAttribute("aria-expanded", "true");
          menuItems[0]?.focus();
        }
      });

      menu.addEventListener("keydown", (event) => {
        const currentIndex = Array.from(menuItems).indexOf(document.activeElement);

        switch (event.key) {
          case "ArrowDown":
            event.preventDefault();
            if (currentIndex < menuItems.length - 1) {
              menuItems[currentIndex + 1].focus();
            } else {
              menuItems[0].focus();
            }
            break;

          case "ArrowUp":
            event.preventDefault();
            if (currentIndex > 0) {
              menuItems[currentIndex - 1].focus();
            } else {
              menuItems[menuItems.length - 1].focus();
            }
            break;

          case "Escape":
            event.preventDefault();
            trigger.setAttribute("aria-expanded", "false");
            trigger.focus();
            break;

          case "Tab":
            if (!event.shiftKey && currentIndex === menuItems.length - 1) {
              trigger.setAttribute("aria-expanded", "false");
            } else if (event.shiftKey && currentIndex === 0) {
              trigger.setAttribute("aria-expanded", "false");
            }
            break;
        }
      });

      // Close menu when clicking outside
      document.addEventListener("click", (event) => {
        if (!dropdown.contains(event.target)) {
          trigger.setAttribute("aria-expanded", "false");
        }
      });
    });

    // Add keyboard navigation to tabs
    document.querySelectorAll('[role="tablist"]').forEach((tablist) => {
      if (tablist.hasAttribute("data-keyboard-nav")) return;
      tablist.setAttribute("data-keyboard-nav", "true");

      const tabs = tablist.querySelectorAll('[role="tab"]');

      tablist.addEventListener("keydown", (event) => {
        const currentIndex = Array.from(tabs).indexOf(document.activeElement);
        if (currentIndex === -1) return;

        switch (event.key) {
          case "ArrowRight":
            event.preventDefault();
            if (currentIndex < tabs.length - 1) {
              tabs[currentIndex + 1].focus();
              tabs[currentIndex + 1].click();
            } else {
              tabs[0].focus();
              tabs[0].click();
            }
            break;

          case "ArrowLeft":
            event.preventDefault();
            if (currentIndex > 0) {
              tabs[currentIndex - 1].focus();
              tabs[currentIndex - 1].click();
            } else {
              tabs[tabs.length - 1].focus();
              tabs[tabs.length - 1].click();
            }
            break;

          case "Home":
            event.preventDefault();
            tabs[0].focus();
            tabs[0].click();
            break;

          case "End":
            event.preventDefault();
            tabs[tabs.length - 1].focus();
            tabs[tabs.length - 1].click();
            break;
        }
      });
    });
  }

  /**
   * Setup screen reader announcements
   */
  setupScreenReaderAnnouncements() {
    // Create screen reader announcement area if it doesn't exist
    if (!document.getElementById("sr-announcements")) {
      const announcer = document.createElement("div");
      announcer.id = "sr-announcements";
      announcer.className = "sr-only";
      announcer.setAttribute("aria-live", "polite");
      announcer.setAttribute("aria-atomic", "true");
      document.body.appendChild(announcer);
    }
  }

  /**
   * Enhance existing elements with proper accessibility attributes
   */
  enhanceExistingElements() {
    // Add missing alt attributes to images
    document.querySelectorAll("img:not([alt])").forEach((img) => {
      img.alt = "";
    });

    // Add proper roles to common elements
    document.querySelectorAll("header:not([role])").forEach((header) => {
      header.setAttribute("role", "banner");
    });

    document.querySelectorAll("footer:not([role])").forEach((footer) => {
      footer.setAttribute("role", "contentinfo");
    });

    document.querySelectorAll("nav:not([role])").forEach((nav) => {
      nav.setAttribute("role", "navigation");
      if (!nav.hasAttribute("aria-label")) {
        nav.setAttribute("aria-label", "Main");
      }
    });

    document.querySelectorAll("main:not([role])").forEach((main) => {
      main.setAttribute("role", "main");
    });

    // Add proper button type
    document.querySelectorAll("button:not([type])").forEach((button) => {
      button.setAttribute("type", "button");
    });

    // Add proper labels to form elements
    document.querySelectorAll("input:not([aria-label]):not([aria-labelledby])").forEach((input) => {
      const id = input.id;
      if (id) {
        const label = document.querySelector(`label[for="${id}"]`);
        if (!label) {
          const newLabel = document.createElement("label");
          newLabel.htmlFor = id;
          newLabel.className = "sr-only";
          newLabel.textContent = input.placeholder || input.name || "Input field";
          input.parentNode.insertBefore(newLabel, input);
        }
      } else if (input.placeholder) {
        input.setAttribute("aria-label", input.placeholder);
      }
    });
  }

  /**
   * Get all focusable elements within a container (uses DOMUtils)
   * @param {HTMLElement} container - Container element
   * @returns {NodeList} - List of focusable elements
   */
  getFocusableElements(container = document) {
    return DOMUtils.getFocusableElements(container);
  }

  /**
   * Trap focus within a container
   * @param {HTMLElement} container - Container to trap focus within
   * @returns {Function} - Function to remove the focus trap
   */
  trapFocus(container) {
    const focusableElements = this.getFocusableElements(container);
    if (focusableElements.length === 0) return () => {};

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Set initial focus
    firstElement.focus();

    // Handle tab key to trap focus
    const handleTabKey = (event) => {
      if (event.key !== "Tab") return;

      if (event.shiftKey) {
        // Shift + Tab: If focus is on first element, move to last
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: If focus is on last element, move to first
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    container.addEventListener("keydown", handleTabKey);

    // Return cleanup function
    return () => {
      container.removeEventListener("keydown", handleTabKey);
    };
  }

  /**
   * Announce a message to screen readers
   * @param {string} message - Message to announce
   * @param {string} priority - Announcement priority (polite or assertive)
   */
  announce(message, priority = "polite") {
    const announcer = document.getElementById("sr-announcements");
    if (!announcer) return;

    // Clear previous announcement
    announcer.textContent = "";
    announcer.setAttribute("aria-live", priority);

    // Add new announcement after a brief delay
    setTimeout(() => {
      announcer.textContent = message;
    }, 100);

    // Clear announcement after it's been read
    setTimeout(() => {
      announcer.textContent = "";
    }, 5000);
  }

  /**
   * Create a visually hidden element for screen readers
   * @param {string} text - Text content
   * @param {string} tag - HTML tag (default: span)
   * @returns {HTMLElement} - Created element
   */
  createScreenReaderText(text, tag = "span") {
    const element = document.createElement(tag);
    element.className = "sr-only";
    element.textContent = text;
    return element;
  }

  /**
   * Add loading state announcements
   * @param {HTMLElement} element - Element that's loading
   * @param {string} loadingText - Text to announce while loading
   * @param {string} loadedText - Text to announce when loaded
   */
  addLoadingAnnouncement(element, loadingText = "Loading...", loadedText = "Content loaded") {
    // Add loading announcement
    element.setAttribute("aria-busy", "true");
    this.announce(loadingText);

    // Listen for load completion
    const observer = new MutationObserver(() => {
      if (!element.hasAttribute("aria-busy") || element.getAttribute("aria-busy") === "false") {
        this.announce(loadedText);
        observer.disconnect();
      }
    });

    observer.observe(element, {
      attributes: true,
      attributeFilter: ["aria-busy"],
    });
  }

  /**
   * Enhance form accessibility
   * @param {HTMLFormElement} form - Form to enhance
   */
  enhanceFormAccessibility(form) {
    // Add proper error handling
    const inputs = form.querySelectorAll("input, select, textarea");

    inputs.forEach((input) => {
      // Add required indicator
      if (input.hasAttribute("required") && !input.hasAttribute("aria-required")) {
        input.setAttribute("aria-required", "true");
      }

      // Add error handling
      input.addEventListener("invalid", (event) => {
        const errorId = `${input.id || input.name}-error`;
        let errorElement = document.getElementById(errorId);

        if (!errorElement) {
          errorElement = document.createElement("div");
          errorElement.id = errorId;
          errorElement.className = "error-message";
          errorElement.setAttribute("role", "alert");
          input.parentNode.insertBefore(errorElement, input.nextSibling);
        }

        errorElement.textContent = input.validationMessage;
        input.setAttribute("aria-describedby", errorId);
        input.setAttribute("aria-invalid", "true");
      });

      // Clear errors on valid input
      input.addEventListener("input", () => {
        if (input.validity.valid) {
          input.removeAttribute("aria-invalid");
          const errorId = `${input.id || input.name}-error`;
          const errorElement = document.getElementById(errorId);
          if (errorElement) {
            errorElement.textContent = "";
          }
        }
      });
    });
  }

  /**
   * Add color contrast checking (development helper)
   * @param {HTMLElement} element - Element to check
   * @returns {Object} - Contrast ratio information
   */
  checkColorContrast(element) {
    const styles = window.getComputedStyle(element);
    const backgroundColor = styles.backgroundColor;
    const color = styles.color;

    // This is a simplified contrast checker
    // In production, you'd want to use a more robust library
    return {
      backgroundColor,
      color,
      warning: "Use a proper contrast checking tool for accurate results",
    };
  }
}

// Initialize accessibility utilities
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.accessibilityUtils = new AccessibilityUtils();
  });
} else {
  window.accessibilityUtils = new AccessibilityUtils();
}

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = AccessibilityUtils;
}
