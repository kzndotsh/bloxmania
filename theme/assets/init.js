// Simple initialization - just the essentials
(function() {
  'use strict';

  // Remove no-js class immediately
  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');

  // Simple cart notification fix
  function hideCartNotification() {
    const cartNotification = document.getElementById('cart-notification');
    if (cartNotification) {
      cartNotification.style.display = 'none';
      cartNotification.setAttribute('aria-hidden', 'true');
    }
  }

  // Run immediately if DOM is ready, otherwise wait
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideCartNotification);
  } else {
    hideCartNotification();
  }

})();