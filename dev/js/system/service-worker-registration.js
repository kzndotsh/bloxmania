/**
 * Service Worker Registration
 * Registers the service worker for offline functionality
 */

(function () {
  "use strict";

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register("/assets/system-service-worker.js")
        .then(function (registration) {
          console.log("Service Worker registered successfully:", registration.scope);
        })
        .catch(function (error) {
          console.log("Service Worker registration failed:", error);
        });
    });
  }
})();
