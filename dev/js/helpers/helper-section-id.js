/**
 * Section ID Utility - Following Dawn's SectionId pattern
 * Manages section IDs and provides utilities for section-based operations
 */

// Only declare if not already declared
if (typeof SectionId === "undefined") {
  class SectionId {
    constructor(value) {
      this.value = value;
    }

    /**
     * Get section ID from element
     * @param {Element} element - Element to get section ID from
     * @returns {SectionId|null} - Section ID instance or null
     */
    static getIdForSection(element) {
      if (!element) return null;

      // Look for section ID in various ways
      const sectionId =
        element.dataset.sectionId ||
        element.id ||
        element.closest("[data-section-id]")?.dataset.sectionId ||
        element.closest("[id]")?.id;

      return sectionId ? new SectionId(sectionId) : null;
    }

    /**
     * Parse section ID from URL or string
     * @param {string} url - URL or string containing section ID
     * @returns {SectionId|null} - Section ID instance or null
     */
    static parseId(url) {
      if (!url) return null;

      // Extract section ID from various URL patterns
      const patterns = [/[?&]section_id=([^&]+)/, /[?&]sections=([^&]+)/, /#([^&?]+)/, /sections\/([^\/]+)/];

      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) {
          return new SectionId(match[1]);
        }
      }

      return null;
    }

    /**
     * Get section element by ID
     * @returns {Element|null} - Section element or null
     */
    getSection() {
      return document.getElementById(this.value) || document.querySelector(`[data-section-id="${this.value}"]`);
    }

    /**
     * Get section settings element
     * @returns {Element|null} - Section settings script element or null
     */
    getSettings() {
      const section = this.getSection();
      if (!section) return null;

      return section.querySelector('script[type="application/json"]');
    }

    /**
     * Parse section settings JSON
     * @returns {Object|null} - Parsed settings object or null
     */
    parseSettings() {
      const settingsElement = this.getSettings();
      if (!settingsElement) return null;

      try {
        return JSON.parse(settingsElement.textContent);
      } catch (error) {
        console.error("Error parsing section settings:", error);
        return null;
      }
    }

    /**
     * Update section settings
     * @param {Object} newSettings - New settings object
     */
    updateSettings(newSettings) {
      const settingsElement = this.getSettings();
      if (settingsElement) {
        settingsElement.textContent = JSON.stringify(newSettings);
      }
    }

    /**
     * Get all blocks within the section
     * @returns {NodeList} - List of block elements
     */
    getBlocks() {
      const section = this.getSection();
      return section ? section.querySelectorAll("[data-block-id]") : [];
    }

    /**
     * Get specific block by ID
     * @param {string} blockId - Block ID to find
     * @returns {Element|null} - Block element or null
     */
    getBlock(blockId) {
      const section = this.getSection();
      return section ? section.querySelector(`[data-block-id="${blockId}"]`) : null;
    }

    /**
     * Generate section URL with parameters
     * @param {Object} params - URL parameters
     * @returns {string} - Generated URL
     */
    generateUrl(params = {}) {
      const url = new URL(window.location.href);
      url.searchParams.set("section_id", this.value);

      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });

      return url.toString();
    }

    /**
     * Check if section exists in DOM
     * @returns {boolean} - Whether section exists
     */
    exists() {
      return !!this.getSection();
    }

    /**
     * Get section type from class or data attribute
     * @returns {string|null} - Section type or null
     */
    getType() {
      const section = this.getSection();
      if (!section) return null;

      return section.dataset.sectionType || section.className.match(/section--(\w+)/)?.[1] || null;
    }

    /**
     * Check if section is currently visible
     * @returns {boolean} - Whether section is visible
     */
    isVisible() {
      const section = this.getSection();
      if (!section) return false;

      const rect = section.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    }

    toString() {
      return this.value;
    }
  }

  // Static utility methods
  SectionId.getAllSections = function () {
    const sections = document.querySelectorAll('[data-section-id], [id^="shopify-section-"]');
    return Array.from(sections).map((section) => {
      const id = section.dataset.sectionId || section.id;
      return new SectionId(id);
    });
  };

  SectionId.getCurrentSection = function () {
    const hash = window.location.hash.slice(1);
    return hash ? new SectionId(hash) : null;
  };

  // Export for use in global scope
  window.SectionId = SectionId;

  // Export for module systems
  if (typeof module !== "undefined" && module.exports) {
    module.exports = SectionId;
  }
}
