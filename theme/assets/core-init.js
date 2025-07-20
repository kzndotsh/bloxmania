/**
 * BloxMania Theme Initialization
 * Loads all theme utilities and components in the correct order
 */

// Load order: Constants -> Utilities -> Components -> Performance -> Global
const loadScript = (src, type = 'module') => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.type = type;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// Initialize theme with proper loading sequence
async function initializeTheme() {
  try {
    // Mark initialization start
    if (window.PerformanceMonitor) {
      window.PerformanceMonitor.mark('theme:init:start');
    }

    // Wait for critical scripts to load
    await new Promise((resolve) => {
      const checkScripts = () => {
        if (window.BloxManiaConstants && window.DawnUtilities) {
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
      window.PerformanceMonitor.mark('theme:init:complete');
      window.PerformanceMonitor.measure(
        'theme:full:init',
        'theme:init:start',
        'theme:init:complete'
      );
    }

    // Trigger theme loaded event
    document.documentElement.classList.add('theme-loaded');
    document.dispatchEvent(
      new CustomEvent('theme:loaded', {
        detail: {
          constants: window.BloxManiaConstants,
          utilities: window.DawnUtilities,
          components: window.BloxManiaComponents,
          performance: window.PerformanceMonitor,
        },
      })
    );

    console.log('BloxMania theme initialized successfully');
  } catch (error) {
    console.error('Theme initialization failed:', error);
  }
}

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTheme);
} else {
  initializeTheme();
}

// Handle hot reload reconnections
if (window.Shopify?.designMode) {
  document.addEventListener('shopify:section:load', () => {
    // Re-initialize components when sections are reloaded
    setTimeout(initializeTheme, 100);
  });
}

// Export for debugging
window.BloxManiaInit = {
  initializeTheme,
  loadScript,
};
