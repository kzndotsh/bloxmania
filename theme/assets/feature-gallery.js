/**
 * Media Gallery - Following Dawn's Web Component patterns
 * Handles product image galleries with thumbnails, zoom, and keyboard navigation
 */

// Only declare if not already declared
if (typeof MediaGallery === 'undefined') {
  class MediaGallery extends HTMLElement {
    constructor() {
      super();
      this.mainImage = null;
      this.thumbnails = [];
      this.currentIndex = 0;
      this.zoomEnabled = false;
    }

    connectedCallback() {
      this.mainImage = this.querySelector('.media-gallery__main-image');
      this.thumbnails = Array.from(
        this.querySelectorAll('.media-gallery__thumbnail')
      );

      this.setupThumbnails();
      this.setupZoom();
      this.setupKeyboardNavigation();
    }

    setupThumbnails() {
      this.thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => this.selectImage(index));
        thumbnail.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.selectImage(index);
          }
        });
      });
    }

    setupZoom() {
      if (!this.mainImage) return;

      this.mainImage.addEventListener('mouseenter', () => {
        this.zoomEnabled = true;
        this.mainImage.classList.add('media-gallery__main-image--zoom-enabled');
      });

      this.mainImage.addEventListener('mouseleave', () => {
        this.zoomEnabled = false;
        this.mainImage.classList.remove(
          'media-gallery__main-image--zoom-enabled'
        );
      });

      this.mainImage.addEventListener('mousemove', (e) => {
        if (!this.zoomEnabled) return;
        this.handleZoom(e);
      });
    }

    setupKeyboardNavigation() {
      this.addEventListener('keydown', (e) => {
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            this.previousImage();
            break;
          case 'ArrowRight':
            e.preventDefault();
            this.nextImage();
            break;
          case 'Home':
            e.preventDefault();
            this.selectImage(0);
            break;
          case 'End':
            e.preventDefault();
            this.selectImage(this.thumbnails.length - 1);
            break;
        }
      });
    }

    selectImage(index) {
      if (index < 0 || index >= this.thumbnails.length) return;

      // Update current index
      this.currentIndex = index;

      // Update main image
      const selectedThumbnail = this.thumbnails[index];
      const newImageSrc =
        selectedThumbnail.dataset.fullImage || selectedThumbnail.src;

      if (this.mainImage) {
        this.mainImage.src = newImageSrc;
        this.mainImage.alt = selectedThumbnail.alt || '';
      }

      // Update thumbnail states
      this.thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('media-gallery__thumbnail--active', i === index);
        thumb.setAttribute('aria-current', i === index ? 'true' : 'false');
      });

      // Update focus
      selectedThumbnail.focus();

      // Dispatch custom event
      this.dispatchEvent(
        new CustomEvent('media-gallery:image-changed', {
          detail: { index, imageSrc: newImageSrc },
        })
      );
    }

    previousImage() {
      const newIndex =
        this.currentIndex > 0
          ? this.currentIndex - 1
          : this.thumbnails.length - 1;
      this.selectImage(newIndex);
    }

    nextImage() {
      const newIndex =
        this.currentIndex < this.thumbnails.length - 1
          ? this.currentIndex + 1
          : 0;
      this.selectImage(newIndex);
    }

    handleZoom(e) {
      if (!this.mainImage) return;

      const rect = this.mainImage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      this.mainImage.style.transformOrigin = `${x * 100}% ${y * 100}%`;
    }
  }

  // Register the component
  if (!customElements.get('media-gallery')) {
    customElements.define('media-gallery', MediaGallery);
  }

  // Export for global scope
  window.MediaGallery = MediaGallery;
}
