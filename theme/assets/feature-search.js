/**
 * Predictive Search - Following Dawn's Web Component patterns
 * Enhanced predictive search with caching, keyboard navigation, and accessibility
 */

class PredictiveSearch extends HTMLElement {
  constructor() {
    super();
    
    this.input = null;
    this.results = null;
    this.isOpen = false;
    this.currentFocus = -1;
    this.searchUtils = null;
    this.abortController = null;
    this.cachedResults = new Map();
  }

  connectedCallback() {
    this.setupDOM();
    this.setupEventListeners();
    this.setupAccessibility();
    
    // Initialize search utils
    if (window.SearchUtils) {
      this.searchUtils = new window.SearchUtils();
    }
  }

  disconnectedCallback() {
    this.cleanup();
  }

  setupDOM() {
    this.input = this.querySelector('input[type="search"]');
    this.results = this.querySelector('.predictive-search__results');
    
    // Create results container if it doesn't exist
    if (!this.results) {
      this.results = document.createElement('div');
      this.results.className = 'predictive-search__results';
      this.appendChild(this.results);
    }
  }

  setupEventListeners() {
    if (!this.input) return;

    // Search input events
    this.input.addEventListener('input', this.handleInput.bind(this));
    this.input.addEventListener('focus', this.handleFocus.bind(this));
    this.input.addEventListener('blur', this.handleBlur.bind(this));
    this.input.addEventListener('keydown', this.handleKeydown.bind(this));

    // Results events
    this.results.addEventListener('click', this.handleResultClick.bind(this));
    this.results.addEventListener('mouseover', this.handleResultHover.bind(this));

    // Form submission
    const form = this.querySelector('form');
    if (form) {
      form.addEventListener('submit', this.handleFormSubmit.bind(this));
    }

    // Close on outside click
    document.addEventListener('click', this.handleOutsideClick.bind(this));
  }

  setupAccessibility() {
    if (!this.input) return;

    // Set up ARIA attributes
    this.input.setAttribute('role', 'combobox');
    this.input.setAttribute('aria-expanded', 'false');
    this.input.setAttribute('aria-autocomplete', 'list');
    this.input.setAttribute('aria-haspopup', 'listbox');

    // Set up results container
    this.results.setAttribute('role', 'listbox');
    this.results.setAttribute('aria-label', 'Search suggestions');

    // Generate unique IDs
    const inputId = this.input.id || `search-input-${Math.random().toString(36).substr(2, 9)}`;
    const resultsId = `${inputId}-results`;

    this.input.id = inputId;
    this.results.id = resultsId;
    this.input.setAttribute('aria-owns', resultsId);
  }

  handleInput(event) {
    const query = event.target.value.trim();
    
    if (query.length === 0) {
      this.close();
      return;
    }

    if (query.length < 2) {
      return; // Wait for at least 2 characters
    }

    // Debounce search
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.performSearch(query);
    }, 300);
  }

  handleFocus(event) {
    const query = event.target.value.trim();
    if (query.length >= 2) {
      this.performSearch(query);
    }
  }

  handleBlur(event) {
    // Delay closing to allow for result clicks
    setTimeout(() => {
      if (!this.contains(document.activeElement)) {
        this.close();
      }
    }, 150);
  }

  handleKeydown(event) {
    const resultItems = this.results.querySelectorAll('.predictive-search__item');
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.currentFocus = Math.min(this.currentFocus + 1, resultItems.length - 1);
        this.updateFocus(resultItems);
        break;
        
      case 'ArrowUp':
        event.preventDefault();
        this.currentFocus = Math.max(this.currentFocus - 1, -1);
        this.updateFocus(resultItems);
        break;
        
      case 'Enter':
        event.preventDefault();
        if (this.currentFocus >= 0 && resultItems[this.currentFocus]) {
          this.selectResult(resultItems[this.currentFocus]);
        } else {
          this.submitSearch();
        }
        break;
        
      case 'Escape':
        this.close();
        break;
        
      case 'Tab':
        this.close();
        break;
    }
  }

  handleResultClick(event) {
    const resultItem = event.target.closest('.predictive-search__item');
    if (resultItem) {
      event.preventDefault();
      this.selectResult(resultItem);
    }
  }

  handleResultHover(event) {
    const resultItem = event.target.closest('.predictive-search__item');
    if (resultItem) {
      const resultItems = this.results.querySelectorAll('.predictive-search__item');
      this.currentFocus = Array.from(resultItems).indexOf(resultItem);
      this.updateFocus(resultItems);
    }
  }

  handleFormSubmit(event) {
    this.close();
    // Let the form submit naturally
  }

  handleOutsideClick(event) {
    if (!this.contains(event.target)) {
      this.close();
    }
  }

  async performSearch(query) {
    // Check cache first
    if (this.cachedResults.has(query)) {
      this.displayResults(this.cachedResults.get(query));
      return;
    }

    // Cancel previous request
    if (this.abortController) {
      this.abortController.abort();
    }

    this.abortController = new AbortController();
    this.showLoadingState();

    try {
      let results;
      
      if (this.searchUtils) {
        results = await this.searchUtils.performSearch(query, {
          limit: 8,
          resources: ['product', 'collection', 'page'],
          useCache: true
        });
      } else {
        results = await this.fallbackSearch(query);
      }

      if (results && !this.abortController.signal.aborted) {
        // Cache results
        this.cachedResults.set(query, results);
        
        // Limit cache size
        if (this.cachedResults.size > 20) {
          const firstKey = this.cachedResults.keys().next().value;
          this.cachedResults.delete(firstKey);
        }

        this.displayResults(results);
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Search error:', error);
        this.showErrorState();
      }
    }
  }

  async fallbackSearch(query) {
    const response = await fetch(`/search/suggest?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=8`, {
      signal: this.abortController.signal
    });

    if (!response.ok) {
      throw new Error(`Search failed: ${response.status}`);
    }

    const html = await response.text();
    return this.parseSearchResults(html, query);
  }

  parseSearchResults(html, query) {
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
    if (!results || (!results.products?.length && !results.collections?.length && !results.pages?.length)) {
      this.showEmptyState(results?.query);
      return;
    }

    let html = '<ul class="predictive-search__list" role="listbox">';

    // Products
    if (results.products?.length > 0) {
      html += '<li class="predictive-search__section-header" role="presentation">Products</li>';
      results.products.forEach((product, index) => {
        html += this.buildProductItem(product, index);
      });
    }

    // Collections
    if (results.collections?.length > 0) {
      html += '<li class="predictive-search__section-header" role="presentation">Collections</li>';
      results.collections.forEach((collection, index) => {
        html += this.buildCollectionItem(collection, index + (results.products?.length || 0));
      });
    }

    // Pages
    if (results.pages?.length > 0) {
      html += '<li class="predictive-search__section-header" role="presentation">Pages</li>';
      results.pages.forEach((page, index) => {
        html += this.buildPageItem(page, index + (results.products?.length || 0) + (results.collections?.length || 0));
      });
    }

    // View all results link
    html += `
      <li class="predictive-search__item predictive-search__item--view-all" role="option">
        <a href="/search?q=${encodeURIComponent(results.query)}" class="predictive-search__link">
          <span class="predictive-search__text">View all results for "${results.query}"</span>
        </a>
      </li>
    `;

    html += '</ul>';

    this.results.innerHTML = html;
    this.open();
    this.currentFocus = -1;
  }

  buildProductItem(product, index) {
    const highlightedTitle = this.highlightQuery(product.title, product.query);
    
    return `
      <li class="predictive-search__item" role="option" data-url="${product.url}">
        <a href="${product.url}" class="predictive-search__link">
          ${product.image ? `<img src="${product.image}" alt="${product.title}" class="predictive-search__image" loading="lazy">` : ''}
          <div class="predictive-search__content">
            <h4 class="predictive-search__title">${highlightedTitle}</h4>
            ${product.price ? `<span class="predictive-search__price">${product.price}</span>` : ''}
          </div>
        </a>
      </li>
    `;
  }

  buildCollectionItem(collection, index) {
    const highlightedTitle = this.highlightQuery(collection.title, collection.query);
    
    return `
      <li class="predictive-search__item" role="option" data-url="${collection.url}">
        <a href="${collection.url}" class="predictive-search__link">
          ${collection.image ? `<img src="${collection.image}" alt="${collection.title}" class="predictive-search__image" loading="lazy">` : ''}
          <div class="predictive-search__content">
            <h4 class="predictive-search__title">${highlightedTitle}</h4>
            <span class="predictive-search__type">Collection</span>
          </div>
        </a>
      </li>
    `;
  }

  buildPageItem(page, index) {
    const highlightedTitle = this.highlightQuery(page.title, page.query);
    
    return `
      <li class="predictive-search__item" role="option" data-url="${page.url}">
        <a href="${page.url}" class="predictive-search__link">
          <div class="predictive-search__content">
            <h4 class="predictive-search__title">${highlightedTitle}</h4>
            ${page.excerpt ? `<p class="predictive-search__excerpt">${page.excerpt}</p>` : ''}
          </div>
        </a>
      </li>
    `;
  }

  highlightQuery(text, query) {
    if (!text || !query) return text;
    
    if (window.SearchUtils?.highlightSearchTerms) {
      return window.SearchUtils.highlightSearchTerms(text, query);
    }
    
    // Fallback highlighting
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  showLoadingState() {
    this.results.innerHTML = '<div class="predictive-search__loading">Searching...</div>';
    this.open();
  }

  showErrorState() {
    this.results.innerHTML = '<div class="predictive-search__error">Search failed. Please try again.</div>';
    this.open();
  }

  showEmptyState(query) {
    this.results.innerHTML = `<div class="predictive-search__empty">No results found${query ? ` for "${query}"` : ''}</div>`;
    this.open();
  }

  updateFocus(resultItems) {
    // Remove previous focus
    resultItems.forEach(item => {
      item.classList.remove('predictive-search__item--focused');
      item.setAttribute('aria-selected', 'false');
    });

    // Add current focus
    if (this.currentFocus >= 0 && resultItems[this.currentFocus]) {
      const focusedItem = resultItems[this.currentFocus];
      focusedItem.classList.add('predictive-search__item--focused');
      focusedItem.setAttribute('aria-selected', 'true');
      
      // Update input aria-activedescendant
      this.input.setAttribute('aria-activedescendant', focusedItem.id || `result-${this.currentFocus}`);
    } else {
      this.input.removeAttribute('aria-activedescendant');
    }
  }

  selectResult(resultItem) {
    const link = resultItem.querySelector('a');
    if (link) {
      window.location.href = link.href;
    }
  }

  submitSearch() {
    const form = this.querySelector('form');
    if (form) {
      form.submit();
    }
  }

  open() {
    if (this.isOpen) return;

    this.isOpen = true;
    this.classList.add('predictive-search--open');
    this.results.style.display = 'block';
    
    // Update ARIA attributes
    this.input.setAttribute('aria-expanded', 'true');

    // Dispatch event
    this.dispatchEvent(new CustomEvent('predictive-search:opened', {
      bubbles: true,
      detail: { search: this }
    }));
  }

  close() {
    if (!this.isOpen) return;

    this.isOpen = false;
    this.classList.remove('predictive-search--open');
    this.results.style.display = 'none';
    this.results.innerHTML = '';
    this.currentFocus = -1;

    // Update ARIA attributes
    this.input.setAttribute('aria-expanded', 'false');
    this.input.removeAttribute('aria-activedescendant');

    // Cancel any pending requests
    if (this.abortController) {
      this.abortController.abort();
    }

    // Dispatch event
    this.dispatchEvent(new CustomEvent('predictive-search:closed', {
      bubbles: true,
      detail: { search: this }
    }));
  }

  cleanup() {
    // Clear timeouts
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    // Cancel requests
    if (this.abortController) {
      this.abortController.abort();
    }

    // Remove document event listeners
    document.removeEventListener('click', this.handleOutsideClick.bind(this));
  }

  // Public API
  get query() {
    return this.input?.value || '';
  }

  set query(value) {
    if (this.input) {
      this.input.value = value;
      if (value.length >= 2) {
        this.performSearch(value);
      }
    }
  }

  clear() {
    if (this.input) {
      this.input.value = '';
    }
    this.close();
  }

  focus() {
    if (this.input) {
      this.input.focus();
    }
  }
}

// Register the custom element
if (!customElements.get('predictive-search')) {
  customElements.define('predictive-search', PredictiveSearch);
}

// Export for use in global scope
window.PredictiveSearch = PredictiveSearch;