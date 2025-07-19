/**
 * HTML Update Utility - Following Dawn's HTMLUpdateUtility pattern
 * Handles dynamic HTML updates with proper script execution and event handling
 */

class HTMLUpdateUtility {
  /**
   * Update HTML content with proper script execution
   * @param {Element} targetElement - Element to update
   * @param {string} newHTML - New HTML content
   * @param {Object} options - Update options
   */
  static updateHTML(targetElement, newHTML, options = {}) {
    const {
      executeScripts = true,
      preserveScroll = false,
      focusElement = null,
      onComplete = null
    } = options;

    // Preserve scroll position if requested
    const scrollPosition = preserveScroll ? {
      x: window.scrollX,
      y: window.scrollY
    } : null;

    // Create temporary container
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = newHTML;

    // Extract and handle scripts
    const scripts = tempContainer.querySelectorAll('script');
    const scriptPromises = [];

    if (executeScripts) {
      scripts.forEach(script => {
        const newScript = document.createElement('script');
        
        // Copy attributes
        Array.from(script.attributes).forEach(attr => {
          newScript.setAttribute(attr.name, attr.value);
        });

        // Handle inline scripts
        if (!script.src) {
          newScript.textContent = script.textContent;
        }

        // Create promise for script loading
        if (script.src) {
          const promise = new Promise((resolve, reject) => {
            newScript.onload = resolve;
            newScript.onerror = reject;
          });
          scriptPromises.push(promise);
        }

        // Replace old script with new one
        script.parentNode.replaceChild(newScript, script);
      });
    }

    // Update the target element
    targetElement.innerHTML = tempContainer.innerHTML;

    // Wait for scripts to load
    Promise.all(scriptPromises).then(() => {
      // Restore scroll position
      if (scrollPosition) {
        window.scrollTo(scrollPosition.x, scrollPosition.y);
      }

      // Focus element if specified
      if (focusElement) {
        const elementToFocus = typeof focusElement === 'string' 
          ? targetElement.querySelector(focusElement)
          : focusElement;
        
        if (elementToFocus) {
          elementToFocus.focus();
        }
      }

      // Execute completion callback
      if (onComplete) {
        onComplete(targetElement);
      }

      // Dispatch custom event
      targetElement.dispatchEvent(new CustomEvent('html:updated', {
        detail: { targetElement, newHTML }
      }));
    }).catch(error => {
      console.error('Error loading scripts during HTML update:', error);
    });
  }

  /**
   * Update specific sections of the page (Dawn pattern)
   * @param {Object} sections - Object with section IDs as keys and HTML as values
   * @param {Object} options - Update options
   */
  static updateSections(sections, options = {}) {
    Object.entries(sections).forEach(([sectionId, html]) => {
      const targetElement = document.getElementById(sectionId);
      if (targetElement) {
        this.updateHTML(targetElement, html, options);
      }
    });
  }

  /**
   * Safely parse HTML string
   * @param {string} htmlString - HTML string to parse
   * @returns {DocumentFragment} - Parsed document fragment
   */
  static parseHTML(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const fragment = document.createDocumentFragment();
    
    // Move all body children to fragment
    while (doc.body.firstChild) {
      fragment.appendChild(doc.body.firstChild);
    }
    
    return fragment;
  }

  /**
   * Extract specific element from HTML string
   * @param {string} htmlString - HTML string
   * @param {string} selector - CSS selector
   * @returns {Element|null} - Found element or null
   */
  static extractElement(htmlString, selector) {
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = htmlString;
    return tempContainer.querySelector(selector);
  }

  /**
   * Merge HTML attributes from source to target
   * @param {Element} target - Target element
   * @param {Element} source - Source element
   * @param {Array} excludeAttributes - Attributes to exclude from merge
   */
  static mergeAttributes(target, source, excludeAttributes = ['id', 'class']) {
    Array.from(source.attributes).forEach(attr => {
      if (!excludeAttributes.includes(attr.name)) {
        target.setAttribute(attr.name, attr.value);
      }
    });
  }
}

// Export for use in global scope
window.HTMLUpdateUtility = HTMLUpdateUtility;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HTMLUpdateUtility;
}