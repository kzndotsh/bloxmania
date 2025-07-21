/*
 * BloxMania Theme - HELPERS Bundle
 * Generated: 2025-07-21T06:12:34.944Z
 * Mode: development
 */

(function() {
  'use strict';

  // Bundle: helpers
  const BUNDLE_NAME = 'helpers';
  const BUNDLE_VERSION = '1.0.0';

  // Bundle initialization
  if (window.BloxMania && window.BloxMania.bundles) {
    window.BloxMania.bundles[BUNDLE_NAME] = {
      version: BUNDLE_VERSION,
      loaded: true,
      timestamp: Date.now()
    };
  }


// helper-section-id.js
/**
 * Section ID Utility - Following Dawn's SectionId pattern
 * Manages section IDs and provides utilities for section-based operations
 */

// Only declare if not already declared
if (typeof SectionId === 'undefined') {
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
        element.closest('[data-section-id]')?.dataset.sectionId ||
        element.closest('[id]')?.id;

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
      const patterns = [
        /[?&]section_id=([^&]+)/,
        /[?&]sections=([^&]+)/,
        /#([^&?]+)/,
        /sections\/([^\/]+)/,
      ];

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
      return (
        document.getElementById(this.value) ||
        document.querySelector(`[data-section-id="${this.value}"]`)
      );
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
        console.error('Error parsing section settings:', error);
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
      return section ? section.querySelectorAll('[data-block-id]') : [];
    }

    /**
     * Get specific block by ID
     * @param {string} blockId - Block ID to find
     * @returns {Element|null} - Block element or null
     */
    getBlock(blockId) {
      const section = this.getSection();
      return section
        ? section.querySelector(`[data-block-id="${blockId}"]`)
        : null;
    }

    /**
     * Generate section URL with parameters
     * @param {Object} params - URL parameters
     * @returns {string} - Generated URL
     */
    generateUrl(params = {}) {
      const url = new URL(window.location.href);
      url.searchParams.set('section_id', this.value);

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

      return (
        section.dataset.sectionType ||
        section.className.match(/section--(\w+)/)?.[1] ||
        null
      );
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
    const sections = document.querySelectorAll(
      '[data-section-id], [id^="shopify-section-"]'
    );
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
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = SectionId;
  }
}



// helper-html-update.js
/**
 * HTML Update Utility - Following Dawn's HTMLUpdateUtility pattern
 * Handles dynamic HTML updates with proper script execution and event handling
 */

// Only declare if not already declared
if (typeof HTMLUpdateUtility === 'undefined') {
  class HTMLUpdateUtility {
    /**
     * Update HTML content with proper script execution
     * @param {Element} targetElement - Element to update
     * @param {string} newHTML - New HTML content
     * @param {Object} options - Update options
     */
    static updateHTML(targetElement, newHTML, options = {}) {
      const {
        executeScripts = true,
        preserveScroll = false,
        focusElement = null,
        onComplete = null,
      } = options;

      // Preserve scroll position if requested
      const scrollPosition = preserveScroll
        ? {
            x: window.scrollX,
            y: window.scrollY,
          }
        : null;

      // Create temporary container
      const tempContainer = document.createElement('div');
      tempContainer.innerHTML = newHTML;

      // Extract and handle scripts
      const scripts = tempContainer.querySelectorAll('script');
      const scriptPromises = [];

      if (executeScripts) {
        scripts.forEach((script) => {
          const newScript = document.createElement('script');

          // Copy attributes
          Array.from(script.attributes).forEach((attr) => {
            newScript.setAttribute(attr.name, attr.value);
          });

          // Handle inline scripts
          if (!script.src) {
            newScript.textContent = script.textContent;
          }

          // Create promise for script loading
          if (script.src) {
            const promise = new Promise((resolve, reject) => {
              newScript.onload = resolve;
              newScript.onerror = reject;
            });
            scriptPromises.push(promise);
          }

          // Replace old script with new one
          script.parentNode.replaceChild(newScript, script);
        });
      }

      // Update the target element
      targetElement.innerHTML = tempContainer.innerHTML;

      // Wait for scripts to load
      Promise.all(scriptPromises)
        .then(() => {
          // Restore scroll position
          if (scrollPosition) {
            window.scrollTo(scrollPosition.x, scrollPosition.y);
          }

          // Focus element if specified
          if (focusElement) {
            const elementToFocus =
              typeof focusElement === 'string'
                ? targetElement.querySelector(focusElement)
                : focusElement;

            if (elementToFocus) {
              elementToFocus.focus();
            }
          }

          // Execute completion callback
          if (onComplete) {
            onComplete(targetElement);
          }

          // Dispatch custom event
          targetElement.dispatchEvent(
            new CustomEvent('html:updated', {
              detail: { targetElement, newHTML },
            })
          );
        })
        .catch((error) => {
          console.error('Error loading scripts during HTML update:', error);
        });
    }

    /**
     * Update specific sections of the page (Dawn pattern)
     * @param {Object} sections - Object with section IDs as keys and HTML as values
     * @param {Object} options - Update options
     */
    static updateSections(sections, options = {}) {
      Object.entries(sections).forEach(([sectionId, html]) => {
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
          this.updateHTML(targetElement, html, options);
        }
      });
    }

    /**
     * Safely parse HTML string
     * @param {string} htmlString - HTML string to parse
     * @returns {DocumentFragment} - Parsed document fragment
     */
    static parseHTML(htmlString) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, 'text/html');
      const fragment = document.createDocumentFragment();

      // Move all body children to fragment
      while (doc.body.firstChild) {
        fragment.appendChild(doc.body.firstChild);
      }

      return fragment;
    }

    /**
     * Extract specific element from HTML string
     * @param {string} htmlString - HTML string
     * @param {string} selector - CSS selector
     * @returns {Element|null} - Found element or null
     */
    static extractElement(htmlString, selector) {
      const tempContainer = document.createElement('div');
      tempContainer.innerHTML = htmlString;
      return tempContainer.querySelector(selector);
    }

    /**
     * Merge HTML attributes from source to target
     * @param {Element} target - Target element
     * @param {Element} source - Source element
     * @param {Array} excludeAttributes - Attributes to exclude from merge
     */
    static mergeAttributes(
      target,
      source,
      excludeAttributes = ['id', 'class']
    ) {
      Array.from(source.attributes).forEach((attr) => {
        if (!excludeAttributes.includes(attr.name)) {
          target.setAttribute(attr.name, attr.value);
        }
      });
    }
  }

  // Export for use in global scope
  window.HTMLUpdateUtility = HTMLUpdateUtility;

  // Export for module systems
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = HTMLUpdateUtility;
  }
}



// helper-screen-reader.js
/**
 * Screen Reader Optimization
 * Enhances the theme for screen readers and assistive technology
 */

class ScreenReaderOptimization {
  constructor() {
    this.liveRegions = new Map();
    this.readingOrder = [];
    this.currentAnnouncement = null;
    
    this.init();
  }

  /**
   * Initialize screen reader optimizations
   */
  init() {
    this.setupLiveRegions();
    this.optimizeImages();
    this.optimizeLinks();
    this.optimizeForms();
    this.optimizeButtons();
    this.optimizeHeadings();
    this.optimizeNavigation();
    this.optimizeTables();
    this.optimizeContent();
    this.setupDynamicContentAnnouncements();
  }

  /**
   * Setup live regions for dynamic content (uses AccessibilityUtils)
   */
  setupLiveRegions() {
    // Use AccessibilityUtils for basic live region setup
    if (window.AccessibilityUtils) {
      // AccessibilityUtils handles the main announcement region
      // We only need to add additional specialized regions
      
      // Create status region for status updates
      if (!document.getElementById('sr-status')) {
        const statusRegion = document.createElement('div');
        statusRegion.id = 'sr-status';
        statusRegion.className = 'sr-only';
        statusRegion.setAttribute('role', 'status');
        statusRegion.setAttribute('aria-live', 'polite');
        document.body.appendChild(statusRegion);
        this.liveRegions.set('status', statusRegion);
      }
    }
  }

  /**
   * Optimize images for screen readers
   */
  optimizeImages() {
    document.querySelectorAll('img').forEach(img => {
      // Add missing alt attributes
      if (!img.hasAttribute('alt')) {
        // Try to get alt text from various sources
        const altText = this.generateAltText(img);
        img.alt = altText;
      }

      // Handle decorative images
      if (img.alt === '' || img.hasAttribute('data-decorative')) {
        img.setAttribute('role', 'presentation');
        img.setAttribute('aria-hidden', 'true');
      }

      // Add loading announcements for lazy-loaded images
      if (img.hasAttribute('loading') && img.loading === 'lazy') {
        img.addEventListener('load', () => {
          if (img.alt && img.alt !== '') {
            this.announce(`Image loaded: ${img.alt}`, 'polite');
          }
        });
      }
    });

    // Handle background images
    document.querySelectorAll('[style*=\"background-image\"], [data-bg-image]').forEach(element => {
      const bgImage = element.style.backgroundImage || element.dataset.bgImage;
      if (bgImage && !element.hasAttribute('role')) {
        // Add appropriate role and description
        element.setAttribute('role', 'img');
        
        const altText = element.dataset.bgAlt || 'Background image';
        element.setAttribute('aria-label', altText);
      }
    });
  }

  /**
   * Optimize links for screen readers
   */
  optimizeLinks() {
    document.querySelectorAll('a').forEach(link => {
      // Add context to ambiguous links
      if (this.isAmbiguousLink(link)) {
        this.enhanceLinkContext(link);
      }

      // Handle external links
      if (this.isExternalLink(link)) {
        this.markExternalLink(link);
      }

      // Handle download links
      if (link.hasAttribute('download') || this.isDownloadLink(link)) {
        this.markDownloadLink(link);
      }

      // Handle links that open in new window
      if (link.target === '_blank') {
        this.markNewWindowLink(link);
      }

      // Handle skip links
      if (link.classList.contains('skip-link') || link.href.startsWith('#')) {
        this.optimizeSkipLink(link);
      }
    });
  }

  /**
   * Optimize forms for screen readers
   */
  optimizeForms() {
    document.querySelectorAll('form').forEach(form => {
      // Add form description if missing
      if (!form.hasAttribute('aria-label') && !form.hasAttribute('aria-labelledby')) {
        const heading = form.querySelector('h1, h2, h3, h4, h5, h6');
        if (heading) {
          if (!heading.id) {
            heading.id = this.generateId('form-heading');
          }
          form.setAttribute('aria-labelledby', heading.id);
        }
      }

      // Optimize form fields
      form.querySelectorAll('input, select, textarea').forEach(field => {
        this.optimizeFormField(field);
      });

      // Add form submission feedback
      form.addEventListener('submit', () => {
        this.announce('Form submitted. Please wait...', 'assertive');
      });
    });
  }

  /**
   * Optimize buttons for screen readers
   */
  optimizeButtons() {
    document.querySelectorAll('button').forEach(button => {
      // Add button type if missing
      if (!button.hasAttribute('type')) {
        button.setAttribute('type', 'button');
      }

      // Enhance icon-only buttons
      if (this.isIconOnlyButton(button)) {
        this.enhanceIconButton(button);
      }

      // Add loading state announcements
      if (button.hasAttribute('data-loading-text')) {
        this.setupButtonLoadingAnnouncement(button);
      }

      // Handle toggle buttons
      if (button.hasAttribute('aria-pressed')) {
        this.setupToggleButtonAnnouncement(button);
      }
    });
  }

  /**
   * Optimize headings for screen readers
   */
  optimizeHeadings() {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    // Check heading hierarchy
    let previousLevel = 0;
    headings.forEach(heading => {
      const currentLevel = parseInt(heading.tagName.charAt(1));
      
      // Warn about skipped heading levels (for development)
      if (currentLevel > previousLevel + 1) {
        console.warn(`Heading level skipped: ${heading.tagName} after h${previousLevel}`, heading);
      }
      
      previousLevel = currentLevel;

      // Add IDs to headings for navigation
      if (!heading.id) {
        heading.id = this.generateId('heading');
      }
    });

    // Create heading navigation
    this.createHeadingNavigation(headings);
  }

  /**
   * Optimize navigation for screen readers
   */
  optimizeNavigation() {
    document.querySelectorAll('nav').forEach(nav => {
      // Add navigation labels
      if (!nav.hasAttribute('aria-label') && !nav.hasAttribute('aria-labelledby')) {
        const label = this.generateNavigationLabel(nav);
        nav.setAttribute('aria-label', label);
      }

      // Optimize navigation lists
      const lists = nav.querySelectorAll('ul, ol');
      lists.forEach(list => {
        if (!list.hasAttribute('role')) {
          list.setAttribute('role', 'list');
        }
      });

      // Mark current page in navigation
      const currentLink = nav.querySelector('a[aria-current], .current, .active');
      if (currentLink && !currentLink.hasAttribute('aria-current')) {
        currentLink.setAttribute('aria-current', 'page');
      }
    });
  }

  /**
   * Optimize tables for screen readers
   */
  optimizeTables() {
    document.querySelectorAll('table').forEach(table => {
      // Add table caption if missing
      if (!table.querySelector('caption') && !table.hasAttribute('aria-label')) {
        const caption = this.generateTableCaption(table);
        if (caption) {
          const captionElement = document.createElement('caption');
          captionElement.textContent = caption;
          table.insertBefore(captionElement, table.firstChild);
        }
      }

      // Add scope attributes to headers
      table.querySelectorAll('th').forEach(th => {
        if (!th.hasAttribute('scope')) {
          // Determine scope based on position
          const scope = this.determineHeaderScope(th, table);
          th.setAttribute('scope', scope);
        }
      });

      // Add table summary for complex tables
      if (this.isComplexTable(table)) {
        this.addTableSummary(table);
      }
    });
  }

  /**
   * Optimize content for screen readers
   */
  optimizeContent() {
    // Handle abbreviations
    document.querySelectorAll('abbr').forEach(abbr => {
      if (!abbr.hasAttribute('title') && abbr.dataset.expansion) {
        abbr.setAttribute('title', abbr.dataset.expansion);
      }
    });

    // Handle quotes
    document.querySelectorAll('blockquote').forEach(quote => {
      if (!quote.hasAttribute('role')) {
        quote.setAttribute('role', 'blockquote');
      }
    });

    // Handle code blocks
    document.querySelectorAll('pre, code').forEach(code => {
      if (!code.hasAttribute('role')) {
        code.setAttribute('role', 'code');
      }
    });

    // Handle lists
    document.querySelectorAll('ul, ol').forEach(list => {
      if (!list.hasAttribute('role') && !list.closest('nav')) {
        list.setAttribute('role', 'list');
      }
    });
  }

  /**
   * Setup dynamic content announcements
   */
  setupDynamicContentAnnouncements() {
    // Cart updates
    document.addEventListener('cart:updated', (event) => {
      const { itemCount, total } = event.detail;
      this.announce(`Cart updated. ${itemCount} items, total ${total}`, 'polite');
    });

    // Search results
    document.addEventListener('search:results', (event) => {
      const { count, query } = event.detail;
      this.announce(`${count} results found for \"${query}\"`, 'polite');
    });

    // Form validation
    document.addEventListener('form:error', (event) => {
      const { message } = event.detail;
      this.announce(`Error: ${message}`, 'assertive');
    });

    // Loading states
    document.addEventListener('loading:start', (event) => {
      const { message } = event.detail;
      this.announce(message || 'Loading...', 'polite');
    });

    document.addEventListener('loading:complete', (event) => {
      const { message } = event.detail;
      this.announce(message || 'Loading complete', 'polite');
    });
  }

  /**
   * Generate alt text for images
   */
  generateAltText(img) {
    // Try various sources for alt text
    const sources = [
      img.dataset.alt,
      img.title,
      img.getAttribute('aria-label'),
      img.closest('figure')?.querySelector('figcaption')?.textContent,
      img.closest('a')?.getAttribute('aria-label'),
      img.closest('a')?.title
    ];

    for (const source of sources) {
      if (source && source.trim()) {
        return source.trim();
      }
    }

    // If no alt text found, return empty string for decorative images
    return '';
  }

  /**
   * Check if link is ambiguous
   */
  isAmbiguousLink(link) {
    const ambiguousTexts = ['click here', 'read more', 'learn more', 'more', 'here'];
    const linkText = link.textContent.trim().toLowerCase();
    return ambiguousTexts.includes(linkText);
  }

  /**
   * Enhance link context
   */
  enhanceLinkContext(link) {
    // Try to find context from surrounding content
    const context = this.findLinkContext(link);
    if (context) {
      const existingLabel = link.getAttribute('aria-label') || '';
      const enhancedLabel = existingLabel ? `${existingLabel} - ${context}` : context;
      link.setAttribute('aria-label', enhancedLabel);
    }
  }

  /**
   * Find context for a link
   */
  findLinkContext(link) {
    // Look for context in various places
    const contexts = [
      link.closest('article')?.querySelector('h1, h2, h3')?.textContent,
      link.closest('.card')?.querySelector('.card-title, h1, h2, h3')?.textContent,
      link.closest('li')?.textContent?.replace(link.textContent, '').trim(),
      link.previousElementSibling?.textContent
    ];

    for (const context of contexts) {
      if (context && context.trim() && context.length > 3) {
        return context.trim().substring(0, 100);
      }
    }

    return null;
  }

  /**
   * Check if link is external
   */
  isExternalLink(link) {
    return link.hostname && link.hostname !== window.location.hostname;
  }

  /**
   * Mark external link
   */
  markExternalLink(link) {
    const existingLabel = link.getAttribute('aria-label') || link.textContent;
    link.setAttribute('aria-label', `${existingLabel} (external link)`);
    
    // Add visual indicator
    if (!link.querySelector('.external-icon')) {
      const icon = document.createElement('span');
      icon.className = 'external-icon sr-only';
      icon.textContent = ' (external link)';
      link.appendChild(icon);
    }
  }

  /**
   * Check if link is download
   */
  isDownloadLink(link) {
    const downloadExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.zip', '.rar'];
    return downloadExtensions.some(ext => link.href.toLowerCase().includes(ext));
  }

  /**
   * Mark download link
   */
  markDownloadLink(link) {
    const existingLabel = link.getAttribute('aria-label') || link.textContent;
    link.setAttribute('aria-label', `${existingLabel} (download)`);
  }

  /**
   * Mark new window link
   */
  markNewWindowLink(link) {
    const existingLabel = link.getAttribute('aria-label') || link.textContent;
    link.setAttribute('aria-label', `${existingLabel} (opens in new window)`);
  }

  /**
   * Optimize skip link
   */
  optimizeSkipLink(link) {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        // Ensure target is focusable
        if (!target.hasAttribute('tabindex')) {
          target.setAttribute('tabindex', '-1');
        }
        
        // Focus target after navigation
        setTimeout(() => {
          target.focus();
          this.announce(`Skipped to ${target.textContent || target.getAttribute('aria-label') || 'content'}`, 'polite');
        }, 100);
      }
    });
  }

  /**
   * Optimize form field
   */
  optimizeFormField(field) {
    // Ensure proper labeling
    if (!field.hasAttribute('aria-label') && !field.hasAttribute('aria-labelledby')) {
      const label = field.closest('.form-group, .input-group')?.querySelector('label');
      if (label) {
        if (!label.id) {
          label.id = this.generateId('label');
        }
        field.setAttribute('aria-labelledby', label.id);
      }
    }

    // Add required field announcements
    if (field.hasAttribute('required')) {
      field.setAttribute('aria-required', 'true');
    }

    // Add validation announcements
    field.addEventListener('invalid', () => {
      this.announce(`Error in ${this.getFieldLabel(field)}: ${field.validationMessage}`, 'assertive');
    });
  }

  /**
   * Check if button is icon-only
   */
  isIconOnlyButton(button) {
    const text = button.textContent.trim();
    const hasIcon = button.querySelector('svg, .icon, [class*=\"icon\"]');
    return hasIcon && (!text || text.length < 3);
  }

  /**
   * Enhance icon button
   */
  enhanceIconButton(button) {
    if (!button.hasAttribute('aria-label')) {
      const label = this.generateIconButtonLabel(button);
      if (label) {
        button.setAttribute('aria-label', label);
      }
    }
  }

  /**
   * Generate icon button label
   */
  generateIconButtonLabel(button) {
    // Try various sources for button label
    const sources = [
      button.title,
      button.dataset.label,
      button.closest('[data-tooltip]')?.dataset.tooltip,
      button.className.includes('cart') ? 'Shopping cart' : null,
      button.className.includes('search') ? 'Search' : null,
      button.className.includes('menu') ? 'Menu' : null,
      button.className.includes('close') ? 'Close' : null
    ];

    for (const source of sources) {
      if (source && source.trim()) {
        return source.trim();
      }
    }

    return 'Button';
  }

  /**
   * Announce message to screen readers (uses AccessibilityUtils)
   */
  announce(message, priority = 'polite') {
    // Use AccessibilityUtils for announcements if available
    if (window.AccessibilityUtils && window.AccessibilityUtils.announce) {
      window.AccessibilityUtils.announce(message, priority);
    } else {
      // Fallback to direct announcement
      const announcer = document.getElementById('sr-announcements');
      if (announcer) {
        announcer.textContent = '';
        setTimeout(() => {
          announcer.textContent = message;
        }, 100);
      }
    }
  }

  /**
   * Generate unique ID
   */
  generateId(prefix = 'sr') {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get field label text
   */
  getFieldLabel(field) {
    const label = document.querySelector(`label[for="${field.id}"]`) || 
                  field.closest('.form-group, .input-group')?.querySelector('label');
    return label?.textContent || field.name || field.placeholder || 'Field';
  }

  /**
   * Generate navigation label
   */
  generateNavigationLabel(nav) {
    if (nav.closest('header')) return 'Main navigation';
    if (nav.closest('footer')) return 'Footer navigation';
    if (nav.classList.contains('breadcrumb')) return 'Breadcrumb navigation';
    return 'Navigation';
  }

  /**
   * Create heading navigation
   */
  createHeadingNavigation(headings) {
    if (headings.length < 3) return; // Only create for pages with multiple headings

    const nav = document.createElement('nav');
    nav.className = 'heading-navigation sr-only';
    nav.setAttribute('aria-label', 'Page headings');
    
    const list = document.createElement('ul');
    headings.forEach(heading => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;
      item.appendChild(link);
      list.appendChild(item);
    });
    
    nav.appendChild(list);
    document.body.insertBefore(nav, document.body.firstChild);
  }

  /**
   * Generate table caption
   */
  generateTableCaption(table) {
    const headings = table.querySelectorAll('th');
    if (headings.length > 0) {
      return `Table with ${headings.length} columns`;
    }
    return 'Data table';
  }

  /**
   * Determine header scope
   */
  determineHeaderScope(th, table) {
    const row = th.closest('tr');
    const rowIndex = Array.from(table.rows).indexOf(row);
    const cellIndex = Array.from(row.cells).indexOf(th);
    
    // First row headers are usually column headers
    if (rowIndex === 0) return 'col';
    
    // First column headers are usually row headers
    if (cellIndex === 0) return 'row';
    
    return 'col'; // Default to column
  }

  /**
   * Check if table is complex
   */
  isComplexTable(table) {
    return table.querySelectorAll('th').length > 6 || 
           table.rows.length > 10 ||
           table.querySelector('thead, tbody, tfoot');
  }

  /**
   * Add table summary
   */
  addTableSummary(table) {
    if (!table.hasAttribute('aria-describedby')) {
      const summary = document.createElement('div');
      summary.id = this.generateId('table-summary');
      summary.className = 'sr-only';
      summary.textContent = this.generateTableSummary(table);
      
      table.parentNode.insertBefore(summary, table);
      table.setAttribute('aria-describedby', summary.id);
    }
  }

  /**
   * Generate table summary
   */
  generateTableSummary(table) {
    const rows = table.rows.length;
    const cols = table.rows[0]?.cells.length || 0;
    return `Complex table with ${rows} rows and ${cols} columns. Use arrow keys to navigate.`;
  }
}

// Initialize screen reader optimization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.screenReaderOptimization = new ScreenReaderOptimization();
  });
} else {
  window.screenReaderOptimization = new ScreenReaderOptimization();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ScreenReaderOptimization;
}


// helper-accessibility.js
/**
 * Accessibility Utilities
 * Enhances theme accessibility with focus management, ARIA support, and keyboard navigation
 */

class AccessibilityUtils {
  constructor() {
    // Use DOMUtils for consistent focusable element selection
    this.init();
  }

  /**
   * Initialize accessibility enhancements
   */
  init() {
    this.setupSkipLinks();
    this.setupFocusRing();
    this.setupKeyboardNavigation();
    this.setupScreenReaderAnnouncements();
    this.enhanceExistingElements();
  }

  /**
   * Setup skip links for keyboard navigation - DISABLED
   */
  setupSkipLinks() {
    // Skip links disabled for now
    return;
  }

  /**
   * Setup focus ring for keyboard navigation
   */
  setupFocusRing() {
    // Add class to body when using keyboard navigation
    document.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        document.body.classList.add("keyboard-focus");
      }
    });

    // Remove class when using mouse
    document.addEventListener("mousedown", () => {
      document.body.classList.remove("keyboard-focus");
    });
  }

  /**
   * Setup keyboard navigation for interactive elements
   */
  setupKeyboardNavigation() {
    // Add keyboard navigation to dropdowns
    document
      .querySelectorAll('.dropdown, [aria-haspopup="true"]')
      .forEach((dropdown) => {
        if (dropdown.hasAttribute("data-keyboard-nav")) return;
        dropdown.setAttribute("data-keyboard-nav", "true");

        const trigger = dropdown.querySelector("button, [aria-expanded]");
        const menu = dropdown.querySelector('[role="menu"], .dropdown-menu');

        if (!trigger || !menu) return;

        // Ensure proper ARIA attributes
        if (!trigger.hasAttribute("aria-expanded")) {
          trigger.setAttribute("aria-expanded", "false");
        }

        if (!trigger.hasAttribute("aria-haspopup")) {
          trigger.setAttribute("aria-haspopup", "true");
        }

        if (!menu.hasAttribute("role")) {
          menu.setAttribute("role", "menu");
        }

        // Get menu items
        const menuItems = menu.querySelectorAll('a, button, [role="menuitem"]');
        menuItems.forEach((item) => {
          if (!item.hasAttribute("role")) {
            item.setAttribute("role", "menuitem");
          }
          if (!item.hasAttribute("tabindex")) {
            item.setAttribute("tabindex", "-1");
          }
        });

        // Handle keyboard navigation
        trigger.addEventListener("keydown", (event) => {
          if (
            event.key === "ArrowDown" ||
            event.key === "Enter" ||
            event.key === " "
          ) {
            event.preventDefault();
            trigger.setAttribute("aria-expanded", "true");
            menuItems[0]?.focus();
          }
        });

        menu.addEventListener("keydown", (event) => {
          const currentIndex = Array.from(menuItems).indexOf(
            document.activeElement
          );

          switch (event.key) {
            case "ArrowDown":
              event.preventDefault();
              if (currentIndex < menuItems.length - 1) {
                menuItems[currentIndex + 1].focus();
              } else {
                menuItems[0].focus();
              }
              break;

            case "ArrowUp":
              event.preventDefault();
              if (currentIndex > 0) {
                menuItems[currentIndex - 1].focus();
              } else {
                menuItems[menuItems.length - 1].focus();
              }
              break;

            case "Escape":
              event.preventDefault();
              trigger.setAttribute("aria-expanded", "false");
              trigger.focus();
              break;

            case "Tab":
              if (!event.shiftKey && currentIndex === menuItems.length - 1) {
                trigger.setAttribute("aria-expanded", "false");
              } else if (event.shiftKey && currentIndex === 0) {
                trigger.setAttribute("aria-expanded", "false");
              }
              break;
          }
        });

        // Close menu when clicking outside
        document.addEventListener("click", (event) => {
          if (!dropdown.contains(event.target)) {
            trigger.setAttribute("aria-expanded", "false");
          }
        });
      });

    // Add keyboard navigation to tabs
    document.querySelectorAll('[role="tablist"]').forEach((tablist) => {
      if (tablist.hasAttribute("data-keyboard-nav")) return;
      tablist.setAttribute("data-keyboard-nav", "true");

      const tabs = tablist.querySelectorAll('[role="tab"]');

      tablist.addEventListener("keydown", (event) => {
        const currentIndex = Array.from(tabs).indexOf(document.activeElement);
        if (currentIndex === -1) return;

        switch (event.key) {
          case "ArrowRight":
            event.preventDefault();
            if (currentIndex < tabs.length - 1) {
              tabs[currentIndex + 1].focus();
              tabs[currentIndex + 1].click();
            } else {
              tabs[0].focus();
              tabs[0].click();
            }
            break;

          case "ArrowLeft":
            event.preventDefault();
            if (currentIndex > 0) {
              tabs[currentIndex - 1].focus();
              tabs[currentIndex - 1].click();
            } else {
              tabs[tabs.length - 1].focus();
              tabs[tabs.length - 1].click();
            }
            break;

          case "Home":
            event.preventDefault();
            tabs[0].focus();
            tabs[0].click();
            break;

          case "End":
            event.preventDefault();
            tabs[tabs.length - 1].focus();
            tabs[tabs.length - 1].click();
            break;
        }
      });
    });
  }

  /**
   * Setup screen reader announcements
   */
  setupScreenReaderAnnouncements() {
    // Create screen reader announcement area if it doesn't exist
    if (!document.getElementById("sr-announcements")) {
      const announcer = document.createElement("div");
      announcer.id = "sr-announcements";
      announcer.className = "sr-only";
      announcer.setAttribute("aria-live", "polite");
      announcer.setAttribute("aria-atomic", "true");
      document.body.appendChild(announcer);
    }
  }

  /**
   * Enhance existing elements with proper accessibility attributes
   */
  enhanceExistingElements() {
    // Add missing alt attributes to images
    document.querySelectorAll("img:not([alt])").forEach((img) => {
      img.alt = "";
    });

    // Add proper roles to common elements
    document.querySelectorAll("header:not([role])").forEach((header) => {
      header.setAttribute("role", "banner");
    });

    document.querySelectorAll("footer:not([role])").forEach((footer) => {
      footer.setAttribute("role", "contentinfo");
    });

    document.querySelectorAll("nav:not([role])").forEach((nav) => {
      nav.setAttribute("role", "navigation");
      if (!nav.hasAttribute("aria-label")) {
        nav.setAttribute("aria-label", "Main");
      }
    });

    document.querySelectorAll("main:not([role])").forEach((main) => {
      main.setAttribute("role", "main");
    });

    // Add proper button type
    document.querySelectorAll("button:not([type])").forEach((button) => {
      button.setAttribute("type", "button");
    });

    // Add proper labels to form elements
    document
      .querySelectorAll("input:not([aria-label]):not([aria-labelledby])")
      .forEach((input) => {
        const id = input.id;
        if (id) {
          const label = document.querySelector(`label[for="${id}"]`);
          if (!label) {
            const newLabel = document.createElement("label");
            newLabel.htmlFor = id;
            newLabel.className = "sr-only";
            newLabel.textContent =
              input.placeholder || input.name || "Input field";
            input.parentNode.insertBefore(newLabel, input);
          }
        } else if (input.placeholder) {
          input.setAttribute("aria-label", input.placeholder);
        }
      });
  }

  /**
   * Get all focusable elements within a container (uses DOMUtils)
   * @param {HTMLElement} container - Container element
   * @returns {NodeList} - List of focusable elements
   */
  getFocusableElements(container = document) {
    return DOMUtils.getFocusableElements(container);
  }

  /**
   * Trap focus within a container
   * @param {HTMLElement} container - Container to trap focus within
   * @returns {Function} - Function to remove the focus trap
   */
  trapFocus(container) {
    const focusableElements = this.getFocusableElements(container);
    if (focusableElements.length === 0) return () => {};

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Set initial focus
    firstElement.focus();

    // Handle tab key to trap focus
    const handleTabKey = (event) => {
      if (event.key !== "Tab") return;

      if (event.shiftKey) {
        // Shift + Tab: If focus is on first element, move to last
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: If focus is on last element, move to first
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    container.addEventListener("keydown", handleTabKey);

    // Return cleanup function
    return () => {
      container.removeEventListener("keydown", handleTabKey);
    };
  }

  /**
   * Announce a message to screen readers
   * @param {string} message - Message to announce
   * @param {string} priority - Announcement priority (polite or assertive)
   */
  announce(message, priority = "polite") {
    const announcer = document.getElementById("sr-announcements");
    if (!announcer) return;

    // Clear previous announcement
    announcer.textContent = "";
    announcer.setAttribute("aria-live", priority);

    // Add new announcement after a brief delay
    setTimeout(() => {
      announcer.textContent = message;
    }, 100);

    // Clear announcement after it's been read
    setTimeout(() => {
      announcer.textContent = "";
    }, 5000);
  }

  /**
   * Create a visually hidden element for screen readers
   * @param {string} text - Text content
   * @param {string} tag - HTML tag (default: span)
   * @returns {HTMLElement} - Created element
   */
  createScreenReaderText(text, tag = "span") {
    const element = document.createElement(tag);
    element.className = "sr-only";
    element.textContent = text;
    return element;
  }

  /**
   * Add loading state announcements
   * @param {HTMLElement} element - Element that's loading
   * @param {string} loadingText - Text to announce while loading
   * @param {string} loadedText - Text to announce when loaded
   */
  addLoadingAnnouncement(
    element,
    loadingText = "Loading...",
    loadedText = "Content loaded"
  ) {
    // Add loading announcement
    element.setAttribute("aria-busy", "true");
    this.announce(loadingText);

    // Listen for load completion
    const observer = new MutationObserver(() => {
      if (
        !element.hasAttribute("aria-busy") ||
        element.getAttribute("aria-busy") === "false"
      ) {
        this.announce(loadedText);
        observer.disconnect();
      }
    });

    observer.observe(element, {
      attributes: true,
      attributeFilter: ["aria-busy"],
    });
  }

  /**
   * Enhance form accessibility
   * @param {HTMLFormElement} form - Form to enhance
   */
  enhanceFormAccessibility(form) {
    // Add proper error handling
    const inputs = form.querySelectorAll("input, select, textarea");

    inputs.forEach((input) => {
      // Add required indicator
      if (
        input.hasAttribute("required") &&
        !input.hasAttribute("aria-required")
      ) {
        input.setAttribute("aria-required", "true");
      }

      // Add error handling
      input.addEventListener("invalid", (event) => {
        const errorId = `${input.id || input.name}-error`;
        let errorElement = document.getElementById(errorId);

        if (!errorElement) {
          errorElement = document.createElement("div");
          errorElement.id = errorId;
          errorElement.className = "error-message";
          errorElement.setAttribute("role", "alert");
          input.parentNode.insertBefore(errorElement, input.nextSibling);
        }

        errorElement.textContent = input.validationMessage;
        input.setAttribute("aria-describedby", errorId);
        input.setAttribute("aria-invalid", "true");
      });

      // Clear errors on valid input
      input.addEventListener("input", () => {
        if (input.validity.valid) {
          input.removeAttribute("aria-invalid");
          const errorId = `${input.id || input.name}-error`;
          const errorElement = document.getElementById(errorId);
          if (errorElement) {
            errorElement.textContent = "";
          }
        }
      });
    });
  }

  /**
   * Add color contrast checking (development helper)
   * @param {HTMLElement} element - Element to check
   * @returns {Object} - Contrast ratio information
   */
  checkColorContrast(element) {
    const styles = window.getComputedStyle(element);
    const backgroundColor = styles.backgroundColor;
    const color = styles.color;

    // This is a simplified contrast checker
    // In production, you'd want to use a more robust library
    return {
      backgroundColor,
      color,
      warning: "Use a proper contrast checking tool for accurate results",
    };
  }
}

// Initialize accessibility utilities
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.accessibilityUtils = new AccessibilityUtils();
  });
} else {
  window.accessibilityUtils = new AccessibilityUtils();
}

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = AccessibilityUtils;
}



// helper-keyboard.js
/**
 * Enhanced Keyboard Navigation
 * Provides comprehensive keyboard navigation support for the theme
 */

class KeyboardNavigation {
  constructor() {
    this.shortcuts = new Map();
    this.focusHistory = [];
    this.currentFocusIndex = -1;
    this.isKeyboardUser = false;
    
    this.init();
  }

  /**
   * Initialize keyboard navigation
   */
  init() {
    this.setupKeyboardDetection();
    this.setupGlobalKeyboardShortcuts();
    this.setupFocusManagement();
    this.setupCustomElements();
    this.setupModalNavigation();
    this.setupTableNavigation();
    this.setupCarouselNavigation();
  }

  /**
   * Detect keyboard usage
   */
  setupKeyboardDetection() {
    // Track keyboard usage
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        this.isKeyboardUser = true;
        document.body.classList.add('keyboard-user');
      }
    });

    // Track mouse usage
    document.addEventListener('mousedown', () => {
      this.isKeyboardUser = false;
      document.body.classList.remove('keyboard-user');
    });

    // Track touch usage
    document.addEventListener('touchstart', () => {
      this.isKeyboardUser = false;
      document.body.classList.remove('keyboard-user');
    });
  }

  /**
   * Setup global keyboard shortcuts
   */
  setupGlobalKeyboardShortcuts() {
    // Global keyboard shortcuts have been disabled
    // Only essential accessibility shortcuts remain active through other components
  }

  /**
   * Setup focus management
   */
  setupFocusManagement() {
    // Track focus history
    document.addEventListener('focusin', (event) => {
      if (this.isKeyboardUser) {
        this.addToFocusHistory(event.target);
      }
    });

    // Handle focus restoration
    document.addEventListener('keydown', (event) => {
      if (event.altKey && event.key === 'ArrowLeft') {
        event.preventDefault();
        this.focusPrevious();
      } else if (event.altKey && event.key === 'ArrowRight') {
        event.preventDefault();
        this.focusNext();
      }
    });

    // Ensure focus is visible
    document.addEventListener('focusin', (event) => {
      if (this.isKeyboardUser) {
        this.ensureFocusVisible(event.target);
      }
    });
  }

  /**
   * Setup custom element navigation
   */
  setupCustomElements() {
    // Product cards navigation
    this.setupProductCardNavigation();
    
    // Form navigation
    this.setupFormNavigation();
    
    // Button group navigation
    this.setupButtonGroupNavigation();
  }

  /**
   * Setup product card navigation
   */
  setupProductCardNavigation() {
    document.querySelectorAll('.product-card, .card-product').forEach(card => {
      if (card.hasAttribute('data-keyboard-nav')) return;
      card.setAttribute('data-keyboard-nav', 'true');

      // Make card focusable
      if (!card.hasAttribute('tabindex')) {
        card.setAttribute('tabindex', '0');
      }

      // Add role if not present
      if (!card.hasAttribute('role')) {
        card.setAttribute('role', 'article');
      }

      // Handle keyboard interaction
      card.addEventListener('keydown', (event) => {
        switch (event.key) {
          case 'Enter':
          case ' ':
            event.preventDefault();
            const link = card.querySelector('a');
            if (link) {
              link.click();
            }
            break;

          case 'ArrowRight':
          case 'ArrowDown':
            event.preventDefault();
            this.focusNextCard(card);
            break;

          case 'ArrowLeft':
          case 'ArrowUp':
            event.preventDefault();
            this.focusPreviousCard(card);
            break;
        }
      });
    });
  }

  /**
   * Setup form navigation
   */
  setupFormNavigation() {
    document.querySelectorAll('form').forEach(form => {
      if (form.hasAttribute('data-keyboard-nav')) return;
      form.setAttribute('data-keyboard-nav', 'true');

      form.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.key === 'Enter') {
          // Ctrl+Enter submits form
          event.preventDefault();
          form.submit();
        }
      });
    });
  }

  /**
   * Setup button group navigation
   */
  setupButtonGroupNavigation() {
    document.querySelectorAll('.button-group, .btn-group').forEach(group => {
      if (group.hasAttribute('data-keyboard-nav')) return;
      group.setAttribute('data-keyboard-nav', 'true');

      const buttons = group.querySelectorAll('button, [role=\"button\"]');
      
      // Set up roving tabindex
      buttons.forEach((button, index) => {
        button.setAttribute('tabindex', index === 0 ? '0' : '-1');
      });

      group.addEventListener('keydown', (event) => {
        const currentIndex = Array.from(buttons).indexOf(event.target);
        if (currentIndex === -1) return;

        let nextIndex = currentIndex;

        switch (event.key) {
          case 'ArrowRight':
          case 'ArrowDown':
            event.preventDefault();
            nextIndex = (currentIndex + 1) % buttons.length;
            break;

          case 'ArrowLeft':
          case 'ArrowUp':
            event.preventDefault();
            nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
            break;

          case 'Home':
            event.preventDefault();
            nextIndex = 0;
            break;

          case 'End':
            event.preventDefault();
            nextIndex = buttons.length - 1;
            break;

          default:
            return;
        }

        // Update tabindex and focus
        buttons[currentIndex].setAttribute('tabindex', '-1');
        buttons[nextIndex].setAttribute('tabindex', '0');
        buttons[nextIndex].focus();
      });
    });
  }

  /**
   * Setup modal navigation
   */
  setupModalNavigation() {
    document.addEventListener('keydown', (event) => {
      const modal = document.querySelector('.modal.active, [role=\"dialog\"][aria-hidden=\"false\"]');
      if (!modal) return;

      if (event.key === 'Tab') {
        this.trapFocusInModal(event, modal);
      }
    });
  }

  /**
   * Setup table navigation
   */
  setupTableNavigation() {
    document.querySelectorAll('table').forEach(table => {
      if (table.hasAttribute('data-keyboard-nav')) return;
      table.setAttribute('data-keyboard-nav', 'true');

      // Make table focusable
      if (!table.hasAttribute('tabindex')) {
        table.setAttribute('tabindex', '0');
      }

      table.addEventListener('keydown', (event) => {
        if (!this.isKeyboardUser) return;

        const cells = table.querySelectorAll('td, th');
        const currentCell = event.target.closest('td, th');
        if (!currentCell) return;

        const currentIndex = Array.from(cells).indexOf(currentCell);
        const cols = table.rows[0]?.cells.length || 0;
        const rows = table.rows.length;

        let nextIndex = currentIndex;

        switch (event.key) {
          case 'ArrowRight':
            event.preventDefault();
            nextIndex = Math.min(currentIndex + 1, cells.length - 1);
            break;

          case 'ArrowLeft':
            event.preventDefault();
            nextIndex = Math.max(currentIndex - 1, 0);
            break;

          case 'ArrowDown':
            event.preventDefault();
            nextIndex = Math.min(currentIndex + cols, cells.length - 1);
            break;

          case 'ArrowUp':
            event.preventDefault();
            nextIndex = Math.max(currentIndex - cols, 0);
            break;

          case 'Home':
            event.preventDefault();
            nextIndex = Math.floor(currentIndex / cols) * cols;
            break;

          case 'End':
            event.preventDefault();
            nextIndex = Math.min((Math.floor(currentIndex / cols) + 1) * cols - 1, cells.length - 1);
            break;

          default:
            return;
        }

        if (cells[nextIndex]) {
          cells[nextIndex].focus();
        }
      });

      // Make cells focusable
      table.querySelectorAll('td, th').forEach(cell => {
        if (!cell.hasAttribute('tabindex')) {
          cell.setAttribute('tabindex', '-1');
        }
      });
    });
  }

  /**
   * Setup carousel navigation
   */
  setupCarouselNavigation() {
    document.querySelectorAll('.carousel, .slider').forEach(carousel => {
      if (carousel.hasAttribute('data-keyboard-nav')) return;
      carousel.setAttribute('data-keyboard-nav', 'true');

      carousel.addEventListener('keydown', (event) => {
        switch (event.key) {
          case 'ArrowLeft':
            event.preventDefault();
            this.carouselPrevious(carousel);
            break;

          case 'ArrowRight':
            event.preventDefault();
            this.carouselNext(carousel);
            break;

          case 'Home':
            event.preventDefault();
            this.carouselGoTo(carousel, 0);
            break;

          case 'End':
            event.preventDefault();
            const slides = carousel.querySelectorAll('.slide, .carousel-item');
            this.carouselGoTo(carousel, slides.length - 1);
            break;
        }
      });
    });
  }

  /**
   * Register a keyboard shortcut
   */
  registerShortcut(key, handler, description) {
    this.shortcuts.set(key, { handler, description });
  }

  /**
   * Check if user is in a typing context
   */
  isTypingContext(element) {
    const typingElements = ['INPUT', 'TEXTAREA', 'SELECT'];
    const editableElements = element.isContentEditable;
    
    return typingElements.includes(element.tagName) || editableElements;
  }

  /**
   * Add element to focus history
   */
  addToFocusHistory(element) {
    // Remove element if it already exists
    const existingIndex = this.focusHistory.indexOf(element);
    if (existingIndex !== -1) {
      this.focusHistory.splice(existingIndex, 1);
    }

    // Add to end of history
    this.focusHistory.push(element);
    this.currentFocusIndex = this.focusHistory.length - 1;

    // Limit history size
    if (this.focusHistory.length > 50) {
      this.focusHistory.shift();
      this.currentFocusIndex--;
    }
  }

  /**
   * Focus previous element in history
   */
  focusPrevious() {
    if (this.currentFocusIndex > 0) {
      this.currentFocusIndex--;
      const element = this.focusHistory[this.currentFocusIndex];
      if (element && document.contains(element)) {
        element.focus();
      }
    }
  }

  /**
   * Focus next element in history
   */
  focusNext() {
    if (this.currentFocusIndex < this.focusHistory.length - 1) {
      this.currentFocusIndex++;
      const element = this.focusHistory[this.currentFocusIndex];
      if (element && document.contains(element)) {
        element.focus();
      }
    }
  }

  /**
   * Ensure focused element is visible
   */
  ensureFocusVisible(element) {
    // Scroll element into view if needed
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest'
    });

    // Add focus indicator class
    element.classList.add('keyboard-focused');
    
    // Remove class after a delay
    setTimeout(() => {
      element.classList.remove('keyboard-focused');
    }, 2000);
  }

  /**
   * Focus next product card
   */
  focusNextCard(currentCard) {
    const cards = document.querySelectorAll('.product-card, .card-product');
    const currentIndex = Array.from(cards).indexOf(currentCard);
    const nextIndex = (currentIndex + 1) % cards.length;
    
    if (cards[nextIndex]) {
      cards[nextIndex].focus();
    }
  }

  /**
   * Focus previous product card
   */
  focusPreviousCard(currentCard) {
    const cards = document.querySelectorAll('.product-card, .card-product');
    const currentIndex = Array.from(cards).indexOf(currentCard);
    const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
    
    if (cards[prevIndex]) {
      cards[prevIndex].focus();
    }
  }

  /**
   * Trap focus within modal
   */
  trapFocusInModal(event, modal) {
    const focusableElements = modal.querySelectorAll(
      'a[href], button, textarea, input[type=\"text\"], input[type=\"radio\"], input[type=\"checkbox\"], select, [tabindex]:not([tabindex=\"-1\"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  /**
   * Close modal
   */
  closeModal(modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    
    // Return focus to trigger element
    const trigger = document.querySelector(`[aria-controls=\"${modal.id}\"]`);
    if (trigger) {
      trigger.focus();
    }
  }

  /**
   * Carousel navigation methods
   */
  carouselPrevious(carousel) {
    const prevButton = carousel.querySelector('.carousel-prev, .slider-prev');
    if (prevButton) {
      prevButton.click();
    }
  }

  carouselNext(carousel) {
    const nextButton = carousel.querySelector('.carousel-next, .slider-next');
    if (nextButton) {
      nextButton.click();
    }
  }

  carouselGoTo(carousel, index) {
    const indicators = carousel.querySelectorAll('.carousel-indicator, .slider-dot');
    if (indicators[index]) {
      indicators[index].click();
    }
  }

  /**
   * Get available keyboard shortcuts
   */
  getShortcuts() {
    const shortcuts = [];
    this.shortcuts.forEach((shortcut, key) => {
      shortcuts.push({
        key,
        description: shortcut.description
      });
    });
    return shortcuts;
  }
}

// Initialize keyboard navigation
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.keyboardNavigation = new KeyboardNavigation();
  });
} else {
  window.keyboardNavigation = new KeyboardNavigation();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = KeyboardNavigation;
}


  // Bundle completion
  if (window.BloxMania && window.BloxMania.bundles && window.BloxMania.bundles[BUNDLE_NAME]) {
    window.BloxMania.bundles[BUNDLE_NAME].initialized = true;
  }

  console.log(`✅ ${BUNDLE_NAME} bundle loaded`);
})();