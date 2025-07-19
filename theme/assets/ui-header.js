/**
 * Header Drawer - Following Dawn's Web Component patterns
 * Handles header scroll effects and mobile menu with proper focus management
 */

class HeaderDrawer extends HTMLElement {
  constructor() {
    super();
    
    this.header = null;
    this.mobileMenuToggle = null;
    this.mobileMenu = null;
    this.mobileMenuClose = null;
    this.focusTrap = null;
    this.isOpen = false;
  }

  connectedCallback() {
    this.header = this.querySelector('.header-wrapper') || document.querySelector('.header-wrapper');
    this.mobileMenuToggle = this.querySelector('#mobile-menu-toggle') || document.getElementById('mobile-menu-toggle');
    this.mobileMenu = this.querySelector('#mobile-menu') || document.getElementById('mobile-menu');
    this.mobileMenuClose = this.querySelector('#mobile-menu-close') || document.getElementById('mobile-menu-close');
    
    this.setupScrollEffect();
    this.setupMobileMenu();
    this.setupAccessibility();
  }

  disconnectedCallback() {
    this.cleanup();
  }

  setupScrollEffect() {
    if (!this.header) return;

    this.scrollHandler = window.DOMUtils ? 
      window.DOMUtils.throttle(this.updateHeaderState.bind(this), 16) :
      this.updateHeaderState.bind(this);

    window.addEventListener('scroll', this.scrollHandler, { passive: true });
    
    // Initial state
    this.updateHeaderState();
  }

  updateHeaderState() {
    if (!this.header) return;
    
    const scrolled = window.scrollY > 10;
    this.header.classList.toggle('scrolled', scrolled);
    this.header.classList.toggle('header-transparent', !scrolled);
  }

  setupMobileMenu() {
    if (!this.mobileMenuToggle || !this.mobileMenu || !this.mobileMenuClose) return;

    // Use proper event delegation
    this.addEventListener('click', this.handleClick.bind(this));
    
    // Handle escape key
    this.escapeHandler = (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    };
    
    document.addEventListener('keydown', this.escapeHandler);
  }

  setupAccessibility() {
    // Set up ARIA attributes
    if (this.mobileMenuToggle) {
      this.mobileMenuToggle.setAttribute('aria-expanded', 'false');
      this.mobileMenuToggle.setAttribute('aria-controls', 'mobile-menu');
    }
    
    if (this.mobileMenu) {
      this.mobileMenu.setAttribute('role', 'dialog');
      this.mobileMenu.setAttribute('aria-modal', 'true');
      this.mobileMenu.setAttribute('aria-labelledby', 'mobile-menu-title');
    }
  }

  handleClick(event) {
    const target = event.target;
    
    if (target === this.mobileMenuToggle || target.closest('#mobile-menu-toggle')) {
      event.preventDefault();
      this.open();
    } else if (target === this.mobileMenuClose || target.closest('#mobile-menu-close')) {
      event.preventDefault();
      this.close();
    } else if (target === this.mobileMenu && !target.closest('.mobile-menu > *')) {
      // Clicked on backdrop
      this.close();
    }
  }

  open() {
    if (this.isOpen) return;
    
    this.isOpen = true;
    this.mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Update ARIA attributes
    if (this.mobileMenuToggle) {
      this.mobileMenuToggle.setAttribute('aria-expanded', 'true');
    }
    
    // Set up focus trap
    this.setupFocusTrap();
    
    // Dispatch custom event
    this.dispatchEvent(new CustomEvent('drawer:opened', {
      bubbles: true,
      detail: { drawer: this }
    }));
  }

  close() {
    if (!this.isOpen) return;
    
    this.isOpen = false;
    this.mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
    
    // Update ARIA attributes
    if (this.mobileMenuToggle) {
      this.mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }
    
    // Remove focus trap and return focus
    this.removeFocusTrap();
    
    // Return focus to toggle button
    if (this.mobileMenuToggle) {
      this.mobileMenuToggle.focus();
    }
    
    // Dispatch custom event
    this.dispatchEvent(new CustomEvent('drawer:closed', {
      bubbles: true,
      detail: { drawer: this }
    }));
  }

  setupFocusTrap() {
    if (window.DOMUtils && this.mobileMenu) {
      this.focusTrap = window.DOMUtils.trapFocus(this.mobileMenu);
    } else {
      // Fallback focus management
      const firstFocusable = this.mobileMenu.querySelector('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }
  }

  removeFocusTrap() {
    if (this.focusTrap && typeof this.focusTrap === 'function') {
      this.focusTrap();
      this.focusTrap = null;
    }
  }

  cleanup() {
    // Remove event listeners
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
    
    if (this.escapeHandler) {
      document.removeEventListener('keydown', this.escapeHandler);
    }
    
    // Remove focus trap
    this.removeFocusTrap();
    
    // Reset body overflow
    if (this.isOpen) {
      document.body.style.overflow = '';
    }
  }

  // Public API methods
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  get opened() {
    return this.isOpen;
  }
}

// Backward compatibility class
class HeaderUtils {
  constructor() {
    console.warn('HeaderUtils is deprecated. Use HeaderDrawer Web Component instead.');
    
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

// Register the custom element
if (!customElements.get('header-drawer')) {
  customElements.define('header-drawer', HeaderDrawer);
}

// Export for use in global scope
window.HeaderDrawer = HeaderDrawer;
window.HeaderUtils = HeaderUtils;