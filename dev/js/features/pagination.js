/**
 * Enhanced Pagination Functionality
 * Provides keyboard navigation, smooth interactions, and accessibility improvements
 */

class PaginationManager {
  constructor() {
    this.init();
  }

  init() {
    this.bindEvents();
    this.setupKeyboardNavigation();
  }

  bindEvents() {
    // Handle pagination container clicks
    document.addEventListener("click", (event) => {
      const paginationLink = event.target.closest(".pagination__item-link");
      if (paginationLink && paginationLink.href) {
        this.handlePaginationClick(event, paginationLink);
      }
    });

    // Handle keyboard navigation
    document.addEventListener("keydown", (event) => {
      this.handleKeyboardNavigation(event);
    });
  }

  handlePaginationClick(event, link) {
    // Add loading state
    const paginationContainer = link.closest(".pagination-wrapper");
    if (paginationContainer) {
      this.addLoadingState(paginationContainer);
    }

    // Optional: Add smooth scroll to top
    this.scrollToTop();
  }

  addLoadingState(container) {
    // Add a subtle loading indicator
    const loadingOverlay = document.createElement("div");
    loadingOverlay.className = "pagination-loading";
    loadingOverlay.innerHTML = `
      <div class="pagination-loading__spinner">
        <div class="pagination-loading__dot"></div>
        <div class="pagination-loading__dot"></div>
        <div class="pagination-loading__dot"></div>
      </div>
    `;

    container.appendChild(loadingOverlay);

    // Remove after a short delay (in case of fast navigation)
    setTimeout(() => {
      if (loadingOverlay.parentNode) {
        loadingOverlay.remove();
      }
    }, 1000);
  }

  scrollToTop() {
    // Smooth scroll to top of page content
    const pageContent = document.querySelector(".page-content") || document.body;
    pageContent.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  setupKeyboardNavigation() {
    // Focus management for pagination
    document.addEventListener("focusin", (event) => {
      if (event.target.closest(".pagination")) {
        this.handlePaginationFocus(event);
      }
    });
  }

  handlePaginationFocus(event) {
    const paginationItem = event.target.closest(".pagination__item");
    if (paginationItem) {
      // Add focus indicator
      paginationItem.classList.add("pagination__item--focused");
    }
  }

  handleKeyboardNavigation(event) {
    const paginationContainer = document.querySelector(".pagination-wrapper");
    if (!paginationContainer) return;

    const focusedElement = document.activeElement;
    if (!focusedElement.closest(".pagination")) return;

    const currentItem = focusedElement.closest(".pagination__item");
    if (!currentItem) return;

    const allItems = Array.from(paginationContainer.querySelectorAll(".pagination__item"));
    const currentIndex = allItems.indexOf(currentItem);

    let nextItem = null;

    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        nextItem = allItems[currentIndex - 1] || allItems[allItems.length - 1];
        break;
      case "ArrowRight":
        event.preventDefault();
        nextItem = allItems[currentIndex + 1] || allItems[0];
        break;
      case "Home":
        event.preventDefault();
        nextItem = allItems[0];
        break;
      case "End":
        event.preventDefault();
        nextItem = allItems[allItems.length - 1];
        break;
      case "Enter":
      case " ":
        if (focusedElement.tagName === "A") {
          // Let the default behavior handle the navigation
          return;
        }
        break;
    }

    if (nextItem) {
      const focusableElement = nextItem.querySelector('a, button, [tabindex]:not([tabindex="-1"])');
      if (focusableElement) {
        focusableElement.focus();
      }
    }
  }

  // Method to update pagination state (for AJAX implementations)
  updatePaginationState(newState) {
    const container = document.querySelector("[data-pagination-container]");
    if (container && newState) {
      // Update pagination content
      container.innerHTML = newState;

      // Re-initialize
      this.init();
    }
  }
}

// Initialize pagination manager when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new PaginationManager();
});

// Export for use in other modules
window.PaginationManager = PaginationManager;
