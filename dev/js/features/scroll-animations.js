/**
 * Scroll Animations System
 * Handles scroll-triggered animations using Intersection Observer
 */

class ScrollAnimations {
  constructor() {
    this.observer = null;
    this.animatedElements = new Set();
    this.init();
  }

  init() {
    // Create intersection observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateElement(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe elements with scroll animation classes
    this.observeElements();
  }

  observeElements() {
    const elements = document.querySelectorAll('[data-scroll-animate]');
    elements.forEach((element) => {
      if (!this.animatedElements.has(element)) {
        this.observer.observe(element);
        this.animatedElements.add(element);
      }
    });
  }

  animateElement(element) {
    const animationType = element.dataset.scrollAnimate;
    const delay = element.dataset.scrollDelay || '0';
    
    // Add animation classes
    element.classList.add('animate-in', animationType, 'duration-500');
    element.style.animationDelay = `${delay}ms`;
    
    // Mark as animated
    element.dataset.scrollAnimated = 'true';
    
    // Stop observing this element
    this.observer.unobserve(element);
  }

  // Public method to add scroll animations to new elements
  addScrollAnimation(selector, animationType = 'fade-in', delay = 0) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      element.dataset.scrollAnimate = animationType;
      element.dataset.scrollDelay = delay;
      this.observer.observe(element);
      this.animatedElements.add(element);
    });
  }

  // Destroy the observer
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Initialize scroll animations
const scrollAnimations = new ScrollAnimations();

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = ScrollAnimations;
} else {
  window.ScrollAnimations = ScrollAnimations;
  window.scrollAnimations = scrollAnimations;
} 