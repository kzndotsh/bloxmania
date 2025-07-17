# Implementation Plan

- [x] 1. Set up modern build system following Dawn theme patterns

  - Configure optimized Tailwind CSS build process with proper purging
  - Set up PostCSS with autoprefixer and modern CSS features
  - Implement Dawn-style CSS custom properties architecture (:root variables)
  - Create development scripts for watch mode and production builds
  - Add CSS custom properties for theme settings integration like Dawn
  - Implement Dawn's component-specific CSS loading pattern
  - _Requirements: 2.1, 2.2, 3.1, 3.2_

- [x] 2. Audit and remove unused code

  - [x] 2.1 Analyze and remove unused CSS classes and rules

    - Convert remaining custom CSS blocks in sections to Tailwind utilities
    - Remove redundant custom CSS that duplicates Tailwind utilities in sections
    - Clean up duplicate hover effects across sections
    - Consolidate animation keyframes into single utility file
    - Remove unused CSS custom properties that aren't being used
    - _Requirements: 1.1, 1.2, 6.1_

  - [x] 2.2 Clean up JavaScript files and remove dead code

    - Remove debug console.log statements throughout codebase
    - Clean up unused event listeners and optimize performance
    - Remove placeholder console.log in collection-filters.js mobile filter functionality
    - _Requirements: 1.1, 1.3, 5.1_

  - [x] 2.3 Remove unused assets and optimize file structure
    - All creator images are being used in creators-carousel.liquid snippet, so no removal needed
    - Optimize existing images for web delivery (WebP conversion for hero.png, okok1.png, okok2.png, etc.)
    - Remove any unused JavaScript files or CSS components
    - Clean up assets directory structure
    - _Requirements: 1.1, 1.4, 8.2_

- [x] 3. Establish design system foundation following Dawn patterns

  - [x] 3.1 Create centralized design tokens using Dawn's CSS custom properties approach

    - Implement :root variables for colors, spacing, and typography like Dawn
    - Create component-specific CSS custom properties (--border-radius, --shadow-opacity)
    - Set up theme settings integration through CSS variables
    - Establish consistent naming conventions following Dawn's patterns
    - _Requirements: 2.2, 2.5, 3.1, 7.4_

  - [x] 3.2 Build reusable component system following Dawn's card architecture

    - Create .card component with Dawn-style variants (card--standard, card--media)
    - Build .btn component with proper focus states and accessibility
    - Develop component-specific CSS files like Dawn (component-card.css, component-button.css)
    - Implement Dawn's gradient and color scheme system
    - _Requirements: 2.3, 6.1, 6.2, 7.2_

  - [x] 3.3 Implement consistent responsive breakpoint system
    - Define mobile-first breakpoint strategy
    - Create container classes with proper max-widths
    - Establish consistent spacing patterns across breakpoints
    - Test responsive behavior across all components
    - _Requirements: 4.1, 4.2, 7.1_

- [x] 4. Modernize CSS architecture and convert to Tailwind

  - [x] 4.1 Convert header section to use Tailwind classes consistently

    - Replace remaining custom CSS in header.liquid with Tailwind utilities (nav-link::after effects)
    - Convert navigation hover effects to Tailwind classes
    - Implement mobile menu using Tailwind responsive utilities
    - Ensure accessibility with proper focus states
    - _Requirements: 2.1, 2.4, 4.4, 7.2_

  - [x] 4.2 Modernize hero section styling and responsiveness

    - Convert background image handling to modern CSS
    - Replace custom gradient styles with Tailwind utilities
    - Implement responsive typography scaling
    - Optimize creators carousel animation performance
    - _Requirements: 2.1, 3.3, 4.1, 4.2_

  - [x] 4.3 Refactor featured products section for consistency

    - Convert product card styling to reusable Tailwind components
    - Implement consistent hover states and transitions
    - Optimize grid layout for all screen sizes
    - Ensure proper image aspect ratios and loading
    - _Requirements: 2.1, 2.3, 4.1, 8.2_

  - [x] 4.4 Update remaining sections with modern CSS practices

    - Convert main-product section custom CSS to Tailwind utilities (remove <style> block with dynamic padding)
    - Convert creators-carousel custom CSS animations to Tailwind utilities (move inline styles to component CSS)
    - Modernize customer reviews section styling
    - Ensure accessibility compliance for all section links
    - _Requirements: 2.1, 4.1, 4.4, 7.2_

  - [x] 4.5 Create comprehensive product page template
    - Design and implement a complete product page template following Dawn's product page patterns
    - Include product image gallery with zoom functionality and proper accessibility
    - Implement product variant selection with proper form validation
    - Add quantity selector with proper input validation and accessibility
    - Create add-to-cart functionality with loading states and error handling
    - Include product description with rich text formatting support
    - Add product reviews section with proper schema markup
    - Implement related products section using existing card-product snippet
    - Ensure mobile-first responsive design with proper touch interactions
    - Add proper SEO meta tags and structured data markup
    - Include breadcrumb navigation for better user experience
    - Implement product sharing functionality with social media integration
    - _Requirements: 2.1, 2.3, 4.1, 4.2, 5.2, 6.1, 7.1, 7.2_

- [x] 5. Refactor JavaScript following Dawn's modern patterns

  - [x] 5.1 Enhance utility function patterns and modular architecture

    - Create utility functions like Dawn's getFocusableElements and HTMLUpdateUtility
    - Improve existing cart functionality to follow Dawn's component pattern more closely
    - Enhance search functionality using Dawn's class-based approach
    - Implement Dawn's SectionId utility for section management
    - _Requirements: 5.1, 5.2, 5.4, 7.1_

  - [x] 5.2 Adopt Dawn's modern JavaScript patterns and Web Components

    - Convert existing components to extend HTMLElement like Dawn's DetailsModal
    - Implement proper custom element registration with customElements.define
    - Add Dawn-style focus management with trapFocus utilities
    - Enhance existing event handling with more robust addEventListener patterns
    - _Requirements: 5.1, 5.2, 5.5, 7.5_

  - [x] 5.3 Create Web Components following Dawn's architecture

    - Convert existing HeaderDrawer functionality to proper Web Component
    - Create SearchModal component with proper focus trapping
    - Develop CartNotification component with Dawn's patterns
    - Implement ProductForm component with proper validation
    - _Requirements: 5.2, 5.4, 6.2, 7.1_

  - [x] 5.4 Optimize performance and implement lazy loading
    - Enhance existing intersection observer implementation for animations
    - Add lazy loading for images and non-critical scripts
    - Optimize event listeners and debounce user inputs
    - Implement service worker for asset caching
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [x] 6. Eliminate code duplication following Dawn's snippet architecture

  - [x] 6.1 Create reusable Liquid snippets following Dawn's card-product pattern

    - Extract product card markup into reusable snippet with comprehensive parameters
    - Create button snippet with variant support and accessibility features
    - Build icon snippet system for consistent SVG usage with proper alt text
    - Develop form field snippets with Dawn-style validation and styling
    - Implement Dawn's conditional CSS loading pattern for snippets
    - _Requirements: 6.3, 6.4, 7.4_

  - [x] 6.2 Consolidate repeated JavaScript functionality

    - Create utility functions for DOM manipulation
    - Build event handling utilities for common patterns
    - Develop API interaction utilities for Shopify endpoints
    - Create validation utilities for forms and inputs
    - _Requirements: 6.2, 6.4, 5.3_

  - [x] 6.3 Centralize theme configuration and constants
    - Create theme.config.js for centralized settings and configuration constants
    - Define API endpoints and Shopify configuration in constants file
    - Centralize animation timings, easing functions, and breakpoint values
    - Create theme constants for consistent usage across JavaScript modules
    - _Requirements: 6.4, 7.4, 7.5_

- [x] 7. Implement comprehensive accessibility improvements

  - [x] 7.1 Add proper ARIA labels and semantic HTML structure

    - Audit all interactive elements for proper ARIA attributes
    - Ensure proper heading hierarchy throughout templates
    - Add skip navigation links for keyboard users
    - Implement proper form labeling and error messaging
    - _Requirements: 4.4, 4.5, 3.4_

  - [x] 7.2 Implement keyboard navigation and focus management

    - Ensure all interactive elements are keyboard accessible
    - Create visible focus indicators with proper contrast
    - Implement focus trapping for modal dialogs
    - Add keyboard shortcuts for common actions
    - _Requirements: 4.4, 4.5, 3.4_

  - [x] 7.3 Optimize for screen readers and assistive technology
    - Add proper alternative text for all images
    - Implement live regions for dynamic content updates
    - Ensure proper reading order for screen readers
    - Test with actual screen reader software
    - _Requirements: 4.5, 3.4, 7.5_

- [x] 8. Optimize performance and implement modern loading strategies

  - [x] 8.1 Implement critical CSS and optimize loading performance

    - Enhance existing critical CSS optimizer implementation
    - Implement CSS loading optimization with preload hints
    - Optimize font loading with font-display: swap
    - Minimize CSS bundle size through purging and compression
    - _Requirements: 8.1, 8.4, 3.3_

  - [x] 8.2 Optimize images and implement modern formats

    - Convert images to WebP format with fallbacks (build on existing image optimizer implementation)
    - Implement responsive images with srcset attributes
    - Enhance existing lazy loading for below-the-fold images
    - Optimize image compression and sizing
    - _Requirements: 8.2, 8.4, 4.1_

  - [x] 8.3 Implement JavaScript performance optimizations

    - Add code splitting for non-critical JavaScript
    - Implement module bundling and tree shaking
    - Optimize event listeners and reduce memory leaks
    - Enhance existing performance monitoring and Core Web Vitals tracking
    - Create missing theme-editor.js file (referenced in main-product.liquid but doesn't exist)
    - _Requirements: 8.1, 8.3, 8.4_

  - [x] 8.4 Clean up remaining inline styles and convert to Tailwind utilities

    - Convert hero.liquid background-image inline style to CSS custom property or Tailwind utility
    - Convert featured-products.liquid and why-choose-us.liquid background-image inline styles
    - Convert card-product.liquid inline color styles (!important declarations) to proper Tailwind classes
    - Clean up page.guarantee.liquid floating icon inline styles (transform properties)
    - Remove debug-collections.liquid inline styles (red color style)
    - Convert supported-games.liquid inline background-color to Tailwind class
    - Convert faq.liquid inline background pattern to CSS custom property
    - _Requirements: 2.1, 2.4, 7.2_

  - [x] 8.5 Convert remaining custom CSS blocks to component-based architecture
    - Move cart-notification.liquid inline display:none to proper CSS class
    - Create component-specific CSS files for any remaining snippets with inline styles
    - Consolidate similar styling patterns across snippets into shared component classes
    - Ensure all custom CSS follows Dawn's component naming conventions
    - _Requirements: 2.1, 3.1, 7.2_

- [ ] 9. Comprehensive testing and quality assurance

  - [x] 9.1 Cross-browser and device testing

    - Test functionality across major browsers (Chrome, Firefox, Safari, Edge)
    - Verify responsive design on various device sizes
    - Test touch interactions on mobile devices
    - Validate performance across different network conditions
    - _Requirements: 4.1, 4.2, 4.3, 8.4_

  - [x] 9.2 Accessibility compliance testing

    - Run automated accessibility tests using axe-core
    - Perform manual keyboard navigation testing
    - Test with screen reader software (NVDA, JAWS, VoiceOver)
    - Validate color contrast ratios meet WCAG AA standards
    - _Requirements: 4.4, 4.5, 3.4_

  - [ ] 9.3 Performance benchmarking and optimization
    - Create performance-monitor.js file to track Core Web Vitals (LCP, FID, CLS)
    - Run Lighthouse audits and address performance issues
    - Test loading performance on slow network connections
    - Validate bundle sizes and loading times
    - Implement performance monitoring for Core Web Vitals
    - Create performance budget and enforce it in build process
    - _Requirements: 8.1, 8.3, 8.4, 8.5_

- [ ] 10. Documentation and final cleanup

  - [x] 10.1 Create comprehensive code documentation with LiquidDoc

    - Add LiquidDoc documentation to all reusable snippets following Shopify best practices
    - Document all utility functions and their usage with JSDoc comments
    - Create component documentation with @param, @example, and @description tags
    - Document theme customization options and settings
    - Write developer guide for future maintenance
    - _Requirements: 7.5, 5.5_

  - [ ] 10.2 Final code review and cleanup

    - Review all code for consistency and best practices
    - Remove any remaining console.log statements and debug code
    - Validate all file naming conventions are consistent
    - Ensure proper code formatting and linting
    - _Requirements: 7.1, 7.2, 7.4_

  - [ ] 10.3 Create deployment and rollback procedures
    - Document deployment process and requirements
    - Create rollback procedures in case of issues
    - Set up monitoring and alerting for production issues
    - Create checklist for future theme updates
    - _Requirements: 7.5, 8.4_
    
- [ ] 11. Migrate pages from old Next.js site to Shopify theme

  - [x] 11.1 Convert guarantee page from old-site to Shopify Liquid template
    - Analyze the existing Next.js guarantee page structure and components
    - Convert React components to Liquid templates following Dawn patterns
    - Implement proper asset handling for images (ICON1-6.png, controller.png)
    - Fix existing issues with missing assets in the current guarantee page
    - Ensure responsive design and accessibility are maintained
    - Apply consistent Tailwind utility classes following the new conventions
    - Test the page across different devices and screen sizes
    - _Requirements: 2.1, 2.3, 4.1, 4.2, 6.3, 7.2, 7.4_
