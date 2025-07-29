/**
 * Quick Add to Cart functionality for modern list cards
 * Handles AJAX cart additions with visual feedback
 */

(function () {
  "use strict";

  // Initialize when DOM is ready
  document.addEventListener("DOMContentLoaded", function () {
    console.log("Quick Add module initializing...");
    initQuickAddButtons();
    console.log("Quick Add module initialized");
  });

  function initQuickAddButtons() {
    // Use event delegation for dynamic content
    document.addEventListener("click", function (event) {
      console.log("Click detected on:", event.target);
      if (event.target.closest(".quick-add-btn")) {
        console.log("Quick add button clicked!");
        event.preventDefault();
        const button = event.target.closest(".quick-add-btn");
        const variantId = button.dataset.variantId;
        console.log("Variant ID:", variantId);

        if (variantId) {
          addToCart(variantId, button);
        } else {
          console.error("No variant ID found on button");
        }
      }
    });
  }

  function addToCart(variantId, button) {
    // Disable button and show loading state
    const originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = `
      <svg class="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Adding...
    `;

    console.log("Adding variant to cart:", variantId);

    // Prepare cart data
    const cartData = {
      items: [
        {
          id: variantId.toString(),
          quantity: 1,
        },
      ],
    };

    console.log("Cart data being sent:", cartData);

    // Make AJAX request
    fetch("/cart/add.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify(cartData),
    })
      .then((response) => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          return response.text().then((errorText) => {
            console.error("Error response body:", errorText);
            throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Cart response:", data);
        console.log("Cart item_count:", data.item_count);
        console.log("Cart keys:", Object.keys(data));

        // If the response doesn't have item_count, fetch the full cart
        if (data.item_count === undefined) {
          console.log("No item_count in response, fetching full cart...");
          return fetch("/cart.js")
            .then((response) => response.json())
            .then((fullCart) => {
              console.log("Full cart response:", fullCart);
              return fullCart;
            });
        }

        return data;
      })
      .then((cartData) => {
        console.log("Final cart data:", cartData);
        // Success - show confirmation
        showSuccessMessage(button, originalText);

        // Update cart count if cart icon exists
        updateCartCount(cartData);

        // Trigger cart update event
        document.dispatchEvent(
          new CustomEvent("cart:updated", {
            detail: { cart: cartData },
          }),
        );
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        showErrorMessage(button, originalText);
      });
  }

  function showSuccessMessage(button, originalText) {
    // Show success state
    button.innerHTML = `
      <svg class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
      </svg>
      Added!
    `;
    button.classList.add("bg-green-500", "hover:bg-green-600");
    button.classList.remove("bg-primary", "hover:bg-primary-dark");

    // Reset after 2 seconds
    setTimeout(() => {
      button.disabled = false;
      button.innerHTML = originalText;
      button.classList.remove("bg-green-500", "hover:bg-green-600");
      button.classList.add("bg-primary", "hover:bg-primary-dark");
    }, 2000);
  }

  function showErrorMessage(button, originalText) {
    // Show error state
    button.innerHTML = `
      <svg class="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
      </svg>
      Error
    `;
    button.classList.add("bg-red-500", "hover:bg-red-600");
    button.classList.remove("bg-primary", "hover:bg-primary-dark");

    // Reset after 3 seconds
    setTimeout(() => {
      button.disabled = false;
      button.innerHTML = originalText;
      button.classList.remove("bg-red-500", "hover:bg-red-600");
      button.classList.add("bg-primary", "hover:bg-primary-dark");
    }, 3000);
  }

  function updateCartCount(cartData) {
    console.log("updateCartCount called with:", cartData);

    // Calculate item count from items array if not provided
    let itemCount = cartData.item_count;
    if (itemCount === undefined && cartData.items && Array.isArray(cartData.items)) {
      itemCount = cartData.items.reduce((total, item) => total + (item.quantity || 0), 0);
      console.log("Calculated item count from items array:", itemCount);
    }

    // Update cart count in header if it exists
    const cartCountElements = document.querySelectorAll(".cart-count, [data-cart-count], .header__cart-badge");
    console.log("Found cart count elements:", cartCountElements.length);

    if (cartCountElements.length === 0) {
      console.log("No cart badges found, creating new one...");
      // If no cart badge exists, create one
      const cartButton = document.querySelector(".header__cart-button");
      console.log("Cart button found:", !!cartButton);
      if (cartButton && itemCount > 0) {
        const badge = document.createElement("span");
        badge.className = "header__cart-badge";
        badge.textContent = itemCount;
        cartButton.appendChild(badge);
        console.log("Created new cart badge with count:", itemCount);
      }
    } else {
      console.log("Updating existing cart badges...");
      // Update existing cart badges
      cartCountElements.forEach((element) => {
        console.log("Element:", element);
        console.log("Current text:", element.textContent);
        console.log("item_count:", itemCount);
        if (itemCount !== undefined) {
          element.textContent = itemCount;
          element.classList.remove("hidden");
          console.log("Updated cart badge to:", itemCount);
        } else {
          console.log("item_count is undefined!");
        }
      });
    }

    // Update cart drawer if it exists
    const cartDrawer = document.querySelector("cart-drawer");
    if (cartDrawer && typeof cartDrawer.renderContents === "function") {
      cartDrawer.renderContents(cartData);
    }
  }

  // Export for potential use in other modules
  window.QuickAdd = {
    init: initQuickAddButtons,
    addToCart: addToCart,
  };
})();
