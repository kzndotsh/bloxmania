/**
 * Product Form - Following Dawn's Web Component patterns
 * Handles product forms with validation, variant selection, and cart integration
 */

class ProductForm extends HTMLElement {
  constructor() {
    super();
    
    this.form = null;
    this.submitButton = null;
    this.variantSelects = null;
    this.quantityInput = null;
    this.priceElement = null;
    this.compareAtPriceElement = null;
    this.currentVariant = null;
    this.isSubmitting = false;
  }

  connectedCallback() {
    this.form = this.querySelector('form') || this;
    this.submitButton = this.querySelector('[type="submit"]');
    this.variantSelects = this.querySelectorAll('select[name*="id"], input[name*="id"]');
    this.quantityInput = this.querySelector('input[name="quantity"]');
    this.priceElement = this.querySelector('.price');
    this.compareAtPriceElement = this.querySelector('.price--compare');
    
    this.setupEventListeners();
    this.setupAccessibility();
    this.initializeVariant();
  }

  disconnectedCallback() {
    this.cleanup();
  }

  setupEventListeners() {
    // Form submission
    if (this.form) {
      this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    // Variant selection
    this.variantSelects.forEach(select => {
      select.addEventListener('change', this.handleVariantChange.bind(this));
    });

    // Quantity input
    if (this.quantityInput) {
      this.quantityInput.addEventListener('change', this.handleQuantityChange.bind(this));
      this.quantityInput.addEventListener('input', this.handleQuantityInput.bind(this));
    }

    // Quantity buttons
    const quantityButtons = this.querySelectorAll('.quantity-button');
    quantityButtons.forEach(button => {
      button.addEventListener('click', this.handleQuantityButton.bind(this));
    });
  }

  setupAccessibility() {
    // Set up ARIA attributes for form
    if (this.form) {
      this.form.setAttribute('novalidate', '');
    }

    // Set up variant selects
    this.variantSelects.forEach(select => {
      select.setAttribute('aria-describedby', 'variant-error');
    });

    // Set up quantity input
    if (this.quantityInput) {
      this.quantityInput.setAttribute('aria-describedby', 'quantity-error');
      this.quantityInput.setAttribute('min', '1');
    }
  }

  initializeVariant() {
    // Get initial variant from form data or URL
    const formData = new FormData(this.form);
    const variantId = formData.get('id');
    
    if (variantId) {
      this.updateVariant(variantId);
    } else {
      // Select first available variant
      this.selectFirstAvailableVariant();
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    
    if (this.isSubmitting) return;
    
    // Validate form
    const validation = this.validateForm();
    if (!validation.isValid) {
      this.showValidationErrors(validation.errors);
      return;
    }

    this.submitToCart();
  }

  handleVariantChange(event) {
    const variantId = this.getSelectedVariantId();
    this.updateVariant(variantId);
  }

  handleQuantityChange(event) {
    const quantity = parseInt(event.target.value);
    this.validateQuantity(quantity);
  }

  handleQuantityInput(event) {
    // Real-time validation for quantity
    const quantity = parseInt(event.target.value);
    if (quantity && quantity < 1) {
      event.target.value = 1;
    }
  }

  handleQuantityButton(event) {
    event.preventDefault();
    
    const button = event.target;
    const action = button.dataset.action;
    const currentQuantity = parseInt(this.quantityInput.value) || 1;
    
    let newQuantity = currentQuantity;
    
    if (action === 'increase') {
      newQuantity = currentQuantity + 1;
    } else if (action === 'decrease') {
      newQuantity = Math.max(1, currentQuantity - 1);
    }
    
    this.quantityInput.value = newQuantity;
    this.quantityInput.dispatchEvent(new Event('change'));
  }

  getSelectedVariantId() {
    const formData = new FormData(this.form);
    return formData.get('id');
  }

  async updateVariant(variantId) {
    if (!variantId) {
      this.currentVariant = null;
      this.updateUI();
      return;
    }

    try {
      // Get variant data from product JSON or API
      const variant = await this.fetchVariantData(variantId);
      this.currentVariant = variant;
      this.updateUI();
      
      // Dispatch variant change event
      this.dispatchEvent(new CustomEvent('variant:changed', {
        bubbles: true,
        detail: { variant, form: this }
      }));
      
    } catch (error) {
      console.error('Error updating variant:', error);
      this.showError('Failed to load variant information');
    }
  }

  async fetchVariantData(variantId) {
    // Try to get variant from product JSON first
    const productJson = document.querySelector('#product-json');
    if (productJson) {
      try {
        const productData = JSON.parse(productJson.textContent);
        const variant = productData.variants.find(v => v.id == variantId);
        if (variant) return variant;
      } catch (error) {
        console.warn('Could not parse product JSON:', error);
      }
    }

    // Fallback to API call
    const response = await fetch(`/products/${this.getProductHandle()}.js`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product data: ${response.status}`);
    }
    
    const productData = await response.json();
    return productData.variants.find(v => v.id == variantId);
  }

  getProductHandle() {
    // Extract product handle from form action or URL
    const action = this.form.action;
    const match = action.match(/\/products\/([^\/]+)/);
    return match ? match[1] : '';
  }

  updateUI() {
    this.updatePrice();
    this.updateAvailability();
    this.updateSubmitButton();
    this.updateVariantImage();
  }

  updatePrice() {
    if (!this.currentVariant || !this.priceElement) return;

    const price = this.formatPrice(this.currentVariant.price);
    const compareAtPrice = this.currentVariant.compare_at_price ? 
      this.formatPrice(this.currentVariant.compare_at_price) : null;

    this.priceElement.textContent = price;

    if (this.compareAtPriceElement) {
      if (compareAtPrice && compareAtPrice !== price) {
        this.compareAtPriceElement.textContent = compareAtPrice;
        this.compareAtPriceElement.style.display = '';
      } else {
        this.compareAtPriceElement.style.display = 'none';
      }
    }
  }

  updateAvailability() {
    const availabilityElement = this.querySelector('.product-availability');
    if (!availabilityElement) return;

    if (!this.currentVariant) {
      availabilityElement.textContent = 'Unavailable';
      availabilityElement.className = 'product-availability product-availability--unavailable';
      return;
    }

    if (this.currentVariant.available) {
      const inventory = this.currentVariant.inventory_quantity;
      if (inventory > 0 && inventory <= 10) {
        availabilityElement.textContent = `Only ${inventory} left in stock`;
        availabilityElement.className = 'product-availability product-availability--low';
      } else {
        availabilityElement.textContent = 'In stock';
        availabilityElement.className = 'product-availability product-availability--available';
      }
    } else {
      availabilityElement.textContent = 'Out of stock';
      availabilityElement.className = 'product-availability product-availability--unavailable';
    }
  }

  updateSubmitButton() {
    if (!this.submitButton) return;

    const isAvailable = this.currentVariant && this.currentVariant.available;
    
    this.submitButton.disabled = !isAvailable || this.isSubmitting;
    
    if (this.isSubmitting) {
      this.submitButton.textContent = 'Adding...';
    } else if (!this.currentVariant) {
      this.submitButton.textContent = 'Unavailable';
    } else if (!isAvailable) {
      this.submitButton.textContent = 'Sold out';
    } else {
      this.submitButton.textContent = 'Add to cart';
    }
  }

  updateVariantImage() {
    if (!this.currentVariant || !this.currentVariant.featured_image) return;

    const productImages = document.querySelectorAll('.product-image img');
    const targetImage = Array.from(productImages).find(img => 
      img.src.includes(this.currentVariant.featured_image.id) ||
      img.dataset.variantId == this.currentVariant.id
    );

    if (targetImage) {
      // Scroll to or highlight the variant image
      targetImage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  selectFirstAvailableVariant() {
    const availableOption = Array.from(this.variantSelects[0]?.options || [])
      .find(option => option.dataset.available === 'true');
    
    if (availableOption) {
      availableOption.selected = true;
      this.handleVariantChange();
    }
  }

  validateForm() {
    const errors = [];

    // Check if variant is selected and available
    if (!this.currentVariant) {
      errors.push({ field: 'variant', message: 'Please select a variant' });
    } else if (!this.currentVariant.available) {
      errors.push({ field: 'variant', message: 'Selected variant is not available' });
    }

    // Validate quantity
    const quantity = parseInt(this.quantityInput?.value);
    if (!quantity || quantity < 1) {
      errors.push({ field: 'quantity', message: 'Quantity must be at least 1' });
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  validateQuantity(quantity) {
    if (!this.currentVariant) return true;

    const maxQuantity = this.currentVariant.inventory_quantity;
    const inventoryPolicy = this.currentVariant.inventory_policy;

    if (inventoryPolicy === 'deny' && quantity > maxQuantity) {
      this.showError(`Only ${maxQuantity} available in stock`);
      this.quantityInput.value = maxQuantity;
      return false;
    }

    return true;
  }

  showValidationErrors(errors) {
    // Clear previous errors
    this.clearErrors();

    errors.forEach(error => {
      const errorElement = this.querySelector(`#${error.field}-error`);
      if (errorElement) {
        errorElement.textContent = error.message;
        errorElement.style.display = 'block';
      }
    });

    // Announce errors to screen readers
    const errorMessages = errors.map(e => e.message).join('. ');
    this.announceToScreenReader(errorMessages, 'assertive');
  }

  clearErrors() {
    const errorElements = this.querySelectorAll('.form-error');
    errorElements.forEach(element => {
      element.textContent = '';
      element.style.display = 'none';
    });
  }

  showError(message) {
    // Show general error message
    const errorElement = this.querySelector('.product-form-error');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  }

  async submitToCart() {
    this.isSubmitting = true;
    this.updateSubmitButton();

    try {
      const formData = new FormData(this.form);
      
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add to cart');
      }

      const result = await response.json();
      
      // Dispatch success event
      this.dispatchEvent(new CustomEvent('product:added-to-cart', {
        bubbles: true,
        detail: { product: result, form: this }
      }));

      // Show success state
      this.showSuccess();

    } catch (error) {
      console.error('Add to cart error:', error);
      this.showError(error.message);
    } finally {
      this.isSubmitting = false;
      this.updateSubmitButton();
    }
  }

  showSuccess() {
    if (this.submitButton) {
      const originalText = this.submitButton.textContent;
      this.submitButton.textContent = '✓ Added!';
      this.submitButton.classList.add('btn--success');
      
      setTimeout(() => {
        this.submitButton.textContent = originalText;
        this.submitButton.classList.remove('btn--success');
      }, 2000);
    }
  }

  formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price / 100);
  }

  announceToScreenReader(message, priority = 'polite') {
    if (window.ThemeUtilities) {
      const a11yUtil = window.ThemeUtilities.getUtility('a11y');
      if (a11yUtil) {
        a11yUtil.announce(message, priority);
      }
    }
  }

  cleanup() {
    // Clean up any timers or observers
  }

  // Public API
  getVariant() {
    return this.currentVariant;
  }

  setQuantity(quantity) {
    if (this.quantityInput) {
      this.quantityInput.value = quantity;
      this.quantityInput.dispatchEvent(new Event('change'));
    }
  }

  reset() {
    if (this.form) {
      this.form.reset();
      this.initializeVariant();
    }
  }
}

// Register the custom element
if (!customElements.get('product-form')) {
  customElements.define('product-form', ProductForm);
}

// Export for use in global scope
window.ProductForm = ProductForm;