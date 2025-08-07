/**
 * Hero Mobile Handler
 * Handles mobile-specific actions for hero section buttons
 */

class HeroMobileHandler {
  constructor() {
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    // Handle hero Shop Now button on mobile
    document.addEventListener('click', (e) => {
      const target = e.target.closest('[data-mobile-action="open-menu"]');
      if (!target) return;

      // Only handle on mobile devices
      if (window.innerWidth >= 768) return;

      e.preventDefault();
      
      // Open mobile menu if available
      if (window.mobileMenu && typeof window.mobileMenu.open === 'function') {
        window.mobileMenu.open();
      } else {
        // Fallback: trigger mobile menu toggle button
        const mobileMenuToggle = document.querySelector('[data-mobile-menu-toggle]');
        if (mobileMenuToggle) {
          mobileMenuToggle.click();
        }
      }
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new HeroMobileHandler();
});