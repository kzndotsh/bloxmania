/**
 * Search Manager - Extracted from Header
 * Handles search modal functionality and predictive search
 */

class SearchManager {
  constructor() {
    this.searchModal = null;
    this.searchToggle = null;
    this.searchClose = null;
    this.searchInput = null;
    this.isSearchModalOpen = false;
    this.searchTimeout = null;

    this.init();
  }

  init() {
    console.log("🔍 SearchManager: Initializing...");
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    console.log("🔧 SearchManager: Setting up...");
    this.findElements();
    this.setupSearchModal();
    console.log("✅ SearchManager: Setup complete!");
  }

  findElements() {
    this.searchModal = document.getElementById("search-modal");
    this.searchToggle = document.querySelector("[data-search-toggle]");
    this.searchClose = document.querySelector("[data-search-close]");
    this.searchInput = document.querySelector(".search-modal__input");

    // Log element finding results
    console.log("SearchManager: Element finding results:", {
      searchModal: this.searchModal,
      searchToggle: this.searchToggle,
      searchClose: this.searchClose,
      searchInput: this.searchInput,
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
      const content = this.searchModal.querySelector(".search-modal__content");
      if (!content || !content.contains(e.target)) {
        this.closeSearchModal();
      }
    });

    // Setup predictive search
    this.setupPredictiveSearch();
  }

  setupPredictiveSearch() {
    if (!this.searchInput) return;

    this.searchInput.addEventListener("input", () => {
      const query = this.searchInput.value.trim();

      // Clear previous timeout
      clearTimeout(this.searchTimeout);

      if (query.length < 2) {
        this.clearSearchResults();
        return;
      }

      // Show loading state
      this.showSearchLoading();

      // Debounce search requests
      this.searchTimeout = setTimeout(() => {
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

  // Public methods for external access
  get isOpen() {
    return this.isSearchModalOpen;
  }

  toggle() {
    if (this.isSearchModalOpen) {
      this.closeSearchModal();
    } else {
      this.openSearchModal();
    }
  }
}

// Initialize the search manager when the script loads
console.log("🔍 SearchManager: Creating global instance...");
const searchManager = new SearchManager();

// Backward compatibility
window.SearchManager = SearchManager;
window.searchManager = searchManager;
