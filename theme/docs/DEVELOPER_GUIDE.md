# BloxMania Theme - Developer Guide

## Overview

BloxMania is a modern Shopify theme built with performance, maintainability, and developer experience in mind. This guide provides comprehensive information for developers working with the theme.

## Architecture

### Technology Stack
- **Platform**: Shopify Liquid templating engine
- **CSS Framework**: Tailwind CSS 3.4+ with custom component layer
- **Build System**: Node.js with npm scripts, PostCSS, and Autoprefixer
- **JavaScript**: Modern ES6+ with Web Components and custom elements
- **Package Manager**: npm (requires Node.js 16+ and npm 8+)

### File Structure
```
theme/
├── assets/           # Compiled CSS, JS, and images
├── src/             # Source files for Tailwind CSS
├── build/           # Build scripts and automation
├── sections/        # Shopify sections (Liquid)
├── snippets/        # Reusable Liquid components
├── templates/       # Page templates
├── config/          # Theme settings and configuration
├── locales/         # Translation files
└── docs/            # Generated documentation
```

## Development Workflow

### Setup
1. **Install Dependencies**
   ```bash
   cd theme/
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp shopify.env.example .env
   # Edit .env with your store settings
   ```

3. **Start Development**
   ```bash
   npm run dev:concurrent  # Recommended for development
   # or
   npm run dev            # Single build + dev server
   ```

### Build Commands

#### Development
```bash
npm run dev:concurrent    # CSS watching + Shopify dev server
npm run dev              # Development server only
npm run dev:watch        # Watch CSS changes only
npm run build:css:dev    # Build CSS for development
```

#### Production
```bash
npm run build           # Build and deploy to Shopify
npm run build:css:prod  # Build production CSS (minified)
npm run push           # Deploy to store
npm run package        # Create theme package
```

#### Utilities
```bash
npm run check          # Run theme validation
npm run check:fix      # Auto-fix theme issues
npm run lint           # Run linting
npm run docs:generate  # Generate documentation
npm run docs:serve     # Serve documentation locally
```

## CSS Architecture

### Tailwind CSS Integration
The theme uses Tailwind CSS with a custom configuration that includes:
- **Design Tokens**: Centralized colors, spacing, and typography
- **Component Layer**: Custom components for repeated patterns
- **CSS Variables**: For theme settings integration
- **Mobile-First**: Responsive design with progressive enhancement

### Component Structure
```css
/* Base styles */
@tailwind base;

/* Custom component layer */
@layer components {
  .card {
    @apply rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm;
  }
}

/* Utilities */
@tailwind utilities;
```

### CSS Custom Properties
The theme uses CSS custom properties for dynamic theming:
```css
:root {
  --color-primary: 255 216 0;
  --color-secondary: 71 145 240;
  --color-background: 29 30 38;
}
```

## JavaScript Architecture

### Web Components Pattern
The theme follows Dawn's Web Component patterns for interactive elements:

```javascript
class ProductForm extends HTMLElement {
  constructor() {
    super();
    this.form = this.querySelector('form');
    this.submitButton = this.querySelector('[type="submit"]');
  }

  connectedCallback() {
    this.setupEventListeners();
  }

  disconnectedCallback() {
    this.cleanup();
  }
}

customElements.define('product-form', ProductForm);
```

### Utility Modules
Common functionality is organized into utility modules:
- **DOM Utils**: DOM manipulation and query functions
- **API Utils**: Shopify API interactions
- **Accessibility Utils**: WCAG compliance helpers

### Performance Patterns
- **Intersection Observers**: For lazy loading and animations
- **Debouncing**: For search and resize events
- **Event Delegation**: Efficient event handling

## Liquid Template Patterns

### Snippet Parameters
All snippets use comprehensive parameter systems:

```liquid
{% comment %}
  Renders a product card

  Accepts:
  - card_product: {Object} Product Liquid object (required)
  - show_vendor: {Boolean} Show product vendor (default: false)
  - lazy_load: {Boolean} Enable lazy loading (default: true)

  Usage:
  {% render 'card-product', card_product: product, show_vendor: true %}
{% endcomment %}
```

### Conditional Rendering
Safe property access with defaults:

```liquid
{%- liquid
  assign show_vendor = show_vendor | default: false
  assign lazy_load = lazy_load | default: true
-%}
```

### Performance Optimization
- Minimize Liquid logic in templates
- Use `liquid` tags for complex logic
- Implement proper caching strategies

## Component Documentation

### Sections
Customizable content blocks for the theme editor:
- **[Header](./sections/header.md)**: Navigation and mobile menu
- **[Hero](./sections/hero.md)**: Main banner with creator carousel
- **[Featured Products](./sections/featured-products.md)**: Product showcase grid
- **[Footer](./sections/footer.md)**: Footer with newsletter and social links

### Snippets
Reusable components:
- **[Card Product](./snippets/card-product.md)**: Product card with variants
- **[Button](./snippets/button.md)**: Accessible button component
- **[Icon](./snippets/icon.md)**: SVG icon system
- **[Responsive Image](./snippets/responsive-image.md)**: Optimized image component

### Templates
Page structure definitions:
- **[Product](./templates/product.md)**: Individual product pages
- **[Collection](./templates/collection.md)**: Product collection pages
- **[Index](./templates/index.md)**: Homepage template

## Performance Optimization

### Critical CSS
The theme implements critical CSS extraction:
```bash
npm run critical:extract
```

### Bundle Optimization
CSS bundle optimization with purging:
```bash
npm run optimize:css
```

### Image Optimization
- WebP format with fallbacks
- Lazy loading implementation
- Responsive image sizing

### JavaScript Optimization
- Code splitting
- Tree shaking
- Service worker caching

## Testing and Quality Assurance

### Theme Validation
```bash
npm run check        # Shopify theme check
npm run check:fix    # Auto-fix issues
```

### Performance Testing
```bash
npm run performance:test
```

### Accessibility Testing
- WCAG 2.1 AA compliance
- Screen reader optimization
- Keyboard navigation support

## Deployment

### Development Store
```bash
npm run dev    # Start development server
npm run push   # Deploy to development store
```

### Production Deployment
```bash
npm run build    # Build and deploy
npm run package  # Create theme package
```

### Rollback Procedures
1. Keep theme backups before major changes
2. Use Shopify's theme versioning
3. Test thoroughly on development store

## Troubleshooting

### Common Issues

#### Build Errors
- Check Node.js version (16+ required)
- Clear node_modules and reinstall
- Verify .env configuration

#### CSS Not Updating
- Check Tailwind config
- Restart dev server
- Clear browser cache

#### JavaScript Errors
- Check browser console
- Verify Web Component registration
- Check for conflicting scripts

### Debug Mode
Enable debug mode in development:
```javascript
window.DEBUG = true;
```

## Contributing

### Code Standards
- Follow existing patterns
- Use semantic HTML
- Implement proper accessibility
- Write comprehensive documentation

### Documentation
- Update relevant documentation
- Add JSDoc comments for JavaScript
- Include usage examples
- Test documentation accuracy

### Performance
- Optimize images and assets
- Minimize JavaScript bundle size
- Follow CSS best practices
- Test on various devices

## Resources

### Documentation
- [Complete Documentation](../BLOXMANIA_COMPLETE_DOCUMENTATION.md)
- [Build System](../BUILD_SYSTEM.md)
- [Tailwind Setup](../TAILWIND_SETUP.md)
- [Theme Configuration](../THEME_CONFIGURATION.md)

### External Resources
- [Shopify Theme Development](https://shopify.dev/themes)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Dawn Theme Reference](https://github.com/Shopify/dawn)

## Support

For technical support and questions:
1. Check this documentation
2. Review component-specific docs
3. Check troubleshooting section
4. Refer to Shopify documentation