/**
 * Clean Cart Implementation - Based on Dawn Theme
 * Simple, reliable, no conflicts
 */

class CartItemsClean extends HTMLElement {
  constructor() {
    super();
    console.log('🎯 Clean cart initialized');
  }

  connectedCallback() {
    console.log('🎯 Clean cart connected');
  }

  // Main method to change quantities - based on Dawn's approach
  changeQuantity(line, quantity) {
    console.log('🎯 Changing quantity:', { line, quantity });
    
    // Show loading state
    this.classList.add('cart-loading');
    
    // Prepare the request body (same as Dawn)
    const body = JSON.stringify({
      line: line,
      quantity: parseInt(quantity),
      sections: ['main-cart-items'], // Only update what we need
      sections_url: window.location.pathname
    });

    // Make the API call
    fetch('/cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: body
    })
    .then(response => response.text())
    .then(responseText => {
      console.log('🎯 Cart updated successfully');
      
      try {
        const parsedState = JSON.parse(responseText);
        
        if (parsedState.errors) {
          console.error('Cart errors:', parsedState.errors);
          // Revert input value on error
          const input = document.getElementById(`Quantity-${line}`);
          if (input) {
            input.value = input.getAttribute('value');
          }
          return;
        }

        // Reload the cart section (simple but effective)
        this.updateCartDisplay(parsedState);
        
      } catch (error) {
        console.error('Error parsing cart response:', error);
        // Fallback: reload the page if JSON parsing fails
        window.location.reload();
      }
    })
    .catch(error => {
      console.error('Cart update failed:', error);
      // Revert on error
      const input = document.getElementById(`Quantity-${line}`);
      if (input) {
        input.value = input.getAttribute('value');
      }
    })
    .finally(() => {
      // Remove loading state
      this.classList.remove('cart-loading');
    });
  }

  // Update cart display with new data
  updateCartDisplay(cartData) {
    // Simple approach: reload the page to get fresh cart data
    console.log('🎯 Reloading page to update cart display');
    window.location.reload();
  }

  // Update cart badge in header
  updateCartBadge(itemCount) {
    const badge = document.querySelector('.header__cart-badge');
    if (badge) {
      if (itemCount > 0) {
        badge.textContent = itemCount;
        badge.style.display = 'block';
      } else {
        badge.style.display = 'none';
      }
    }

    // Update any other cart count elements
    const cartCounts = document.querySelectorAll('[data-cart-count]');
    cartCounts.forEach(element => {
      element.textContent = itemCount;
    });
  }
}

// Register the custom element
if (!customElements.get('cart-items-clean')) {
  customElements.define('cart-items-clean', CartItemsClean);
  console.log('🎯 Clean cart component registered');
}