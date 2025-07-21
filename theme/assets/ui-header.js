/**
 * Header Drawer - Following Dawn's Web Component patterns
 * Handles header scroll effects and mobile menu with proper focus management
 */

// Only declare if not already declared
if (typeof HeaderDrawer === 'undefined') {
  class HeaderDrawer extends HTMLElement {
    constructor() {
      super();
      this.header = null;
      this.drawer = null;
      this.menuButton = null;
      this.closeButton = null;
      this.isOpen = false;
    }

    connectedCallback() {
      this.header = this.querySelector('.header');
      this.drawer = this.querySelector('.header__inline-menu');
      this.menuButton = this.querySelector('.header__icon--menu');
      this.closeButton = this.querySelector('.header__icon--close');

      this.bindEvents();
      this.setupScrollEffects();
    }

    bindEvents() {
      this.menuButton?.addEventListener('click', () => this.openDrawer());
      this.closeButton?.addEventListener('click', () => this.closeDrawer());

      // Close on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.closeDrawer();
        }
      });

      // Close on backdrop click
      this.addEventListener('click', (e) => {
        if (e.target === this && this.isOpen) {
          this.closeDrawer();
        }
      });
    }

    setupScrollEffects() {
      let lastScrollTop = 0;
      const scrollThreshold = 100;

      window.addEventListener('scroll', () => {
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > scrollThreshold) {
          this.header?.classList.add('header--scrolled');
        } else {
          this.header?.classList.remove('header--scrolled');
        }

        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
          this.header?.classList.add('header--hidden');
        } else {
          this.header?.classList.remove('header--hidden');
        }

        lastScrollTop = scrollTop;
      });
    }

    openDrawer() {
      this.isOpen = true;
      this.setAttribute('open', '');
      document.body.classList.add('header-drawer-open');
      this.closeButton?.focus();

      // Trap focus
      this.trapFocus();
    }

    closeDrawer() {
      this.isOpen = false;
      this.removeAttribute('open');
      document.body.classList.remove('header-drawer-open');
      this.menuButton?.focus();

      // Remove focus trap
      this.removeTrapFocus();
    }

    trapFocus() {
      const focusableElements = this.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      this.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      });
    }

    removeTrapFocus() {
      this.removeEventListener('keydown', this.trapFocus);
    }
  }

  // Register the component
  if (!customElements.get('header-drawer')) {
    customElements.define('header-drawer', HeaderDrawer);
  }

  // Export for global scope
  window.HeaderDrawer = HeaderDrawer;
}

// Backward compatibility class
class HeaderUtils {
  constructor() {
    console.warn(
      'HeaderUtils is deprecated. Use HeaderDrawer Web Component instead.'
    );

    // Try to find or create HeaderDrawer element
    let headerDrawer = document.querySelector('header-drawer');
    if (!headerDrawer) {
      headerDrawer = document.createElement('header-drawer');
      const header = document.querySelector('header');
      if (header) {
        header.appendChild(headerDrawer);
      }
    }

    return headerDrawer;
  }
}
