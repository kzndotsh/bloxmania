/**
 * Header Functionality - Simple and Direct Approach
 * Handles header scroll effects and mobile menu with proper focus management
 * Search functionality has been extracted to SearchManager
 */

class HeaderManager {
  constructor() {
    this.header = null;
    this.mobileMenu = null;
    this.mobileMenuToggle = null;
    this.mobileMenuClose = null;
    this.isMobileMenuOpen = false;

    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.findElements();
    this.setupScrollEffects();
    this.setupMobileMenu();
    this.initializeHeaderState();
  }

  findElements() {
    // Find header element - try multiple selectors
    this.header =
      document.querySelector(".header") || document.querySelector("header") || document.querySelector("#header");

    this.mobileMenu = document.getElementById("mobile-menu");
    this.mobileMenuToggle = document.getElementById("mobile-menu-toggle");
    this.mobileMenuClose = document.getElementById("mobile-menu-close");

    if (!this.header) {
      console.warn("Header element not found");
    }
  }

  setupScrollEffects() {
    if (!this.header) return;

    let lastScrollTop = 0;
    const scrollThreshold = 0; // Changed to 0 so header is transparent at the very top
    const maxScrollForEffect = 300;

    const updateHeaderStyles = (scrollTop) => {
      // Calculate scroll progress (0 to 1)
      const scrollProgress = Math.min(scrollTop / maxScrollForEffect, 1);

      // Set CSS custom properties for smooth transitions
      this.header.style.setProperty("--scroll-progress", scrollProgress);

      // Apply appropriate classes based on scroll position
      if (scrollTop > scrollThreshold) {
        this.header.classList.add("header--scrolled");
        this.header.classList.remove("header--transparent");
      } else {
        this.header.classList.remove("header--scrolled");
        this.header.classList.add("header--transparent");
      }

      // Keep header visible when scrolling - removed hide/show logic
      // Header will remain visible and sticky when scrolling
    };

    // Add scroll event listener with throttling for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          updateHeaderStyles(scrollTop);
          lastScrollTop = scrollTop;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial call to set correct state
    const initialScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    updateHeaderStyles(initialScrollTop);
  }

  setupMobileMenu() {
    if (!this.mobileMenu || !this.mobileMenuToggle || !this.mobileMenuClose) return;

    // Ensure mobile menu is closed on page load
    this.mobileMenu.classList.remove("mobile-menu--open");
    this.mobileMenu.setAttribute("aria-hidden", "true");
    document.body.classList.remove("overflow-hidden");

    // Mobile menu toggle
    this.mobileMenuToggle.addEventListener("click", () => {
      this.toggleMobileMenu();
    });

    // Mobile menu close
    this.mobileMenuClose.addEventListener("click", () => {
      this.closeMobileMenu();
    });

    // Close on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isMobileMenuOpen) {
        this.closeMobileMenu();
      }
    });

    // Close on backdrop click
    this.mobileMenu.addEventListener("click", (e) => {
      if (e.target === this.mobileMenu) {
        this.closeMobileMenu();
      }
    });

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = this.mobileMenu.querySelectorAll("a");
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.closeMobileMenu();
      });
    });
  }

  toggleMobileMenu() {
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    if (!this.mobileMenu || !this.mobileMenuToggle) return;

    this.isMobileMenuOpen = true;
    this.mobileMenuToggle.setAttribute("aria-expanded", "true");
    this.mobileMenu.classList.add("mobile-menu--open");
    this.mobileMenu.setAttribute("aria-hidden", "false");
    document.body.classList.add("overflow-hidden");

    // Focus the close button
    if (this.mobileMenuClose) {
      this.mobileMenuClose.focus();
    }
  }

  closeMobileMenu() {
    if (!this.mobileMenu || !this.mobileMenuToggle) return;

    this.isMobileMenuOpen = false;
    this.mobileMenuToggle.setAttribute("aria-expanded", "false");
    this.mobileMenu.classList.remove("mobile-menu--open");
    this.mobileMenu.setAttribute("aria-hidden", "true");
    document.body.classList.remove("overflow-hidden");

    // Focus the toggle button
    if (this.mobileMenuToggle) {
      this.mobileMenuToggle.focus();
    }
  }

  initializeHeaderState() {
    if (!this.header) return;

    // Initialize header state on page load - header starts transparent
    this.header.classList.add("header--transparent");
    this.header.classList.remove("header--scrolled");
    this.header.classList.remove("header--hidden"); // Ensure header is never hidden

    // Force the header to be transparent on page load
    this.header.style.setProperty("--scroll-progress", "0");

    // Ensure header is completely transparent at the top
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop === 0) {
      this.header.classList.add("header--transparent");
      this.header.classList.remove("header--scrolled");
    }

  }
}

// Initialize the header manager when the script loads
const headerManager = new HeaderManager();

// Backward compatibility
window.HeaderManager = HeaderManager;
window.headerManager = headerManager;
