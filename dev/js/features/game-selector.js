/**
 * Game Selector Dropdown Functionality
 * Handles the game selector dropdown in the header
 */

class GameSelector {
  constructor() {
    this.selector = document.querySelector("[data-game-selector-toggle]");
    this.dropdown = document.querySelector(".header__game-dropdown");
    this.options = document.querySelectorAll(".header__game-option");
    this.isOpen = false;

    if (this.selector && this.dropdown) {
      this.init();
    }
  }

  init() {
    this.bindEvents();
    this.setupAccessibility();
  }

  bindEvents() {
    // Toggle dropdown on button click
    this.selector.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggle();
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!this.selector.contains(e.target) && !this.dropdown.contains(e.target)) {
        this.close();
      }
    });

    // Handle keyboard navigation
    this.selector.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.toggle();
      } else if (e.key === "Escape") {
        this.close();
      }
    });

    // Handle keyboard navigation in dropdown
    this.dropdown.addEventListener("keydown", (e) => {
      this.handleDropdownKeyboard(e);
    });

    // Handle option clicks
    this.options.forEach((option) => {
      option.addEventListener("click", (e) => {
        // Allow normal link behavior
        this.close();
      });
    });
  }

  setupAccessibility() {
    // Set initial ARIA attributes
    this.selector.setAttribute("aria-haspopup", "true");
    this.selector.setAttribute("aria-expanded", "false");

    // Add role to dropdown
    this.dropdown.setAttribute("role", "menu");
    this.dropdown.setAttribute("aria-label", "Select a game");

    // Add roles to options
    this.options.forEach((option) => {
      option.setAttribute("role", "menuitem");
    });
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.isOpen = true;
    this.dropdown.classList.add("active");
    this.selector.setAttribute("aria-expanded", "true");

    // Focus first option
    const firstOption = this.options[0];
    if (firstOption) {
      firstOption.focus();
    }
  }

  close() {
    this.isOpen = false;
    this.dropdown.classList.remove("active");
    this.selector.setAttribute("aria-expanded", "false");

    // Return focus to button
    this.selector.focus();
  }

  handleDropdownKeyboard(e) {
    const currentOption = e.target.closest(".header__game-option");
    const options = Array.from(this.options);
    const currentIndex = options.indexOf(currentOption);

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % options.length;
        options[nextIndex].focus();
        break;

      case "ArrowUp":
        e.preventDefault();
        const prevIndex = currentIndex === 0 ? options.length - 1 : currentIndex - 1;
        options[prevIndex].focus();
        break;

      case "Escape":
        e.preventDefault();
        this.close();
        break;

      case "Enter":
      case " ":
        // Allow normal link behavior
        break;

      default:
        break;
    }
  }
}

// Initialize game selector when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new GameSelector();
});

// Export for potential use in other modules
window.GameSelector = GameSelector;
