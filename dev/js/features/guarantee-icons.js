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
      return;
    }

    // Define ultra-subtle movement patterns for each icon
    const movements = [
      { x: -1, y: -1 }, // Icon 1: minimal left-up
      { x: 1, y: 1 }, // Icon 2: minimal right-down
      { x: -1, y: 1 }, // Icon 3: minimal left-down
      { x: 1, y: -1 }, // Icon 4: minimal right-up
      { x: -1, y: -1 }, // Icon 5: minimal left-up
      { x: 1, y: 0 }, // Icon 6: minimal right
    ];

    this.icons.forEach((icon, index) => {
      const movement = movements[index % movements.length];

      // Store original transform for reset
      const originalTransform = icon.style.transform || "";

      // Add hover event listeners
      icon.addEventListener("mouseenter", (e) => {
        this.handleHoverEnter(e.target, movement, originalTransform);
      });

      icon.addEventListener("mouseleave", (e) => {
        this.handleHoverLeave(e.target, originalTransform);
      });

      // Add click event for debugging
      icon.addEventListener("click", (e) => {});
    });
  }

  handleHoverEnter(icon, movement, originalTransform) {
    // Apply hover effect using CSS custom properties and classes
    icon.style.setProperty("--hover-x", `${movement.x}px`);
    icon.style.setProperty("--hover-y", `${movement.y}px`);
    icon.classList.add("guarantee-icon-hover");

    // Gentle opacity and z-index change
    icon.style.opacity = "0.9";
    icon.style.zIndex = "999999";

    // Apply ultra-subtle transform that preserves base position
    const newTransform = `${originalTransform} translateX(${movement.x}px) translateY(${movement.y}px) translateY(-2px) scale(1.02)`;
    icon.style.setProperty("transform", newTransform, "important");

    // Add a gentle transition if not already set
    icon.style.setProperty("transition", "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)", "important");
  }

  handleHoverLeave(icon, originalTransform) {
    // Remove hover class
    icon.classList.remove("guarantee-icon-hover");

    // Smooth reset to original state
    icon.style.opacity = "0.6";
    icon.style.zIndex = "";
    icon.style.setProperty("transform", originalTransform, "important");

    // Ensure smooth transition on leave
    icon.style.setProperty("transition", "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)", "important");
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
