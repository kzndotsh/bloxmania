/**
 * BloxMania Core - DOM Utilities
 * Professional DOM manipulation and utility functions
 */

class DOMUtils {
  /**
   * Get focusable elements within a container
   * @param {Element} container - The container element
   * @returns {Element[]} Array of focusable elements
   */
  static getFocusableElements(container) {
    return Array.from(
      container.querySelectorAll(
        'summary, a[href], button:enabled, [tabindex]:not([tabindex^="-"]), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe',
      ),
    );
  }

  /**
   * Debounce function calls
   * @param {Function} fn - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} Debounced function
   */
  static debounce(fn, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        fn(...args);
      };
      clearTimeout(timeout);
      const debounceWait = wait || window.THEME_CONFIG?.ON_CHANGE_DEBOUNCE_TIMER || 300;
      timeout = setTimeout(later, debounceWait);
    };
  }

  /**
   * Throttle function calls
   * @param {Function} fn - Function to throttle
   * @param {number} delay - Delay time in milliseconds
   * @returns {Function} Throttled function
   */
  static throttle(fn, delay) {
    let lastCall = 0;
    return function executedFunction(...args) {
      const now = Date.now();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return fn.apply(this, args);
    };
  }

  /**
   * Check if element is in viewport
   * @param {Element} element - Element to check
   * @returns {boolean} True if element is in viewport
   */
  static isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  /**
   * Smooth scroll to element
   * @param {Element|string} target - Element or selector to scroll to
   * @param {Object} options - Scroll options
   */
  static smoothScrollTo(target, options = {}) {
    const element = typeof target === "string" ? document.querySelector(target) : target;
    if (!element) return;

    const defaultOptions = {
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    };

    element.scrollIntoView({ ...defaultOptions, ...options });
  }

  /**
   * Create and dispatch custom event
   * @param {string} eventName - Event name
   * @param {Object} detail - Event detail
   * @param {Element} target - Target element (defaults to document)
   */
  static dispatchEvent(eventName, detail = {}, target = document) {
    const event = new CustomEvent(eventName, {
      detail,
      bubbles: true,
      cancelable: true,
    });
    target.dispatchEvent(event);
  }

  /**
   * Add event listener with automatic cleanup
   * @param {Element} element - Element to add listener to
   * @param {string} event - Event type
   * @param {Function} handler - Event handler
   * @param {Object} options - Event options
   * @returns {Function} Cleanup function
   */
  static addEventListener(element, event, handler, options = {}) {
    element.addEventListener(event, handler, options);

    return () => {
      element.removeEventListener(event, handler, options);
    };
  }

  /**
   * Toggle element visibility
   * @param {Element} element - Element to toggle
   * @param {boolean} show - Whether to show or hide
   * @param {string} display - Display value when showing
   */
  static toggleVisibility(element, show, display = "block") {
    if (show) {
      element.style.display = display;
      element.removeAttribute("hidden");
    } else {
      element.style.display = "none";
      element.setAttribute("hidden", "");
    }
  }

  /**
   * Add loading state to element
   * @param {Element} element - Element to add loading state to
   * @param {boolean} loading - Whether to add or remove loading state
   */
  static setLoadingState(element, loading) {
    if (loading) {
      element.setAttribute("aria-busy", "true");
      element.classList.add("loading");
    } else {
      element.removeAttribute("aria-busy");
      element.classList.remove("loading");
    }
  }

  /**
   * Get computed style value
   * @param {Element} element - Element to get style from
   * @param {string} property - CSS property name
   * @returns {string} Computed style value
   */
  static getComputedStyle(element, property) {
    return window.getComputedStyle(element).getPropertyValue(property);
  }

  /**
   * Set CSS custom property
   * @param {Element} element - Element to set property on
   * @param {string} property - CSS custom property name
   * @param {string} value - Property value
   */
  static setCSSProperty(element, property, value) {
    element.style.setProperty(property, value);
  }

  /**
   * Get CSS custom property
   * @param {Element} element - Element to get property from
   * @param {string} property - CSS custom property name
   * @returns {string} Property value
   */
  static getCSSProperty(element, property) {
    return this.getComputedStyle(element, property);
  }

  /**
   * Check if element matches selector
   * @param {Element} element - Element to check
   * @param {string} selector - CSS selector
   * @returns {boolean} True if element matches selector
   */
  static matches(element, selector) {
    return element.matches(selector);
  }

  /**
   * Find closest ancestor matching selector
   * @param {Element} element - Starting element
   * @param {string} selector - CSS selector
   * @returns {Element|null} Closest matching ancestor or null
   */
  static closest(element, selector) {
    return element.closest(selector);
  }

  /**
   * Find all siblings of element
   * @param {Element} element - Element to find siblings of
   * @param {string} selector - Optional CSS selector to filter siblings
   * @returns {Element[]} Array of sibling elements
   */
  static getSiblings(element, selector = null) {
    const siblings = Array.from(element.parentNode.children).filter((child) => child !== element);

    if (selector) {
      return siblings.filter((sibling) => this.matches(sibling, selector));
    }

    return siblings;
  }

  /**
   * Create element with attributes and content
   * @param {string} tagName - HTML tag name
   * @param {Object} attributes - Element attributes
   * @param {string|Element} content - Element content
   * @returns {Element} Created element
   */
  static createElement(tagName, attributes = {}, content = null) {
    const element = document.createElement(tagName);

    // Set attributes
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === "className") {
        element.className = value;
      } else if (key === "textContent") {
        element.textContent = value;
      } else if (key === "innerHTML") {
        element.innerHTML = value;
      } else {
        element.setAttribute(key, value);
      }
    });

    // Set content
    if (content) {
      if (typeof content === "string") {
        element.textContent = content;
      } else if (content instanceof Element) {
        element.appendChild(content);
      }
    }

    return element;
  }

  /**
   * Remove element from DOM
   * @param {Element} element - Element to remove
   */
  static removeElement(element) {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }

  /**
   * Insert element after reference element
   * @param {Element} element - Element to insert
   * @param {Element} reference - Reference element
   */
  static insertAfter(element, reference) {
    reference.parentNode.insertBefore(element, reference.nextSibling);
  }

  /**
   * Replace element with new element
   * @param {Element} oldElement - Element to replace
   * @param {Element} newElement - New element
   */
  static replaceElement(oldElement, newElement) {
    oldElement.parentNode.replaceChild(newElement, oldElement);
  }
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = DOMUtils;
} else {
  window.DOMUtils = DOMUtils;
}
