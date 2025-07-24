/**
 * Product Feature Utilities - Works with ProductForm component
 * Provides additional functionality for product pages
 */

// Product utilities
const ProductUtils = {
  /**
   * Format price for display
   */
  formatPrice(price, currency = "USD") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
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
    return productData.variants.find((v) => v.available) || productData.variants[0];
  },

  /**
   * Update product price display
   */
  updatePriceDisplay(priceElement, variant) {
    if (!priceElement || !variant) return;

    const price = this.formatPrice(variant.price);
    const compareAtPrice = variant.compare_at_price ? this.formatPrice(variant.compare_at_price) : null;

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

    const mediaGallery = document.querySelector(".product-media-gallery");
    if (!mediaGallery) return;

    const mainImage = mediaGallery.querySelector(".main-media img");
    if (mainImage) {
      mainImage.src = variant.featured_image.src;
      mainImage.alt = variant.featured_image.alt || variant.title;
    }

    // Update thumbnails
    const thumbnails = mediaGallery.querySelectorAll(".thumbnail-btn img");
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
  announceToScreenReader(message, priority = "polite") {
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", priority);
    announcement.setAttribute("aria-atomic", "true");
    announcement.classList.add("sr-only");
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  },
};

// Quantity input handler - REMOVED: Duplicate class definition
// This functionality is now handled by the dedicated quantity.js file

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
      select.addEventListener("change", this.handleChange.bind(this));
    });

    this.radios.forEach((radio) => {
      radio.addEventListener("change", this.handleChange.bind(this));
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
      const productJson = document.querySelector("#product-json");
      if (productJson) {
        const productData = JSON.parse(productJson.textContent);
        const variant = ProductUtils.getVariantById(productData, variantId);

        if (variant) {
          this.currentVariant = variant;
          this.updateUI(variant);

          // Dispatch event
          this.dispatchEvent(
            new CustomEvent("variant:changed", {
              bubbles: true,
              detail: { variant },
            }),
          );
        }
      }
    } catch (error) {
      console.error("Error updating variant:", error);
    }
  }

  updateUI(variant) {
    // Update price
    const priceElement = document.querySelector(".product-price");
    if (priceElement) {
      ProductUtils.updatePriceDisplay(priceElement, variant);
    }

    // Update availability
    const availabilityElement = document.querySelector(".product-inventory");
    if (availabilityElement) {
      ProductUtils.updateAvailabilityDisplay(availabilityElement, variant);
    }

    // Update image
    ProductUtils.updateVariantImage(variant);

    // Update form
    const form = this.closest("form");
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
if (!customElements.get("variant-selector")) {
  customElements.define("variant-selector", VariantSelector);
}

// Export utilities
window.ProductUtils = ProductUtils;
