/**
 * Search Modal - Following Dawn's Web Component patterns
 * Handles predictive search with proper focus management and accessibility
 */

class SearchModal extends HTMLElement {
  constructor() {
    super();
    
    this.input = null;
    this.results = null;
    this.closeButton = null;
    this.focusTrap = null;
    this.isOpen = false;
    this.searchTimeout = null;
    this.searchUtils = null;
  }

  connectedCallback() {
    this.input = this.querySelector('input[type="search"]');
    this.results = this.querySelector('.search-results');
    this.closeButton = this.querySelector('.search-modal__close');
    
    this.setupSearch();
    this.setupAccessibility();
    this.setupEventListeners();
    
    // Initialize search utils if available
    if (window.SearchUtils) {
      this.searchUtils = new window.SearchUtils();
    }
  }

  disconnectedCallback() {
    this.cleanup();
  }

  setupSearch() {
    if (!this.input) return;

    // Debounced search handler
    this.searchHandler = window.DOMUtils ? 
      window.DOMUtils.debounce(this.performSearch.bind(this), 300) :
      this.debounceSearch(this.performSearch.bind(this), 300);

    this.input.addEventListener('input', this.searchHandler);
    this.input.addEventListener('focus', this.handleInputFocus.bind(this));
  }

  setupAccessibility() {
    // Set up ARIA attributes
    if (this.input) {
      this.input.setAttribute('aria-expanded', 'false');
      this.input.setAttribute('aria-haspopup', 'listbox');
      this.input.setAttribute('aria-autocomplete', 'list');
      this.input.setAttribute('role', 'combobox');
    }

    if (this.results) {
      this.results.setAttribute('role', 'listbox');
      this.results.setAttribute('aria-label', 'Search results');
    }

    // Set up modal attributes
    this.setAttribute('role', 'dialog');
    this.setAttribute('aria-modal', 'true');
    this.setAttribute('aria-labelledby', 'search-modal-title');
  }

  setupEventListeners() {
    // Close button
    if (this.closeButton) {
      this.closeButton.addEventListener('click', this.close.bind(this));
    }

    // Escape key and backdrop clicks
    this.addEventListener('keydown', this.handleKeydown.bind(this));
    this.addEventListener('click', this.handleBackdropClick.bind(this));

    // Result navigation
    if (this.results) {
      this.results.addEventListener('click', this.handleResultClick.bind(this));
    }
  }

  handleInputFocus() {
    if (!this.isOpen && this.input.value.trim().length > 0) {
      this.performSearch();
    }
  }

  handleKeydown(event) {
    switch (event.key) {
      case 'Escape':
        this.close();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.navigateResults('down');
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.navigateResults('up');
        break;
      case 'Enter':
        event.preventDefault();
        this.selectCurrentResult();
        break;
    }
  }

  handleBackdropClick(event) {
    if (event.target === this) {
      this.close();
    }
  }

  handleResultClick(event) {
    const resultItem = event.target.closest('[data-search-result]');
    if (resultItem) {
      const url = resultItem.dataset.url || resultItem.querySelector('a')?.href;
      if (url) {
        window.location.href = url;
      }
    }
  }

  async performSearch() {
    const query = this.input?.value?.trim();
    
    if (!query || query.length < 2) {
      this.hideResults();
      return;
    }

    this.showLoadingState();

    try {
      let results;
      
      if (this.searchUtils) {
        results = await this.searchUtils.performSearch(query, {
          limit: 8,
          resources: ['product', 'collection', 'page']
        });
      } else {
        // Fallback to basic search
        results = await this.basicSearch(query);
      }

      if (results) {
        this.displayResults(results);
        this.open();
      }
    } catch (error) {
      console.error('Search error:', error);
      this.showErrorState();
    }
  }

  async basicSearch(query) {
    try {
      const response = await fetch(`/search/suggest?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=8`);
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }

      const html = await response.text();
      return this.parseBasicResults(html, query);
    } catch (error) {
      throw error;
    }
  }

  parseBasicResults(html, query) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    const products = Array.from(doc.querySelectorAll('.predictive-search__item')).map(item => ({
      type: 'product',
      title: item.querySelector('.predictive-search__item-heading')?.textContent?.trim(),
      url: item.querySelector('a')?.href,
      image: item.querySelector('img')?.src,
      price: item.querySelector('.price')?.textContent?.trim()
    }));

    return {
      query,
      products,
      collections: [],
      pages: []
    };
  }

  displayResults(results) {
    if (!this.results) return;

    let html = '';

    // Products
    if (results.products && results.products.length > 0) {
      html += '<div class="search-results__section">';
      html += '<h3 class="search-results__heading">Products</h3>';
      html += '<ul class="search-results__list" role="listbox">';
      
      results.products.forEach((product, index) => {
        html += `
          <li class="search-results__item" role="option" data-search-result data-url="${product.url}" tabindex="-1">
            <a href="${product.url}" class="search-results__link">
              ${product.image ? `<img src="${product.image}" alt="${product.title}" class="search-results__image" loading="lazy">` : ''}
              <div class="search-results__content">
                <h4 class="search-results__title">${this.highlightQuery(product.title, results.query)}</h4>
                ${product.price ? `<span class="search-results__price">${product.price}</span>` : ''}
              </div>
            </a>
          </li>
        `;
      });
      
      html += '</ul></div>';
    }

    // Collections
    if (results.collections && results.collections.length > 0) {
      html += '<div class="search-results__section">';
      html += '<h3 class="search-results__heading">Collections</h3>';
      html += '<ul class="search-results__list" role="listbox">';
      
      results.collections.forEach(collection => {
        html += `
          <li class="search-results__item" role="option" data-search-result data-url="${collection.url}" tabindex="-1">
            <a href="${collection.url}" class="search-results__link">
              ${collection.image ? `<img src="${collection.image}" alt="${collection.title}" class="search-results__image" loading="lazy">` : ''}
              <div class="search-results__content">
                <h4 class="search-results__title">${this.highlightQuery(collection.title, results.query)}</h4>
              </div>
            </a>
          </li>
        `;
      });
      
      html += '</ul></div>';
    }

    if (html === '') {
      html = '<div class="search-results__empty">No results found</div>';
    }

    this.results.innerHTML = html;
    this.updateAccessibilityAttributes();
  }

  highlightQuery(text, query) {
    if (!text || !query) return text;
    
    if (window.SearchUtils && window.SearchUtils.highlightSearchTerms) {
      return window.SearchUtils.highlightSearchTerms(text, query);
    }
    
    // Fallback highlighting
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  showLoadingState() {
    if (this.results) {
      this.results.innerHTML = '<div class="search-results__loading">Searching...</div>';
    }
  }

  showErrorState() {
    if (this.results) {
      this.results.innerHTML = '<div class="search-results__error">Search failed. Please try again.</div>';
    }
  }

  hideResults() {
    if (this.results) {
      this.results.innerHTML = '';
    }
    this.close();
  }

  updateAccessibilityAttributes() {
    const items = this.results?.querySelectorAll('.search-results__item');
    if (items) {
      items.forEach((item, index) => {
        item.setAttribute('id', `search-result-${index}`);
      });
    }

    if (this.input) {
      this.input.setAttribute('aria-expanded', this.isOpen ? 'true' : 'false');
    }
  }

  navigateResults(direction) {
    const items = this.results?.querySelectorAll('.search-results__item');
    if (!items || items.length === 0) return;

    const currentIndex = Array.from(items).findIndex(item => item.classList.contains('search-results__item--focused'));
    let newIndex;

    if (direction === 'down') {
      newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    } else {
      newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    }

    // Remove previous focus
    items.forEach(item => item.classList.remove('search-results__item--focused'));
    
    // Add new focus
    items[newIndex].classList.add('search-results__item--focused');
    items[newIndex].focus();
  }

  selectCurrentResult() {
    const focusedItem = this.results?.querySelector('.search-results__item--focused');
    if (focusedItem) {
      const link = focusedItem.querySelector('a');
      if (link) {
        link.click();
      }
    }
  }

  open() {
    if (this.isOpen) return;

    this.isOpen = true;
    this.classList.add('search-modal--open');
    document.body.style.overflow = 'hidden';

    // Set up focus trap
    this.setupFocusTrap();

    // Dispatch event
    this.dispatchEvent(new CustomEvent('search-modal:opened', {
      bubbles: true,
      detail: { modal: this }
    }));
  }

  close() {
    if (!this.isOpen) return;

    this.isOpen = false;
    this.classList.remove('search-modal--open');
    document.body.style.overflow = '';

    // Remove focus trap
    this.removeFocusTrap();

    // Clear results
    if (this.results) {
      this.results.innerHTML = '';
    }

    // Return focus to input or trigger
    const trigger = document.querySelector('[data-search-trigger]');
    if (trigger) {
      trigger.focus();
    }

    // Dispatch event
    this.dispatchEvent(new CustomEvent('search-modal:closed', {
      bubbles: true,
      detail: { modal: this }
    }));
  }

  setupFocusTrap() {
    if (window.DOMUtils) {
      this.focusTrap = window.DOMUtils.trapFocus(this, this.input);
    } else if (this.input) {
      this.input.focus();
    }
  }

  removeFocusTrap() {
    if (this.focusTrap && typeof this.focusTrap === 'function') {
      this.focusTrap();
      this.focusTrap = null;
    }
  }

  debounceSearch(func, wait) {
    return (...args) => {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  cleanup() {
    // Clear timeouts
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    // Remove focus trap
    this.removeFocusTrap();

    // Reset body overflow
    if (this.isOpen) {
      document.body.style.overflow = '';
    }
  }

  // Public API
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  get opened() {
    return this.isOpen;
  }
}

// Register the custom element
if (!customElements.get('search-modal')) {
  customElements.define('search-modal', SearchModal);
}

// Export for use in global scope
window.SearchModal = SearchModal;