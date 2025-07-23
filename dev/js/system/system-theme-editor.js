/**
 * BloxMania Theme Editor
 * Handles Shopify theme editor integration and customization
 */

class ThemeEditor {
  constructor() {
    this.isEditor = false;
    this.sections = new Map();
    this.blocks = new Map();
    this.init();
  }

  init() {
    this.detectEditor();
    this.setupEventListeners();
    this.initializeSections();
  }

  detectEditor() {
    // Check if we're in the Shopify theme editor
    this.isEditor =
      window.Shopify?.designMode === "design" ||
      document.body.classList.contains("shopify-design-mode") ||
      window.location.search.includes("preview_theme_id");

    if (this.isEditor) {
      document.documentElement.classList.add("theme-editor");
      console.log("BloxMania theme editor mode detected");
    }
  }

  setupEventListeners() {
    if (!this.isEditor) return;

    // Listen for section events
    document.addEventListener("shopify:section:load", (event) => {
      this.handleSectionLoad(event);
    });

    document.addEventListener("shopify:section:unload", (event) => {
      this.handleSectionUnload(event);
    });

    document.addEventListener("shopify:section:select", (event) => {
      this.handleSectionSelect(event);
    });

    document.addEventListener("shopify:section:deselect", (event) => {
      this.handleSectionDeselect(event);
    });

    // Listen for block events
    document.addEventListener("shopify:block:select", (event) => {
      this.handleBlockSelect(event);
    });

    document.addEventListener("shopify:block:deselect", (event) => {
      this.handleBlockDeselect(event);
    });

    // Listen for theme editor events
    document.addEventListener("shopify:theme:load", (event) => {
      this.handleThemeLoad(event);
    });

    // Listen for settings changes
    if (window.Shopify?.on) {
      window.Shopify.on("shopify:section:reorder", (event) => {
        this.handleSectionReorder(event);
      });
    }
  }

  initializeSections() {
    if (!this.isEditor) return;

    // Find all sections and initialize them
    const sections = document.querySelectorAll("[data-section-id]");
    sections.forEach((section) => {
      this.registerSection(section);
    });
  }

  registerSection(sectionElement) {
    const sectionId = sectionElement.dataset.sectionId;
    if (!sectionId) return;

    const section = {
      element: sectionElement,
      id: sectionId,
      type: sectionElement.dataset.sectionType,
      blocks: new Map(),
      initialized: false,
    };

    this.sections.set(sectionId, section);
    this.initializeSectionBlocks(section);

    console.log(`Section registered: ${sectionId} (${section.type})`);
  }

  initializeSectionBlocks(section) {
    const blocks = section.element.querySelectorAll("[data-block-id]");
    blocks.forEach((blockElement) => {
      const blockId = blockElement.dataset.blockId;
      if (!blockId) return;

      const block = {
        element: blockElement,
        id: blockId,
        type: blockElement.dataset.blockType,
        sectionId: section.id,
      };

      section.blocks.set(blockId, block);
      this.blocks.set(blockId, block);
    });
  }

  handleSectionLoad(event) {
    const sectionId = event.detail.sectionId;
    const sectionElement = event.target;

    console.log(`Section loaded: ${sectionId}`);

    // Register the new section
    this.registerSection(sectionElement);

    // Initialize section-specific functionality
    this.initializeSectionFunctionality(sectionId);

    // Trigger custom event for section-specific handling
    sectionElement.dispatchEvent(
      new CustomEvent("section:loaded", {
        detail: { sectionId, section: this.sections.get(sectionId) },
      }),
    );
  }

  handleSectionUnload(event) {
    const sectionId = event.detail.sectionId;

    console.log(`Section unloaded: ${sectionId}`);

    // Clean up section
    const section = this.sections.get(sectionId);
    if (section) {
      // Remove all blocks for this section
      section.blocks.forEach((block, blockId) => {
        this.blocks.delete(blockId);
      });

      this.sections.delete(sectionId);
    }
  }

  handleSectionSelect(event) {
    const sectionId = event.detail.sectionId;
    const section = this.sections.get(sectionId);

    if (section) {
      section.element.classList.add("section-selected");
      console.log(`Section selected: ${sectionId}`);

      // Trigger custom event
      section.element.dispatchEvent(
        new CustomEvent("section:selected", {
          detail: { sectionId, section },
        }),
      );
    }
  }

  handleSectionDeselect(event) {
    const sectionId = event.detail.sectionId;
    const section = this.sections.get(sectionId);

    if (section) {
      section.element.classList.remove("section-selected");
      console.log(`Section deselected: ${sectionId}`);

      // Trigger custom event
      section.element.dispatchEvent(
        new CustomEvent("section:deselected", {
          detail: { sectionId, section },
        }),
      );
    }
  }

  handleBlockSelect(event) {
    const blockId = event.detail.blockId;
    const block = this.blocks.get(blockId);

    if (block) {
      block.element.classList.add("block-selected");
      console.log(`Block selected: ${blockId}`);

      // Trigger custom event
      block.element.dispatchEvent(
        new CustomEvent("block:selected", {
          detail: { blockId, block },
        }),
      );
    }
  }

  handleBlockDeselect(event) {
    const blockId = event.detail.blockId;
    const block = this.blocks.get(blockId);

    if (block) {
      block.element.classList.remove("block-selected");
      console.log(`Block deselected: ${blockId}`);

      // Trigger custom event
      block.element.dispatchEvent(
        new CustomEvent("block:deselected", {
          detail: { blockId, block },
        }),
      );
    }
  }

  handleThemeLoad(event) {
    console.log("Theme loaded in editor");

    // Initialize all sections
    this.initializeSections();

    // Trigger custom event
    document.dispatchEvent(
      new CustomEvent("theme:editor:loaded", {
        detail: { sections: this.sections, blocks: this.blocks },
      }),
    );
  }

  handleSectionReorder(event) {
    console.log("Sections reordered:", event.detail);

    // Trigger custom event
    document.dispatchEvent(
      new CustomEvent("sections:reordered", {
        detail: event.detail,
      }),
    );
  }

  initializeSectionFunctionality(sectionId) {
    const section = this.sections.get(sectionId);
    if (!section || section.initialized) return;

    // Initialize based on section type
    switch (section.type) {
      case "hero":
        this.initializeHeroSection(section);
        break;
      case "featured-products":
        this.initializeFeaturedProductsSection(section);
        break;
      case "main-product":
        this.initializeProductSection(section);
        break;
      case "customer-reviews":
        this.initializeReviewsSection(section);
        break;
      case "faq":
        this.initializeFaqSection(section);
        break;
      default:
        // Generic initialization
        this.initializeGenericSection(section);
    }

    section.initialized = true;
  }

  initializeHeroSection(section) {
    // Hero section specific initialization
    const heroElement = section.element.querySelector(".hero");
    if (heroElement) {
      // Add editor-specific classes
      heroElement.classList.add("editor-hero");

      // Make background images editable
      const backgroundImages = heroElement.querySelectorAll("[data-background-image]");
      backgroundImages.forEach((img) => {
        img.classList.add("editor-editable");
      });
    }
  }

  initializeFeaturedProductsSection(section) {
    // Featured products section specific initialization
    const productGrid = section.element.querySelector(".product-grid");
    if (productGrid) {
      productGrid.classList.add("editor-product-grid");
    }
  }

  initializeProductSection(section) {
    // Product section specific initialization
    const productForm = section.element.querySelector("product-form");
    if (productForm) {
      productForm.classList.add("editor-product-form");
    }
  }

  initializeReviewsSection(section) {
    // Reviews section specific initialization
    const reviewsContainer = section.element.querySelector(".reviews-container");
    if (reviewsContainer) {
      reviewsContainer.classList.add("editor-reviews");
    }
  }

  initializeFaqSection(section) {
    // FAQ section specific initialization
    const faqItems = section.element.querySelectorAll(".faq-item");
    faqItems.forEach((item) => {
      item.classList.add("editor-faq-item");
    });
  }

  initializeGenericSection(section) {
    // Generic section initialization
    section.element.classList.add("editor-section");
  }

  // Utility methods for theme editor
  getSection(sectionId) {
    return this.sections.get(sectionId);
  }

  getBlock(blockId) {
    return this.blocks.get(blockId);
  }

  getAllSections() {
    return Array.from(this.sections.values());
  }

  getAllBlocks() {
    return Array.from(this.blocks.values());
  }

  isInEditor() {
    return this.isEditor;
  }

  // Method to refresh a section
  refreshSection(sectionId) {
    const section = this.sections.get(sectionId);
    if (section) {
      // Trigger section refresh
      section.element.dispatchEvent(
        new CustomEvent("section:refresh", {
          detail: { sectionId, section },
        }),
      );
    }
  }

  // Method to update section settings
  updateSectionSettings(sectionId, settings) {
    const section = this.sections.get(sectionId);
    if (section) {
      // Apply settings to section
      Object.entries(settings).forEach(([key, value]) => {
        section.element.style.setProperty(`--${key}`, value);
      });

      // Trigger settings update event
      section.element.dispatchEvent(
        new CustomEvent("section:settings:updated", {
          detail: { sectionId, section, settings },
        }),
      );
    }
  }

  // Cleanup method
  cleanup() {
    this.sections.clear();
    this.blocks.clear();
  }
}

// Initialize theme editor
const themeEditor = new ThemeEditor();

// Export for use in other modules
window.ThemeEditor = themeEditor;

// Add editor-specific styles
if (themeEditor.isInEditor()) {
  const editorStyles = document.createElement("style");
  editorStyles.textContent = `
    .theme-editor .section-selected {
      outline: 2px solid #ffd800;
      outline-offset: 2px;
    }
    
    .theme-editor .block-selected {
      outline: 2px solid #4791f0;
      outline-offset: 1px;
    }
    
    .theme-editor .editor-editable {
      cursor: pointer;
    }
    
    .theme-editor .editor-editable:hover {
      opacity: 0.8;
    }
    
    .theme-editor .editor-section {
      position: relative;
    }
    
    .theme-editor .editor-section::before {
      content: attr(data-section-type);
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
      z-index: 1000;
      border-radius: 0 0 4px 0;
    }
  `;
  document.head.appendChild(editorStyles);
}
