# 🔄 Development Workflow

This guide covers the development workflow for the BloxMania Shopify theme, including best practices, coding standards, and development processes.

## 🎯 Development Philosophy

### Core Principles
- **Component-Based Architecture**: Modular, reusable components
- **Mobile-First Design**: Responsive design starting from mobile
- **Performance First**: Optimized for speed and Core Web Vitals
- **Accessibility**: WCAG 2.1 AA compliance
- **Maintainability**: Clean, documented, and organized code

### Development Approach
- **Iterative Development**: Small, focused changes
- **Continuous Testing**: Test changes frequently
- **Documentation**: Document as you code
- **Code Review**: Review code before deployment

## 🛠️ Development Environment

### Required Tools
- **VS Code** (recommended editor)
- **Shopify CLI** (theme development)
- **Browser Developer Tools** (debugging)
- **Git** (version control)

### VS Code Setup
The project includes VS Code configuration files:
- `.vscode/settings.json` - Editor settings
- `.vscode/extensions.json` - Recommended extensions

### Recommended Extensions
- Shopify Liquid
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- ESLint
- GitLens

## 📁 File Organization

### Development Structure
```
dev/
├── js/                    # JavaScript source files
│   ├── core/             # Core utilities and constants
│   ├── features/         # Feature-specific modules
│   ├── ui/               # UI components and interactions
│   ├── helpers/          # Helper utilities
│   └── system/           # System-level files
├── css/                  # CSS source files
│   └── styles.css        # Main stylesheet (BEM methodology)
├── sections/             # Shopify sections
├── snippets/             # Shopify snippets
├── templates/            # Shopify templates
├── layout/               # Shopify layouts
├── config/               # Shopify configuration
└── locales/              # Translation files
```

### File Naming Conventions
- **Sections**: `kebab-case.liquid` (e.g., `featured-product.liquid`)
- **Snippets**: `kebab-case.liquid` (e.g., `product-card.liquid`)
- **JavaScript**: `camelCase.js` (e.g., `productGallery.js`)
- **CSS Classes**: BEM methodology (e.g., `.product-card__image`)

## 🔄 Development Process

### 1. Starting Development
```bash
# Start development server
npm run dev

# The theme will be available at your Shopify store
# Changes automatically rebuild and reload
```

### 2. Making Changes

#### CSS Changes
```css
/* Edit dev/css/styles.css */
.product-card {
  /* BEM methodology */
}

.product-card__image {
  /* Element */
}

.product-card--featured {
  /* Modifier */
}
```

#### JavaScript Changes
```javascript
// Edit files in dev/js/ directories
// Changes automatically bundle and reload
```

#### Liquid Changes
```liquid
<!-- Edit dev/sections/ or dev/snippets/ -->
<!-- Changes automatically reload -->
```

### 3. Testing Changes
- **Visual Testing**: Check appearance in browser
- **Functional Testing**: Test interactions and features
- **Cross-Browser Testing**: Test in multiple browsers
- **Mobile Testing**: Test on mobile devices
- **Accessibility Testing**: Use screen readers and keyboard navigation

### 4. Code Quality
```bash
# Format code
npm run format

# Lint CSS
npm run lint:css

# Check theme for issues
npm run check

# Auto-fix issues
npm run check:fix
```

## 🎨 Coding Standards

### CSS Standards (BEM Methodology)

#### Block
```css
.product-card {
  /* Component block */
}
```

#### Element
```css
.product-card__image {
  /* Component element */
}

.product-card__title {
  /* Component element */
}
```

#### Modifier
```css
.product-card--featured {
  /* Component modifier */
}

.product-card__image--large {
  /* Element modifier */
}
```

#### Utility Classes
```css
/* Use Tailwind utilities for layout and spacing */
.product-card {
  @apply bg-white rounded-lg shadow-md p-4;
}
```

### JavaScript Standards

#### ES6+ Features
```javascript
// Use modern JavaScript features
const productData = {
  id: 1,
  title: 'Product Name'
};

const { id, title } = productData;

// Arrow functions
const handleClick = () => {
  // Handle click event
};

// Async/await
const fetchProduct = async (id) => {
  const response = await fetch(`/products/${id}.js`);
  return response.json();
};
```

#### Module Organization
```javascript
// Core utilities
import { debounce } from '../core/utils.js';

// Feature modules
import { ProductGallery } from '../features/product-gallery.js';

// UI components
import { Modal } from '../ui/modal.js';
```

### Liquid Standards

#### Template Structure
```liquid
{% comment %}
  Section: Featured Product
  Description: Displays a featured product with image and details
{% endcomment %}

<section class="featured-product">
  {% if section.settings.product != blank %}
    {% assign product = section.settings.product %}
    {% render 'product-card', product: product %}
  {% endif %}
</section>

{% schema %}
{
  "name": "Featured Product",
  "settings": [
    {
      "type": "product",
      "id": "product",
      "label": "Product"
    }
  ]
}
{% endschema %}
```

#### Variable Naming
```liquid
{% comment %} Good: Descriptive variable names {% endcomment %}
{% assign featured_product = section.settings.product %}
{% assign product_price = featured_product.price %}

{% comment %} Avoid: Generic names {% endcomment %}
{% assign p = section.settings.product %}
```

## 🔧 Build System

### Development Build
```bash
# Fast development build
npm run build:dev

# Watch for changes
npm run build:watch
```

### Production Build
```bash
# Optimized production build
npm run build

# Includes minification and optimization
```

### Build Process
1. **CSS Processing**: Tailwind CSS compilation
2. **JavaScript Bundling**: ES6 modules to single bundle
3. **Asset Optimization**: Image compression and optimization
4. **File Copying**: Copy processed files to `theme/` directory

## 🧪 Testing Strategy

### Manual Testing
- **Visual Regression**: Compare before/after screenshots
- **Functional Testing**: Test all user interactions
- **Cross-Browser Testing**: Chrome, Firefox, Safari, Edge
- **Mobile Testing**: iOS Safari, Android Chrome
- **Accessibility Testing**: Screen readers, keyboard navigation

### Automated Testing
```bash
# Theme validation
npm run check

# CSS linting
npm run lint:css

# Code formatting
npm run format
```

### Performance Testing
- **Lighthouse**: Core Web Vitals
- **PageSpeed Insights**: Performance metrics
- **Shopify Analytics**: Real user data

## 🚀 Deployment Process

### Development Deployment
```bash
# Build and deploy to development store
npm run push

# Verify changes in development store
```

### Production Deployment
```bash
# Build for production
npm run build

# Deploy to production store
npm run push

# Verify in production
```

### Deployment Checklist
- [ ] All tests pass
- [ ] Code is formatted and linted
- [ ] Performance is acceptable
- [ ] Accessibility is verified
- [ ] Cross-browser compatibility confirmed
- [ ] Mobile responsiveness tested

## 🔍 Debugging

### Browser Developer Tools
- **Elements**: Inspect HTML and CSS
- **Console**: JavaScript errors and logging
- **Network**: API calls and resource loading
- **Performance**: Performance profiling
- **Accessibility**: Accessibility audit

### Shopify Theme Inspector
- **Theme Editor**: Visual editing and debugging
- **Theme Check**: Validation and error checking
- **Liquid Debugging**: Template debugging

### Common Issues

#### Build Errors
```bash
# Check build logs
npm run build:dev

# Clean and rebuild
npm run clean
npm run build:dev
```

#### JavaScript Errors
```javascript
// Use console logging for debugging
console.log('Debug info:', data);

// Use browser breakpoints
debugger;
```

#### CSS Issues
```css
/* Use browser dev tools to inspect styles */
/* Check for specificity conflicts */
/* Verify BEM class structure */
```

## 📚 Documentation

### Code Documentation
- **Inline Comments**: Explain complex logic
- **Function Documentation**: Document parameters and return values
- **Component Documentation**: Document component usage

### Documentation Standards
```javascript
/**
 * Fetches product data from Shopify API
 * @param {number} productId - The product ID
 * @returns {Promise<Object>} Product data
 */
const fetchProduct = async (productId) => {
  // Implementation
};
```

### Updating Documentation
- Document new features as you build them
- Update existing documentation when making changes
- Keep documentation in sync with code

## 🔄 Version Control

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: add new product gallery feature"

# Push to remote
git push origin feature/new-feature

# Create pull request
```

### Commit Standards
- **feat**: New features
- **fix**: Bug fixes
- **docs**: Documentation changes
- **style**: Code style changes
- **refactor**: Code refactoring
- **test**: Test changes
- **chore**: Build process changes

## 🎯 Best Practices

### Performance
- **Lazy Loading**: Load images and resources as needed
- **Minification**: Minimize CSS and JavaScript
- **Caching**: Leverage browser and CDN caching
- **Optimization**: Optimize images and assets

### Accessibility
- **Semantic HTML**: Use proper HTML elements
- **ARIA Attributes**: Add accessibility attributes
- **Keyboard Navigation**: Ensure keyboard accessibility
- **Color Contrast**: Maintain proper contrast ratios

### Security
- **Input Validation**: Validate all user inputs
- **XSS Prevention**: Sanitize user-generated content
- **CSRF Protection**: Use Shopify's built-in protection
- **HTTPS**: Always use secure connections

### Maintainability
- **Code Organization**: Keep code organized and modular
- **Naming Conventions**: Use consistent naming
- **Documentation**: Document complex logic
- **Testing**: Write tests for critical functionality

---

**Happy developing! 🎮** 