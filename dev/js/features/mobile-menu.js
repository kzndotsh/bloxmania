/**
 * Clean Mobile Menu Functionality
 * Simple open/close functionality for the mobile menu
 */

class MobileMenu {
  constructor() {
    this.menu = null;
    this.toggleButton = null;
    this.closeButton = null;
    this.isOpen = false;

    this.init();
  }

  init() {
    this.menu = document.getElementById("mobile-menu");
    this.toggleButton = document.querySelector("[data-mobile-menu-toggle]");
    this.closeButton = document.querySelector(".mobile-menu__close");

    if (!this.menu || !this.toggleButton) {
      console.warn("Mobile menu elements not found");
      return;
    }

    this.bindEvents();
    this.setupAccessibility();
  }

  bindEvents() {
    // Toggle button click
    this.toggleButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.toggle();
    });

    // Close button click
    if (this.closeButton) {
      this.closeButton.addEventListener("click", (e) => {
        e.preventDefault();
        this.close();
      });
    }

    // Close on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.close();
      }
    });

    // Close on overlay click
    this.menu.addEventListener("click", (e) => {
      if (e.target === this.menu) {
        this.close();
      }
    });

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = this.menu.querySelectorAll("a");
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.close();
      });
    });
  }

  setupAccessibility() {
    // Set initial ARIA attributes
    this.menu.setAttribute("aria-hidden", "true");
    this.toggleButton.setAttribute("aria-expanded", "false");
    this.toggleButton.setAttribute("aria-label", "Open mobile menu");
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    if (this.isOpen) return;

    this.isOpen = true;

    // Update ARIA attributes
    this.menu.setAttribute("aria-hidden", "false");
    this.toggleButton.setAttribute("aria-expanded", "true");
    this.toggleButton.setAttribute("aria-label", "Close mobile menu");

    // Add open class to menu and body
    this.menu.classList.add("mobile-menu--open");
    document.body.classList.add("mobile-menu-open");

    // Focus the close button
    if (this.closeButton) {
      const focusDelay = 100;
      setTimeout(() => this.closeButton.focus(), focusDelay);
    }

    // Emit custom event
    this.emitEvent("mobileMenuOpened");
  }

  close() {
    if (!this.isOpen) return;

    this.isOpen = false;

    // Update ARIA attributes
    this.menu.setAttribute("aria-hidden", "true");
    this.toggleButton.setAttribute("aria-expanded", "false");
    this.toggleButton.setAttribute("aria-label", "Open mobile menu");

    // Remove open class from menu and body
    this.menu.classList.remove("mobile-menu--open");
    document.body.classList.remove("mobile-menu-open");

    // Return focus to toggle button
    if (this.toggleButton) {
      const focusDelay = 100;
      setTimeout(() => this.toggleButton.focus(), focusDelay);
    }

    // Emit custom event
    this.emitEvent("mobileMenuClosed");
  }

  emitEvent(eventName) {
    const event = new CustomEvent(eventName, {
      detail: { isOpen: this.isOpen },
    });
    document.dispatchEvent(event);
  }
}

// Initialize mobile menu when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.mobileMenu = new MobileMenu();
});
