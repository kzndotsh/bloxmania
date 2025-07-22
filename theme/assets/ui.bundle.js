/*
 * BloxMania Theme - UI Bundle
 * Generated: 2025-07-22T09:54:11.896Z
 * Mode: development
 */

(function() {
  'use strict';

  // Bundle: ui
  const BUNDLE_NAME = 'ui';
  const BUNDLE_VERSION = '1.0.0';

  // Bundle initialization
  if (window.BloxMania && window.BloxMania.bundles) {
    window.BloxMania.bundles[BUNDLE_NAME] = {
      version: BUNDLE_VERSION,
      loaded: true,
      timestamp: Date.now()
    };
  }


// ui-cart-notification.js
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

// Register the component
if (!customElements.get('cart-notification')) {
  customElements.define('cart-notification', CartNotification);
}

// Export for use in global scope
window.CartNotification = CartNotification;



// ui-quantity.js
/**
 * Quantity Input - Following Dawn's Web Component patterns
 * Handles quantity input with increment/decrement buttons and validation
 */

class QuantityInput extends HTMLElement {
  constructor() {
    super();

    this.input = null;
    this.decreaseButton = null;
    this.increaseButton = null;
    this.min = 1;
    this.max = null;
    this.step = 1;
  }

  connectedCallback() {
    this.setupDOM();
    this.setupEventListeners();
    this.setupAccessibility();
    this.updateButtonStates();
  }

  disconnectedCallback() {
    this.cleanup();
  }

  setupDOM() {
    this.input = this.querySelector('input[type="number"]');

    // Look for buttons with various possible selectors
    this.decreaseButton = this.querySelector(
      '.quantity-decrease, [data-action="decrease"], [name="minus"], .quantity__button[name="minus"]'
    );
    this.increaseButton = this.querySelector(
      '.quantity-increase, [data-action="increase"], [name="plus"], .quantity__button[name="plus"]'
    );

    // Get attributes from input or element
    this.min = parseInt(
      this.input?.getAttribute('min') || this.getAttribute('min') || '1'
    );
    this.max =
      parseInt(this.input?.getAttribute('max') || this.getAttribute('max')) ||
      null;
    this.step = parseInt(
      this.input?.getAttribute('step') || this.getAttribute('step') || '1'
    );

    // Ensure input has proper attributes
    if (this.input) {
      this.input.setAttribute('min', this.min.toString());
      if (this.max) {
        this.input.setAttribute('max', this.max.toString());
      }
      this.input.setAttribute('step', this.step.toString());
    }
  }

  setupEventListeners() {
    // Input events
    if (this.input) {
      this.input.addEventListener('input', this.handleInput.bind(this));
      this.input.addEventListener('change', this.handleChange.bind(this));
      this.input.addEventListener('blur', this.handleBlur.bind(this));
      this.input.addEventListener('keydown', this.handleKeydown.bind(this));
    }

    // Button events - single click only
    if (this.decreaseButton) {
      this.decreaseButton.addEventListener(
        'click',
        this.handleDecrease.bind(this)
      );
    }

    if (this.increaseButton) {
      this.increaseButton.addEventListener(
        'click',
        this.handleIncrease.bind(this)
      );
    }
  }

  setupAccessibility() {
    // Set up ARIA attributes
    if (this.input) {
      this.input.setAttribute('role', 'spinbutton');
      this.input.setAttribute('aria-label', 'Quantity');
    }

    if (this.decreaseButton) {
      this.decreaseButton.setAttribute('aria-label', 'Decrease quantity');
      this.decreaseButton.setAttribute('type', 'button');
    }

    if (this.increaseButton) {
      this.increaseButton.setAttribute('aria-label', 'Increase quantity');
      this.increaseButton.setAttribute('type', 'button');
    }

    // Add live region for screen readers
    if (!this.querySelector('[aria-live]')) {
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'visually-hidden';
      liveRegion.id = `quantity-live-${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      this.appendChild(liveRegion);
    }
  }

  handleInput(event) {
    // Real-time validation during typing
    const value = parseInt(event.target.value);

    if (isNaN(value) || value < this.min) {
      // Don't prevent typing, but show visual feedback
      this.input.classList.add('quantity-input--invalid');
    } else {
      this.input.classList.remove('quantity-input--invalid');
    }

    this.updateButtonStates();
  }

  handleChange(event) {
    this.validateAndUpdate();
  }

  handleBlur(event) {
    this.validateAndUpdate();
  }

  handleKeydown(event) {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        this.changeQuantity(this.step);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.changeQuantity(-this.step);
        break;
      case 'Enter':
        event.preventDefault();
        this.validateAndUpdate();
        break;
    }
  }

  handleDecrease(event) {
    event.preventDefault();
    this.changeQuantity(-this.step);
  }

  handleIncrease(event) {
    event.preventDefault();
    this.changeQuantity(this.step);
  }

  changeQuantity(delta) {
    const currentValue = parseInt(this.input.value) || this.min;
    const newValue = currentValue + delta;

    this.setValue(newValue);
  }

  setValue(value) {
    const validatedValue = this.validateValue(value);

    if (this.input.value !== validatedValue.toString()) {
      this.input.value = validatedValue;
      this.input.dispatchEvent(new Event('change', { bubbles: true }));

      // Dispatch custom event
      this.dispatchEvent(
        new CustomEvent('quantity:changed', {
          bubbles: true,
          detail: {
            value: validatedValue,
            previousValue:
              parseInt(this.input.dataset.previousValue) || this.min,
            input: this,
          },
        })
      );

      // Update previous value
      this.input.dataset.previousValue = validatedValue.toString();

      // Announce to screen readers
      this.announceQuantityChange(validatedValue);
    }

    this.updateButtonStates();
  }

  validateValue(value) {
    const numValue = parseInt(value);

    // Handle invalid input
    if (isNaN(numValue)) {
      return this.min;
    }

    // Enforce minimum
    if (numValue < this.min) {
      return this.min;
    }

    // Enforce maximum
    if (this.max && numValue > this.max) {
      return this.max;
    }

    // Enforce step
    const remainder = (numValue - this.min) % this.step;
    if (remainder !== 0) {
      return numValue - remainder;
    }

    return numValue;
  }

  validateAndUpdate() {
    const currentValue = parseInt(this.input.value);
    const validatedValue = this.validateValue(currentValue);

    if (currentValue !== validatedValue) {
      this.setValue(validatedValue);
    }
  }

  updateButtonStates() {
    const currentValue = parseInt(this.input.value) || this.min;

    // Update decrease button
    if (this.decreaseButton) {
      const canDecrease = currentValue > this.min;
      this.decreaseButton.disabled = !canDecrease;
      this.decreaseButton.setAttribute('aria-disabled', !canDecrease);
    }

    // Update increase button
    if (this.increaseButton) {
      const canIncrease = !this.max || currentValue < this.max;
      this.increaseButton.disabled = !canIncrease;
      this.increaseButton.setAttribute('aria-disabled', !canIncrease);
    }
  }

  announceQuantityChange(value) {
    const liveRegion = this.querySelector('[aria-live]');
    if (liveRegion) {
      liveRegion.textContent = `Quantity changed to ${value}`;
    }
  }

  cleanup() {
    // Remove event listeners if needed
  }

  // Getters and setters
  get value() {
    return parseInt(this.input?.value) || this.min;
  }

  set value(newValue) {
    this.setValue(newValue);
  }

  get minimum() {
    return this.min;
  }

  set minimum(newMin) {
    this.min = parseInt(newMin);
    if (this.input) {
      this.input.setAttribute('min', this.min.toString());
    }
    this.validateAndUpdate();
  }

  get maximum() {
    return this.max;
  }

  set maximum(newMax) {
    this.max = parseInt(newMax);
    if (this.input) {
      if (this.max) {
        this.input.setAttribute('max', this.max.toString());
      } else {
        this.input.removeAttribute('max');
      }
    }
    this.validateAndUpdate();
  }

  // Public methods
  increase() {
    this.changeQuantity(this.step);
  }

  decrease() {
    this.changeQuantity(-this.step);
  }

  reset() {
    this.setValue(this.min);
  }
}

// Register the component
if (!customElements.get('quantity-input')) {
  customElements.define('quantity-input', QuantityInput);
}



// ui-header.js
/**
 * Header Drawer - Following Dawn's Web Component patterns
 * Handles header scroll effects and mobile menu with proper focus management
 */

// Only declare if not already declared
if (typeof HeaderDrawer === 'undefined') {
  class HeaderDrawer extends HTMLElement {
    constructor() {
      super();
      this.header = null;
      this.drawer = null;
      this.menuButton = null;
      this.closeButton = null;
      this.isOpen = false;
    }

    connectedCallback() {
      this.header = this.querySelector('.header');
      this.drawer = this.querySelector('.mobile-menu');
      this.menuButton = this.querySelector('.mobile-menu-toggle');
      this.closeButton = this.querySelector('#mobile-menu-close');

      this.bindEvents();
      this.setupScrollEffects();
    }

    bindEvents() {
      this.menuButton?.addEventListener('click', () => this.openDrawer());
      this.closeButton?.addEventListener('click', () => this.closeDrawer());

      // Close on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.closeDrawer();
        }
      });

      // Close on backdrop click
      this.addEventListener('click', (e) => {
        if (e.target === this && this.isOpen) {
          this.closeDrawer();
        }
      });
    }

    setupScrollEffects() {
      let lastScrollTop = 0;
      const scrollThreshold = 100;
      const maxScrollForEffect = 300; // Maximum scroll distance for full effect

      const updateHeaderStyles = (scrollTop) => {
        if (!this.header) return;

        // Calculate scroll progress (0 to 1)
        const scrollProgress = Math.min(scrollTop / maxScrollForEffect, 1);

        // Set CSS custom properties for smooth transitions
        this.header.style.setProperty('--scroll-progress', scrollProgress);

        // Apply appropriate classes based on scroll position
        if (scrollTop > scrollThreshold) {
          this.header.classList.add('header--dynamic');
          this.header.classList.remove('header--transparent');
        } else {
          this.header.classList.remove('header--dynamic');
          this.header.classList.add('header--transparent');
        }

        // Hide/show header on scroll (optional - can be removed if not needed)
        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
          this.header.classList.add('header--hidden');
        } else {
          this.header.classList.remove('header--hidden');
        }
      };

      window.addEventListener('scroll', () => {
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        updateHeaderStyles(scrollTop);
        lastScrollTop = scrollTop;
      });

      // Initialize header state on page load - always start transparent
      this.header.classList.add('header--transparent');
      this.header.classList.remove('header--dynamic');
      this.header.classList.remove('header--hidden');

      // Force the header to be transparent on page load
      this.header.style.setProperty('--scroll-progress', '0');

      // Don't update header styles on page load - let the scroll event handle it
      // This ensures the header stays transparent until the user actually scrolls
    }

    openDrawer() {
      this.isOpen = true;
      this.setAttribute('open', '');
      document.body.classList.add('header-drawer-open');
      this.closeButton?.focus();

      // Trap focus
      this.trapFocus();
    }

    closeDrawer() {
      this.isOpen = false;
      this.removeAttribute('open');
      document.body.classList.remove('header-drawer-open');
      this.menuButton?.focus();

      // Remove focus trap
      this.removeTrapFocus();
    }

    trapFocus() {
      const focusableElements = this.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      this.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      });
    }

    removeTrapFocus() {
      this.removeEventListener('keydown', this.trapFocus);
    }
  }

  // Register the component
  if (!customElements.get('header-drawer')) {
    customElements.define('header-drawer', HeaderDrawer);
  }

  // Export for global scope
  window.HeaderDrawer = HeaderDrawer;
}

// Backward compatibility class
class HeaderUtils {
  constructor() {
    console.warn(
      'HeaderUtils is deprecated. Use HeaderDrawer Web Component instead.'
    );

    // Try to find or create HeaderDrawer element
    let headerDrawer = document.querySelector('header-drawer');
    if (!headerDrawer) {
      headerDrawer = document.createElement('header-drawer');
      const header = document.querySelector('header');
      if (header) {
        header.appendChild(headerDrawer);
      }
    }

    return headerDrawer;
  }
}



// ui-modal.js
/**
 * Details Modal - Following Dawn's DetailsModal pattern
 * A reusable modal component that can be triggered by details/summary elements
 */

class DetailsModal extends HTMLElement {
  constructor() {
    super();

    this.detailsContainer = null;
    this.summaryToggle = null;
    this.closeButton = null;
    this.focusTrap = null;
    this.isOpen = false;
  }

  connectedCallback() {
    this.setupDOM();
    this.setupEventListeners();
    this.setupAccessibility();
  }

  disconnectedCallback() {
    this.cleanup();
  }

  setupDOM() {
    this.detailsContainer =
      this.querySelector('details') || this.closest('details');
    this.summaryToggle = this.querySelector('summary');
    this.closeButton = this.querySelector('.modal-close-button');

    // If no details container, create one
    if (!this.detailsContainer) {
      this.detailsContainer = document.createElement('details');
      this.parentNode.insertBefore(this.detailsContainer, this);
      this.detailsContainer.appendChild(this);
    }
  }

  setupEventListeners() {
    // Summary toggle
    if (this.summaryToggle) {
      this.summaryToggle.addEventListener(
        'click',
        this.handleSummaryClick.bind(this)
      );
    }

    // Close button
    if (this.closeButton) {
      this.closeButton.addEventListener('click', this.close.bind(this));
    }

    // Details toggle event
    if (this.detailsContainer) {
      this.detailsContainer.addEventListener(
        'toggle',
        this.handleToggle.bind(this)
      );
    }

    // Keyboard events
    this.addEventListener('keydown', this.handleKeydown.bind(this));

    // Click outside to close
    this.addEventListener('click', this.handleBackdropClick.bind(this));

    // Prevent body scroll when modal is open
    document.addEventListener(
      'modal:opened',
      this.handleModalOpened.bind(this)
    );
    document.addEventListener(
      'modal:closed',
      this.handleModalClosed.bind(this)
    );
  }

  setupAccessibility() {
    // Set up ARIA attributes
    this.setAttribute('role', 'dialog');
    this.setAttribute('aria-modal', 'true');

    if (this.summaryToggle) {
      this.summaryToggle.setAttribute('aria-expanded', 'false');
      this.summaryToggle.setAttribute('aria-haspopup', 'dialog');
    }

    // Add modal title if not present
    if (!this.getAttribute('aria-labelledby')) {
      const title = this.querySelector('.modal-title, h1, h2, h3');
      if (title) {
        if (!title.id) {
          title.id = `modal-title-${Math.random().toString(36).substr(2, 9)}`;
        }
        this.setAttribute('aria-labelledby', title.id);
      }
    }
  }

  handleSummaryClick(event) {
    event.preventDefault();

    if (this.detailsContainer.hasAttribute('open')) {
      this.close();
    } else {
      this.open();
    }
  }

  handleToggle(event) {
    if (this.detailsContainer.hasAttribute('open')) {
      this.handleOpen();
    } else {
      this.handleClose();
    }
  }

  handleKeydown(event) {
    if (!this.isOpen) return;

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
      case 'Tab':
        // Focus trap is handled by DOMUtils if available
        break;
    }
  }

  handleBackdropClick(event) {
    // Close if clicking on the modal backdrop (not the content)
    if (event.target === this && this.isOpen) {
      this.close();
    }
  }

  handleModalOpened(event) {
    if (event.detail.modal === this) {
      document.body.style.overflow = 'hidden';
    }
  }

  handleModalClosed(event) {
    if (event.detail.modal === this) {
      document.body.style.overflow = '';
    }
  }

  open() {
    if (this.isOpen) return;

    this.detailsContainer.setAttribute('open', '');
    this.handleOpen();
  }

  handleOpen() {
    this.isOpen = true;
    this.classList.add('modal--open');

    // Update ARIA attributes
    if (this.summaryToggle) {
      this.summaryToggle.setAttribute('aria-expanded', 'true');
    }

    // Set up focus trap
    this.setupFocusTrap();

    // Prevent body scroll
    document.body.classList.add('modal-open');

    // Dispatch event
    document.dispatchEvent(
      new CustomEvent('modal:opened', {
        detail: { modal: this },
      })
    );

    this.dispatchEvent(
      new CustomEvent('details-modal:opened', {
        bubbles: true,
        detail: { modal: this },
      })
    );
  }

  close() {
    if (!this.isOpen) return;

    this.detailsContainer.removeAttribute('open');
    this.handleClose();
  }

  handleClose() {
    this.isOpen = false;
    this.classList.remove('modal--open');

    // Update ARIA attributes
    if (this.summaryToggle) {
      this.summaryToggle.setAttribute('aria-expanded', 'false');
    }

    // Remove focus trap
    this.removeFocusTrap();

    // Restore body scroll
    document.body.classList.remove('modal-open');

    // Return focus to summary toggle
    if (this.summaryToggle) {
      this.summaryToggle.focus();
    }

    // Dispatch event
    document.dispatchEvent(
      new CustomEvent('modal:closed', {
        detail: { modal: this },
      })
    );

    this.dispatchEvent(
      new CustomEvent('details-modal:closed', {
        bubbles: true,
        detail: { modal: this },
      })
    );
  }

  setupFocusTrap() {
    if (window.DOMUtils) {
      // Find the first focusable element or use close button
      const firstFocusable =
        this.querySelector(
          'input, button, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
        ) || this.closeButton;
      this.focusTrap = window.DOMUtils.trapFocus(this, firstFocusable);
    } else {
      // Fallback focus management
      const firstFocusable = this.querySelector(
        'input, button, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
      );
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }
  }

  removeFocusTrap() {
    if (this.focusTrap && typeof this.focusTrap === 'function') {
      this.focusTrap();
      this.focusTrap = null;
    }
  }

  cleanup() {
    // Remove focus trap
    this.removeFocusTrap();

    // Restore body scroll if this modal was open
    if (this.isOpen) {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
    }

    // Remove event listeners
    document.removeEventListener(
      'modal:opened',
      this.handleModalOpened.bind(this)
    );
    document.removeEventListener(
      'modal:closed',
      this.handleModalClosed.bind(this)
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

  show() {
    this.open();
  }

  hide() {
    this.close();
  }
}

// Register the component
if (!customElements.get('details-modal')) {
  customElements.define('details-modal', DetailsModal);
}

// Export for use in global scope
window.DetailsModal = DetailsModal;



// ui-search-modal.js
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
    this.searchHandler = window.DOMUtils
      ? window.DOMUtils.debounce(this.performSearch.bind(this), 300)
      : this.debounceSearch(this.performSearch.bind(this), 300);

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
          resources: ['product', 'collection', 'page'],
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
      const response = await fetch(
        `/search/suggest.json?q=${encodeURIComponent(
          query
        )}&resources[type]=product&resources[limit]=8`
      );

      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }

      const data = await response.json();
      console.log('Search API response:', data);

      return this.parseJsonResults(data, query);
    } catch (error) {
      console.error('Search API error:', error);
      throw error;
    }
  }

  parseJsonResults(data, query) {
    console.log('Full response data:', data);

    const products = [];

    // Handle the suggest.json response structure
    if (data.resources && data.resources.results) {
      // Check if results is an array or object
      if (Array.isArray(data.resources.results)) {
        products.push(...data.resources.results);
      } else if (typeof data.resources.results === 'object') {
        // If results is an object, extract products from it
        const resultsObj = data.resources.results;
        Object.keys(resultsObj).forEach((key) => {
          if (Array.isArray(resultsObj[key])) {
            products.push(...resultsObj[key]);
          }
        });
      }
    }

    // Also check for direct products array
    if (
      data.resources &&
      data.resources.products &&
      Array.isArray(data.resources.products)
    ) {
      products.push(...data.resources.products);
    }

    // Check for direct results array
    if (data.results && Array.isArray(data.results)) {
      products.push(...data.results);
    }

    console.log('Parsed products:', products);

    return products
      .map((product) => {
        // Ensure we have a valid product object
        if (!product || !product.title) {
          console.log('Skipping invalid product:', product);
          return null;
        }

        // Fix URL generation
        let productUrl = '';
        if (typeof product.url === 'string') {
          productUrl = product.url;
        } else if (product.handle) {
          productUrl = `/products/${product.handle}`;
        } else if (product.id) {
          productUrl = `/products/${product.id}`;
        } else {
          console.log('No valid URL for product:', product);
          return null;
        }

        return {
          title: product.title || product.name || '',
          url: productUrl,
          handle: product.handle || '',
          id: product.id || '',
          image: product.image || product.featured_image || '',
          price: product.price || product.price_min || '',
          compare_at_price: product.compare_at_price || product.price_max || '',
          available: product.available !== false,
          type: 'product',
        };
      })
      .filter(Boolean); // Remove null entries
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
          <li class="search-results__item" role="option" data-search-result data-url="${
            product.url
          }" tabindex="-1">
            <a href="${product.url}" class="search-results__link">
              ${
                product.image
                  ? `<img src="${product.image}" alt="${product.title}" class="search-results__image" loading="lazy">`
                  : ''
              }
              <div class="search-results__content">
                <h4 class="search-results__title">${this.highlightQuery(
                  product.title,
                  results.query
                )}</h4>
                ${
                  product.price
                    ? `<span class="search-results__price">${product.price}</span>`
                    : ''
                }
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

      results.collections.forEach((collection) => {
        html += `
          <li class="search-results__item" role="option" data-search-result data-url="${
            collection.url
          }" tabindex="-1">
            <a href="${collection.url}" class="search-results__link">
              ${
                collection.image
                  ? `<img src="${collection.image}" alt="${collection.title}" class="search-results__image" loading="lazy">`
                  : ''
              }
              <div class="search-results__content">
                <h4 class="search-results__title">${this.highlightQuery(
                  collection.title,
                  results.query
                )}</h4>
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
    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
      'gi'
    );
    return text.replace(regex, '<mark>$1</mark>');
  }

  showLoadingState() {
    if (this.results) {
      this.results.innerHTML =
        '<div class="search-results__loading">Searching...</div>';
    }
  }

  showErrorState() {
    if (this.results) {
      this.results.innerHTML =
        '<div class="search-results__error">Search failed. Please try again.</div>';
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

    const currentIndex = Array.from(items).findIndex((item) =>
      item.classList.contains('search-results__item--focused')
    );
    let newIndex;

    if (direction === 'down') {
      newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    } else {
      newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    }

    // Remove previous focus
    items.forEach((item) =>
      item.classList.remove('search-results__item--focused')
    );

    // Add new focus
    items[newIndex].classList.add('search-results__item--focused');
    items[newIndex].focus();
  }

  selectCurrentResult() {
    const focusedItem = this.results?.querySelector(
      '.search-results__item--focused'
    );
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
    this.dispatchEvent(
      new CustomEvent('search-modal:opened', {
        bubbles: true,
        detail: { modal: this },
      })
    );
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
    this.dispatchEvent(
      new CustomEvent('search-modal:closed', {
        bubbles: true,
        detail: { modal: this },
      })
    );
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

// Register the component
if (!customElements.get('search-modal')) {
  customElements.define('search-modal', SearchModal);
}

// Export for use in global scope
window.SearchModal = SearchModal;



  // Bundle completion
  if (window.BloxMania && window.BloxMania.bundles && window.BloxMania.bundles[BUNDLE_NAME]) {
    window.BloxMania.bundles[BUNDLE_NAME].initialized = true;
  }

  console.log(`✅ ${BUNDLE_NAME} bundle loaded`);
})();