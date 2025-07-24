/**
 * Mobile Menu Functionality
 * Handles mobile menu toggle, animations, and interactions
 */

class MobileMenu {
  constructor() {
    this.menu = null;
    this.toggleButton = null;
    this.closeButton = null;
    this.isOpen = false;
    this.isAnimating = false;

    this.init();
  }

  init() {
    this.menu = document.getElementById("mobile-menu");
    this.toggleButton = document.querySelector("[data-mobile-menu-toggle]");
    this.closeButton = document.querySelector(".mobile-menu__close");

    console.log("MobileMenu: Init called");
    console.log("MobileMenu: menu element:", this.menu);
    console.log("MobileMenu: toggle button:", this.toggleButton);
    console.log("MobileMenu: close button:", this.closeButton);

    // Debug: Check for desktop navigation
    const desktopNav = document.querySelector(".header .hidden.md\\:flex");
    console.log("MobileMenu: Desktop nav element:", desktopNav);
    if (desktopNav) {
      console.log("MobileMenu: Desktop nav classes:", desktopNav.className);
      console.log("MobileMenu: Desktop nav computed styles:", window.getComputedStyle(desktopNav));
    }

    if (!this.menu || !this.toggleButton) {
      console.warn("Mobile menu elements not found");
      return;
    }

    // Ensure mobile menu has proper initial state
    this.menu.style.display = "none";
    this.menu.style.visibility = "hidden";
    this.menu.style.opacity = "0";
    this.menu.style.transform = "translateX(-100%)";
    this.menu.style.zIndex = "999999";
    this.menu.style.position = "fixed";
    this.menu.style.top = "0";
    this.menu.style.left = "0";
    this.menu.style.width = "100%";
    this.menu.style.height = "100vh";

    // Ensure header elements are visible
    const header = this.menu.querySelector(".mobile-menu__header");
    const logo = this.menu.querySelector(".mobile-menu__logo-link");
    const closeBtn = this.menu.querySelector(".mobile-menu__close");

    if (header) {
      header.style.display = "flex";
      header.style.visibility = "visible";
      header.style.opacity = "1";
      header.style.zIndex = "999999";
    }

    if (logo) {
      logo.style.display = "flex";
      logo.style.visibility = "visible";
      logo.style.opacity = "1";
    }

    if (closeBtn) {
      closeBtn.style.display = "flex";
      closeBtn.style.visibility = "visible";
      closeBtn.style.opacity = "1";
      closeBtn.style.zIndex = "999999";
    }

    this.bindEvents();
    this.setupAccessibility();
    console.log("MobileMenu: Initialization complete");
  }

  bindEvents() {
    console.log("MobileMenu: Binding events");

    // Toggle button click
    this.toggleButton.addEventListener("click", (e) => {
      console.log("MobileMenu: Toggle button clicked");
      e.preventDefault();
      this.toggle();
    });

    // Close button click
    if (this.closeButton) {
      this.closeButton.addEventListener("click", (e) => {
        console.log("MobileMenu: Close button clicked");
        e.preventDefault();
        this.close();
      });
    }

    // Close on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        console.log("MobileMenu: Escape key pressed");
        this.close();
      }
    });

    // Close on overlay click
    this.menu.addEventListener("click", (e) => {
      if (e.target === this.menu) {
        console.log("MobileMenu: Overlay clicked");
        this.close();
      }
    });

    // Prevent body scroll when menu is open
    this.menu.addEventListener("transitionstart", () => {
      console.log("MobileMenu: Transition started");
      if (this.isOpen) {
        document.body.style.overflow = "hidden";
      }
    });

    this.menu.addEventListener("transitionend", () => {
      console.log("MobileMenu: Transition ended");
      if (!this.isOpen) {
        document.body.style.overflow = "";
      }
      this.isAnimating = false;
    });
  }

  setupAccessibility() {
    // Set initial ARIA attributes
    this.menu.setAttribute("aria-hidden", "true");
    this.menu.setAttribute("aria-label", "Mobile navigation menu");

    if (this.toggleButton) {
      this.toggleButton.setAttribute("aria-expanded", "false");
      this.toggleButton.setAttribute("aria-controls", "mobile-menu");
      this.toggleButton.setAttribute("aria-label", "Open mobile menu");
    }

    if (this.closeButton) {
      this.closeButton.setAttribute("aria-label", "Close mobile menu");
    }

    // Trap focus when menu is open
    this.setupFocusTrap();
  }

  setupFocusTrap() {
    const focusableElements = this.menu.querySelectorAll(
      'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    this.menu.addEventListener("keydown", (e) => {
      if (!this.isOpen) return;

      if (e.key === "Tab") {
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
      }
    });
  }

  toggle() {
    console.log("MobileMenu: Toggle called, isOpen:", this.isOpen);
    if (this.isAnimating) return;

    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    console.log("MobileMenu: Opening menu");
    if (this.isAnimating || this.isOpen) return;

    this.isAnimating = true;
    this.isOpen = true;

    // Update ARIA attributes
    this.menu.setAttribute("aria-hidden", "false");
    if (this.toggleButton) {
      this.toggleButton.setAttribute("aria-expanded", "true");
      this.toggleButton.setAttribute("aria-label", "Close mobile menu");
    }

    // Ensure mobile menu is properly displayed with high z-index
    this.menu.style.display = "flex";
    this.menu.style.visibility = "visible";
    this.menu.style.opacity = "1";
    this.menu.style.transform = "translateX(0)";
    this.menu.style.zIndex = "250";
    this.menu.style.position = "fixed";
    this.menu.style.top = "0";
    this.menu.style.left = "0";
    this.menu.style.width = "100%";
    this.menu.style.height = "100vh";

    // Add open class to menu and body
    this.menu.classList.add("mobile-menu--open");
    document.body.classList.add("mobile-menu-open");
    console.log("MobileMenu: Added mobile-menu--open class");
    console.log("MobileMenu: Body classes:", document.body.className);
    console.log("MobileMenu: Menu classes:", this.menu.className);

    // Ensure header elements are visible
    const header = this.menu.querySelector(".mobile-menu__header");
    const logo = this.menu.querySelector(".mobile-menu__logo-link");
    const closeBtn = this.menu.querySelector(".mobile-menu__close");

    if (header) {
      header.style.display = "flex";
      header.style.visibility = "visible";
      header.style.opacity = "1";
      header.style.zIndex = "999999";
      header.style.transition = "none";
      header.style.animation = "none";
      header.style.transform = "none";
      header.style.position = "relative";
      header.style.width = "100%";
      header.style.height = "auto";
      header.style.overflow = "visible";
      header.style.clip = "auto";
      console.log("MobileMenu: Header element found and styled");
    } else {
      console.warn("MobileMenu: Header element not found");
    }

    if (logo) {
      logo.style.display = "flex";
      logo.style.visibility = "visible";
      logo.style.opacity = "1";
      logo.style.transition = "none";
      logo.style.animation = "none";
      logo.style.transform = "none";
      logo.style.position = "relative";
      logo.style.width = "auto";
      logo.style.height = "auto";
      logo.style.overflow = "visible";
      logo.style.clip = "auto";
      console.log("MobileMenu: Logo element found and styled");
    } else {
      console.warn("MobileMenu: Logo element not found");
    }

    if (closeBtn) {
      closeBtn.style.display = "flex";
      closeBtn.style.visibility = "visible";
      closeBtn.style.opacity = "1";
      closeBtn.style.zIndex = "999999";
      closeBtn.style.transition = "none";
      closeBtn.style.animation = "none";
      closeBtn.style.transform = "none";
      closeBtn.style.position = "relative";
      closeBtn.style.width = "48px";
      closeBtn.style.height = "48px";
      closeBtn.style.overflow = "visible";
      closeBtn.style.clip = "auto";
      console.log("MobileMenu: Close button found and styled");
    } else {
      console.warn("MobileMenu: Close button not found");
    }

    // Force hide desktop header
    const desktopNav = document.querySelector(".header .hidden.md\\:flex");
    if (desktopNav) {
      console.log("MobileMenu: Found desktop nav, hiding it");
      desktopNav.style.display = "none";
      desktopNav.style.visibility = "hidden";
      desktopNav.style.opacity = "0";
      desktopNav.style.pointerEvents = "none";
      desktopNav.style.position = "absolute";
      desktopNav.style.left = "-9999px";
      desktopNav.style.top = "-9999px";
      desktopNav.style.width = "0";
      desktopNav.style.height = "0";
      desktopNav.style.overflow = "hidden";
      desktopNav.style.clip = "rect(0, 0, 0, 0)";
      desktopNav.style.zIndex = "-999999";
    } else {
      console.log("MobileMenu: Desktop nav not found");
    }

    // Focus first focusable element
    const firstFocusable = this.menu.querySelector(
      'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
    );
    if (firstFocusable) {
      setTimeout(() => firstFocusable.focus(), 100);
    }

    // Emit custom event
    this.emitEvent("mobileMenuOpened");
  }

  close() {
    console.log("MobileMenu: Closing menu");
    if (this.isAnimating || !this.isOpen) return;

    this.isAnimating = true;
    this.isOpen = false;

    // Update ARIA attributes
    this.menu.setAttribute("aria-hidden", "true");
    if (this.toggleButton) {
      this.toggleButton.setAttribute("aria-expanded", "false");
      this.toggleButton.setAttribute("aria-label", "Open mobile menu");
    }

    // Remove open class from menu and body
    this.menu.classList.remove("mobile-menu--open");
    document.body.classList.remove("mobile-menu-open");
    console.log("MobileMenu: Removed mobile-menu--open class");
    console.log("MobileMenu: Body classes:", document.body.className);
    console.log("MobileMenu: Menu classes:", this.menu.className);

    // Restore desktop header
    const desktopNav = document.querySelector(".header .hidden.md\\:flex");
    if (desktopNav) {
      console.log("MobileMenu: Restoring desktop nav");
      desktopNav.style.display = "";
      desktopNav.style.visibility = "";
      desktopNav.style.opacity = "";
      desktopNav.style.pointerEvents = "";
      desktopNav.style.position = "";
      desktopNav.style.left = "";
      desktopNav.style.top = "";
      desktopNav.style.width = "";
      desktopNav.style.height = "";
      desktopNav.style.overflow = "";
      desktopNav.style.clip = "";
      desktopNav.style.zIndex = "";
    }

    // Return focus to toggle button
    if (this.toggleButton) {
      setTimeout(() => this.toggleButton.focus(), 100);
    }

    // Emit custom event
    this.emitEvent("mobileMenuClosed");
  }

  emitEvent(eventName) {
    const event = new CustomEvent(eventName, {
      detail: { isOpen: this.isOpen },
      bubbles: true,
    });
    document.dispatchEvent(event);
  }

  // Public methods for external control
  isMenuOpen() {
    return this.isOpen;
  }

  forceClose() {
    if (this.isOpen) {
      this.close();
    }
  }
}

// Initialize mobile menu when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  console.log("MobileMenu: DOM ready, initializing");
  window.mobileMenu = new MobileMenu();
});

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = MobileMenu;
}
