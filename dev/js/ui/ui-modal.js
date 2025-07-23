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
    this.detailsContainer = this.querySelector("details") || this.closest("details");
    this.summaryToggle = this.querySelector("summary");
    this.closeButton = this.querySelector(".modal-close-button");

    // If no details container, create one
    if (!this.detailsContainer) {
      this.detailsContainer = document.createElement("details");
      this.parentNode.insertBefore(this.detailsContainer, this);
      this.detailsContainer.appendChild(this);
    }
  }

  setupEventListeners() {
    // Summary toggle
    if (this.summaryToggle) {
      this.summaryToggle.addEventListener("click", this.handleSummaryClick.bind(this));
    }

    // Close button
    if (this.closeButton) {
      this.closeButton.addEventListener("click", this.close.bind(this));
    }

    // Details toggle event
    if (this.detailsContainer) {
      this.detailsContainer.addEventListener("toggle", this.handleToggle.bind(this));
    }

    // Keyboard events
    this.addEventListener("keydown", this.handleKeydown.bind(this));

    // Click outside to close
    this.addEventListener("click", this.handleBackdropClick.bind(this));

    // Prevent body scroll when modal is open
    document.addEventListener("modal:opened", this.handleModalOpened.bind(this));
    document.addEventListener("modal:closed", this.handleModalClosed.bind(this));
  }

  setupAccessibility() {
    // Set up ARIA attributes
    this.setAttribute("role", "dialog");
    this.setAttribute("aria-modal", "true");

    if (this.summaryToggle) {
      this.summaryToggle.setAttribute("aria-expanded", "false");
      this.summaryToggle.setAttribute("aria-haspopup", "dialog");
    }

    // Add modal title if not present
    if (!this.getAttribute("aria-labelledby")) {
      const title = this.querySelector(".modal-title, h1, h2, h3");
      if (title) {
        if (!title.id) {
          title.id = `modal-title-${Math.random().toString(36).substr(2, 9)}`;
        }
        this.setAttribute("aria-labelledby", title.id);
      }
    }
  }

  handleSummaryClick(event) {
    event.preventDefault();

    if (this.detailsContainer.hasAttribute("open")) {
      this.close();
    } else {
      this.open();
    }
  }

  handleToggle(event) {
    if (this.detailsContainer.hasAttribute("open")) {
      this.handleOpen();
    } else {
      this.handleClose();
    }
  }

  handleKeydown(event) {
    if (!this.isOpen) return;

    switch (event.key) {
      case "Escape":
        event.preventDefault();
        this.close();
        break;
      case "Tab":
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
      document.body.style.overflow = "hidden";
    }
  }

  handleModalClosed(event) {
    if (event.detail.modal === this) {
      document.body.style.overflow = "";
    }
  }

  open() {
    if (this.isOpen) return;

    this.detailsContainer.setAttribute("open", "");
    this.handleOpen();
  }

  handleOpen() {
    this.isOpen = true;
    this.classList.add("modal--open");

    // Update ARIA attributes
    if (this.summaryToggle) {
      this.summaryToggle.setAttribute("aria-expanded", "true");
    }

    // Set up focus trap
    this.setupFocusTrap();

    // Prevent body scroll
    document.body.classList.add("modal-open");

    // Dispatch event
    document.dispatchEvent(
      new CustomEvent("modal:opened", {
        detail: { modal: this },
      }),
    );

    this.dispatchEvent(
      new CustomEvent("details-modal:opened", {
        bubbles: true,
        detail: { modal: this },
      }),
    );
  }

  close() {
    if (!this.isOpen) return;

    this.detailsContainer.removeAttribute("open");
    this.handleClose();
  }

  handleClose() {
    this.isOpen = false;
    this.classList.remove("modal--open");

    // Update ARIA attributes
    if (this.summaryToggle) {
      this.summaryToggle.setAttribute("aria-expanded", "false");
    }

    // Remove focus trap
    this.removeFocusTrap();

    // Restore body scroll
    document.body.classList.remove("modal-open");

    // Return focus to summary toggle
    if (this.summaryToggle) {
      this.summaryToggle.focus();
    }

    // Dispatch event
    document.dispatchEvent(
      new CustomEvent("modal:closed", {
        detail: { modal: this },
      }),
    );

    this.dispatchEvent(
      new CustomEvent("details-modal:closed", {
        bubbles: true,
        detail: { modal: this },
      }),
    );
  }

  setupFocusTrap() {
    if (window.DOMUtils) {
      // Find the first focusable element or use close button
      const firstFocusable =
        this.querySelector('input, button, select, textarea, a[href], [tabindex]:not([tabindex="-1"])') ||
        this.closeButton;
      this.focusTrap = window.DOMUtils.trapFocus(this, firstFocusable);
    } else {
      // Fallback focus management
      const firstFocusable = this.querySelector(
        'input, button, select, textarea, a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }
  }

  removeFocusTrap() {
    if (this.focusTrap && typeof this.focusTrap === "function") {
      this.focusTrap();
      this.focusTrap = null;
    }
  }

  cleanup() {
    // Remove focus trap
    this.removeFocusTrap();

    // Restore body scroll if this modal was open
    if (this.isOpen) {
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
    }

    // Remove event listeners
    document.removeEventListener("modal:opened", this.handleModalOpened.bind(this));
    document.removeEventListener("modal:closed", this.handleModalClosed.bind(this));
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
if (!customElements.get("details-modal")) {
  customElements.define("details-modal", DetailsModal);
}

// Export for use in global scope
window.DetailsModal = DetailsModal;
