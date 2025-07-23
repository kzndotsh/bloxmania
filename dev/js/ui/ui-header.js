/**
 * Header Drawer - Following Dawn's Web Component patterns
 * Handles header scroll effects and mobile menu with proper focus management
 */

// Only declare if not already declared
if (typeof HeaderDrawer === "undefined") {
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
      this.header = this.querySelector(".header");
      this.drawer = this.querySelector(".mobile-menu");
      this.menuButton = this.querySelector(".mobile-menu-toggle");
      this.closeButton = this.querySelector("#mobile-menu-close");

      this.bindEvents();
      this.setupScrollEffects();
    }

    bindEvents() {
      this.menuButton?.addEventListener("click", () => this.openDrawer());
      this.closeButton?.addEventListener("click", () => this.closeDrawer());

      // Close on escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && this.isOpen) {
          this.closeDrawer();
        }
      });

      // Close on backdrop click
      this.addEventListener("click", (e) => {
        if (e.target === this && this.isOpen) {
          this.closeDrawer();
        }
      });
    }

    setupScrollEffects() {
      let lastScrollTop = 0;
      const scrollThreshold = 100;
      const maxScrollForEffect = 300; // Maximum scroll distance for full effect

      const updateHeaderStyles = (scrollTop) => {
        if (!this.header) return;

        // Calculate scroll progress (0 to 1)
        const scrollProgress = Math.min(scrollTop / maxScrollForEffect, 1);

        // Set CSS custom properties for smooth transitions
        this.header.style.setProperty("--scroll-progress", scrollProgress);

        // Apply appropriate classes based on scroll position
        if (scrollTop > scrollThreshold) {
          this.header.classList.add("header--dynamic");
          this.header.classList.remove("header--transparent");
        } else {
          this.header.classList.remove("header--dynamic");
          this.header.classList.add("header--transparent");
        }

        // Hide/show header on scroll (optional - can be removed if not needed)
        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
          this.header.classList.add("header--hidden");
        } else {
          this.header.classList.remove("header--hidden");
        }
      };

      window.addEventListener("scroll", () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        updateHeaderStyles(scrollTop);
        lastScrollTop = scrollTop;
      });

      // Initialize header state on page load - always start transparent
      this.header.classList.add("header--transparent");
      this.header.classList.remove("header--dynamic");
      this.header.classList.remove("header--hidden");

      // Force the header to be transparent on page load
      this.header.style.setProperty("--scroll-progress", "0");

      // Don't update header styles on page load - let the scroll event handle it
      // This ensures the header stays transparent until the user actually scrolls
    }

    openDrawer() {
      this.isOpen = true;
      this.setAttribute("open", "");
      document.body.classList.add("header-drawer-open");
      this.closeButton?.focus();

      // Trap focus
      this.trapFocus();
    }

    closeDrawer() {
      this.isOpen = false;
      this.removeAttribute("open");
      document.body.classList.remove("header-drawer-open");
      this.menuButton?.focus();

      // Remove focus trap
      this.removeTrapFocus();
    }

    trapFocus() {
      const focusableElements = this.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      this.addEventListener("keydown", (e) => {
        if (e.key !== "Tab") return;

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
      this.removeEventListener("keydown", this.trapFocus);
    }
  }

  // Register the component
  if (!customElements.get("header-drawer")) {
    customElements.define("header-drawer", HeaderDrawer);
  }

  // Export for global scope
  window.HeaderDrawer = HeaderDrawer;
}

// Backward compatibility class
class HeaderUtils {
  constructor() {
    console.warn("HeaderUtils is deprecated. Use HeaderDrawer Web Component instead.");

    // Try to find or create HeaderDrawer element
    let headerDrawer = document.querySelector("header-drawer");
    if (!headerDrawer) {
      headerDrawer = document.createElement("header-drawer");
      const header = document.querySelector("header");
      if (header) {
        header.appendChild(headerDrawer);
      }
    }

    return headerDrawer;
  }
}
