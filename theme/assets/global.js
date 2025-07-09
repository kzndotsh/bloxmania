// BloxMania Theme - Global JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Header scroll effect
  const header = document.querySelector('.header-wrapper');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Mobile menu functionality
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');

  if (mobileMenuToggle && mobileMenu && mobileMenuClose) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    mobileMenuClose.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });

    // Close mobile menu when clicking outside
    mobileMenu.addEventListener('click', function(e) {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add to cart functionality
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const form = this.closest('form');
      if (form) {
        const submitButton = this;
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<span class="loading"></span> Adding...';
        submitButton.disabled = true;

        // Submit form
        fetch(form.action, {
          method: 'POST',
          body: new FormData(form)
        })
        .then(response => response.json())
        .then(data => {
          if (data.status === 200) {
            // Success
            submitButton.innerHTML = '✓ Added!';
            submitButton.style.background = '#10b981';
            
            // Update cart count
            updateCartCount();
            
            setTimeout(() => {
              submitButton.innerHTML = originalText;
              submitButton.style.background = '';
              submitButton.disabled = false;
            }, 2000);
          } else {
            // Error
            submitButton.innerHTML = 'Error';
            submitButton.style.background = '#ef4444';
            
            setTimeout(() => {
              submitButton.innerHTML = originalText;
              submitButton.style.background = '';
              submitButton.disabled = false;
            }, 2000);
          }
        })
        .catch(error => {
          console.error('Error:', error);
          submitButton.innerHTML = 'Error';
          submitButton.style.background = '#ef4444';
          
          setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.style.background = '';
            submitButton.disabled = false;
          }, 2000);
        });
      }
    });
  });

  // Update cart count
  function updateCartCount() {
    fetch('/cart.js')
      .then(response => response.json())
      .then(cart => {
        const cartCountElements = document.querySelectorAll('.cart-count');
        cartCountElements.forEach(element => {
          element.textContent = cart.item_count;
        });
      })
      .catch(error => console.error('Error updating cart count:', error));
  }

  // Newsletter form submission
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      
      submitButton.textContent = 'Subscribing...';
      submitButton.disabled = true;
      
      // Form will be handled by Shopify's customer form
      // This is just for UI feedback
      setTimeout(() => {
        submitButton.textContent = 'Subscribed!';
        submitButton.style.background = '#10b981';
        
        setTimeout(() => {
          submitButton.textContent = originalText;
          submitButton.style.background = '';
          submitButton.disabled = false;
        }, 2000);
      }, 1000);
    });
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.product-card, .feature-card, .hero-content').forEach(el => {
    observer.observe(el);
  });

  // Product image lazy loading
  const productImages = document.querySelectorAll('.product-image[data-src]');
  const imageObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  productImages.forEach(img => imageObserver.observe(img));

  // Search functionality
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
      clearTimeout(searchTimeout);
      const query = this.value.trim();
      
      if (query.length >= 2) {
        searchTimeout = setTimeout(() => {
          performSearch(query);
        }, 300);
      }
    });
  }

  function performSearch(query) {
    fetch(`/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product`)
      .then(response => response.json())
      .then(data => {
        // Handle search results
        console.log('Search results:', data);
      })
      .catch(error => console.error('Search error:', error));
  }

  // Theme settings
  const themeSettings = {
    primaryColor: getComputedStyle(document.documentElement).getPropertyValue('--primary-color') || '#ffd800',
    secondaryColor: getComputedStyle(document.documentElement).getPropertyValue('--secondary-color') || '#4791f0'
  };

  // Utility functions
  window.BloxManiaTheme = {
    updateCartCount: updateCartCount,
    themeSettings: themeSettings,
    
    // Show notification
    showNotification: function(message, type = 'success') {
      const notification = document.createElement('div');
      notification.className = `notification notification-${type}`;
      notification.textContent = message;
      
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.classList.add('show');
      }, 100);
      
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 3000);
    },
    
    // Format price
    formatPrice: function(price, currency = 'USD') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
      }).format(price);
    }
  };

  // Add notification styles
  const notificationStyles = document.createElement('style');
  notificationStyles.textContent = `
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      color: white;
      font-weight: 600;
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    }
    
    .notification.show {
      transform: translateX(0);
    }
    
    .notification-success {
      background: #10b981;
    }
    
    .notification-error {
      background: #ef4444;
    }
    
    .notification-warning {
      background: #f59e0b;
    }
  `;
  document.head.appendChild(notificationStyles);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    document.body.classList.add('page-hidden');
  } else {
    document.body.classList.remove('page-hidden');
  }
});

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function() {
    // Trigger resize event for any components that need it
    window.dispatchEvent(new CustomEvent('themeResize'));
  }, 250);
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.BloxManiaTheme;
}