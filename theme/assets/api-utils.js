/**
 * API Utilities - Consolidated Shopify API interaction utilities
 * Handles common API patterns with proper error handling and caching
 */

class APIUtils {
  constructor() {
    this.cache = new Map();
    this.abortControllers = new Map();
    this.baseUrl = window.shopUrl || '';
    this.config = window.THEME_CONFIG?.API || {};
  }

  /**
   * Generic fetch wrapper with error handling and caching
   * @param {string} url - API endpoint URL
   * @param {Object} options - Fetch options
   * @param {boolean} useCache - Whether to use caching
   * @returns {Promise} - Response promise
   */
  async fetchWithErrorHandling(url, options = {}, useCache = false) {
    const cacheKey = `${url}_${JSON.stringify(options)}`;
    
    // Return cached response if available
    if (useCache && this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // Cancel previous request if exists
    if (this.abortControllers.has(url)) {
      this.abortControllers.get(url).abort();
    }

    // Create new abort controller
    const abortController = new AbortController();
    this.abortControllers.set(url, abortController);

    const defaultOptions = {
      method: 'GET',
      headers: this.config.defaults?.headers || {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      signal: abortController.signal,
      ...options
    };

    try {
      const response = await fetch(url, defaultOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Cache successful responses
      if (useCache && response.status === 200) {
        this.cache.set(cacheKey, data);
        // Auto-expire cache after 5 minutes
        setTimeout(() => this.cache.delete(cacheKey), 5 * 60 * 1000);
      }

      return data;
    } catch (error) {
      if (error.name === 'AbortError') {
        // Request aborted
        return null;
      }
      
      console.error('API request failed:', error);
      throw error;
    } finally {
      this.abortControllers.delete(url);
    }
  }

  /**
   * Add item to cart
   * @param {FormData|Object} formData - Product form data
   * @returns {Promise} - Cart response
   */
  async addToCart(formData) {
    const url = `${this.baseUrl}${this.config.endpoints?.cartAdd || '/cart/add.js'}`;
    
    const options = {
      method: 'POST',
      body: formData instanceof FormData ? formData : JSON.stringify(formData),
      headers: formData instanceof FormData ? {} : {
        'Content-Type': 'application/json'
      }
    };

    return this.fetchWithErrorHandling(url, options);
  }

  /**
   * Update cart
   * @param {Object} updates - Cart updates object
   * @returns {Promise} - Cart response
   */
  async updateCart(updates) {
    const url = `${this.baseUrl}${this.config.endpoints?.cartUpdate || '/cart/update.js'}`;
    
    const options = {
      method: 'POST',
      body: JSON.stringify({ updates }),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    return this.fetchWithErrorHandling(url, options);
  }

  /**
   * Get current cart
   * @param {boolean} useCache - Whether to use caching
   * @returns {Promise} - Cart data
   */
  async getCart(useCache = true) {
    const url = `${this.baseUrl}${this.config.endpoints?.cart || '/cart.js'}`;
    return this.fetchWithErrorHandling(url, {}, useCache);
  }

  /**
   * Change cart item quantity
   * @param {string} variantId - Variant ID
   * @param {number} quantity - New quantity
   * @returns {Promise} - Cart response
   */
  async changeCartItem(variantId, quantity) {
    const url = `${this.baseUrl}${this.config.endpoints?.cartChange || '/cart/change.js'}`;
    
    const options = {
      method: 'POST',
      body: JSON.stringify({
        id: variantId,
        quantity: quantity
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    return this.fetchWithErrorHandling(url, options);
  }

  /**
   * Search products
   * @param {string} query - Search query
   * @param {Object} options - Search options
   * @returns {Promise} - Search results
   */
  async searchProducts(query, options = {}) {
    const {
      limit = this.config.search?.limit || 10,
      resources = this.config.search?.resources || 'product,collection,page,article',
      section = this.config.search?.section || 'predictive-search'
    } = options;

    const params = new URLSearchParams({
      q: query,
      limit: limit,
      resources: resources,
      section_id: section
    });

    const url = `${this.baseUrl}/search/suggest.json?${params}`;
    return this.fetchWithErrorHandling(url, {}, true);
  }

  /**
   * Get product recommendations
   * @param {string} productId - Product ID
   * @param {number} limit - Number of recommendations
   * @returns {Promise} - Product recommendations
   */
  async getProductRecommendations(productId, limit = 4) {
    const url = `${this.baseUrl}/recommendations/products.json?product_id=${productId}&limit=${limit}`;
    return this.fetchWithErrorHandling(url, {}, true);
  }

  /**
   * Get collection products
   * @param {string} collectionHandle - Collection handle
   * @param {Object} options - Query options
   * @returns {Promise} - Collection products
   */
  async getCollectionProducts(collectionHandle, options = {}) {
    const {
      limit = 50,
      sort_by = 'created-descending',
      page = 1
    } = options;

    const params = new URLSearchParams({
      limit: limit,
      sort_by: sort_by,
      page: page
    });

    const url = `${this.baseUrl}/collections/${collectionHandle}/products.json?${params}`;
    return this.fetchWithErrorHandling(url, {}, true);
  }

  /**
   * Submit contact form
   * @param {FormData} formData - Form data
   * @returns {Promise} - Submission response
   */
  async submitContactForm(formData) {
    const url = `${this.baseUrl}/contact`;
    
    const options = {
      method: 'POST',
      body: formData
    };

    return this.fetchWithErrorHandling(url, options);
  }

  /**
   * Subscribe to newsletter
   * @param {string} email - Email address
   * @param {Object} additionalData - Additional form data
   * @returns {Promise} - Subscription response
   */
  async subscribeNewsletter(email, additionalData = {}) {
    const formData = new FormData();
    formData.append('contact[email]', email);
    formData.append('contact[tags]', 'newsletter');
    
    // Add additional data
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const url = `${this.baseUrl}/contact`;
    
    const options = {
      method: 'POST',
      body: formData
    };

    return this.fetchWithErrorHandling(url, options);
  }

  /**
   * Clear all caches
   */
  clearCache() {
    this.cache.clear();
  }

  /**
   * Abort all pending requests
   */
  abortAllRequests() {
    this.abortControllers.forEach(controller => controller.abort());
    this.abortControllers.clear();
  }

  /**
   * Get cache statistics
   * @returns {Object} - Cache stats
   */
  getCacheStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
      pendingRequests: this.abortControllers.size
    };
  }
}

// Create global instance
window.APIUtils = new APIUtils();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = APIUtils;
}