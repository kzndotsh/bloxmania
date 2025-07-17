/**
 * Media Gallery - Following Dawn's Web Component patterns
 * Handles product image galleries with thumbnails, zoom, and keyboard navigation
 */

class MediaGallery extends HTMLElement {
  constructor() {
    super();
    
    this.mainMedia = null;
    this.thumbnails = null;
    this.currentIndex = 0;
    this.mediaItems = [];
    this.isZoomed = false;
    this.touchStartX = 0;
    this.touchStartY = 0;
  }

  connectedCallback() {
    this.setupDOM();
    this.setupEventListeners();
    this.setupAccessibility();
    this.initializeGallery();
  }

  disconnectedCallback() {
    this.cleanup();
  }

  setupDOM() {
    this.mainMedia = this.querySelector('.media-gallery__main');
    this.thumbnails = this.querySelectorAll('.media-gallery__thumbnail');
    this.mediaItems = Array.from(this.querySelectorAll('.media-gallery__item'));
    
    // Create navigation buttons if they don't exist
    this.createNavigationButtons();
  }

  createNavigationButtons() {
    if (this.mediaItems.length <= 1) return;

    // Previous button
    if (!this.querySelector('.media-gallery__prev')) {
      const prevButton = document.createElement('button');
      prevButton.className = 'media-gallery__prev media-gallery__nav-button';
      prevButton.setAttribute('aria-label', 'Previous image');
      prevButton.innerHTML = `
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
      `;
      this.mainMedia?.appendChild(prevButton);
    }

    // Next button
    if (!this.querySelector('.media-gallery__next')) {
      const nextButton = document.createElement('button');
      nextButton.className = 'media-gallery__next media-gallery__nav-button';
      nextButton.setAttribute('aria-label', 'Next image');
      nextButton.innerHTML = `
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
        </svg>
      `;
      this.mainMedia?.appendChild(nextButton);
    }
  }

  setupEventListeners() {
    // Thumbnail clicks
    this.thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', (e) => {
        e.preventDefault();
        this.goToSlide(index);
      });
    });

    // Navigation buttons
    const prevButton = this.querySelector('.media-gallery__prev');
    const nextButton = this.querySelector('.media-gallery__next');

    if (prevButton) {
      prevButton.addEventListener('click', this.previousSlide.bind(this));
    }

    if (nextButton) {
      nextButton.addEventListener('click', this.nextSlide.bind(this));
    }

    // Keyboard navigation
    this.addEventListener('keydown', this.handleKeydown.bind(this));

    // Touch/swipe events
    this.setupTouchEvents();

    // Zoom functionality
    this.setupZoomEvents();

    // Window resize
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  setupTouchEvents() {
    if (!this.mainMedia) return;

    this.mainMedia.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
    this.mainMedia.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: true });
    this.mainMedia.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
  }

  setupZoomEvents() {
    const zoomableImages = this.querySelectorAll('.media-gallery__image[data-zoom]');
    
    zoomableImages.forEach(image => {
      image.addEventListener('click', this.handleImageClick.bind(this));
      image.addEventListener('mousemove', this.handleMouseMove.bind(this));
      image.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    });
  }

  setupAccessibility() {
    // Set up ARIA attributes for main gallery
    this.setAttribute('role', 'region');
    this.setAttribute('aria-label', 'Product image gallery');

    // Set up thumbnails
    this.thumbnails.forEach((thumbnail, index) => {
      thumbnail.setAttribute('role', 'button');
      thumbnail.setAttribute('aria-label', `View image ${index + 1}`);
      thumbnail.setAttribute('tabindex', index === 0 ? '0' : '-1');
    });

    // Set up main media
    if (this.mainMedia) {
      this.mainMedia.setAttribute('aria-live', 'polite');
      this.mainMedia.setAttribute('aria-atomic', 'true');
    }

    // Add slide counter
    this.updateSlideCounter();
  }

  initializeGallery() {
    if (this.mediaItems.length === 0) return;

    // Show first slide
    this.goToSlide(0);
    
    // Preload next image
    this.preloadImage(1);
  }

  handleKeydown(event) {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.previousSlide();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.nextSlide();
        break;
      case 'Home':
        event.preventDefault();
        this.goToSlide(0);
        break;
      case 'End':
        event.preventDefault();
        this.goToSlide(this.mediaItems.length - 1);
        break;
      case 'Escape':
        if (this.isZoomed) {
          this.exitZoom();
        }
        break;
    }
  }

  handleTouchStart(event) {
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
  }

  handleTouchMove(event) {
    // Prevent default to avoid scrolling while swiping
    if (Math.abs(event.touches[0].clientX - this.touchStartX) > 10) {
      event.preventDefault();
    }
  }

  handleTouchEnd(event) {
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;
    
    const deltaX = touchEndX - this.touchStartX;
    const deltaY = touchEndY - this.touchStartY;
    
    // Only handle horizontal swipes
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        this.previousSlide();
      } else {
        this.nextSlide();
      }
    }
  }

  handleImageClick(event) {
    const image = event.target;
    if (image.dataset.zoom) {
      this.toggleZoom(image);
    }
  }

  handleMouseMove(event) {
    if (!this.isZoomed) return;

    const image = event.target;
    const rect = image.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    image.style.transformOrigin = `${x}% ${y}%`;
  }

  handleMouseLeave(event) {
    if (this.isZoomed) {
      event.target.style.transformOrigin = 'center center';
    }
  }

  handleResize() {
    // Recalculate zoom if active
    if (this.isZoomed) {
      this.exitZoom();
    }
  }

  goToSlide(index) {
    if (index < 0 || index >= this.mediaItems.length) return;

    const previousIndex = this.currentIndex;
    this.currentIndex = index;

    // Update main media
    this.updateMainMedia();

    // Update thumbnails
    this.updateThumbnails();

    // Update navigation buttons
    this.updateNavigationButtons();

    // Update slide counter
    this.updateSlideCounter();

    // Preload adjacent images
    this.preloadImage(index - 1);
    this.preloadImage(index + 1);

    // Dispatch event
    this.dispatchEvent(new CustomEvent('gallery:slide-changed', {
      bubbles: true,
      detail: { 
        currentIndex: index, 
        previousIndex: previousIndex,
        gallery: this 
      }
    }));

    // Announce to screen readers
    this.announceSlideChange();
  }

  updateMainMedia() {
    const currentItem = this.mediaItems[this.currentIndex];
    if (!currentItem || !this.mainMedia) return;

    // Clone the media item to main display
    const clone = currentItem.cloneNode(true);
    clone.className = 'media-gallery__current';
    
    // Clear previous content
    const existingCurrent = this.mainMedia.querySelector('.media-gallery__current');
    if (existingCurrent) {
      existingCurrent.remove();
    }

    this.mainMedia.appendChild(clone);

    // Handle different media types
    const image = clone.querySelector('img');
    const video = clone.querySelector('video');

    if (image) {
      this.handleImageLoad(image);
    }

    if (video) {
      this.handleVideoLoad(video);
    }
  }

  handleImageLoad(image) {
    // Add loading state
    image.addEventListener('load', () => {
      image.classList.add('loaded');
    });

    // Add error handling
    image.addEventListener('error', () => {
      image.classList.add('error');
      console.warn('Failed to load image:', image.src);
    });
  }

  handleVideoLoad(video) {
    // Pause other videos
    this.querySelectorAll('video').forEach(v => {
      if (v !== video) v.pause();
    });

    // Add video controls
    video.setAttribute('controls', '');
    video.setAttribute('preload', 'metadata');
  }

  updateThumbnails() {
    this.thumbnails.forEach((thumbnail, index) => {
      const isActive = index === this.currentIndex;
      
      thumbnail.classList.toggle('active', isActive);
      thumbnail.setAttribute('aria-selected', isActive.toString());
      thumbnail.setAttribute('tabindex', isActive ? '0' : '-1');
    });
  }

  updateNavigationButtons() {
    const prevButton = this.querySelector('.media-gallery__prev');
    const nextButton = this.querySelector('.media-gallery__next');

    if (prevButton) {
      prevButton.disabled = this.currentIndex === 0;
    }

    if (nextButton) {
      nextButton.disabled = this.currentIndex === this.mediaItems.length - 1;
    }
  }

  updateSlideCounter() {
    let counter = this.querySelector('.media-gallery__counter');
    
    if (!counter && this.mediaItems.length > 1) {
      counter = document.createElement('div');
      counter.className = 'media-gallery__counter';
      counter.setAttribute('aria-live', 'polite');
      this.mainMedia?.appendChild(counter);
    }

    if (counter) {
      counter.textContent = `${this.currentIndex + 1} / ${this.mediaItems.length}`;
    }
  }

  preloadImage(index) {
    if (index < 0 || index >= this.mediaItems.length) return;

    const mediaItem = this.mediaItems[index];
    const image = mediaItem.querySelector('img');
    
    if (image && !image.complete) {
      const preloadImg = new Image();
      preloadImg.src = image.src;
    }
  }

  previousSlide() {
    const newIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.mediaItems.length - 1;
    this.goToSlide(newIndex);
  }

  nextSlide() {
    const newIndex = this.currentIndex < this.mediaItems.length - 1 ? this.currentIndex + 1 : 0;
    this.goToSlide(newIndex);
  }

  toggleZoom(image) {
    if (this.isZoomed) {
      this.exitZoom();
    } else {
      this.enterZoom(image);
    }
  }

  enterZoom(image) {
    this.isZoomed = true;
    image.classList.add('zoomed');
    this.classList.add('gallery--zoomed');
    
    // Announce to screen readers
    this.announceZoomState(true);
  }

  exitZoom() {
    this.isZoomed = false;
    const zoomedImage = this.querySelector('.zoomed');
    
    if (zoomedImage) {
      zoomedImage.classList.remove('zoomed');
      zoomedImage.style.transformOrigin = 'center center';
    }
    
    this.classList.remove('gallery--zoomed');
    
    // Announce to screen readers
    this.announceZoomState(false);
  }

  announceSlideChange() {
    const currentItem = this.mediaItems[this.currentIndex];
    const image = currentItem.querySelector('img');
    const altText = image?.alt || `Image ${this.currentIndex + 1}`;
    
    if (window.ThemeUtilities) {
      const a11yUtil = window.ThemeUtilities.getUtility('a11y');
      if (a11yUtil) {
        a11yUtil.announce(`Viewing ${altText}, image ${this.currentIndex + 1} of ${this.mediaItems.length}`);
      }
    }
  }

  announceZoomState(isZoomed) {
    if (window.ThemeUtilities) {
      const a11yUtil = window.ThemeUtilities.getUtility('a11y');
      if (a11yUtil) {
        a11yUtil.announce(isZoomed ? 'Image zoomed in' : 'Image zoomed out');
      }
    }
  }

  cleanup() {
    // Remove window event listeners
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  // Public API
  get currentSlide() {
    return this.currentIndex;
  }

  get totalSlides() {
    return this.mediaItems.length;
  }

  goTo(index) {
    this.goToSlide(index);
  }

  next() {
    this.nextSlide();
  }

  previous() {
    this.previousSlide();
  }

  zoom() {
    const currentImage = this.querySelector('.media-gallery__current img');
    if (currentImage) {
      this.enterZoom(currentImage);
    }
  }

  unzoom() {
    this.exitZoom();
  }
}

// Register the custom element
if (!customElements.get('media-gallery')) {
  customElements.define('media-gallery', MediaGallery);
}

// Export for use in global scope
window.MediaGallery = MediaGallery;