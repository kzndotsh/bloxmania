/**
 * Shopify Analytics Syntax Fix
 * Fixes syntax errors in Shopify's analytics scripts that cause console errors
 */

(function () {
  "use strict";

  // Run immediately, don't wait for DOM

  // Function to fix the syntax error in scripts
  function fixShopifyAnalyticsScript(scriptElement) {
    if (!scriptElement || !scriptElement.textContent) return;

    const content = scriptElement.textContent;

    // Fix the specific syntax error: missing semicolon between var declarations
    if (content.includes('""var session_token')) {
      const fixedContent = content.replace(/""var session_token/g, '"";var session_token');

      // Only update if content actually changed
      if (fixedContent !== content) {
        scriptElement.textContent = fixedContent;
      }
    }

    // Fix other potential similar issues
    if (content.includes('""var ')) {
      const fixedContent = content.replace(/""var /g, '"";var ');

      if (fixedContent !== content) {
        scriptElement.textContent = fixedContent;
      }
    }
  }

  // Fix existing scripts immediately
  function fixExistingScripts() {
    const scripts = document.querySelectorAll("script");
    scripts.forEach(fixShopifyAnalyticsScript);
  }

  // Override document.createElement to fix scripts as they're created
  const originalCreateElement = document.createElement;
  document.createElement = function (tagName) {
    const element = originalCreateElement.call(document, tagName);

    if (tagName.toLowerCase() === "script") {
      // Override the textContent setter to fix content as it's set
      try {
        const originalTextContent = Object.getOwnPropertyDescriptor(Element.prototype, "textContent");

        if (originalTextContent) {
          Object.defineProperty(element, "textContent", {
            get: function () {
              return originalTextContent.get.call(this);
            },
            set: function (value) {
              if (typeof value === "string" && value.includes('""var session_token')) {
                value = value.replace(/""var session_token/g, '"";var session_token');
              }
              if (typeof value === "string" && value.includes('""var ')) {
                value = value.replace(/""var /g, '"";var ');
              }
              originalTextContent.set.call(this, value);
            },
          });
        }
      } catch (error) {
        // Silently ignore errors with property descriptor
      }
    }

    return element;
  };

  // Fix scripts as they're added to the DOM
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) {
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "SCRIPT") {
          fixShopifyAnalyticsScript(node);
        }
      });
    });
  });

  // Start observing for new scripts
  observer.observe(document, {
    childList: true,
    subtree: true,
  });

  // Fix any existing scripts immediately
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fixExistingScripts);
  } else {
    fixExistingScripts();
  }

  // Also fix after a short delay to catch any late-loaded scripts
  setTimeout(fixExistingScripts, 100);
  setTimeout(fixExistingScripts, 500);
  setTimeout(fixExistingScripts, 1000);
})();
