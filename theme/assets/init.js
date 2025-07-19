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

    // Load core utilities first
    await loadScript('/assets/constants.js');
    await loadScript('/assets/dawn-utilities.js');

    // Load Web Components
    await loadScript('/assets/web-components.js');

    // Load performance monitor
    await loadScript('/assets/performance-monitor.js');

    // Load global functionality
    await loadScript('/assets/global.js');

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

    // Fallback: try to load basic functionality
    try {
      await loadScript('/assets/global.js');
      console.log('Fallback theme initialization completed');
    } catch (fallbackError) {
      console.error('Fallback initialization also failed:', fallbackError);
    }
  }
}

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTheme);
} else {
  initializeTheme();
}

// Export for debugging
window.BloxManiaInit = {
  initializeTheme,
  loadScript,
};
