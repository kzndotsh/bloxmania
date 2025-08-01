// System Theme Editor Support for BloxMania Theme
// This file provides support for Shopify's theme editor functionality

(function () {
  "use strict";

  // Check if we're in theme editor mode
  if (!Shopify.designMode) {
    return;
  }

  // Theme editor specific functionality
  document.addEventListener("shopify:section:load", function (event) {
    // Reinitialize any section-specific JavaScript
    if (typeof window.initSectionScripts === "function") {
      window.initSectionScripts(event.target);
    }
  });

  document.addEventListener("shopify:section:unload", function (event) {
    // Clean up any section-specific JavaScript
    if (typeof window.cleanupSectionScripts === "function") {
      window.cleanupSectionScripts(event.target);
    }
  });

  document.addEventListener("shopify:section:select", function (event) {
    // Highlight the selected section
    event.target.classList.add("theme-editor-selected");
  });

  document.addEventListener("shopify:section:deselect", function (event) {
    // Remove highlight from the deselected section
    event.target.classList.remove("theme-editor-selected");
  });

  // Block editor events
  document.addEventListener("shopify:block:select", function (event) {});

  document.addEventListener("shopify:block:deselect", function (event) {});

  // Theme settings changes
  document.addEventListener("shopify:theme:change", function (event) {
    // Handle theme setting changes
    if (event.detail && event.detail.settings) {
      // Update any dynamic content based on settings
      updateThemeFromSettings(event.detail.settings);
    }
  });

  // Function to update theme based on settings
  function updateThemeFromSettings(settings) {
    // Example: Update color scheme
    if (settings.colors_accent) {
      document.documentElement.style.setProperty("--color-accent", settings.colors_accent);
    }

    // Example: Update typography
    if (settings.type_body_font) {
      document.documentElement.style.setProperty("--font-body", settings.type_body_font);
    }
  }

  // Add theme editor specific styles
  const style = document.createElement("style");
  style.textContent = `
    .theme-editor-selected {
      outline: 2px solid #007cba !important;
      outline-offset: 2px;
    }
    
    .theme-editor-selected * {
      pointer-events: none;
    }
    
    .theme-editor-selected:hover {
      outline-color: #005a87 !important;
    }
  `;
  document.head.appendChild(style);
})();
