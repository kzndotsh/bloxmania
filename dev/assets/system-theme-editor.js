// System Theme Editor Support for BloxMania Theme
// This file provides support for Shopify's theme editor functionality

(function () {
  "use strict";

  // Check if we're in theme editor mode
  if (!Shopify.designMode) {
    return;
  }

  console.log("BloxMania Theme Editor Support Loaded");

  // Theme editor specific functionality
  document.addEventListener("shopify:section:load", function (event) {
    console.log("Section loaded:", event.target);

    // Reinitialize any section-specific JavaScript
    if (typeof window.initSectionScripts === "function") {
      window.initSectionScripts(event.target);
    }
  });

  document.addEventListener("shopify:section:unload", function (event) {
    console.log("Section unloaded:", event.target);

    // Clean up any section-specific JavaScript
    if (typeof window.cleanupSectionScripts === "function") {
      window.cleanupSectionScripts(event.target);
    }
  });

  document.addEventListener("shopify:section:select", function (event) {
    console.log("Section selected:", event.target);

    // Highlight the selected section
    event.target.classList.add("theme-editor-selected");
  });

  document.addEventListener("shopify:section:deselect", function (event) {
    console.log("Section deselected:", event.target);

    // Remove highlight from the deselected section
    event.target.classList.remove("theme-editor-selected");
  });

  // Block editor events
  document.addEventListener("shopify:block:select", function (event) {
    console.log("Block selected:", event.target);
  });

  document.addEventListener("shopify:block:deselect", function (event) {
    console.log("Block deselected:", event.target);
  });

  // Theme settings changes
  document.addEventListener("shopify:theme:change", function (event) {
    console.log("Theme settings changed:", event.detail);

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
