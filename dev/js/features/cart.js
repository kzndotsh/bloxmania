/**
 * Cart functionality for BloxMania theme
 * Enhanced to work with Shopify's native cart system
 */

class CartItems extends HTMLElement {
  constructor() {
    super();
    this.lineItemStatusElement = document.getElementById("shopping-cart-line-item-status");
    this.currentItemCount = Array.from(this.querySelectorAll('[name="updates[]"]')).reduce(
      (total, quantityInput) => total + parseInt(quantityInput.value),
      0,
    );

    this.originalQuantities = new Map();
    this.updateTimeout = null;
    this.isUpdating = false;

    // Store original quantities
    this.querySelectorAll('[name="updates[]"]').forEach((input) => {
      this.originalQuantities.set(input.dataset.cartItemKey, parseInt(input.value));
    });

    // Debug: Check initial state
    console.log("CartItems initialized");
    console.log("Quantity inputs found:", this.querySelectorAll('[name="updates[]"]').length);
    console.log("Error elements found:", this.querySelectorAll(".cart-item__error").length);

    // Initialize error elements to be hidden
    this.initializeErrorElements();

    this.addEventListener("change", this.onChange.bind(this));

    // Listen for quantity changes from the quantity component
    this.addEventListener("quantity:changed", this.onQuantityChanged.bind(this));
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
      const cartItem = this.querySelector(`[data-cart-item-key="${key}"]`).closest(".cart-item");
      if (cartItem) {
        cartItem.classList.add("updating");
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
            sections: ["main-cart", "cart-icon-bubble"],
          });

          const removeResponse = await fetch("/cart/change.js", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: removeBody,
          });

          if (!removeResponse.ok) {
            throw new Error(`HTTP error! status: ${removeResponse.status}`);
          }

          cart = await removeResponse.json();

          // Remove the cart item from DOM when quantity is 0
          const cartItem = this.querySelector(`[data-cart-item-key="${item.key}"]`).closest(".cart-item");
          if (cartItem) {
            cartItem.remove();
            console.log("Removed cart item from DOM:", item.key);
          }
        }
      }

      // Handle items to update (quantity > 0) using /cart/update.js
      if (formData.entries().next().done === false) {
        const updateResponse = await fetch("/cart/update.js", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
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
      console.error("Error updating cart:", error);
      this.showError(null, "There was an error updating your cart. Please try again.");

      // Revert quantities on error
      this.revertQuantities();
    } finally {
      this.isUpdating = false;

      // Remove loading state
      changedItems.forEach(({ key }) => {
        const cartItem = this.querySelector(`[data-cart-item-key="${key}"]`).closest(".cart-item");
        if (cartItem) {
          cartItem.classList.remove("updating");
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
    const cartCountElements = document.querySelectorAll("[data-cart-count]");
    cartCountElements.forEach((element) => {
      element.textContent = cart.item_count;
    });

    // Update cart badge in header
    const cartBadge = document.querySelector(".header__cart-badge");
    if (cartBadge) {
      if (cart.item_count > 0) {
        cartBadge.textContent = cart.item_count;
        cartBadge.style.display = "block";
      } else {
        cartBadge.style.display = "none";
      }
    }

    // Update cart total
    const cartTotalElements = document.querySelectorAll("[data-cart-total]");
    cartTotalElements.forEach((element) => {
      element.textContent = this.formatMoney(cart.total_price);
    });

    // Update individual item prices and totals
    if (cart.items) {
      cart.items.forEach((item) => {
        const cartItem = this.querySelector(`[data-cart-item-key="${item.key}"]`).closest(".cart-item");
        if (cartItem) {
          // Update item total price
          const priceElement = cartItem.querySelector(".cart-item__final-price");
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
    const cartTotalDisplay = document.querySelector(".totals__total-value");
    if (cartTotalDisplay) {
      cartTotalDisplay.textContent = this.formatMoney(cart.total_price);
    }

    // Update item count display
    const itemCountElement = document.querySelector(".cart__count");
    if (itemCountElement) {
      if (cart.item_count === 1) {
        itemCountElement.textContent = "1 item";
      } else {
        itemCountElement.textContent = `${cart.item_count} items`;
      }
    }

    // Update checkout button state
    const checkoutButton = document.getElementById("checkout");
    if (checkoutButton) {
      checkoutButton.disabled = cart.item_count === 0;
    }

    // Check if cart is empty and handle empty cart state
    if (cart.item_count === 0) {
      this.showEmptyCart();
    } else {
      // Remove is-empty class from cart page
      const cartPage = document.querySelector(".cart-page");
      if (cartPage) {
        cartPage.classList.remove("is-empty");
      }

      // Show cart form and header when cart has items
      const cartForm = document.querySelector(".cart__form");
      const cartWarnings = document.querySelector(".cart__warnings");
      const cartHeader = document.querySelector(".cart__header");

      if (cartForm) {
        cartForm.style.display = "block";
      }
      if (cartWarnings) {
        cartWarnings.style.display = "none";
      }
      if (cartHeader) {
        cartHeader.style.display = "block";
      }
    }

    // Update quantity displays on product pages
    this.updateProductPageQuantityDisplays(cart);
  }

  updateProductPageQuantityDisplays(cart) {
    // Find all quantity display elements on product pages
    const quantityDisplays = document.querySelectorAll(".quantity__rules-cart");

    quantityDisplays.forEach((display) => {
      const variantId = display.closest(".quantity-input-wrapper")?.querySelector("input")?.dataset.cartQuantity;
      if (variantId) {
        // Find the item in cart for this variant
        const cartItem = cart.items.find((item) => item.variant_id.toString() === variantId);
        const quantity = cartItem ? cartItem.quantity : 0;

        if (quantity > 0) {
          display.textContent = `(${quantity} in cart)`;
          display.style.display = "inline";
        } else {
          display.style.display = "none";
        }
      }
    });
  }

  initializeErrorElements() {
    // Initialize all cart item errors to be hidden
    const errorElements = document.querySelectorAll(".cart-item__error");
    errorElements.forEach((errorElement) => {
      const errorText = errorElement.querySelector(".cart-item__error-text");
      if (errorText) {
        errorText.textContent = "";
      }
      errorElement.classList.remove("show-error");
    });

    // Initialize cart-level errors to be hidden
    const cartErrors = document.getElementById("cart-errors");
    if (cartErrors) {
      const cartErrorText = cartErrors.querySelector(".cart__error-text");
      if (cartErrorText) {
        cartErrorText.textContent = "";
      }
      cartErrors.classList.remove("show-error");
    }
  }

  clearAllErrors() {
    // Clear all cart item errors
    const errorElements = document.querySelectorAll(".cart-item__error");
    errorElements.forEach((errorElement) => {
      const errorText = errorElement.querySelector(".cart-item__error-text");
      if (errorText) {
        errorText.textContent = "";
      }
      errorElement.classList.remove("show-error");
    });

    // Clear cart-level errors
    const cartErrors = document.getElementById("cart-errors");
    if (cartErrors) {
      const cartErrorText = cartErrors.querySelector(".cart__error-text");
      if (cartErrorText) {
        cartErrorText.textContent = "";
      }
      cartErrors.classList.remove("show-error");
    }
  }

  showAutoUpdateSuccess() {
    // Show a subtle visual feedback for auto-updates
    const cartItems = document.querySelectorAll(".cart-item.updating");
    cartItems.forEach((item) => {
      item.classList.add("updated");
      setTimeout(() => {
        item.classList.remove("updated");
      }, 1000);
    });
  }

  showSuccess(message) {
    // Create a temporary success message
    const successElement = document.createElement("div");
    successElement.className = "cart__success";
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
      ? cartItem.querySelector(".cart-item__error")
      : document.getElementById("cart-errors");
    if (errorElement) {
      const errorText = errorElement.querySelector(".cart-item__error-text") || errorElement;
      errorText.textContent = message;

      // Show the error element using CSS class
      errorElement.classList.add("show-error");

      // Hide error after 5 seconds by clearing content and removing class
      setTimeout(() => {
        errorText.textContent = "";
        errorElement.classList.remove("show-error");
      }, 5000);
    }
  }

  showEmptyCart() {
    console.log("Showing empty cart state");

    // Add is-empty class to the cart page
    const cartPage = document.querySelector(".cart-page");
    if (cartPage) {
      cartPage.classList.add("is-empty");
      console.log("Added is-empty class to cart page");
    } else {
      console.log("Cart page element not found");
    }

    // Hide the cart form and all its contents
    const cartForm = document.querySelector(".cart__form");
    if (cartForm) {
      cartForm.style.display = "none";
      console.log("Hidden cart form");
    } else {
      console.log("Cart form element not found");
    }

    // Show the empty cart warnings
    let cartWarnings = document.querySelector(".cart__warnings");
    if (cartWarnings) {
      cartWarnings.style.display = "block";
      console.log("Showed existing cart warnings");
    } else {
      // Create the empty cart message dynamically if it doesn't exist
      console.log("Creating empty cart message dynamically");
      cartWarnings = document.createElement("div");
      cartWarnings.className = "cart__warnings";
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
        const pageWidth = document.querySelector(".page-width");
        if (pageWidth) {
          pageWidth.appendChild(cartWarnings);
        }
      }
      console.log("Created and inserted cart warnings");
    }

    // Also hide the cart header since it shows item count
    const cartHeader = document.querySelector(".cart__header");
    if (cartHeader) {
      cartHeader.style.display = "none";
      console.log("Hidden cart header");
    } else {
      console.log("Cart header element not found");
    }
  }

  formatMoney(cents) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(cents / 100);
  }
}

class CartRemoveButton extends HTMLElement {
  constructor() {
    super();
    this.addEventListener("click", this.onClick.bind(this));
  }

  onClick(event) {
    event.preventDefault();
    const cartItemKey = this.dataset.cartItemKey;
    const cartItem = this.closest(".cart-item");

    console.log("Remove button clicked for item:", cartItemKey);
    this.removeItem(cartItemKey, cartItem);
  }

  async removeItem(cartItemKey, cartItem) {
    console.log("Removing item with key:", cartItemKey);

    // Add loading state to the cart item
    if (cartItem) {
      cartItem.style.opacity = "0.5";
      cartItem.style.pointerEvents = "none";
    }

    const body = JSON.stringify({
      id: cartItemKey,
      quantity: 0,
      sections: ["main-cart", "cart-icon-bubble"],
    });

    try {
      const response = await fetch("/cart/change.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: body,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const cart = await response.json();
      console.log("Cart updated successfully:", cart);

      // Remove the cart item from UI
      if (cartItem) {
        cartItem.remove();
        console.log("Cart item removed from UI");
      }

      // Update cart count in header
      const cartCountElements = document.querySelectorAll("[data-cart-count]");
      cartCountElements.forEach((element) => {
        element.textContent = cart.item_count;
      });

      // Update cart badge in header
      const cartBadge = document.querySelector(".header__cart-badge");
      if (cartBadge) {
        if (cart.item_count > 0) {
          cartBadge.textContent = cart.item_count;
          cartBadge.style.display = "block";
        } else {
          cartBadge.style.display = "none";
        }
      }

      // Update cart count in cart page header
      const cartCountText = document.querySelector(".cart__count");
      if (cartCountText) {
        if (cart.item_count === 1) {
          cartCountText.textContent = "1 item";
        } else {
          cartCountText.textContent = `${cart.item_count} items`;
        }
      }

      // Update cart totals
      const totalsValue = document.querySelector(".totals__total-value");
      if (totalsValue) {
        totalsValue.textContent = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(cart.total_price / 100);
      }

      // Check if cart is empty
      if (cart.item_count === 0) {
        this.showEmptyCart();
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  }

  showEmptyCart() {
    console.log("Showing empty cart state from remove button");

    // Use the existing showEmptyCart method from CartItems class
    const cartItems = document.querySelector("cart-items");
    if (cartItems && cartItems.showEmptyCart) {
      cartItems.showEmptyCart();
    } else {
      console.log("CartItems component not found, falling back to direct implementation");
      // Fallback implementation if CartItems is not available
      this.showEmptyCartFallback();
    }
  }

  showEmptyCartFallback() {
    // Add is-empty class to the cart page
    const cartPage = document.querySelector(".cart-page");
    if (cartPage) {
      cartPage.classList.add("is-empty");
      console.log("Added is-empty class to cart page");
    } else {
      console.log("Cart page element not found");
    }

    // Hide the cart form and all its contents
    const cartForm = document.querySelector(".cart__form");
    if (cartForm) {
      cartForm.style.display = "none";
      console.log("Hidden cart form");
    } else {
      console.log("Cart form element not found");
    }

    // Show the empty cart warnings
    let cartWarnings = document.querySelector(".cart__warnings");
    if (cartWarnings) {
      cartWarnings.style.display = "block";
      console.log("Showed existing cart warnings");
    } else {
      // Create the empty cart message dynamically
      console.log("Creating empty cart message dynamically");
      cartWarnings = document.createElement("div");
      cartWarnings.className = "cart__warnings";
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
        const pageWidth = document.querySelector(".page-width");
        if (pageWidth) {
          pageWidth.appendChild(cartWarnings);
        }
      }
      console.log("Created and inserted cart warnings");
    }

    // Also hide the cart header since it shows item count
    const cartHeader = document.querySelector(".cart__header");
    if (cartHeader) {
      cartHeader.style.display = "none";
      console.log("Hidden cart header");
    } else {
      console.log("Cart header element not found");
    }
  }
}

class CartNote extends HTMLElement {
  constructor() {
    super();
    this.addEventListener("change", this.onChange.bind(this));
  }

  onChange(event) {
    const note = event.target.value;
    this.updateCartNote(note);
  }

  async updateCartNote(note) {
    try {
      const response = await fetch("/cart/update.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ note: note }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating cart note:", error);
    }
  }
}

// Form submission handler removed since we now have automatic updates

// Register components
if (!customElements.get("cart-items")) {
  customElements.define("cart-items", CartItems);
}
if (!customElements.get("cart-remove-button")) {
  customElements.define("cart-remove-button", CartRemoveButton);
}
if (!customElements.get("cart-note")) {
  customElements.define("cart-note", CartNote);
}
