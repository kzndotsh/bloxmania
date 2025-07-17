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