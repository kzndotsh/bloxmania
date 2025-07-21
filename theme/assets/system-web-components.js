/**
 * BloxMania Web Components
 * Modern Web Components for enhanced functionality and maintainability
 */

/**
 * Safe Custom Element Registration
 * Prevents duplicate registration errors
 */
function safeDefineCustomElement(name, constructor) {
  if (!customElements.get(name)) {
    customElements.define(name, constructor);
  } else {
    console.warn(
      `Custom element '${name}' is already defined, skipping registration.`
    );
  }
}

// Base component class for common functionality
class BloxManiaComponent extends HTMLElement {
  constructor() {
    super();
    this.initialized = false;
  }

  connectedCallback() {
    if (this.initialized) return;
    this.init();
    this.initialized = true;
  }

  disconnectedCallback() {
    this.cleanup();
  }

  init() {
    // Override in subclasses
  }

  cleanup() {
    // Override in subclasses
  }
}

// Modal Dialog Component
class ModalDialog extends BloxManiaComponent {
  constructor() {
    super();
    this.modal = null;
    this.closeButton = null;
    this.focusableElements = [];
    this.firstFocusableElement = null;
    this.lastFocusableElement = null;
  }

  init() {
    this.modal = this.querySelector('.modal__content');
    this.closeButton = this.querySelector('.modal__close-button');

    this.bindEvents();
    this.setupFocusTrap();
  }

  bindEvents() {
    this.closeButton?.addEventListener('click', () => this.hide());
    this.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.hide();
    });

    // Close on backdrop click
    this.addEventListener('click', (e) => {
      if (e.target === this) this.hide();
    });
  }

  setupFocusTrap() {
    this.focusableElements = Array.from(
      this.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    );

    if (this.focusableElements.length > 0) {
      this.firstFocusableElement = this.focusableElements[0];
      this.lastFocusableElement =
        this.focusableElements[this.focusableElements.length - 1];
    }
  }

  show() {
    this.setAttribute('open', '');
    document.body.classList.add('modal-open');
    this.firstFocusableElement?.focus();

    // Trap focus
    this.addEventListener('keydown', this.handleTabKey.bind(this));
  }

  hide() {
    this.removeAttribute('open');
    document.body.classList.remove('modal-open');
    this.removeEventListener('keydown', this.handleTabKey.bind(this));
  }

  handleTabKey(e) {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === this.firstFocusableElement) {
        e.preventDefault();
        this.lastFocusableElement?.focus();
      }
    } else {
      if (document.activeElement === this.lastFocusableElement) {
        e.preventDefault();
        this.firstFocusableElement?.focus();
      }
    }
  }

  cleanup() {
    this.removeEventListener('keydown', this.handleTabKey.bind(this));
  }
}

// Search Modal Component
class SearchModal extends ModalDialog {
  constructor() {
    super();
    this.searchInput = null;
    this.searchResults = null;
    this.searchForm = null;
  }

  init() {
    super.init();
    this.searchInput = this.querySelector('.search-modal__input');
    this.searchResults = this.querySelector('.search-modal__results');
    this.searchForm = this.querySelector('.search-modal__form');

    this.setupSearch();
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
  }

  performSearch() {
    const query = this.searchInput?.value.trim();
    if (!query || query.length < 2) {
      this.clearResults();
      return;
    }

    this.fetchSearchResults(query);
  }

  async fetchSearchResults(query) {
    try {
      const response = await fetch(
        `/search/suggest.json?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      this.displayResults(data.resources?.results || []);
    } catch (error) {
      console.error('Search error:', error);
    }
  }

  displayResults(results) {
    if (!this.searchResults) return;

    if (results.length === 0) {
      this.searchResults.innerHTML =
        '<p class="search-modal__no-results">No results found</p>';
      return;
    }

    const resultsHTML = results
      .map(
        (result) => `
      <a href="${result.url}" class="search-modal__result-item">
        <div class="search-modal__result-image">
          ${
            result.featured_image
              ? `<img src="${result.featured_image}" alt="${result.title}">`
              : ''
          }
        </div>
        <div class="search-modal__result-content">
          <h3 class="search-modal__result-title">${result.title}</h3>
          <p class="search-modal__result-price">${result.price || ''}</p>
        </div>
      </a>
    `
      )
      .join('');

    this.searchResults.innerHTML = resultsHTML;
  }

  clearResults() {
    if (this.searchResults) {
      this.searchResults.innerHTML = '';
    }
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Cart Notification Component
class CartNotification extends BloxManiaComponent {
  constructor() {
    super();
    this.notification = null;
    this.message = null;
    this.closeButton = null;
    this.timeout = null;
  }

  init() {
    this.notification = this.querySelector('.cart-notification');
    this.message = this.querySelector('.cart-notification__message');
    this.closeButton = this.querySelector('.cart-notification__close');

    this.bindEvents();
  }

  bindEvents() {
    this.closeButton?.addEventListener('click', () => this.hide());

    // Auto-hide after 5 seconds
    this.addEventListener('animationend', () => {
      if (this.classList.contains('animate-in')) {
        this.timeout = setTimeout(() => this.hide(), 5000);
      }
    });
  }

  show(message, type = 'success') {
    if (this.message) {
      this.message.textContent = message;
    }

    this.classList.remove('animate-out');
    this.classList.add('animate-in');
    this.setAttribute('aria-hidden', 'false');

    // Announce to screen readers
    this.announceToScreenReader(message);
  }

  hide() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }

    this.classList.remove('animate-in');
    this.classList.add('animate-out');
    this.setAttribute('aria-hidden', 'true');
  }

  announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.classList.add('sr-only');
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  cleanup() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }
}

// Product Form Component
class ProductForm extends BloxManiaComponent {
  constructor() {
    super();
    this.form = null;
    this.submitButton = null;
    this.variantSelects = null;
    this.quantityInput = null;
    this.productId = null;
  }

  init() {
    this.form = this.querySelector('form');
    this.submitButton = this.querySelector('[type="submit"]');
    this.variantSelects = this.querySelectorAll('.product-form__input');
    this.quantityInput = this.querySelector('.quantity__input');
    this.productId = this.dataset.productId;

    this.bindEvents();
  }

  bindEvents() {
    this.form?.addEventListener('submit', (e) => this.handleSubmit(e));

    this.variantSelects.forEach((select) => {
      select.addEventListener('change', () => this.handleVariantChange());
    });

    this.quantityInput?.addEventListener('change', () =>
      this.handleQuantityChange()
    );
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (!this.validateForm()) return;

    this.setLoadingState(true);

    try {
      const formData = new FormData(this.form);
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Add to cart failed');

      const result = await response.json();
      this.handleSuccess(result);
    } catch (error) {
      this.handleError(error);
    } finally {
      this.setLoadingState(false);
    }
  }

  validateForm() {
    // Basic validation
    const requiredFields = this.form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false;
        field.classList.add('error');
      } else {
        field.classList.remove('error');
      }
    });

    return isValid;
  }

  setLoadingState(loading) {
    if (this.submitButton) {
      this.submitButton.disabled = loading;
      this.submitButton.textContent = loading ? 'Adding...' : 'Add to Cart';
    }
  }

  handleSuccess(result) {
    // Trigger cart update event
    document.dispatchEvent(
      new CustomEvent('cart:updated', {
        detail: { cart: result },
      })
    );

    // Show success notification
    const notification = document.querySelector('cart-notification');
    if (notification) {
      notification.show('Item added to cart successfully');
    }
  }

  handleError(error) {
    console.error('Add to cart error:', error);

    const notification = document.querySelector('cart-notification');
    if (notification) {
      notification.show('Failed to add item to cart', 'error');
    }
  }

  handleVariantChange() {
    // Handle variant selection changes
    const selectedOptions = Array.from(this.variantSelects).map(
      (select) => select.value
    );
    // Emit variant change event
    this.dispatchEvent(
      new CustomEvent('variant:change', {
        detail: { selectedOptions },
      })
    );
  }

  handleQuantityChange() {
    // Handle quantity changes
    const quantity = this.quantityInput?.value;
    if (quantity) {
      this.dispatchEvent(
        new CustomEvent('quantity:change', {
          detail: { quantity: parseInt(quantity) },
        })
      );
    }
  }
}

// Register all components
safeDefineCustomElement('modal-dialog', ModalDialog);
safeDefineCustomElement('search-modal', SearchModal);
safeDefineCustomElement('cart-notification', CartNotification);
safeDefineCustomElement('product-form', ProductForm);

// Export for use in other modules
window.BloxManiaComponents = {
  ModalDialog,
  SearchModal,
  CartNotification,
  ProductForm,
};
