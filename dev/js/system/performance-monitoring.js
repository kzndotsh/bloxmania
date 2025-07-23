/**
 * Performance Monitoring
 * Monitors Core Web Vitals and reports to analytics
 */

(function () {
  "use strict";

  // Core Web Vitals monitoring
  if ("PerformanceObserver" in window) {
    // LCP (Largest Contentful Paint)
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log("LCP:", lastEntry.startTime);

      // Report to analytics if needed
      if (window.gtag) {
        gtag("event", "LCP", {
          value: Math.round(lastEntry.startTime),
          event_category: "Web Vitals",
        });
      }
    }).observe({ entryTypes: ["largest-contentful-paint"] });

    // FID (First Input Delay)
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        console.log("FID:", entry.processingStart - entry.startTime);

        if (window.gtag) {
          gtag("event", "FID", {
            value: Math.round(entry.processingStart - entry.startTime),
            event_category: "Web Vitals",
          });
        }
      });
    }).observe({ entryTypes: ["first-input"] });

    // CLS (Cumulative Layout Shift) - with fallback for unsupported browsers
    let clsValue = 0;
    try {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            console.log("CLS:", clsValue);

            if (window.gtag) {
              gtag("event", "CLS", {
                value: Math.round(clsValue * 1000) / 1000,
                event_category: "Web Vitals",
              });
            }
          }
        });
      }).observe({ entryTypes: ["layout-shift"] });
    } catch (error) {
      // Silently handle unsupported entry types
      console.debug("Layout shift monitoring not supported in this browser");
    }
  }
})();
