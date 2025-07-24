/**
 * Header Functionality - Simple and Direct Approach
 * Handles header scroll effects and mobile menu with proper focus management
 */

class HeaderManager {
  constructor() {
    this.header = null;
    this.mobileMenu = null;
    this.mobileMenuToggle = null;
    this.mobileMenuClose = null;
    this.searchModal = null;
    this.searchToggle = null;
    this.searchClose = null;
    this.searchInput = null;
    this.isMobileMenuOpen = false;
    this.isSearchModalOpen = false;

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
    this.setupSearchModal();
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
    this.searchModal = document.getElementById("search-modal");
    this.searchToggle = document.querySelector("[data-search-toggle]");
    this.searchClose = document.querySelector("[data-search-close]");
    this.searchInput = document.querySelector(".search-modal__input");

    if (!this.header) {
      console.warn("Header element not found");
      console.log("Available header elements:", {
        ".header": document.querySelector(".header"),
        header: document.querySelector("header"),
        "#header": document.querySelector("#header"),
      });
      return;
    }

    console.log("Header found:", this.header);
    console.log("Header classes:", this.header.className);
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
        document.body.classList.add("header-fixed");
        console.log("Header is now fixed - scroll position:", scrollTop);
      } else {
        this.header.classList.remove("header--dynamic");
        this.header.classList.remove("header--fixed");
        this.header.classList.add("header--transparent");
        document.body.classList.remove("header-fixed");
        console.log("Header is now transparent - scroll position:", scrollTop);
      }

      // Hide/show header on scroll (optional)
      if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
        this.header.classList.add("header--hidden");
      } else {
        this.header.classList.remove("header--hidden");
      }
    };

    // Add scroll event listener
    window.addEventListener(
      "scroll",
      () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        updateHeaderStyles(scrollTop);
        lastScrollTop = scrollTop;
      },
      { passive: true },
    );

    // Initial call to set correct state
    const initialScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    updateHeaderStyles(initialScrollTop);
  }

  setupMobileMenu() {
    if (!this.mobileMenu || !this.mobileMenuToggle || !this.mobileMenuClose) return;

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

  setupSearchModal() {
    if (!this.searchModal || !this.searchToggle || !this.searchClose || !this.searchInput) return;

    // Open search modal
    this.searchToggle.addEventListener("click", () => {
      this.openSearchModal();
    });

    // Close search modal
    this.searchClose.addEventListener("click", () => {
      this.closeSearchModal();
    });

    // Close on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isSearchModalOpen) {
        this.closeSearchModal();
      }
    });

    // Close on backdrop click
    this.searchModal.addEventListener("click", (e) => {
      if (e.target === this.searchModal) {
        this.closeSearchModal();
      }
    });

    // Setup predictive search
    this.setupPredictiveSearch();
  }

  setupPredictiveSearch() {
    if (!this.searchInput) return;

    let searchTimeout;

    this.searchInput.addEventListener("input", () => {
      const query = this.searchInput.value.trim();

      // Clear previous timeout
      clearTimeout(searchTimeout);

      if (query.length < 2) {
        this.clearSearchResults();
        return;
      }

      // Show loading state
      this.showSearchLoading();

      // Debounce search requests
      searchTimeout = setTimeout(() => {
        this.performPredictiveSearch(query);
      }, 300);
    });
  }

  async performPredictiveSearch(query) {
    try {
      const response = await fetch(
        `/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=6`,
      );

      if (!response.ok) {
        throw new Error("Search request failed");
      }

      const data = await response.json();
      this.displaySearchResults(data, query);
    } catch (error) {
      console.error("Search error:", error);
      this.showNoResults();
    }
  }

  displaySearchResults(data, query) {
    const searchResults = document.querySelector(".search-modal__content-results");
    const searchLoading = document.querySelector(".search-modal__loading");
    const searchNoResults = document.querySelector(".search-modal__no-results");

    if (!searchResults) return;

    // Hide loading
    if (searchLoading) searchLoading.classList.add("hidden");

    // Extract results from the API response
    let results = [];
    if (data.resources && data.resources.results) {
      if (Array.isArray(data.resources.results)) {
        results = data.resources.results;
      } else if (typeof data.resources.results === "object") {
        const resultsObj = data.resources.results;
        Object.keys(resultsObj).forEach((key) => {
          if (Array.isArray(resultsObj[key])) {
            results.push(...resultsObj[key]);
          }
        });
      }
    }

    if (results.length === 0) {
      this.showNoResults();
      return;
    }

    // Build HTML for results
    let html = '<div class="space-y-4">';
    results.forEach((result) => {
      if (!result || !result.title) return;

      const productUrl = result.handle ? `/products/${result.handle}` : result.url || "";
      const title = this.highlightQuery(result.title, query);
      const priceDisplay = result.price ? `<span class="text-primary font-semibold">$${result.price}</span>` : "";
      const imageDisplay = result.image
        ? `<img src="${result.image}" alt="${result.title}" class="w-12 h-12 object-cover rounded-lg">`
        : "";

      html += `
        <a href="${productUrl}" class="search-result-item flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800/60 transition-colors duration-200 group">
          <div class="flex-shrink-0">
            ${imageDisplay}
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-white font-medium group-hover:text-primary transition-colors duration-200">${title}</h3>
            ${priceDisplay ? `<p class="text-sm text-gray-400 mt-1">${priceDisplay}</p>` : ""}
            <p class="text-xs text-gray-500 mt-1">Product</p>
          </div>
          <div class="flex-shrink-0 text-gray-400 group-hover:text-primary transition-colors duration-200">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clip-rule="evenodd"/>
            </svg>
          </div>
        </a>
      `;
    });
    html += "</div>";

    searchResults.innerHTML = html;
    searchResults.classList.remove("hidden");
    if (searchNoResults) searchNoResults.classList.add("hidden");
  }

  showSearchLoading() {
    const searchLoading = document.querySelector(".search-modal__loading");
    const searchResults = document.querySelector(".search-modal__content-results");
    const searchNoResults = document.querySelector(".search-modal__no-results");

    if (searchLoading) searchLoading.classList.remove("hidden");
    if (searchResults) searchResults.classList.add("hidden");
    if (searchNoResults) searchNoResults.classList.add("hidden");
  }

  clearSearchResults() {
    const searchResults = document.querySelector(".search-modal__content-results");
    const searchLoading = document.querySelector(".search-modal__loading");
    const searchNoResults = document.querySelector(".search-modal__no-results");

    if (searchResults) {
      searchResults.innerHTML = "";
      searchResults.classList.add("hidden");
    }
    if (searchLoading) searchLoading.classList.add("hidden");
    if (searchNoResults) searchNoResults.classList.add("hidden");
  }

  showNoResults() {
    const searchNoResults = document.querySelector(".search-modal__no-results");
    const searchResults = document.querySelector(".search-modal__content-results");
    const searchLoading = document.querySelector(".search-modal__loading");

    if (searchLoading) searchLoading.classList.add("hidden");
    if (searchResults) searchResults.classList.add("hidden");
    if (searchNoResults) searchNoResults.classList.remove("hidden");
  }

  highlightQuery(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, '<mark class="bg-primary/20 text-primary px-1 rounded">$1</mark>');
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

  openSearchModal() {
    if (!this.searchModal || !this.searchInput) return;

    this.isSearchModalOpen = true;
    this.searchModal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
    this.searchInput.focus();
    this.clearSearchResults();
  }

  closeSearchModal() {
    if (!this.searchModal || !this.searchInput) return;

    this.isSearchModalOpen = false;
    this.searchModal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
    this.searchInput.value = "";
    this.clearSearchResults();
  }

  initializeHeaderState() {
    if (!this.header) return;

    // Initialize header state on page load
    this.header.classList.add("header--transparent");
    this.header.classList.remove("header--dynamic");
    this.header.classList.remove("header--fixed");
    this.header.classList.remove("header--hidden");
    document.body.classList.remove("header-fixed");

    // Force the header to be transparent on page load
    this.header.style.setProperty("--scroll-progress", "0");
    console.log("🎯 HeaderManager: Header state initialized");
  }
}

// Initialize the header manager when the script loads
console.log("🌐 HeaderManager: Creating global instance...");
const headerManager = new HeaderManager();

// Backward compatibility
window.HeaderManager = HeaderManager;
window.headerManager = headerManager;
