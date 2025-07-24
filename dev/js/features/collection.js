/**
 * Collection Filters and Functionality
 * Handles sorting, filtering, and view changes for collection pages
 */

class CollectionManager {
  constructor() {
    this.init();
  }

  init() {
    this.bindEvents();
    this.loadSavedPreferences();
  }

  bindEvents() {
    // Sort dropdown change
    const sortSelect = document.getElementById("sort-by");
    if (sortSelect) {
      sortSelect.addEventListener("change", this.handleSortChange.bind(this));
    }

    // View toggle buttons
    const viewButtons = document.querySelectorAll(".view-btn");
    viewButtons.forEach((btn) => {
      btn.addEventListener("click", this.handleViewChange.bind(this));
    });

    // Filter toggle for mobile
    const filterToggle = document.querySelector(".filters-toggle");
    if (filterToggle) {
      filterToggle.addEventListener("click", this.toggleMobileFilters.bind(this));
    }
  }

  handleSortChange(event) {
    const sortValue = event.target.value;
    const url = new URL(window.location);

    if (sortValue === "manual") {
      url.searchParams.delete("sort_by");
    } else {
      url.searchParams.set("sort_by", sortValue);
    }

    // Reset to first page when sorting changes
    url.searchParams.delete("page");

    window.location.href = url.toString();
  }

  handleViewChange(event) {
    const button = event.currentTarget;
    const viewType = button.classList.contains("view-btn--list") ? "list" : "grid";

    this.setView(viewType);
  }

  setView(viewType) {
    const grid = document.getElementById("products-grid");
    const buttons = document.querySelectorAll(".view-btn");
    const gridCards = document.querySelectorAll(".grid-card");
    const listCards = document.querySelectorAll(".list-card");

    if (!grid) return;

    // Update grid classes and show/hide appropriate cards
    if (viewType === "list") {
      grid.classList.add("list-view");
      grid.classList.remove("grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-3", "xl:grid-cols-4");

      // Hide grid cards, show list cards
      gridCards.forEach((card) => card.classList.add("hidden"));
      listCards.forEach((card) => card.classList.remove("hidden"));
    } else {
      grid.classList.remove("list-view");
      grid.classList.add("grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-3", "xl:grid-cols-4");

      // Show grid cards, hide list cards
      gridCards.forEach((card) => card.classList.remove("hidden"));
      listCards.forEach((card) => card.classList.add("hidden"));
    }

    // Update button states
    buttons.forEach((btn) => {
      btn.classList.remove("active");
      if (btn.classList.contains(`view-btn--${viewType}`)) {
        btn.classList.add("active");
      }
    });

    // Store preference
    this.saveViewPreference(viewType);
  }

  toggleMobileFilters() {
    // Placeholder for mobile filter functionality
    // This would show/hide a mobile filter panel
    // Mobile filters toggle - to be implemented
    // Example implementation:
    // const filterPanel = document.getElementById('mobile-filters');
    // if (filterPanel) {
    //   filterPanel.classList.toggle('hidden');
    // }
  }

  saveViewPreference(viewType) {
    try {
      localStorage.setItem("collection-view", viewType);
    } catch (e) {
      // Handle localStorage errors gracefully
      console.warn("Could not save view preference:", e);
    }
  }

  loadSavedPreferences() {
    try {
      const savedView = localStorage.getItem("collection-view");
      if (savedView && (savedView === "list" || savedView === "grid")) {
        this.setView(savedView);
      }
    } catch (e) {
      // Handle localStorage errors gracefully
      console.warn("Could not load saved preferences:", e);
    }
  }

  // Utility method for updating URL parameters
  updateUrlParameter(key, value) {
    const url = new URL(window.location);

    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }

    return url.toString();
  }

  // Method to handle AJAX loading of products (for future enhancement)
  async loadProducts(params = {}) {
    try {
      const url = new URL(window.location);

      // Update URL parameters
      Object.keys(params).forEach((key) => {
        if (params[key]) {
          url.searchParams.set(key, params[key]);
        } else {
          url.searchParams.delete(key);
        }
      });

      // Add section_id for AJAX requests
      url.searchParams.set("section_id", "collection-template");

      const response = await fetch(url.toString(), {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const html = await response.text();

      // Parse the response and update the products grid
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const newGrid = doc.getElementById("products-grid");
      const currentGrid = document.getElementById("products-grid");

      if (newGrid && currentGrid) {
        currentGrid.innerHTML = newGrid.innerHTML;

        // Update pagination if it exists
        const newPagination = doc.querySelector(".pagination-wrapper");
        const currentPagination = document.querySelector(".pagination-wrapper");

        if (newPagination && currentPagination) {
          currentPagination.innerHTML = newPagination.innerHTML;
        } else if (currentPagination && !newPagination) {
          currentPagination.remove();
        }
      }

      // Update browser history
      window.history.pushState({}, "", url.toString().replace("&section_id=collection-template", ""));
    } catch (error) {
      console.error("Error loading products:", error);
      // Fallback to page reload
      window.location.href = this.updateUrlParameter("sort_by", params.sort_by);
    }
  }
}

// Global functions for inline event handlers (for backward compatibility)
window.setView = function (viewType) {
  if (window.collectionManager) {
    window.collectionManager.setView(viewType);
  }
};

window.toggleFilters = function () {
  if (window.collectionManager) {
    window.collectionManager.toggleMobileFilters();
  }
};

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  window.collectionManager = new CollectionManager();
});

// Handle browser back/forward buttons
window.addEventListener("popstate", function (event) {
  // Reload the page when user navigates back/forward
  window.location.reload();
});
