/**
 * Header Blur Effect - Clean Implementation
 * Handles smooth header background blur on scroll
 */

(function () {
  "use strict";

  class HeaderBlur {
    constructor() {
      this.header = null;
      this.isInitialized = false;
      this.scrollThreshold = 50; // Start blur at 50px scroll
      this.maxScroll = 150; // Full blur at 150px scroll
      this.scrollHandler = this.handleScroll.bind(this);

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
      this.header = document.getElementById("header");

      if (!this.header) {
        console.warn("Header element not found");
        return;
      }

      // Initialize header state
      this.initializeHeader();

      // Add scroll listener
      window.addEventListener("scroll", this.scrollHandler, { passive: true });

      // Handle initial scroll position
      this.handleScroll();

      this.isInitialized = true;
    }

    initializeHeader() {
      // Start with transparent state
      this.header.classList.add("header--transparent");
      this.header.classList.remove("header--fixed");
      this.header.style.setProperty("--header-blur-progress", "0");
    }

    handleScroll() {
      if (!this.header) return;

      const scrollY = window.pageYOffset || document.documentElement.scrollTop;

      // Calculate blur progress (0 to 1)
      const blurProgress = Math.min(
        Math.max((scrollY - this.scrollThreshold) / (this.maxScroll - this.scrollThreshold), 0),
        1,
      );

      // Apply blur progress as CSS custom property
      this.header.style.setProperty("--header-blur-progress", blurProgress);

      // Apply appropriate classes
      if (scrollY > this.scrollThreshold) {
        this.header.classList.remove("header--transparent");
        this.header.classList.add("header--fixed");
      } else {
        this.header.classList.add("header--transparent");
        this.header.classList.remove("header--fixed");
      }
    }

    destroy() {
      if (this.isInitialized) {
        window.removeEventListener("scroll", this.scrollHandler);
        this.isInitialized = false;
      }
    }
  }

  // Initialize header blur effect - DISABLED to prevent conflicts with main header.js
  // const headerBlur = new HeaderBlur();

  // Export for global access if needed
  window.HeaderBlur = HeaderBlur;
  // window.headerBlur = headerBlur;
})();
