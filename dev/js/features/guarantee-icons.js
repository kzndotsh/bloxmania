/**
 * Guarantee Page Floating Icons Hover Animations
 * Handles interactive hover effects for the floating gaming icons
 */

class GuaranteeIcons {
  constructor() {
    this.icons = [];
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setupIcons());
    } else {
      this.setupIcons();
    }
  }

  setupIcons() {
    // Get all floating icons
    this.icons = document.querySelectorAll(".guarantee-icon-float");

    if (this.icons.length === 0) {
      console.log("No guarantee icons found");
      // Check if the containers exist
      const containers = document.querySelectorAll(".guarantee-icon-container");
      console.log("Icon containers found:", containers.length);

      // Check if the section exists
      const guaranteeSection = document.querySelector(".guarantee-hero");
      console.log("Guarantee section found:", !!guaranteeSection);

      return;
    }

    console.log(`Found ${this.icons.length} guarantee icons`);

    // Define random movement patterns for each icon
    const movements = [
      { x: -10, y: -5 }, // Icon 1: left-up
      { x: 8, y: 12 }, // Icon 2: right-down
      { x: -15, y: 8 }, // Icon 3: left-down
      { x: 12, y: -10 }, // Icon 4: right-up
      { x: -8, y: -12 }, // Icon 5: left-up
      { x: 15, y: 5 }, // Icon 6: right-down
    ];

    this.icons.forEach((icon, index) => {
      const movement = movements[index % movements.length];

      // Store original transform for reset
      const originalTransform = icon.style.transform || "";

      console.log(`Setting up icon ${index + 1}:`, icon);

      // Add hover event listeners
      icon.addEventListener("mouseenter", (e) => {
        this.handleHoverEnter(e.target, movement, originalTransform);
      });

      icon.addEventListener("mouseleave", (e) => {
        this.handleHoverLeave(e.target, originalTransform);
      });

      // Add click event for debugging
      icon.addEventListener("click", (e) => {
        console.log("Icon clicked:", e.target);
      });
    });
  }

  handleHoverEnter(icon, movement, originalTransform) {
    console.log("Hover enter on icon:", icon);

    // Apply hover effect using CSS custom properties and classes
    icon.style.setProperty("--hover-x", `${movement.x}px`);
    icon.style.setProperty("--hover-y", `${movement.y}px`);
    icon.classList.add("guarantee-icon-hover");

    // Force opacity change
    icon.style.opacity = "1";
    icon.style.zIndex = "999999";

    // Apply transform with higher specificity
    const newTransform = `${originalTransform} translateX(${movement.x}px) translateY(${movement.y}px) scale(1.1)`;
    icon.style.setProperty("transform", newTransform, "important");
  }

  handleHoverLeave(icon, originalTransform) {
    console.log("Hover leave on icon:", icon);

    // Remove hover class
    icon.classList.remove("guarantee-icon-hover");

    // Reset to original state
    icon.style.opacity = "0.6";
    icon.style.zIndex = "";
    icon.style.setProperty("transform", originalTransform, "important");
  }
}

// Initialize when the script loads
document.addEventListener("DOMContentLoaded", () => {
  new GuaranteeIcons();
});

// Also initialize immediately if DOM is already loaded
if (document.readyState !== "loading") {
  new GuaranteeIcons();
}
