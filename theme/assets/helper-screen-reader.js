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