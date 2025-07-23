/**
 * Enhanced Keyboard Navigation
 * Provides comprehensive keyboard navigation support for the theme
 */

class KeyboardNavigation {
  constructor() {
    this.shortcuts = new Map();
    this.focusHistory = [];
    this.currentFocusIndex = -1;
    this.isKeyboardUser = false;

    this.init();
  }

  /**
   * Initialize keyboard navigation
   */
  init() {
    this.setupKeyboardDetection();
    this.setupGlobalKeyboardShortcuts();
    this.setupFocusManagement();
    this.setupCustomElements();
    this.setupModalNavigation();
    this.setupTableNavigation();
    this.setupCarouselNavigation();
  }

  /**
   * Detect keyboard usage
   */
  setupKeyboardDetection() {
    // Track keyboard usage
    document.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        this.isKeyboardUser = true;
        document.body.classList.add("keyboard-user");
      }
    });

    // Track mouse usage
    document.addEventListener("mousedown", () => {
      this.isKeyboardUser = false;
      document.body.classList.remove("keyboard-user");
    });

    // Track touch usage
    document.addEventListener("touchstart", () => {
      this.isKeyboardUser = false;
      document.body.classList.remove("keyboard-user");
    });
  }

  /**
   * Setup global keyboard shortcuts
   */
  setupGlobalKeyboardShortcuts() {
    // Global keyboard shortcuts have been disabled
    // Only essential accessibility shortcuts remain active through other components
  }

  /**
   * Setup focus management
   */
  setupFocusManagement() {
    // Track focus history
    document.addEventListener("focusin", (event) => {
      if (this.isKeyboardUser) {
        this.addToFocusHistory(event.target);
      }
    });

    // Handle focus restoration
    document.addEventListener("keydown", (event) => {
      if (event.altKey && event.key === "ArrowLeft") {
        event.preventDefault();
        this.focusPrevious();
      } else if (event.altKey && event.key === "ArrowRight") {
        event.preventDefault();
        this.focusNext();
      }
    });

    // Ensure focus is visible
    document.addEventListener("focusin", (event) => {
      if (this.isKeyboardUser) {
        this.ensureFocusVisible(event.target);
      }
    });
  }

  /**
   * Setup custom element navigation
   */
  setupCustomElements() {
    // Product cards navigation
    this.setupProductCardNavigation();

    // Form navigation
    this.setupFormNavigation();

    // Button group navigation
    this.setupButtonGroupNavigation();
  }

  /**
   * Setup product card navigation
   */
  setupProductCardNavigation() {
    document.querySelectorAll(".product-card, .card-product").forEach((card) => {
      if (card.hasAttribute("data-keyboard-nav")) return;
      card.setAttribute("data-keyboard-nav", "true");

      // Make card focusable
      if (!card.hasAttribute("tabindex")) {
        card.setAttribute("tabindex", "0");
      }

      // Add role if not present
      if (!card.hasAttribute("role")) {
        card.setAttribute("role", "article");
      }

      // Handle keyboard interaction
      card.addEventListener("keydown", (event) => {
        switch (event.key) {
          case "Enter":
          case " ":
            event.preventDefault();
            const link = card.querySelector("a");
            if (link) {
              link.click();
            }
            break;

          case "ArrowRight":
          case "ArrowDown":
            event.preventDefault();
            this.focusNextCard(card);
            break;

          case "ArrowLeft":
          case "ArrowUp":
            event.preventDefault();
            this.focusPreviousCard(card);
            break;
        }
      });
    });
  }

  /**
   * Setup form navigation
   */
  setupFormNavigation() {
    document.querySelectorAll("form").forEach((form) => {
      if (form.hasAttribute("data-keyboard-nav")) return;
      form.setAttribute("data-keyboard-nav", "true");

      form.addEventListener("keydown", (event) => {
        if (event.ctrlKey && event.key === "Enter") {
          // Ctrl+Enter submits form
          event.preventDefault();
          form.submit();
        }
      });
    });
  }

  /**
   * Setup button group navigation
   */
  setupButtonGroupNavigation() {
    document.querySelectorAll(".button-group, .btn-group").forEach((group) => {
      if (group.hasAttribute("data-keyboard-nav")) return;
      group.setAttribute("data-keyboard-nav", "true");

      const buttons = group.querySelectorAll('button, [role="button"]');

      // Set up roving tabindex
      buttons.forEach((button, index) => {
        button.setAttribute("tabindex", index === 0 ? "0" : "-1");
      });

      group.addEventListener("keydown", (event) => {
        const currentIndex = Array.from(buttons).indexOf(event.target);
        if (currentIndex === -1) return;

        let nextIndex = currentIndex;

        switch (event.key) {
          case "ArrowRight":
          case "ArrowDown":
            event.preventDefault();
            nextIndex = (currentIndex + 1) % buttons.length;
            break;

          case "ArrowLeft":
          case "ArrowUp":
            event.preventDefault();
            nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
            break;

          case "Home":
            event.preventDefault();
            nextIndex = 0;
            break;

          case "End":
            event.preventDefault();
            nextIndex = buttons.length - 1;
            break;

          default:
            return;
        }

        // Update tabindex and focus
        buttons[currentIndex].setAttribute("tabindex", "-1");
        buttons[nextIndex].setAttribute("tabindex", "0");
        buttons[nextIndex].focus();
      });
    });
  }

  /**
   * Setup modal navigation
   */
  setupModalNavigation() {
    document.addEventListener("keydown", (event) => {
      const modal = document.querySelector('.modal.active, [role="dialog"][aria-hidden="false"]');
      if (!modal) return;

      if (event.key === "Tab") {
        this.trapFocusInModal(event, modal);
      }
    });
  }

  /**
   * Setup table navigation
   */
  setupTableNavigation() {
    document.querySelectorAll("table").forEach((table) => {
      if (table.hasAttribute("data-keyboard-nav")) return;
      table.setAttribute("data-keyboard-nav", "true");

      // Make table focusable
      if (!table.hasAttribute("tabindex")) {
        table.setAttribute("tabindex", "0");
      }

      table.addEventListener("keydown", (event) => {
        if (!this.isKeyboardUser) return;

        const cells = table.querySelectorAll("td, th");
        const currentCell = event.target.closest("td, th");
        if (!currentCell) return;

        const currentIndex = Array.from(cells).indexOf(currentCell);
        const cols = table.rows[0]?.cells.length || 0;
        const rows = table.rows.length;

        let nextIndex = currentIndex;

        switch (event.key) {
          case "ArrowRight":
            event.preventDefault();
            nextIndex = Math.min(currentIndex + 1, cells.length - 1);
            break;

          case "ArrowLeft":
            event.preventDefault();
            nextIndex = Math.max(currentIndex - 1, 0);
            break;

          case "ArrowDown":
            event.preventDefault();
            nextIndex = Math.min(currentIndex + cols, cells.length - 1);
            break;

          case "ArrowUp":
            event.preventDefault();
            nextIndex = Math.max(currentIndex - cols, 0);
            break;

          case "Home":
            event.preventDefault();
            nextIndex = Math.floor(currentIndex / cols) * cols;
            break;

          case "End":
            event.preventDefault();
            nextIndex = Math.min((Math.floor(currentIndex / cols) + 1) * cols - 1, cells.length - 1);
            break;

          default:
            return;
        }

        if (cells[nextIndex]) {
          cells[nextIndex].focus();
        }
      });

      // Make cells focusable
      table.querySelectorAll("td, th").forEach((cell) => {
        if (!cell.hasAttribute("tabindex")) {
          cell.setAttribute("tabindex", "-1");
        }
      });
    });
  }

  /**
   * Setup carousel navigation
   */
  setupCarouselNavigation() {
    document.querySelectorAll(".carousel, .slider").forEach((carousel) => {
      if (carousel.hasAttribute("data-keyboard-nav")) return;
      carousel.setAttribute("data-keyboard-nav", "true");

      carousel.addEventListener("keydown", (event) => {
        switch (event.key) {
          case "ArrowLeft":
            event.preventDefault();
            this.carouselPrevious(carousel);
            break;

          case "ArrowRight":
            event.preventDefault();
            this.carouselNext(carousel);
            break;

          case "Home":
            event.preventDefault();
            this.carouselGoTo(carousel, 0);
            break;

          case "End":
            event.preventDefault();
            const slides = carousel.querySelectorAll(".slide, .carousel-item");
            this.carouselGoTo(carousel, slides.length - 1);
            break;
        }
      });
    });
  }

  /**
   * Register a keyboard shortcut
   */
  registerShortcut(key, handler, description) {
    this.shortcuts.set(key, { handler, description });
  }

  /**
   * Check if user is in a typing context
   */
  isTypingContext(element) {
    const typingElements = ["INPUT", "TEXTAREA", "SELECT"];
    const editableElements = element.isContentEditable;

    return typingElements.includes(element.tagName) || editableElements;
  }

  /**
   * Add element to focus history
   */
  addToFocusHistory(element) {
    // Remove element if it already exists
    const existingIndex = this.focusHistory.indexOf(element);
    if (existingIndex !== -1) {
      this.focusHistory.splice(existingIndex, 1);
    }

    // Add to end of history
    this.focusHistory.push(element);
    this.currentFocusIndex = this.focusHistory.length - 1;

    // Limit history size
    if (this.focusHistory.length > 50) {
      this.focusHistory.shift();
      this.currentFocusIndex--;
    }
  }

  /**
   * Focus previous element in history
   */
  focusPrevious() {
    if (this.currentFocusIndex > 0) {
      this.currentFocusIndex--;
      const element = this.focusHistory[this.currentFocusIndex];
      if (element && document.contains(element)) {
        element.focus();
      }
    }
  }

  /**
   * Focus next element in history
   */
  focusNext() {
    if (this.currentFocusIndex < this.focusHistory.length - 1) {
      this.currentFocusIndex++;
      const element = this.focusHistory[this.currentFocusIndex];
      if (element && document.contains(element)) {
        element.focus();
      }
    }
  }

  /**
   * Ensure focused element is visible
   */
  ensureFocusVisible(element) {
    // Scroll element into view if needed
    element.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });

    // Add focus indicator class
    element.classList.add("keyboard-focused");

    // Remove class after a delay
    setTimeout(() => {
      element.classList.remove("keyboard-focused");
    }, 2000);
  }

  /**
   * Focus next product card
   */
  focusNextCard(currentCard) {
    const cards = document.querySelectorAll(".product-card, .card-product");
    const currentIndex = Array.from(cards).indexOf(currentCard);
    const nextIndex = (currentIndex + 1) % cards.length;

    if (cards[nextIndex]) {
      cards[nextIndex].focus();
    }
  }

  /**
   * Focus previous product card
   */
  focusPreviousCard(currentCard) {
    const cards = document.querySelectorAll(".product-card, .card-product");
    const currentIndex = Array.from(cards).indexOf(currentCard);
    const prevIndex = (currentIndex - 1 + cards.length) % cards.length;

    if (cards[prevIndex]) {
      cards[prevIndex].focus();
    }
  }

  /**
   * Trap focus within modal
   */
  trapFocusInModal(event, modal) {
    const focusableElements = modal.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])',
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  /**
   * Close modal
   */
  closeModal(modal) {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");

    // Return focus to trigger element
    const trigger = document.querySelector(`[aria-controls=\"${modal.id}\"]`);
    if (trigger) {
      trigger.focus();
    }
  }

  /**
   * Carousel navigation methods
   */
  carouselPrevious(carousel) {
    const prevButton = carousel.querySelector(".carousel-prev, .slider-prev");
    if (prevButton) {
      prevButton.click();
    }
  }

  carouselNext(carousel) {
    const nextButton = carousel.querySelector(".carousel-next, .slider-next");
    if (nextButton) {
      nextButton.click();
    }
  }

  carouselGoTo(carousel, index) {
    const indicators = carousel.querySelectorAll(".carousel-indicator, .slider-dot");
    if (indicators[index]) {
      indicators[index].click();
    }
  }

  /**
   * Get available keyboard shortcuts
   */
  getShortcuts() {
    const shortcuts = [];
    this.shortcuts.forEach((shortcut, key) => {
      shortcuts.push({
        key,
        description: shortcut.description,
      });
    });
    return shortcuts;
  }
}

// Initialize keyboard navigation
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.keyboardNavigation = new KeyboardNavigation();
  });
} else {
  window.keyboardNavigation = new KeyboardNavigation();
}

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = KeyboardNavigation;
}
