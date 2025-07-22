/*
 * BloxMania Theme - FEATURES Bundle
 * Generated: 2025-07-22T09:34:53.001Z
 * Mode: development
 */

(function() {
  'use strict';

  // Bundle: features
  const BUNDLE_NAME = 'features';
  const BUNDLE_VERSION = '1.0.0';

  // Bundle initialization
  if (window.BloxMania && window.BloxMania.bundles) {
    window.BloxMania.bundles[BUNDLE_NAME] = {
      version: BUNDLE_VERSION,
      loaded: true,
      timestamp: Date.now()
    };
  }


// feature-cart.js
/**
 * Cart functionality for BloxMania theme
 * Enhanced to work with Shopify's native cart system
 */

class CartItems extends HTMLElement {
  constructor() {
    super();
    this.lineItemStatusElement = document.getElementById(
      'shopping-cart-line-item-status'
    );
    this.currentItemCount = Array.from(
      this.querySelectorAll('[name="updates[]"]')
    ).reduce(
      (total, quantityInput) => total + parseInt(quantityInput.value),
      0
    );

    this.originalQuantities = new Map();
    this.updateTimeout = null;
    this.isUpdating = false;

    // Store original quantities
    this.querySelectorAll('[name="updates[]"]').forEach((input) => {
      this.originalQuantities.set(
        input.dataset.cartItemKey,
        parseInt(input.value)
      );
    });

    // Debug: Check initial state
    console.log('CartItems initialized');
    console.log(
      'Quantity inputs found:',
      this.querySelectorAll('[name="updates[]"]').length
    );
    console.log(
      'Error elements found:',
      this.querySelectorAll('.cart-item__error').length
    );

    // Initialize error elements to be hidden
    this.initializeErrorElements();

    this.addEventListener('change', this.onChange.bind(this));

    // Listen for quantity changes from the quantity component
    this.addEventListener(
      'quantity:changed',
      this.onQuantityChanged.bind(this)
    );
  }

  onChange(event) {
    const quantityInput = event.target;
    const cartItemKey = quantityInput.dataset.cartItemKey;
    const quantity = parseInt(quantityInput.value);

    if (quantity < 0) {
      quantityInput.value = 0;
      return;
    }

    // Clear any existing timeout
    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout);
    }

    // If quantity is 0, update immediately (remove item)
    if (quantity === 0) {
      this.autoUpdateCart();
    } else {
      // Debounce the update to avoid too many API calls
      this.updateTimeout = setTimeout(() => {
        this.autoUpdateCart();
      }, 500); // Wait 500ms after user stops typing/changing
    }
  }

  onQuantityChanged(event) {
    // Handle quantity changes from the quantity component (plus/minus buttons)
    const { value, input } = event.detail;

    // Clear any existing timeout
    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout);
    }

    // For button clicks, update immediately (no debouncing needed)
    this.updateTimeout = setTimeout(() => {
      this.autoUpdateCart();
    }, 100); // Short delay for button clicks
  }

  // Removed checkForChanges method since we now have automatic updates

  async autoUpdateCart() {
    if (this.isUpdating) {
      return; // Prevent multiple simultaneous updates
    }

    const formData = new FormData();
    let hasChanges = false;
    const changedItems = [];
    const itemsToRemove = [];

    this.querySelectorAll('[name="updates[]"]').forEach((input) => {
      const cartItemKey = input.dataset.cartItemKey;
      const currentQuantity = parseInt(input.value);
      const originalQuantity = this.originalQuantities.get(cartItemKey) || 0;

      if (currentQuantity !== originalQuantity) {
        if (currentQuantity === 0) {
          // Items with quantity 0 should be removed
          itemsToRemove.push({ key: cartItemKey, quantity: currentQuantity });
        } else {
          // Items with quantity > 0 should be updated
          formData.append(`updates[${cartItemKey}]`, currentQuantity);
        }
        hasChanges = true;
        changedItems.push({ key: cartItemKey, quantity: currentQuantity });
      }
    });

    if (!hasChanges) {
      return;
    }

    this.isUpdating = true;

    // Show loading state on changed items
    changedItems.forEach(({ key }) => {
      const cartItem = this.querySelector(
        `[data-cart-item-key="${key}"]`
      ).closest('.cart-item');
      if (cartItem) {
        cartItem.classList.add('updating');
      }
    });

    try {
      let cart;

      // Handle items to remove (quantity 0) using /cart/change.js
      if (itemsToRemove.length > 0) {
        for (const item of itemsToRemove) {
          const removeBody = JSON.stringify({
            id: item.key,
            quantity: 0,
            sections: ['main-cart', 'cart-icon-bubble'],
          });

          const removeResponse = await fetch('/cart/change.js', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: removeBody,
          });

          if (!removeResponse.ok) {
            throw new Error(`HTTP error! status: ${removeResponse.status}`);
          }

          cart = await removeResponse.json();

          // Remove the cart item from DOM when quantity is 0
          const cartItem = this.querySelector(
            `[data-cart-item-key="${item.key}"]`
          ).closest('.cart-item');
          if (cartItem) {
            cartItem.remove();
            console.log('Removed cart item from DOM:', item.key);
          }
        }
      }

      // Handle items to update (quantity > 0) using /cart/update.js
      if (formData.entries().next().done === false) {
        const updateResponse = await fetch('/cart/update.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
          },
          body: new URLSearchParams(formData),
        });

        if (!updateResponse.ok) {
          throw new Error(`HTTP error! status: ${updateResponse.status}`);
        }

        cart = await updateResponse.json();
      }

      this.updateCartUI(cart);

      // Update original quantities
      this.querySelectorAll('[name="updates[]"]').forEach((input) => {
        const cartItemKey = input.dataset.cartItemKey;
        this.originalQuantities.set(cartItemKey, parseInt(input.value));
      });

      // Show subtle success feedback
      this.showAutoUpdateSuccess();
    } catch (error) {
      console.error('Error updating cart:', error);
      this.showError(
        null,
        'There was an error updating your cart. Please try again.'
      );

      // Revert quantities on error
      this.revertQuantities();
    } finally {
      this.isUpdating = false;

      // Remove loading state
      changedItems.forEach(({ key }) => {
        const cartItem = this.querySelector(
          `[data-cart-item-key="${key}"]`
        ).closest('.cart-item');
        if (cartItem) {
          cartItem.classList.remove('updating');
        }
      });
    }
  }

  async updateCart() {
    // Manual update method (kept for backward compatibility)
    await this.autoUpdateCart();
  }

  updateCartUI(cart) {
    // Clear any existing errors first
    this.clearAllErrors();

    // Update cart count in header
    const cartCountElements = document.querySelectorAll('[data-cart-count]');
    cartCountElements.forEach((element) => {
      element.textContent = cart.item_count;
    });

    // Update cart badge in header
    const cartBadge = document.querySelector('.header__cart-badge');
    if (cartBadge) {
      if (cart.item_count > 0) {
        cartBadge.textContent = cart.item_count;
        cartBadge.style.display = 'block';
      } else {
        cartBadge.style.display = 'none';
      }
    }

    // Update cart total
    const cartTotalElements = document.querySelectorAll('[data-cart-total]');
    cartTotalElements.forEach((element) => {
      element.textContent = this.formatMoney(cart.total_price);
    });

    // Update individual item prices and totals
    if (cart.items) {
      cart.items.forEach((item) => {
        const cartItem = this.querySelector(
          `[data-cart-item-key="${item.key}"]`
        ).closest('.cart-item');
        if (cartItem) {
          // Update item total price
          const priceElement = cartItem.querySelector(
            '.cart-item__final-price'
          );
          if (priceElement) {
            priceElement.textContent = this.formatMoney(item.final_line_price);
          }

          // Update item quantity
          const quantityInput = cartItem.querySelector('[name="updates[]"]');
          if (quantityInput) {
            quantityInput.value = item.quantity;
          }
        }
      });
    }

    // Update cart total display
    const cartTotalDisplay = document.querySelector('.totals__total-value');
    if (cartTotalDisplay) {
      cartTotalDisplay.textContent = this.formatMoney(cart.total_price);
    }

    // Update item count display
    const itemCountElement = document.querySelector('.cart__count');
    if (itemCountElement) {
      if (cart.item_count === 1) {
        itemCountElement.textContent = '1 item';
      } else {
        itemCountElement.textContent = `${cart.item_count} items`;
      }
    }

    // Update checkout button state
    const checkoutButton = document.getElementById('checkout');
    if (checkoutButton) {
      checkoutButton.disabled = cart.item_count === 0;
    }

    // Check if cart is empty and handle empty cart state
    if (cart.item_count === 0) {
      this.showEmptyCart();
    } else {
      // Remove is-empty class from cart page
      const cartPage = document.querySelector('.cart-page');
      if (cartPage) {
        cartPage.classList.remove('is-empty');
      }

      // Show cart form and header when cart has items
      const cartForm = document.querySelector('.cart__form');
      const cartWarnings = document.querySelector('.cart__warnings');
      const cartHeader = document.querySelector('.cart__header');

      if (cartForm) {
        cartForm.style.display = 'block';
      }
      if (cartWarnings) {
        cartWarnings.style.display = 'none';
      }
      if (cartHeader) {
        cartHeader.style.display = 'block';
      }
    }

    // Update quantity displays on product pages
    this.updateProductPageQuantityDisplays(cart);
  }

  updateProductPageQuantityDisplays(cart) {
    // Find all quantity display elements on product pages
    const quantityDisplays = document.querySelectorAll('.quantity__rules-cart');

    quantityDisplays.forEach((display) => {
      const variantId = display
        .closest('.quantity-input-wrapper')
        ?.querySelector('input')?.dataset.cartQuantity;
      if (variantId) {
        // Find the item in cart for this variant
        const cartItem = cart.items.find(
          (item) => item.variant_id.toString() === variantId
        );
        const quantity = cartItem ? cartItem.quantity : 0;

        if (quantity > 0) {
          display.textContent = `(${quantity} in cart)`;
          display.style.display = 'inline';
        } else {
          display.style.display = 'none';
        }
      }
    });
  }

  initializeErrorElements() {
    // Initialize all cart item errors to be hidden
    const errorElements = document.querySelectorAll('.cart-item__error');
    errorElements.forEach((errorElement) => {
      const errorText = errorElement.querySelector('.cart-item__error-text');
      if (errorText) {
        errorText.textContent = '';
      }
      errorElement.classList.remove('show-error');
    });

    // Initialize cart-level errors to be hidden
    const cartErrors = document.getElementById('cart-errors');
    if (cartErrors) {
      const cartErrorText = cartErrors.querySelector('.cart__error-text');
      if (cartErrorText) {
        cartErrorText.textContent = '';
      }
      cartErrors.classList.remove('show-error');
    }
  }

  clearAllErrors() {
    // Clear all cart item errors
    const errorElements = document.querySelectorAll('.cart-item__error');
    errorElements.forEach((errorElement) => {
      const errorText = errorElement.querySelector('.cart-item__error-text');
      if (errorText) {
        errorText.textContent = '';
      }
      errorElement.classList.remove('show-error');
    });

    // Clear cart-level errors
    const cartErrors = document.getElementById('cart-errors');
    if (cartErrors) {
      const cartErrorText = cartErrors.querySelector('.cart__error-text');
      if (cartErrorText) {
        cartErrorText.textContent = '';
      }
      cartErrors.classList.remove('show-error');
    }
  }

  showAutoUpdateSuccess() {
    // Show a subtle visual feedback for auto-updates
    const cartItems = document.querySelectorAll('.cart-item.updating');
    cartItems.forEach((item) => {
      item.classList.add('updated');
      setTimeout(() => {
        item.classList.remove('updated');
      }, 1000);
    });
  }

  showSuccess(message) {
    // Create a temporary success message
    const successElement = document.createElement('div');
    successElement.className = 'cart__success';
    successElement.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 12px 20px;
      border-radius: 6px;
      z-index: 1000;
      font-weight: 500;
    `;
    successElement.textContent = message;

    document.body.appendChild(successElement);

    // Remove after 3 seconds
    setTimeout(() => {
      if (successElement.parentNode) {
        successElement.parentNode.removeChild(successElement);
      }
    }, 3000);
  }

  revertQuantities() {
    // Revert quantities to their original values on error
    this.querySelectorAll('[name="updates[]"]').forEach((input) => {
      const cartItemKey = input.dataset.cartItemKey;
      const originalQuantity = this.originalQuantities.get(cartItemKey) || 0;
      input.value = originalQuantity;
    });
  }

  showError(cartItem, message) {
    const errorElement = cartItem
      ? cartItem.querySelector('.cart-item__error')
      : document.getElementById('cart-errors');
    if (errorElement) {
      const errorText =
        errorElement.querySelector('.cart-item__error-text') || errorElement;
      errorText.textContent = message;

      // Show the error element using CSS class
      errorElement.classList.add('show-error');

      // Hide error after 5 seconds by clearing content and removing class
      setTimeout(() => {
        errorText.textContent = '';
        errorElement.classList.remove('show-error');
      }, 5000);
    }
  }

  showEmptyCart() {
    console.log('Showing empty cart state');

    // Add is-empty class to the cart page
    const cartPage = document.querySelector('.cart-page');
    if (cartPage) {
      cartPage.classList.add('is-empty');
      console.log('Added is-empty class to cart page');
    } else {
      console.log('Cart page element not found');
    }

    // Hide the cart form and all its contents
    const cartForm = document.querySelector('.cart__form');
    if (cartForm) {
      cartForm.style.display = 'none';
      console.log('Hidden cart form');
    } else {
      console.log('Cart form element not found');
    }

    // Show the empty cart warnings
    let cartWarnings = document.querySelector('.cart__warnings');
    if (cartWarnings) {
      cartWarnings.style.display = 'block';
      console.log('Showed existing cart warnings');
    } else {
      // Create the empty cart message dynamically if it doesn't exist
      console.log('Creating empty cart message dynamically');
      cartWarnings = document.createElement('div');
      cartWarnings.className = 'cart__warnings';
      cartWarnings.innerHTML = `
        <h1 class="cart__empty-text">Your cart is empty</h1>
        <a href="/collections/all" class="button">
          Continue shopping
        </a>
      `;

      // Insert it after the cart form
      if (cartForm) {
        cartForm.parentNode.insertBefore(cartWarnings, cartForm.nextSibling);
      } else {
        // If no cart form, insert it into the page-width div
        const pageWidth = document.querySelector('.page-width');
        if (pageWidth) {
          pageWidth.appendChild(cartWarnings);
        }
      }
      console.log('Created and inserted cart warnings');
    }

    // Also hide the cart header since it shows item count
    const cartHeader = document.querySelector('.cart__header');
    if (cartHeader) {
      cartHeader.style.display = 'none';
      console.log('Hidden cart header');
    } else {
      console.log('Cart header element not found');
    }
  }

  formatMoney(cents) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cents / 100);
  }
}

class CartRemoveButton extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', this.onClick.bind(this));
  }

  onClick(event) {
    event.preventDefault();
    const cartItemKey = this.dataset.cartItemKey;
    const cartItem = this.closest('.cart-item');

    console.log('Remove button clicked for item:', cartItemKey);
    this.removeItem(cartItemKey, cartItem);
  }

  async removeItem(cartItemKey, cartItem) {
    console.log('Removing item with key:', cartItemKey);

    // Add loading state to the cart item
    if (cartItem) {
      cartItem.style.opacity = '0.5';
      cartItem.style.pointerEvents = 'none';
    }

    const body = JSON.stringify({
      id: cartItemKey,
      quantity: 0,
      sections: ['main-cart', 'cart-icon-bubble'],
    });

    try {
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: body,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const cart = await response.json();
      console.log('Cart updated successfully:', cart);

      // Remove the cart item from UI
      if (cartItem) {
        cartItem.remove();
        console.log('Cart item removed from UI');
      }

      // Update cart count in header
      const cartCountElements = document.querySelectorAll('[data-cart-count]');
      cartCountElements.forEach((element) => {
        element.textContent = cart.item_count;
      });

      // Update cart badge in header
      const cartBadge = document.querySelector('.header__cart-badge');
      if (cartBadge) {
        if (cart.item_count > 0) {
          cartBadge.textContent = cart.item_count;
          cartBadge.style.display = 'block';
        } else {
          cartBadge.style.display = 'none';
        }
      }

      // Update cart count in cart page header
      const cartCountText = document.querySelector('.cart__count');
      if (cartCountText) {
        if (cart.item_count === 1) {
          cartCountText.textContent = '1 item';
        } else {
          cartCountText.textContent = `${cart.item_count} items`;
        }
      }

      // Update cart totals
      const totalsValue = document.querySelector('.totals__total-value');
      if (totalsValue) {
        totalsValue.textContent = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(cart.total_price / 100);
      }

      // Check if cart is empty
      if (cart.item_count === 0) {
        this.showEmptyCart();
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  }

  showEmptyCart() {
    console.log('Showing empty cart state from remove button');

    // Use the existing showEmptyCart method from CartItems class
    const cartItems = document.querySelector('cart-items');
    if (cartItems && cartItems.showEmptyCart) {
      cartItems.showEmptyCart();
    } else {
      console.log(
        'CartItems component not found, falling back to direct implementation'
      );
      // Fallback implementation if CartItems is not available
      this.showEmptyCartFallback();
    }
  }

  showEmptyCartFallback() {
    // Add is-empty class to the cart page
    const cartPage = document.querySelector('.cart-page');
    if (cartPage) {
      cartPage.classList.add('is-empty');
      console.log('Added is-empty class to cart page');
    } else {
      console.log('Cart page element not found');
    }

    // Hide the cart form and all its contents
    const cartForm = document.querySelector('.cart__form');
    if (cartForm) {
      cartForm.style.display = 'none';
      console.log('Hidden cart form');
    } else {
      console.log('Cart form element not found');
    }

    // Show the empty cart warnings
    let cartWarnings = document.querySelector('.cart__warnings');
    if (cartWarnings) {
      cartWarnings.style.display = 'block';
      console.log('Showed existing cart warnings');
    } else {
      // Create the empty cart message dynamically
      console.log('Creating empty cart message dynamically');
      cartWarnings = document.createElement('div');
      cartWarnings.className = 'cart__warnings';
      cartWarnings.innerHTML = `
        <h1 class="cart__empty-text">Your cart is empty</h1>
        <a href="/collections/all" class="button">
          Continue shopping
        </a>
      `;

      // Insert it after the cart form
      if (cartForm) {
        cartForm.parentNode.insertBefore(cartWarnings, cartForm.nextSibling);
      } else {
        // If no cart form, insert it into the page-width div
        const pageWidth = document.querySelector('.page-width');
        if (pageWidth) {
          pageWidth.appendChild(cartWarnings);
        }
      }
      console.log('Created and inserted cart warnings');
    }

    // Also hide the cart header since it shows item count
    const cartHeader = document.querySelector('.cart__header');
    if (cartHeader) {
      cartHeader.style.display = 'none';
      console.log('Hidden cart header');
    } else {
      console.log('Cart header element not found');
    }
  }
}

class CartNote extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', this.onChange.bind(this));
  }

  onChange(event) {
    const note = event.target.value;
    this.updateCartNote(note);
  }

  async updateCartNote(note) {
    try {
      const response = await fetch('/cart/update.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ note: note }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating cart note:', error);
    }
  }
}

// Form submission handler removed since we now have automatic updates

// Register components
if (!customElements.get('cart-items')) {
  customElements.define('cart-items', CartItems);
}
if (!customElements.get('cart-remove-button')) {
  customElements.define('cart-remove-button', CartRemoveButton);
}
if (!customElements.get('cart-note')) {
  customElements.define('cart-note', CartNote);
}



// feature-product.js
/**
 * Product Feature Utilities - Works with ProductForm component
 * Provides additional functionality for product pages
 */

// Product utilities
const ProductUtils = {
  /**
   * Format price for display
   */
  formatPrice(price, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price / 100);
  },

  /**
   * Get variant by ID from product data
   */
  getVariantById(productData, variantId) {
    return productData.variants.find((v) => v.id == variantId);
  },

  /**
   * Get first available variant
   */
  getFirstAvailableVariant(productData) {
    return (
      productData.variants.find((v) => v.available) || productData.variants[0]
    );
  },

  /**
   * Update product price display
   */
  updatePriceDisplay(priceElement, variant) {
    if (!priceElement || !variant) return;

    const price = this.formatPrice(variant.price);
    const compareAtPrice = variant.compare_at_price
      ? this.formatPrice(variant.compare_at_price)
      : null;

    if (compareAtPrice && variant.compare_at_price > variant.price) {
      priceElement.innerHTML = `
        <span class="price__sale">${price}</span>
        <span class="price__regular">${compareAtPrice}</span>
      `;
    } else {
      priceElement.innerHTML = `<span class="price__regular">${price}</span>`;
    }
  },

  /**
   * Update availability display
   */
  updateAvailabilityDisplay(availabilityElement, variant) {
    if (!availabilityElement || !variant) return;

    if (variant.available) {
      const stockLevel = variant.inventory_quantity;
      if (stockLevel <= 10 && stockLevel > 0) {
        availabilityElement.innerHTML = `
          <span class="inventory-status inventory-status--low-stock">
            Only ${stockLevel} left in stock
          </span>
        `;
      } else if (stockLevel > 10) {
        availabilityElement.innerHTML = `
          <span class="inventory-status inventory-status--in-stock">
            In stock
          </span>
        `;
      } else {
        availabilityElement.innerHTML = `
          <span class="inventory-status inventory-status--out-of-stock">
            Out of stock
          </span>
        `;
      }
    } else {
      availabilityElement.innerHTML = `
        <span class="inventory-status inventory-status--out-of-stock">
          Out of stock
        </span>
      `;
    }
  },

  /**
   * Update variant image
   */
  updateVariantImage(variant) {
    if (!variant || !variant.featured_image) return;

    const mediaGallery = document.querySelector('.product-media-gallery');
    if (!mediaGallery) return;

    const mainImage = mediaGallery.querySelector('.main-media img');
    if (mainImage) {
      mainImage.src = variant.featured_image.src;
      mainImage.alt = variant.featured_image.alt || variant.title;
    }

    // Update thumbnails
    const thumbnails = mediaGallery.querySelectorAll('.thumbnail-btn img');
    thumbnails.forEach((thumb, index) => {
      if (index === 0) {
        thumb.src = variant.featured_image.src;
        thumb.alt = variant.featured_image.alt || variant.title;
      }
    });
  },

  /**
   * Validate quantity input
   */
  validateQuantity(quantity, min = 1, max = 999) {
    const num = parseInt(quantity);
    if (isNaN(num) || num < min) return min;
    if (num > max) return max;
    return num;
  },

  /**
   * Announce to screen reader
   */
  announceToScreenReader(message, priority = 'polite') {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.classList.add('sr-only');
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  },
};

// Quantity input handler
class QuantityInput extends HTMLElement {
  constructor() {
    super();
    this.input = null;
    this.increaseBtn = null;
    this.decreaseBtn = null;
    this.min = 1;
    this.max = 999;
  }

  connectedCallback() {
    this.input = this.querySelector('input[type="number"]');
    this.increaseBtn = this.querySelector('[data-action="increase"]');
    this.decreaseBtn = this.querySelector('[data-action="decrease"]');

    this.setupEventListeners();
    this.setupAccessibility();
  }

  setupEventListeners() {
    if (this.increaseBtn) {
      this.increaseBtn.addEventListener('click', this.increase.bind(this));
    }

    if (this.decreaseBtn) {
      this.decreaseBtn.addEventListener('click', this.decrease.bind(this));
    }

    if (this.input) {
      this.input.addEventListener('change', this.validate.bind(this));
      this.input.addEventListener('input', this.handleInput.bind(this));
    }
  }

  setupAccessibility() {
    if (this.input) {
      this.input.setAttribute('min', this.min);
      this.input.setAttribute('max', this.max);
      this.input.setAttribute('aria-label', 'Quantity');
    }

    if (this.increaseBtn) {
      this.increaseBtn.setAttribute('aria-label', 'Increase quantity');
    }

    if (this.decreaseBtn) {
      this.decreaseBtn.setAttribute('aria-label', 'Decrease quantity');
    }
  }

  increase(event) {
    event.preventDefault();
    const currentValue = parseInt(this.input.value) || this.min;
    const newValue = Math.min(currentValue + 1, this.max);
    this.setValue(newValue);
  }

  decrease(event) {
    event.preventDefault();
    const currentValue = parseInt(this.input.value) || this.min;
    const newValue = Math.max(currentValue - 1, this.min);
    this.setValue(newValue);
  }

  validate() {
    const value = ProductUtils.validateQuantity(
      this.input.value,
      this.min,
      this.max
    );
    this.setValue(value);
  }

  handleInput() {
    // Real-time validation
    const value = parseInt(this.input.value);
    if (value && value < this.min) {
      this.input.value = this.min;
    }
  }

  setValue(value) {
    this.input.value = value;
    this.input.dispatchEvent(new Event('change', { bubbles: true }));

    // Update button states
    this.updateButtonStates(value);
  }

  updateButtonStates(value) {
    if (this.decreaseBtn) {
      this.decreaseBtn.disabled = value <= this.min;
    }

    if (this.increaseBtn) {
      this.increaseBtn.disabled = value >= this.max;
    }
  }

  getValue() {
    return parseInt(this.input.value) || this.min;
  }

  setValue(value) {
    this.input.value = value;
    this.updateButtonStates(value);
  }
}

// Variant selector handler
class VariantSelector extends HTMLElement {
  constructor() {
    super();
    this.selects = [];
    this.radios = [];
    this.currentVariant = null;
  }

  connectedCallback() {
    this.selects = this.querySelectorAll('select[name*="id"]');
    this.radios = this.querySelectorAll('input[type="radio"][name*="id"]');

    this.setupEventListeners();
    this.initializeVariant();
  }

  setupEventListeners() {
    this.selects.forEach((select) => {
      select.addEventListener('change', this.handleChange.bind(this));
    });

    this.radios.forEach((radio) => {
      radio.addEventListener('change', this.handleChange.bind(this));
    });
  }

  handleChange() {
    const variantId = this.getSelectedVariantId();
    if (variantId) {
      this.updateVariant(variantId);
    }
  }

  getSelectedVariantId() {
    // Check selects first
    for (const select of this.selects) {
      if (select.value) {
        return select.value;
      }
    }

    // Check radios
    for (const radio of this.radios) {
      if (radio.checked) {
        return radio.value;
      }
    }

    return null;
  }

  async updateVariant(variantId) {
    try {
      const productJson = document.querySelector('#product-json');
      if (productJson) {
        const productData = JSON.parse(productJson.textContent);
        const variant = ProductUtils.getVariantById(productData, variantId);

        if (variant) {
          this.currentVariant = variant;
          this.updateUI(variant);

          // Dispatch event
          this.dispatchEvent(
            new CustomEvent('variant:changed', {
              bubbles: true,
              detail: { variant },
            })
          );
        }
      }
    } catch (error) {
      console.error('Error updating variant:', error);
    }
  }

  updateUI(variant) {
    // Update price
    const priceElement = document.querySelector('.product-price');
    if (priceElement) {
      ProductUtils.updatePriceDisplay(priceElement, variant);
    }

    // Update availability
    const availabilityElement = document.querySelector('.product-inventory');
    if (availabilityElement) {
      ProductUtils.updateAvailabilityDisplay(availabilityElement, variant);
    }

    // Update image
    ProductUtils.updateVariantImage(variant);

    // Update form
    const form = this.closest('form');
    if (form) {
      const variantInput = form.querySelector('input[name="id"]');
      if (variantInput) {
        variantInput.value = variant.id;
      }
    }
  }

  initializeVariant() {
    const variantId = this.getSelectedVariantId();
    if (variantId) {
      this.updateVariant(variantId);
    }
  }
}

// Register the component
if (!customElements.get('variant-selector')) {
  customElements.define('variant-selector', VariantSelector);
}

// Export utilities
window.ProductUtils = ProductUtils;



// feature-search.js
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



// feature-collection.js
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
    const sortSelect = document.getElementById('sort-by');
    if (sortSelect) {
      sortSelect.addEventListener('change', this.handleSortChange.bind(this));
    }

    // View toggle buttons
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
      btn.addEventListener('click', this.handleViewChange.bind(this));
    });

    // Filter toggle for mobile
    const filterToggle = document.querySelector('.filters-toggle');
    if (filterToggle) {
      filterToggle.addEventListener('click', this.toggleMobileFilters.bind(this));
    }
  }

  handleSortChange(event) {
    const sortValue = event.target.value;
    const url = new URL(window.location);
    
    if (sortValue === 'manual') {
      url.searchParams.delete('sort_by');
    } else {
      url.searchParams.set('sort_by', sortValue);
    }
    
    // Reset to first page when sorting changes
    url.searchParams.delete('page');
    
    window.location.href = url.toString();
  }

  handleViewChange(event) {
    const button = event.currentTarget;
    const viewType = button.classList.contains('view-btn--list') ? 'list' : 'grid';
    
    this.setView(viewType);
  }

  setView(viewType) {
    const grid = document.getElementById('products-grid');
    const buttons = document.querySelectorAll('.view-btn');
    const gridCards = document.querySelectorAll('.grid-card');
    const listCards = document.querySelectorAll('.list-card');
    
    if (!grid) return;
    
    // Update grid classes and show/hide appropriate cards
    if (viewType === 'list') {
      grid.classList.add('list-view');
      grid.classList.remove('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4');
      
      // Hide grid cards, show list cards
      gridCards.forEach(card => card.classList.add('hidden'));
      listCards.forEach(card => card.classList.remove('hidden'));
    } else {
      grid.classList.remove('list-view');
      grid.classList.add('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4');
      
      // Show grid cards, hide list cards
      gridCards.forEach(card => card.classList.remove('hidden'));
      listCards.forEach(card => card.classList.add('hidden'));
    }
    
    // Update button states
    buttons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.classList.contains(`view-btn--${viewType}`)) {
        btn.classList.add('active');
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
      localStorage.setItem('collection-view', viewType);
    } catch (e) {
      // Handle localStorage errors gracefully
      console.warn('Could not save view preference:', e);
    }
  }

  loadSavedPreferences() {
    try {
      const savedView = localStorage.getItem('collection-view');
      if (savedView && (savedView === 'list' || savedView === 'grid')) {
        this.setView(savedView);
      }
    } catch (e) {
      // Handle localStorage errors gracefully
      console.warn('Could not load saved preferences:', e);
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
      Object.keys(params).forEach(key => {
        if (params[key]) {
          url.searchParams.set(key, params[key]);
        } else {
          url.searchParams.delete(key);
        }
      });
      
      // Add section_id for AJAX requests
      url.searchParams.set('section_id', 'collection-template');
      
      const response = await fetch(url.toString(), {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const html = await response.text();
      
      // Parse the response and update the products grid
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const newGrid = doc.getElementById('products-grid');
      const currentGrid = document.getElementById('products-grid');
      
      if (newGrid && currentGrid) {
        currentGrid.innerHTML = newGrid.innerHTML;
        
        // Update pagination if it exists
        const newPagination = doc.querySelector('.pagination-wrapper');
        const currentPagination = document.querySelector('.pagination-wrapper');
        
        if (newPagination && currentPagination) {
          currentPagination.innerHTML = newPagination.innerHTML;
        } else if (currentPagination && !newPagination) {
          currentPagination.remove();
        }
      }
      
      // Update browser history
      window.history.pushState({}, '', url.toString().replace('&section_id=collection-template', ''));
      
    } catch (error) {
      console.error('Error loading products:', error);
      // Fallback to page reload
      window.location.href = this.updateUrlParameter('sort_by', params.sort_by);
    }
  }
}

// Global functions for inline event handlers (for backward compatibility)
window.setView = function(viewType) {
  if (window.collectionManager) {
    window.collectionManager.setView(viewType);
  }
};

window.toggleFilters = function() {
  if (window.collectionManager) {
    window.collectionManager.toggleMobileFilters();
  }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  window.collectionManager = new CollectionManager();
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function(event) {
  // Reload the page when user navigates back/forward
  window.location.reload();
});


// feature-customer.js
class CustomerAddresses extends HTMLElement {
  constructor() {
    super();
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Add new address button
    const addButtons = this.querySelectorAll('[data-address=""]');
    addButtons.forEach(button => {
      button.addEventListener('click', this.openAddressModal.bind(this, 'AddAddress'));
    });

    // Edit address buttons
    const editButtons = this.querySelectorAll('[data-address]:not([data-address=""])');
    editButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const addressData = JSON.parse(e.target.getAttribute('data-address'));
        this.openAddressModal('EditAddress', addressData);
      });
    });

    // Delete address buttons
    const deleteButtons = this.querySelectorAll('[data-target][data-confirm-message]');
    deleteButtons.forEach(button => {
      button.addEventListener('click', this.handleDeleteAddress.bind(this));
    });

    // Modal close buttons
    const closeButtons = this.querySelectorAll('.address-form-modal__close, .address-form__cancel');
    closeButtons.forEach(button => {
      button.addEventListener('click', this.closeAddressModal.bind(this));
    });

    // Country/Province dropdowns
    this.setupCountryProvinceSelectors();
  }

  openAddressModal(modalId, addressData = null) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    if (addressData && modalId === 'EditAddress') {
      this.populateEditForm(addressData);
    }

    modal.removeAttribute('hidden');
    modal.setAttribute('aria-hidden', 'false');
    
    // Focus first input
    const firstInput = modal.querySelector('input');
    if (firstInput) firstInput.focus();

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  closeAddressModal() {
    const modals = document.querySelectorAll('.address-form-modal');
    modals.forEach(modal => {
      modal.setAttribute('hidden', '');
      modal.setAttribute('aria-hidden', 'true');
    });

    // Restore body scroll
    document.body.style.overflow = '';
  }

  populateEditForm(addressData) {
    const form = document.querySelector('#EditAddress form');
    if (!form) return;

    // Set form action
    form.action = `/account/addresses/${addressData.id}`;

    // Populate form fields
    const fields = {
      'AddressFirstNameEdit': addressData.first_name,
      'AddressLastNameEdit': addressData.last_name,
      'AddressCompanyEdit': addressData.company,
      'AddressAddress1Edit': addressData.address1,
      'AddressAddress2Edit': addressData.address2,
      'AddressCityEdit': addressData.city,
      'AddressZipEdit': addressData.zip,
      'AddressPhoneEdit': addressData.phone
    };

    Object.entries(fields).forEach(([id, value]) => {
      const field = document.getElementById(id);
      if (field && value) field.value = value;
    });

    // Set country and province
    const countrySelect = document.getElementById('AddressCountryEdit');
    const provinceContainer = document.getElementById('AddressProvinceContainerEdit');
    const provinceSelect = document.getElementById('AddressProvinceEdit');

    if (countrySelect && addressData.country) {
      countrySelect.value = addressData.country;
      this.updateProvinceOptions(countrySelect, provinceSelect, provinceContainer, addressData.province);
    }
  }

  handleDeleteAddress(e) {
    const target = e.target.getAttribute('data-target');
    const confirmMessage = e.target.getAttribute('data-confirm-message');

    if (confirm(confirmMessage)) {
      // Create and submit delete form
      const form = document.createElement('form');
      form.method = 'post';
      form.action = target;

      const methodInput = document.createElement('input');
      methodInput.type = 'hidden';
      methodInput.name = '_method';
      methodInput.value = 'delete';

      const tokenInput = document.createElement('input');
      tokenInput.type = 'hidden';
      tokenInput.name = 'authenticity_token';
      tokenInput.value = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

      form.appendChild(methodInput);
      form.appendChild(tokenInput);
      document.body.appendChild(form);
      form.submit();
    }
  }

  setupCountryProvinceSelectors() {
    // Setup for new address form
    const newCountrySelect = document.getElementById('AddressCountryNew');
    const newProvinceSelect = document.getElementById('AddressProvinceNew');
    const newProvinceContainer = document.getElementById('AddressProvinceContainerNew');

    if (newCountrySelect) {
      newCountrySelect.addEventListener('change', () => {
        this.updateProvinceOptions(newCountrySelect, newProvinceSelect, newProvinceContainer);
      });
    }

    // Setup for edit address form
    const editCountrySelect = document.getElementById('AddressCountryEdit');
    const editProvinceSelect = document.getElementById('AddressProvinceEdit');
    const editProvinceContainer = document.getElementById('AddressProvinceContainerEdit');

    if (editCountrySelect) {
      editCountrySelect.addEventListener('change', () => {
        this.updateProvinceOptions(editCountrySelect, editProvinceSelect, editProvinceContainer);
      });
    }
  }

  updateProvinceOptions(countrySelect, provinceSelect, provinceContainer, selectedProvince = null) {
    const country = countrySelect.value;
    
    if (!country || !window.Countries || !window.Countries[country]) {
      provinceContainer.style.display = 'none';
      return;
    }

    const provinces = window.Countries[country].provinces;
    if (!provinces || provinces.length === 0) {
      provinceContainer.style.display = 'none';
      return;
    }

    // Clear existing options
    provinceSelect.innerHTML = '';

    // Add province options
    provinces.forEach(province => {
      const option = document.createElement('option');
      option.value = province[0];
      option.textContent = province[1];
      if (selectedProvince && province[0] === selectedProvince) {
        option.selected = true;
      }
      provinceSelect.appendChild(option);
    });

    provinceContainer.style.display = 'block';
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const customerAddresses = document.querySelector('.customer.addresses');
  if (customerAddresses) {
    new CustomerAddresses();
  }
});

// Handle modal clicks outside content
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('address-form-modal')) {
    const closeButton = e.target.querySelector('.address-form-modal__close');
    if (closeButton) closeButton.click();
  }
});

// Handle escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const openModal = document.querySelector('.address-form-modal:not([hidden])');
    if (openModal) {
      const closeButton = openModal.querySelector('.address-form-modal__close');
      if (closeButton) closeButton.click();
    }
  }
});

// Countries data for province/state selection
window.Countries = window.Countries || {};

// This would typically be loaded from Shopify's countries API
// For now, adding basic structure for common countries
window.Countries = {
  'United States': {
    provinces: [
      ['AL', 'Alabama'],
      ['AK', 'Alaska'],
      ['AZ', 'Arizona'],
      ['AR', 'Arkansas'],
      ['CA', 'California'],
      ['CO', 'Colorado'],
      ['CT', 'Connecticut'],
      ['DE', 'Delaware'],
      ['FL', 'Florida'],
      ['GA', 'Georgia'],
      ['HI', 'Hawaii'],
      ['ID', 'Idaho'],
      ['IL', 'Illinois'],
      ['IN', 'Indiana'],
      ['IA', 'Iowa'],
      ['KS', 'Kansas'],
      ['KY', 'Kentucky'],
      ['LA', 'Louisiana'],
      ['ME', 'Maine'],
      ['MD', 'Maryland'],
      ['MA', 'Massachusetts'],
      ['MI', 'Michigan'],
      ['MN', 'Minnesota'],
      ['MS', 'Mississippi'],
      ['MO', 'Missouri'],
      ['MT', 'Montana'],
      ['NE', 'Nebraska'],
      ['NV', 'Nevada'],
      ['NH', 'New Hampshire'],
      ['NJ', 'New Jersey'],
      ['NM', 'New Mexico'],
      ['NY', 'New York'],
      ['NC', 'North Carolina'],
      ['ND', 'North Dakota'],
      ['OH', 'Ohio'],
      ['OK', 'Oklahoma'],
      ['OR', 'Oregon'],
      ['PA', 'Pennsylvania'],
      ['RI', 'Rhode Island'],
      ['SC', 'South Carolina'],
      ['SD', 'South Dakota'],
      ['TN', 'Tennessee'],
      ['TX', 'Texas'],
      ['UT', 'Utah'],
      ['VT', 'Vermont'],
      ['VA', 'Virginia'],
      ['WA', 'Washington'],
      ['WV', 'West Virginia'],
      ['WI', 'Wisconsin'],
      ['WY', 'Wyoming']
    ]
  },
  'Canada': {
    provinces: [
      ['AB', 'Alberta'],
      ['BC', 'British Columbia'],
      ['MB', 'Manitoba'],
      ['NB', 'New Brunswick'],
      ['NL', 'Newfoundland and Labrador'],
      ['NT', 'Northwest Territories'],
      ['NS', 'Nova Scotia'],
      ['NU', 'Nunavut'],
      ['ON', 'Ontario'],
      ['PE', 'Prince Edward Island'],
      ['QC', 'Quebec'],
      ['SK', 'Saskatchewan'],
      ['YT', 'Yukon']
    ]
  }
};


// feature-gallery.js
/**
 * Media Gallery - Following Dawn's Web Component patterns
 * Handles product image galleries with thumbnails, zoom, and keyboard navigation
 */

// Only declare if not already declared
if (typeof MediaGallery === 'undefined') {
  class MediaGallery extends HTMLElement {
    constructor() {
      super();
      this.mainImage = null;
      this.thumbnails = [];
      this.currentIndex = 0;
      this.zoomEnabled = false;
    }

    connectedCallback() {
      this.mainImage = this.querySelector('.media-gallery__main-image');
      this.thumbnails = Array.from(
        this.querySelectorAll('.media-gallery__thumbnail')
      );

      this.setupThumbnails();
      this.setupZoom();
      this.setupKeyboardNavigation();
    }

    setupThumbnails() {
      this.thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => this.selectImage(index));
        thumbnail.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.selectImage(index);
          }
        });
      });
    }

    setupZoom() {
      if (!this.mainImage) return;

      this.mainImage.addEventListener('mouseenter', () => {
        this.zoomEnabled = true;
        this.mainImage.classList.add('media-gallery__main-image--zoom-enabled');
      });

      this.mainImage.addEventListener('mouseleave', () => {
        this.zoomEnabled = false;
        this.mainImage.classList.remove(
          'media-gallery__main-image--zoom-enabled'
        );
      });

      this.mainImage.addEventListener('mousemove', (e) => {
        if (!this.zoomEnabled) return;
        this.handleZoom(e);
      });
    }

    setupKeyboardNavigation() {
      this.addEventListener('keydown', (e) => {
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            this.previousImage();
            break;
          case 'ArrowRight':
            e.preventDefault();
            this.nextImage();
            break;
          case 'Home':
            e.preventDefault();
            this.selectImage(0);
            break;
          case 'End':
            e.preventDefault();
            this.selectImage(this.thumbnails.length - 1);
            break;
        }
      });
    }

    selectImage(index) {
      if (index < 0 || index >= this.thumbnails.length) return;

      // Update current index
      this.currentIndex = index;

      // Update main image
      const selectedThumbnail = this.thumbnails[index];
      const newImageSrc =
        selectedThumbnail.dataset.fullImage || selectedThumbnail.src;

      if (this.mainImage) {
        this.mainImage.src = newImageSrc;
        this.mainImage.alt = selectedThumbnail.alt || '';
      }

      // Update thumbnail states
      this.thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('media-gallery__thumbnail--active', i === index);
        thumb.setAttribute('aria-current', i === index ? 'true' : 'false');
      });

      // Update focus
      selectedThumbnail.focus();

      // Dispatch custom event
      this.dispatchEvent(
        new CustomEvent('media-gallery:image-changed', {
          detail: { index, imageSrc: newImageSrc },
        })
      );
    }

    previousImage() {
      const newIndex =
        this.currentIndex > 0
          ? this.currentIndex - 1
          : this.thumbnails.length - 1;
      this.selectImage(newIndex);
    }

    nextImage() {
      const newIndex =
        this.currentIndex < this.thumbnails.length - 1
          ? this.currentIndex + 1
          : 0;
      this.selectImage(newIndex);
    }

    handleZoom(e) {
      if (!this.mainImage) return;

      const rect = this.mainImage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      this.mainImage.style.transformOrigin = `${x * 100}% ${y * 100}%`;
    }
  }

  // Register the component
  if (!customElements.get('media-gallery')) {
    customElements.define('media-gallery', MediaGallery);
  }

  // Export for global scope
  window.MediaGallery = MediaGallery;
}



  // Bundle completion
  if (window.BloxMania && window.BloxMania.bundles && window.BloxMania.bundles[BUNDLE_NAME]) {
    window.BloxMania.bundles[BUNDLE_NAME].initialized = true;
  }

  console.log(`✅ ${BUNDLE_NAME} bundle loaded`);
})();