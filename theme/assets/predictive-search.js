/**
 * Predictive Search Functionality
 * Provides real-time search suggestions as users type
 */

class PredictiveSearch {
  constructor() {
    this.searchInput = document.querySelector('.search-input__field');
    this.searchResults = document.querySelector('.predictive-search');
    this.resultsList = document.querySelector('.predictive-search__results');
    this.debounceTimer = null;
    this.isLoading = false;

    this.init();
  }

  init() {
    if (!this.searchInput) return;

    this.searchInput.addEventListener('input', (e) => {
      this.handleInput(e.target.value);
    });

    this.searchInput.addEventListener('focus', () => {
      if (this.searchInput.value.length > 0) {
        this.showResults();
      }
    });

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
      if (
        !this.searchInput.contains(e.target) &&
        !this.searchResults.contains(e.target)
      ) {
        this.hideResults();
      }
    });

    // Handle keyboard navigation
    this.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.hideResults();
        this.searchInput.blur();
      }
    });
  }

  handleInput(query) {
    clearTimeout(this.debounceTimer);

    if (query.length < 2) {
      this.hideResults();
      return;
    }

    this.debounceTimer = setTimeout(() => {
      this.performSearch(query);
    }, 300);
  }

  async performSearch(query) {
    if (this.isLoading) return;

    this.isLoading = true;
    this.showLoading();

    try {
      const response = await fetch(
        `/search/suggest.json?q=${encodeURIComponent(
          query
        )}&resources[type]=product&resources[limit]=5`
      );
      const data = await response.json();

      this.displayResults(data.resources.results.products || []);
    } catch (error) {
      console.error('Search error:', error);
      this.showNoResults();
    } finally {
      this.isLoading = false;
    }
  }

  displayResults(products) {
    if (products.length === 0) {
      this.showNoResults();
      return;
    }

    this.resultsList.innerHTML = products
      .map(
        (product) => `
      <li class="predictive-search__item">
        <a href="${product.url}" class="predictive-search__link">
          <img 
            src="${product.featured_image || '/assets/no-image.png'}" 
            alt="${product.title}"
            class="predictive-search__image"
            width="40"
            height="40"
            loading="lazy"
          >
          <div class="predictive-search__content">
            <h3 class="predictive-search__title">${product.title}</h3>
            <p class="predictive-search__price">${this.formatPrice(
              product.price
            )}</p>
          </div>
        </a>
      </li>
    `
      )
      .join('');

    this.showResults();
  }

  showLoading() {
    this.resultsList.innerHTML = `
      <li class="predictive-search__loading">
        Searching...
      </li>
    `;
    this.showResults();
  }

  showNoResults() {
    this.resultsList.innerHTML = `
      <li class="predictive-search__no-results">
        No products found
      </li>
    `;
    this.showResults();
  }

  showResults() {
    this.searchResults.classList.add('active');
  }

  hideResults() {
    this.searchResults.classList.remove('active');
  }

  formatPrice(price) {
    if (!price) return '';

    // Convert cents to dollars if needed
    const amount = price / 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }
}

// Initialize predictive search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PredictiveSearch();
});

// Export for use in other scripts
window.PredictiveSearch = PredictiveSearch;
