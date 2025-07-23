/**
 * Console Cleanup and Preload Management
 * Removes problematic preload tags and suppresses non-critical console warnings
 */

(function () {
  "use strict";

  // Remove problematic preload tags that cause 404 errors
  function cleanupPreloadTags() {
    const preloads = document.querySelectorAll('link[rel="preload"]');
    preloads.forEach(function (preload) {
      const href = preload.getAttribute("href");
      if (
        href &&
        (href.includes("/assets/style-base.css") ||
          href.includes("/assets/global.js") ||
          href.includes("/assets/init.js") ||
          href.includes("/assets/core.bundle.js") ||
          (href.includes("/assets/") && !href.includes("cdn.shopify.com")))
      ) {
        preload.remove();
      }
    });
  }

  // Run immediately and also on DOMContentLoaded
  cleanupPreloadTags();
  document.addEventListener("DOMContentLoaded", cleanupPreloadTags);

  // Also run after a short delay to catch any late-added preloads
  setTimeout(cleanupPreloadTags, 100);

  // Suppress non-critical console warnings
  const originalWarn = console.warn;
  const originalError = console.error;

  console.warn = function (...args) {
    const message = args.join(" ");

    // Suppress specific non-critical warnings
    if (
      message.includes("preloaded with link preload was not used within a few seconds") ||
      message.includes("Ignoring unsupported entryTypes: layout-shift") ||
      message.includes("No valid entryTypes; aborting registration") ||
      message.includes("Expected media feature name but found") ||
      message.includes("Unknown property") ||
      message.includes("Error in parsing value for") ||
      message.includes("Found invalid value for media feature") ||
      message.includes("Ruleset ignored due to bad selector") ||
      message.includes("Unknown pseudo-class or pseudo-element") ||
      message.includes("Declaration dropped") ||
      message.includes("Cookie has been rejected for invalid domain") ||
      message.includes("Content-Security-Policy: Ignoring")
    ) {
      return; // Suppress these warnings
    }

    // Log other warnings normally
    originalWarn.apply(console, args);
  };

  console.error = function (...args) {
    const message = args.join(" ");

    // Suppress specific non-critical errors
    if (
      message.includes("Source map error") ||
      message.includes("installHook.js.map") ||
      (message.includes("404") && message.includes("assets/"))
    ) {
      return; // Suppress these errors
    }

    // Log other errors normally
    originalError.apply(console, args);
  };

  // Handle duplicate custom element registration gracefully
  const originalDefine = window.customElements.define;
  window.customElements.define = function (name, constructor, options) {
    try {
      return originalDefine.call(this, name, constructor, options);
    } catch (error) {
      if (error.message.includes("has already been defined")) {
        console.debug(`Custom element '${name}' already defined, skipping registration`);
        return;
      }
      throw error;
    }
  };
})();
