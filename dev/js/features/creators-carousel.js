/**
 * BloxMania Creators Carousel - JavaScript Infinite Scroll
 * Guarantees seamless infinite scrolling without restarts
 */

class CreatorsCarousel {
  constructor() {
    this.container = null;
    this.scrollContainer = null;
    this.items = [];
    this.isAnimating = false;
    this.animationId = null;
    this.isPaused = false;
    this.targetSpeed = 60; // Slower speed: 60px/second
    this.currentSpeed = 60;
    this.pauseTransitionDuration = 300; // 300ms to pause (faster)
    this.resumeTransitionDuration = 500; // 500ms to resume (smooth but quicker)
    this.init();
  }

  init() {
    // Find the carousel container
    this.container = document.querySelector(".creators-carousel");
    if (!this.container) {
      console.warn("🎠 CreatorsCarousel: Container not found!");
      return;
    }

    // Find the scroll container - use the correct selector that matches HTML
    this.scrollContainer = this.container.querySelector(".flex");
    if (!this.scrollContainer) {
      console.warn("🎠 CreatorsCarousel: Scroll container not found!");
      return;
    }

    // Get all creator items
    this.items = this.scrollContainer.querySelectorAll("div");

    if (this.items.length === 0) {
      console.warn("🎠 CreatorsCarousel: No items found!");
      return;
    }

    // Wait for images to load before calculating dimensions
    this.waitForImages().then(() => {
      this.setupHoverEvents();
      this.startAnimation();
    });
  }

  waitForImages() {
    const images = this.scrollContainer.querySelectorAll('img');
    const imagePromises = Array.from(images).map(img => {
      if (img.complete) {
        return Promise.resolve();
      }
      return new Promise((resolve) => {
        img.addEventListener('load', resolve);
        img.addEventListener('error', resolve); // Still resolve on error to not block
      });
    });
    
    return Promise.all(imagePromises);
  }

  setupHoverEvents() {
    // Add hover events to the carousel container
    this.container.addEventListener('mouseenter', () => {
      this.pauseSmooth();
    });

    this.container.addEventListener('mouseleave', () => {
      this.resumeSmooth();
    });
  }

  pauseSmooth() {
    this.isPaused = true;
    this.targetSpeed = 0;
    this.animateSpeedTransition(this.pauseTransitionDuration);
  }

  resumeSmooth() {
    this.isPaused = false;
    this.targetSpeed = 60; // Back to normal speed
    this.animateSpeedTransition(this.resumeTransitionDuration);
  }

  animateSpeedTransition(duration) {
    const startSpeed = this.currentSpeed;
    const endSpeed = this.targetSpeed;
    const startTime = performance.now();

    const transition = (timestamp) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Use easeInOut for smooth transition
      const easedProgress = this.easeInOut(progress);
      this.currentSpeed = startSpeed + (endSpeed - startSpeed) * easedProgress;

      if (progress < 1) {
        requestAnimationFrame(transition);
      }
    };

    requestAnimationFrame(transition);
  }

  startAnimation() {
    if (this.isAnimating) {
      return;
    }

    this.isAnimating = true;
    this.animate();
  }

  animate() {
    if (!this.isAnimating) return;

    const totalWidth = this.scrollContainer.scrollWidth / 2; // Distance for one complete set
    let currentPosition = 0;
    let lastTimestamp = performance.now();


    const step = (timestamp) => {
      if (!this.isAnimating) return;

      // Calculate actual elapsed time for consistent speed regardless of frame rate
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      // Move based on current speed (which can be transitioning smoothly)
      currentPosition += (this.currentSpeed * deltaTime) / 1000;

      // Reset position seamlessly when we've scrolled exactly one set
      if (currentPosition >= totalWidth) {
        currentPosition = currentPosition - totalWidth; // Subtract instead of reset to 0
      }

      // Use fixed decimal precision to avoid sub-pixel rendering issues
      const roundedPosition = Math.round(currentPosition * 100) / 100;
      
      // Use both regular and webkit transforms for better browser support
      this.scrollContainer.style.transform = `translateX(-${roundedPosition}px)`;
      this.scrollContainer.style.webkitTransform = `translateX(-${roundedPosition}px)`;
      
      this.animationId = requestAnimationFrame(step);
    };

    this.animationId = requestAnimationFrame(step);
  }

  easeInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  stop() {
    this.isAnimating = false;
    if (this.scrollContainer) {
      this.scrollContainer.style.transform = "translateX(0)";
    }
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  pause() {
    this.isAnimating = false;
  }

  resume() {
    this.startAnimation();
  }
}

// Prevent multiple instances
let carouselInstance = null;

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  if (!carouselInstance) {
    carouselInstance = new CreatorsCarousel();
  }
});

// Also initialize on Shopify section load
document.addEventListener("shopify:section:load", () => {
  if (carouselInstance) {
    carouselInstance.stop();
  }
  carouselInstance = new CreatorsCarousel();
});
