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
    console.log("🚀 HeaderManager: Initializing...");
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    console.log("🔧 HeaderManager: Setting up...");
    this.findElements();
    this.setupScrollEffects();
    this.setupMobileMenu();
    this.initializeHeaderState();
    console.log("✅ HeaderManager: Setup complete!");
  }

  findElements() {
    // Find header element - try multiple selectors
    this.header =
      document.querySelector(".header") || document.querySelector("header") || document.querySelector("#header");

    this.mobileMenu = document.getElementById("mobile-menu");
    this.mobileMenuToggle = document.getElementById("mobile-menu-toggle");
    this.mobileMenuClose = document.getElementById("mobile-menu-close");

    // Log element finding results
    console.log("HeaderManager: Element finding results:", {
      header: this.header,
      mobileMenu: this.mobileMenu,
      mobileMenuToggle: this.mobileMenuToggle,
      mobileMenuClose: this.mobileMenuClose,
    });

    if (!this.header) {
      console.warn("Header element not found");
      console.log("Available header elements:", {
        ".header": document.querySelector(".header"),
        header: document.querySelector("header"),
        "#header": document.querySelector("#header"),
      });
    } else {
      console.log("Header found:", this.header);
      console.log("Header classes:", this.header.className);
    }
  }

  setupScrollEffects() {
    if (!this.header) return;

    let lastScrollTop = 0;
    const scrollThreshold = 100;
    const maxScrollForEffect = 300;

    const updateHeaderStyles = (scrollTop) => {
      // Calculate scroll progress (0 to 1)
      const scrollProgress = Math.min(scrollTop / maxScrollForEffect, 1);

      // Set CSS custom properties for smooth transitions
      this.header.style.setProperty("--scroll-progress", scrollProgress);

      // Apply appropriate classes based on scroll position
      if (scrollTop > scrollThreshold) {
        this.header.classList.add("header--dynamic");
        this.header.classList.add("header--fixed");
        this.header.classList.remove("header--transparent");
        console.log("Header is now fixed - scroll position:", scrollTop);
      } else {
        this.header.classList.remove("header--dynamic");
        this.header.classList.remove("header--fixed");
        this.header.classList.add("header--transparent");
        console.log("Header is now transparent - scroll position:", scrollTop);
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
    this.header.classList.remove("header--dynamic");
    this.header.classList.remove("header--fixed");
    this.header.classList.remove("header--hidden"); // Ensure header is never hidden

    // Force the header to be transparent on page load
    this.header.style.setProperty("--scroll-progress", "0");
    console.log("🎯 HeaderManager: Header state initialized - header will remain visible when scrolling");
  }
}

// Initialize the header manager when the script loads
console.log("🌐 HeaderManager: Creating global instance...");
const headerManager = new HeaderManager();

// Backward compatibility
window.HeaderManager = HeaderManager;
window.headerManager = headerManager;
