/*
 * BloxMania Theme - MAIN Bundle
 * Generated: 2025-07-22T11:14:05.433Z
 * Mode: development
 */

(function() {
  'use strict';

  // Bundle: main
  const BUNDLE_NAME = 'main';
  const BUNDLE_VERSION = '1.0.0';

  // Bundle initialization
  if (window.BloxMania && window.BloxMania.bundles) {
    window.BloxMania.bundles[BUNDLE_NAME] = {
      version: BUNDLE_VERSION,
      loaded: true,
      timestamp: Date.now()
    };
  }

// Main application bundle
// This file loads all other bundles

// Load bundles sequentially for better performance
const loadBundle = function(src) {
  return new Promise(function(resolve, reject) {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// Load all bundles
Promise.all([
  loadBundle("core.bundle.js"),
  loadBundle("features.bundle.js"),
  loadBundle("ui.bundle.js"),
  loadBundle("helpers.bundle.js"),
  loadBundle("system.bundle.js")
]).then(function() {
  console.log("🚀 BloxMania theme loaded successfully!");
}).catch(function(error) {
  console.error("Failed to load theme bundles:", error);
});


  // Bundle completion
  if (window.BloxMania && window.BloxMania.bundles && window.BloxMania.bundles[BUNDLE_NAME]) {
    window.BloxMania.bundles[BUNDLE_NAME].initialized = true;
  }

  console.log(`✅ ${BUNDLE_NAME} bundle loaded`);
})();