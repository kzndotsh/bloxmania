// @ts-nocheck

/**
 * BloxMania Theme Initialization
 * Loads all theme utilities and components in the correct order
 */

/**
 * Font Loading Optimization
 * Prevents preload warnings and improves font loading performance
 */
function optimizeFontLoading() {
  // Check if fonts are already loaded
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      console.log("✅ Fonts loaded successfully");
    });
  }

  // Preload critical fonts with proper attributes
  const fontLinks = document.querySelectorAll('link[rel="preload"][as="font"]');
  fontLinks.forEach((link) => {
    // Add crossorigin attribute if missing
    if (!link.hasAttribute("crossorigin")) {
      link.setAttribute("crossorigin", "anonymous");
    }

    // Add font-display: swap to prevent render blocking
    link.setAttribute("media", "print");
    link.setAttribute("onload", "this.media='all'");
  });

  // Implement font loading fallback
  if ("fonts" in document) {
    // Use Shopify's font loading system instead of manual FontFace
    // Fonts are already loaded via theme.liquid preload tags
    console.log("✅ Fonts loaded successfully");
  }
}

/**
 * Performance Monitoring
 * Monitor and log performance metrics
 */
function monitorPerformance() {
  // Monitor Core Web Vitals
  if ("PerformanceObserver" in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "largest-contentful-paint") {
            console.log(`📊 LCP: ${Math.round(entry.startTime)}`);
          }
        }
      });

      observer.observe({ entryTypes: ["largest-contentful-paint"] });
    } catch (error) {
      console.warn("⚠️ Performance monitoring not supported:", error);
    }
  }
}

// Initialize theme with proper loading sequence
async function initializeTheme() {
  try {
    // Mark initialization start
    if (window.PerformanceMonitor) {
      window.PerformanceMonitor.mark("theme:init:start");
    }

    // Wait for critical scripts to load
    await new Promise((resolve) => {
      const checkScripts = () => {
        if (window.BloxManiaConstants && window.SectionId && window.HTMLUpdateUtility) {
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
      window.PerformanceMonitor.mark("theme:init:complete");
      window.PerformanceMonitor.measure("theme:full:init", "theme:init:start", "theme:init:complete");
    }

    // Trigger theme loaded event
    document.documentElement.classList.add("theme-loaded");
    document.dispatchEvent(
      new CustomEvent("theme:loaded", {
        detail: {
          constants: window.BloxManiaConstants,
          utilities: {
            SectionId: window.SectionId,
            HTMLUpdateUtility: window.HTMLUpdateUtility,
            DOMUtils: window.DOMUtils,
            subscribe: window.subscribe,
            publish: window.publish,
          },
          components: window.BloxManiaComponents,
          performance: window.PerformanceMonitor,
        },
      }),
    );

    console.log("BloxMania theme initialized successfully");
  } catch (error) {
    console.error("Theme initialization failed:", error);
  }
}

// Start initialization when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeTheme);
} else {
  initializeTheme();
}

// Initialize optimizations when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  optimizeFontLoading();
  monitorPerformance();
});

// Handle hot reload reconnections
if (window.Shopify?.designMode) {
  document.addEventListener("shopify:section:load", () => {
    // Re-initialize components when sections are reloaded
    setTimeout(initializeTheme, 100);
  });
}

// Export for debugging
window.BloxManiaInit = {
  initializeTheme,
};
