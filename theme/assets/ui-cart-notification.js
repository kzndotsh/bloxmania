/**
 * Cart Notification - Following Dawn's Web Component patterns
 * Handles cart notifications with proper accessibility and animations
 */

class CartNotification extends HTMLElement {
  constructor() {
    super();

    this.notification = null;
    this.closeButton = null;
    this.isOpen = false;
    this.hideTimeout = null;
    this.focusTrap = null;
  }

  connectedCallback() {
    this.notification = this.querySelector('.cart-notification') || this;
    this.closeButton = this.querySelector('.cart-notification__close');

    this.setupEventListeners();
    this.setupAccessibility();

    // Listen for cart events
    document.addEventListener(
      'cart:item-added',
      this.handleCartItemAdded.bind(this)
    );
    document.addEventListener(
      'cart:updated',
      this.handleCartUpdated.bind(this)
    );
  }

  disconnectedCallback() {
    this.cleanup();
  }

  setupEventListeners() {
    // Close button
    if (this.closeButton) {
      this.closeButton.addEventListener('click', this.close.bind(this));
    }

    // Escape key
    this.addEventListener('keydown', this.handleKeydown.bind(this));

    // Auto-hide on backdrop click
    this.addEventListener('click', this.handleBackdropClick.bind(this));
  }

  setupAccessibility() {
    this.setAttribute('role', 'status');
    this.setAttribute('aria-live', 'polite');
    this.setAttribute('aria-atomic', 'true');

    if (this.closeButton) {
      this.closeButton.setAttribute('aria-label', 'Close notification');
    }
  }

  handleKeydown(event) {
    if (event.key === 'Escape' && this.isOpen) {
      this.close();
    }
  }

  handleBackdropClick(event) {
    if (event.target === this && this.isOpen) {
      this.close();
    }
  }

  handleCartItemAdded(event) {
    const { item, cart } = event.detail;
    this.showAddedNotification(item, cart);
  }

  handleCartUpdated(event) {
    const { cart } = event.detail;
    this.showUpdatedNotification(cart);
  }

  showAddedNotification(item, cart) {
    const content = this.buildAddedContent(item, cart);
    this.show(content, 'success');
  }

  showUpdatedNotification(cart) {
    const content = this.buildUpdatedContent(cart);
    this.show(content, 'info');
  }

  buildAddedContent(item, cart) {
    const itemImage = item.featured_image
      ? `<img src="${item.featured_image.url}" alt="${item.product_title}" class="cart-notification__image" loading="lazy">`
      : '';

    return `
      <div class="cart-notification__content cart-notification__content--added">
        <div class="cart-notification__header">
          <h3 class="cart-notification__title">Item added to cart</h3>
          ${
            this.closeButton
              ? ''
              : '<button class="cart-notification__close" aria-label="Close notification">&times;</button>'
          }
        </div>
        <div class="cart-notification__body">
          <div class="cart-notification__item">
            ${itemImage}
            <div class="cart-notification__item-details">
              <h4 class="cart-notification__item-title">${
                item.product_title
              }</h4>
              ${
                item.variant_title
                  ? `<p class="cart-notification__item-variant">${item.variant_title}</p>`
                  : ''
              }
              <p class="cart-notification__item-price">
                ${this.formatPrice(item.final_price)} × ${item.quantity}
              </p>
            </div>
          </div>
        </div>
        <div class="cart-notification__footer">
          <div class="cart-notification__cart-info">
            <p class="cart-notification__cart-total">
              Cart total: ${this.formatPrice(cart.total_price)} (${
      cart.item_count
    } ${cart.item_count === 1 ? 'item' : 'items'})
            </p>
          </div>
          <div class="cart-notification__actions">
            <button class="cart-notification__continue btn-secondary" onclick="this.closest('cart-notification').close()">
              Continue shopping
            </button>
            <a href="/cart" class="cart-notification__view-cart btn-primary">
              View cart
            </a>
          </div>
        </div>
      </div>
    `;
  }

  buildUpdatedContent(cart) {
    return `
      <div class="cart-notification__content cart-notification__content--updated">
        <div class="cart-notification__header">
          <h3 class="cart-notification__title">Cart updated</h3>
          ${
            this.closeButton
              ? ''
              : '<button class="cart-notification__close" aria-label="Close notification">&times;</button>'
          }
        </div>
        <div class="cart-notification__body">
          <p class="cart-notification__cart-total">
            Cart total: ${this.formatPrice(cart.total_price)} (${
      cart.item_count
    } ${cart.item_count === 1 ? 'item' : 'items'})
          </p>
        </div>
        <div class="cart-notification__footer">
          <div class="cart-notification__actions">
            <button class="cart-notification__continue btn-secondary" onclick="this.closest('cart-notification').close()">
              Continue shopping
            </button>
            <a href="/cart" class="cart-notification__view-cart btn-primary">
              View cart
            </a>
          </div>
        </div>
      </div>
    `;
  }

  show(content, type = 'info', duration = 5000) {
    // Update content
    this.innerHTML = content;

    // Re-setup close button after content update
    this.closeButton = this.querySelector('.cart-notification__close');
    if (this.closeButton) {
      this.closeButton.addEventListener('click', this.close.bind(this));
    }

    // Add type class
    this.className = `cart-notification cart-notification--${type}`;

    // Show notification
    this.open();

    // Auto-hide after duration
    if (duration > 0) {
      this.hideTimeout = setTimeout(() => {
        this.close();
      }, duration);
    }

    // Announce to screen readers
    this.announceToScreenReader(
      type === 'success' ? 'Item added to cart' : 'Cart updated'
    );
  }

  open() {
    if (this.isOpen) return;

    this.isOpen = true;
    this.classList.add('cart-notification--open');

    // Animate in
    this.style.transform = 'translateX(100%)';
    this.style.transition = 'transform 0.3s ease-out';

    // Force reflow
    this.offsetHeight;

    this.style.transform = 'translateX(0)';

    // Set up focus trap for keyboard users
    this.setupFocusTrap();

    // Dispatch event
    this.dispatchEvent(
      new CustomEvent('cart-notification:opened', {
        bubbles: true,
        detail: { notification: this },
      })
    );
  }

  close() {
    if (!this.isOpen) return;

    this.isOpen = false;
    this.classList.remove('cart-notification--open');

    // Clear auto-hide timeout
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }

    // Animate out
    this.style.transform = 'translateX(100%)';

    // Remove from DOM after animation
    setTimeout(() => {
      this.style.transform = '';
      this.style.transition = '';
      this.innerHTML = '';
    }, 300);

    // Remove focus trap
    this.removeFocusTrap();

    // Dispatch event
    this.dispatchEvent(
      new CustomEvent('cart-notification:closed', {
        bubbles: true,
        detail: { notification: this },
      })
    );
  }

  setupFocusTrap() {
    // Only trap focus if user is navigating with keyboard
    if (this.isKeyboardUser()) {
      if (window.DOMUtils) {
        this.focusTrap = window.DOMUtils.trapFocus(this);
      }
    }
  }

  removeFocusTrap() {
    if (this.focusTrap && typeof this.focusTrap === 'function') {
      this.focusTrap();
      this.focusTrap = null;
    }
  }

  isKeyboardUser() {
    // Simple heuristic: check if user has recently used keyboard
    return (
      document.body.classList.contains('keyboard-user') ||
      (document.activeElement && document.activeElement !== document.body)
    );
  }

  announceToScreenReader(message) {
    if (window.ThemeUtilities) {
      const a11yUtil = window.ThemeUtilities.getUtility('a11y');
      if (a11yUtil) {
        a11yUtil.announce(message);
      }
    }
  }

  formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price / 100);
  }

  cleanup() {
    // Clear timeouts
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }

    // Remove focus trap
    this.removeFocusTrap();

    // Remove event listeners
    document.removeEventListener(
      'cart:item-added',
      this.handleCartItemAdded.bind(this)
    );
    document.removeEventListener(
      'cart:updated',
      this.handleCartUpdated.bind(this)
    );
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
if (!customElements.get('cart-notification')) {
  customElements.define('cart-notification', CartNotification);
}

// Export for use in global scope
window.CartNotification = CartNotification;
