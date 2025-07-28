/**
 * Cart Notification System
 * Handles cart notifications with proper accessibility and animations
 */

class CartNotification {
  constructor() {
    this.notifications = [];
    this.container = null;
    this.init();
  }

  init() {
    this.createContainer();
    this.setupEventListeners();
  }

  createContainer() {
    // Create notification container
    this.container = document.createElement("div");
    this.container.className = "cart-notifications-container";
    this.container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    `;
    document.body.appendChild(this.container);
  }

  setupEventListeners() {
    // Listen for cart update events
    document.addEventListener("cart:updated", (event) => {
      this.showNotification(event.detail);
    });

    // Listen for cart error events
    document.addEventListener("cart:error", (event) => {
      this.showError(event.detail);
    });
  }

  showNotification(data) {
    const notification = this.createNotification(data, "success");
    this.addNotification(notification);
  }

  showError(data) {
    const notification = this.createNotification(data, "error");
    this.addNotification(notification);
  }

  createNotification(data, type = "success") {
    const notification = document.createElement("div");
    notification.className = `cart-notification cart-notification--${type}`;

    // Set up notification content
    const content = this.buildNotificationContent(data, type);
    notification.innerHTML = content;

    // Set up styles
    notification.style.cssText = `
      background: ${type === "success" ? "#10b981" : "#ef4444"};
      color: white;
      padding: 12px 16px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      font-size: 14px;
      font-weight: 500;
      max-width: 300px;
      pointer-events: auto;
    `;

    return notification;
  }

  buildNotificationContent(data, type) {
    const icon = type === "success" ? "✓" : "✕";
    const title = type === "success" ? "Added to cart" : "Error";

    return `
      <div class="cart-notification__content">
        <div class="cart-notification__header">
          <span class="cart-notification__icon">${icon}</span>
          <span class="cart-notification__title">${title}</span>
        </div>
        ${data.message ? `<div class="cart-notification__message">${data.message}</div>` : ""}
        ${
          data.product
            ? `
          <div class="cart-notification__product">
            <img src="${data.product.image}" alt="${data.product.title}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">
            <div class="cart-notification__product-info">
              <div class="cart-notification__product-title">${data.product.title}</div>
              <div class="cart-notification__product-price">${data.product.price}</div>
            </div>
          </div>
        `
            : ""
        }
      </div>
    `;
  }

  addNotification(notification) {
    this.container.appendChild(notification);
    this.notifications.push(notification);

    // Trigger animation using tailwindcss-animate
    requestAnimationFrame(() => {
      notification.classList.add("animate-in", "slide-in-from-right", "duration-300");
    });

    // Auto remove after animation duration
    const autoHideDuration = window.THEME_CONFIG?.ANIMATION_DURATIONS?.slower * 4 || 4000;
    setTimeout(() => {
      this.removeNotification(notification);
    }, autoHideDuration);
  }

  removeNotification(notification) {
    // Animate out using tailwindcss-animate
    notification.classList.add("animate-out", "slide-out-to-right", "duration-300");

    // Remove from DOM after animation
    const removeDelay = window.THEME_CONFIG?.ANIMATION_DURATIONS?.normal || 300;
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }

      // Remove from notifications array
      const index = this.notifications.indexOf(notification);
      if (index > -1) {
        this.notifications.splice(index, 1);
      }
    }, removeDelay);
  }

  // Manual notification methods
  show(message, type = "success", duration = null) {
    const defaultDuration = window.THEME_CONFIG?.ANIMATION_DURATIONS?.slower * 4 || 4000;
    const finalDuration = duration || defaultDuration;
    const notification = this.createNotification({ message }, type);
    this.addNotification(notification);

    if (finalDuration !== defaultDuration) {
      setTimeout(() => {
        this.removeNotification(notification);
      }, finalDuration);
    }
  }

  showSuccess(message, duration) {
    this.show(message, "success", duration);
  }

  showError(message, duration) {
    this.show(message, "error", duration);
  }

  // Clear all notifications
  clear() {
    this.notifications.forEach((notification) => {
      this.removeNotification(notification);
    });
  }

  // Destroy the notification system
  destroy() {
    this.clear();
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
}

// Initialize cart notification system
const cartNotification = new CartNotification();

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = CartNotification;
} else {
  window.CartNotification = CartNotification;
  window.cartNotification = cartNotification;
}
