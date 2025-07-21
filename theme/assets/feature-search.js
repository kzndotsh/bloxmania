/**
 * Predictive Search - Following Dawn's Web Component patterns
 * Enhanced predictive search with caching, keyboard navigation, and accessibility
 */

// Only declare if not already declared
if (typeof PredictiveSearch === 'undefined') {
  class PredictiveSearch extends HTMLElement {
    constructor() {
      super();
      this.searchInput = null;
      this.searchResults = null;
      this.searchForm = null;
      this.cache = new Map();
      this.currentRequest = null;
      this.selectedIndex = -1;
      this.isOpen = false;
    }

    connectedCallback() {
      this.searchInput = this.querySelector('.predictive-search__input');
      this.searchResults = this.querySelector('.predictive-search__results');
      this.searchForm = this.querySelector('.predictive-search__form');

      this.setupSearch();
      this.setupKeyboardNavigation();
    }

    setupSearch() {
      this.searchForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        this.performSearch();
      });

      this.searchInput?.addEventListener(
        'input',
        this.debounce(() => {
          this.performSearch();
        }, 300)
      );

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!this.contains(e.target)) {
          this.closeResults();
        }
      });
    }

    setupKeyboardNavigation() {
      this.searchInput?.addEventListener('keydown', (e) => {
        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            this.selectNext();
            break;
          case 'ArrowUp':
            e.preventDefault();
            this.selectPrevious();
            break;
          case 'Enter':
            if (this.selectedIndex >= 0) {
              e.preventDefault();
              this.selectResult(this.selectedIndex);
            }
            break;
          case 'Escape':
            this.closeResults();
            break;
        }
      });
    }

    async performSearch() {
      const query = this.searchInput?.value.trim();
      if (!query || query.length < 2) {
        this.closeResults();
        return;
      }

      // Check cache first
      if (this.cache.has(query)) {
        this.displayResults(this.cache.get(query));
        return;
      }

      // Cancel previous request
      if (this.currentRequest) {
        this.currentRequest.abort();
      }

      try {
        this.currentRequest = new AbortController();
        const response = await fetch(
          `/search/suggest.json?q=${encodeURIComponent(query)}`,
          { signal: this.currentRequest.signal }
        );
        const data = await response.json();
        const results = data.resources?.results || [];

        // Cache results
        this.cache.set(query, results);

        this.displayResults(results);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Search error:', error);
        }
      }
    }

    displayResults(results) {
      if (!this.searchResults) return;

      if (results.length === 0) {
        this.searchResults.innerHTML =
          '<p class="predictive-search__no-results">No results found</p>';
        this.openResults();
        return;
      }

      const resultsHTML = results
        .map(
          (result, index) => `
        <a href="${
          result.url
        }" class="predictive-search__result-item" data-index="${index}">
          <div class="predictive-search__result-image">
            ${
              result.featured_image
                ? `<img src="${result.featured_image}" alt="${result.title}">`
                : ''
            }
          </div>
          <div class="predictive-search__result-content">
            <h3 class="predictive-search__result-title">${result.title}</h3>
            <p class="predictive-search__result-price">${result.price || ''}</p>
          </div>
        </a>
      `
        )
        .join('');

      this.searchResults.innerHTML = resultsHTML;
      this.openResults();
      this.selectedIndex = -1;
    }

    openResults() {
      this.isOpen = true;
      this.searchResults?.classList.add('predictive-search__results--open');
    }

    closeResults() {
      this.isOpen = false;
      this.selectedIndex = -1;
      this.searchResults?.classList.remove('predictive-search__results--open');
    }

    selectNext() {
      const items = this.searchResults?.querySelectorAll(
        '.predictive-search__result-item'
      );
      if (!items || items.length === 0) return;

      this.selectedIndex = Math.min(this.selectedIndex + 1, items.length - 1);
      this.updateSelection(items);
    }

    selectPrevious() {
      const items = this.searchResults?.querySelectorAll(
        '.predictive-search__result-item'
      );
      if (!items || items.length === 0) return;

      this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
      this.updateSelection(items);
    }

    updateSelection(items) {
      items.forEach((item, index) => {
        item.classList.toggle(
          'predictive-search__result-item--selected',
          index === this.selectedIndex
        );
      });

      if (this.selectedIndex >= 0) {
        items[this.selectedIndex]?.scrollIntoView({ block: 'nearest' });
      }
    }

    selectResult(index) {
      const items = this.searchResults?.querySelectorAll(
        '.predictive-search__result-item'
      );
      if (items && items[index]) {
        window.location.href = items[index].href;
      }
    }

    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }
  }

  // Register the component
  if (!customElements.get('predictive-search')) {
    customElements.define('predictive-search', PredictiveSearch);
  }

  // Export for global scope
  window.PredictiveSearch = PredictiveSearch;
}
