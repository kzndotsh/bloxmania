/**
 * BloxMania Theme Editor
 * Handles Shopify theme editor events and interactions
 * Following Dawn's patterns with BloxMania-specific functionality
 */

// Hide any open modals when theme editor events occur
function hideOpenModals() {
  // Hide product modals
  const productModals = document.querySelectorAll('product-modal[open], [data-modal][open]');
  productModals.forEach((modal) => {
    if (typeof modal.hide === 'function') {
      modal.hide();
    } else {
      modal.removeAttribute('open');
      modal.style.display = 'none';
    }
  });

  // Hide search modal
  const searchModal = document.querySelector('search-modal[open]');
  if (searchModal && typeof searchModal.close === 'function') {
    searchModal.close();
  }

  // Hide mobile menu
  const mobileMenu = document.querySelector('#mobile-menu');
  if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('flex');
    document.body.style.overflow = '';
  }

  // Hide cart notification
  const cartNotification = document.querySelector('#cart-notification');
  if (cartNotification) {
    cartNotification.style.display = 'none';
  }
}

// Handle block selection in theme editor
document.addEventListener('shopify:block:select', function (event) {
  hideOpenModals();
  
  // Handle slideshow/carousel block selection
  const blockSelectedIsSlide = event.target.classList.contains('slideshow__slide') || 
                               event.target.classList.contains('carousel__slide');
  
  if (blockSelectedIsSlide) {
    const parentCarousel = event.target.closest('slideshow-component, carousel-component');
    if (parentCarousel && typeof parentCarousel.pause === 'function') {
      parentCarousel.pause();
      
      // Scroll to selected slide
      setTimeout(() => {
        if (parentCarousel.slider) {
          parentCarousel.slider.scrollTo({
            left: event.target.offsetLeft,
            behavior: 'smooth'
          });
        }
      }, 200);
    }
  }

  // Handle creators carousel selection
  const isCreatorSlide = event.target.closest('.creators-carousel');
  if (isCreatorSlide) {
    // Pause any animations
    const carousel = event.target.closest('.creators-carousel');
    if (carousel) {
      carousel.style.animationPlayState = 'paused';
    }
  }
});

// Handle block deselection in theme editor
document.addEventListener('shopify:block:deselect', function (event) {
  const blockDeselectedIsSlide = event.target.classList.contains('slideshow__slide') || 
                                event.target.classList.contains('carousel__slide');
  
  if (blockDeselectedIsSlide) {
    const parentCarousel = event.target.closest('slideshow-component, carousel-component');
    if (parentCarousel && parentCarousel.autoplayButtonIsSetToPlay && typeof parentCarousel.play === 'function') {
      parentCarousel.play();
    }
  }

  // Resume creators carousel animation
  const isCreatorSlide = event.target.closest('.creators-carousel');
  if (isCreatorSlide) {
    const carousel = event.target.closest('.creators-carousel');
    if (carousel) {
      carousel.style.animationPlayState = 'running';
    }
  }
});

// Handle section loading in theme editor
document.addEventListener('shopify:section:load', (event) => {
  hideOpenModals();
  
  // Reinitialize components for newly loaded sections
  const sectionId = event.detail.sectionId;
  const section = document.querySelector(`[data-section-id="${sectionId}"]`);
  
  if (section) {
    // Reinitialize any JavaScript components in the loaded section
    initializeSectionComponents(section);
  }

  // Handle zoom functionality reload
  const zoomOnHoverScript = document.querySelector('[id^=EnableZoomOnHover]');
  if (zoomOnHoverScript) {
    const newScriptTag = document.createElement('script');
    newScriptTag.src = zoomOnHoverScript.src;
    zoomOnHoverScript.parentNode.replaceChild(newScriptTag, zoomOnHoverScript);
  }
});

// Handle section unloading in theme editor
document.addEventListener('shopify:section:unload', (event) => {
  const sectionId = event.detail.sectionId;
  
  // Remove any elements associated with the unloaded section
  document.querySelectorAll(`[data-section="${sectionId}"]`).forEach((element) => {
    element.remove();
  });
  
  // Clean up any section-specific event listeners or observers
  cleanupSectionComponents(sectionId);
  
  // Ensure body overflow is reset
  document.body.classList.remove('overflow-hidden');
  document.body.style.overflow = '';
});

// Handle section reordering
document.addEventListener('shopify:section:reorder', () => {
  hideOpenModals();
  
  // Reinitialize any global components that might be affected by reordering
  if (window.bloxManiaHeader) {
    window.bloxManiaHeader.refresh();
  }
});

// Handle section selection
document.addEventListener('shopify:section:select', () => {
  hideOpenModals();
});

// Handle section deselection
document.addEventListener('shopify:section:deselect', () => {
  hideOpenModals();
});

// Handle theme inspector activation
document.addEventListener('shopify:inspector:activate', () => {
  hideOpenModals();
  
  // Add inspector mode class for styling adjustments
  document.body.classList.add('shopify-inspector-active');
});

// Handle theme inspector deactivation
document.addEventListener('shopify:inspector:deactivate', () => {
  hideOpenModals();
  
  // Remove inspector mode class
  document.body.classList.remove('shopify-inspector-active');
});

// Initialize components in a newly loaded section
function initializeSectionComponents(section) {
  // Reinitialize lazy loading for images in the section
  const lazyImages = section.querySelectorAll('img[data-src]');
  if (lazyImages.length > 0 && window.BloxManiaTheme) {
    // Use existing lazy loading functionality
    lazyImages.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
    });
  }

  // Reinitialize any Web Components in the section
  const webComponents = section.querySelectorAll('product-form, search-modal, cart-notification');
  webComponents.forEach(component => {
    if (component.connectedCallback && typeof component.connectedCallback === 'function') {
      component.connectedCallback();
    }
  });

  // Reinitialize animations
  const animatedElements = section.querySelectorAll('.animate-fade-in-up, .animate-slide-in-left, .animate-slide-in-right');
  if (animatedElements.length > 0) {
    // Trigger animations for newly loaded content
    animatedElements.forEach(element => {
      element.classList.remove('animate-fade-in-up', 'animate-slide-in-left', 'animate-slide-in-right');
      // Force reflow
      element.offsetHeight;
      // Re-add animation class
      setTimeout(() => {
        element.classList.add('animate-fade-in-up');
      }, 100);
    });
  }
}

// Clean up components when a section is unloaded
function cleanupSectionComponents(sectionId) {
  // Clean up any observers or event listeners specific to the section
  if (window.sectionObservers && window.sectionObservers[sectionId]) {
    window.sectionObservers[sectionId].forEach(observer => {
      if (observer.disconnect) {
        observer.disconnect();
      }
    });
    delete window.sectionObservers[sectionId];
  }

  // Clean up any timers or intervals
  if (window.sectionTimers && window.sectionTimers[sectionId]) {
    window.sectionTimers[sectionId].forEach(timer => {
      clearTimeout(timer);
      clearInterval(timer);
    });
    delete window.sectionTimers[sectionId];
  }
}

// Export for global access
window.ThemeEditor = {
  hideOpenModals,
  initializeSectionComponents,
  cleanupSectionComponents
};