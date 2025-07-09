# BloxMania Shopify Theme - Technical Documentation

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Theme Structure](#theme-structure)
3. [How It Works](#how-it-works)
4. [Development Workflow](#development-workflow)
5. [Shopify CLI Integration](#shopify-cli-integration)
6. [Customization Guide](#customization-guide)
7. [Performance Optimization](#performance-optimization)
8. [Troubleshooting](#troubleshooting)

## Architecture Overview

### Theme Architecture
The BloxMania theme follows Shopify's recommended architecture patterns:

```
shopify-theme/
├── assets/           # Static assets (CSS, JS, images)
├── config/           # Theme settings and configuration
├── layout/           # Main layout template
├── sections/         # Reusable content sections
├── snippets/         # Reusable code snippets
├── templates/        # Page templates
└── locales/          # Translation files
```

### Key Design Principles
- **Modularity**: Each section is self-contained and reusable
- **Responsive Design**: Mobile-first approach with progressive enhancement
- **Performance**: Optimized assets and lazy loading
- **Accessibility**: WCAG 2.1 AA compliance
- **SEO**: Structured data and meta tags

## Theme Structure

### Core Files

#### Layout (`layout/theme.liquid`)
The main layout file that wraps all pages:
- HTML5 semantic structure
- Meta tags and SEO optimization
- CSS and JavaScript includes
- Responsive viewport settings
- Structured data markup

#### Templates
- **`templates/index.liquid`**: Homepage with hero and featured products
- **`templates/product.liquid`**: Individual product pages
- **`templates/collection.liquid`**: Product collection pages
- **`templates/cart.liquid`**: Shopping cart page

#### Sections
- **`sections/header.liquid`**: Navigation with mobile menu
- **`sections/hero.liquid`**: Hero banner with creator showcase
- **`sections/featured-products.liquid`**: Product grid
- **`sections/footer.liquid`**: Footer with newsletter signup

#### Assets
- **`assets/base.css`**: Main stylesheet with dark theme
- **`assets/global.js`**: JavaScript functionality
- **Images**: All original assets preserved

## How It Works

### Liquid Templating
The theme uses Shopify's Liquid templating language:

```liquid
{% comment %} Example: Product loop {% endcomment %}
{% for product in collections.featured.products limit: 8 %}
  <div class="product-card">
    <img src="{{ product.featured_image | img_url: '400x400' }}" alt="{{ product.title }}">
    <h3>{{ product.title }}</h3>
    <p>{{ product.price | money }}</p>
  </div>
{% endfor %}
```

### Section Settings
Each section is configurable through the theme editor:

```liquid
{% comment %} Example: Hero section settings {% endcomment %}
{% schema %}
{
  "name": "Hero Banner",
  "settings": [
    {
      "type": "text",
      "id": "hero_title",
      "label": "Hero Title",
      "default": "Welcome to BloxMania"
    },
    {
      "type": "image_picker",
      "id": "hero_image",
      "label": "Hero Background"
    }
  ]
}
{% endschema %}
```

### JavaScript Functionality
The theme includes interactive features:

```javascript
// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  mobileMenuToggle.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
  });
});

// Add to cart functionality
function addToCart(productId, variantId, quantity = 1) {
  const formData = {
    items: [{
      id: variantId,
      quantity: quantity
    }]
  };
  
  fetch('/cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
    // Update cart count and show success message
    updateCartCount();
    showNotification('Product added to cart!');
  });
}
```

### CSS Architecture
The theme uses a modular CSS approach:

```css
/* CSS Custom Properties for theming */
:root {
  --primary-color: #ffd800;
  --secondary-color: #4791f0;
  --background-color: #181926;
  --surface-color: #23243a;
  --text-color: #ffffff;
  --text-muted: #9ca3af;
}

/* Responsive design with CSS Grid and Flexbox */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
}

/* Mobile-first media queries */
@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem 0;
  }
}
```

## Development Workflow

### Local Development Setup

#### Option 1: Shopify CLI (Recommended)
```bash
# Install Shopify CLI
npm install -g @shopify/cli @shopify/theme

# Initialize theme development
shopify theme init bloxmania-theme

# Start development server
shopify theme dev

# Deploy to development store
shopify theme push

# Pull changes from store
shopify theme pull
```

#### Option 2: Manual Development
```bash
# Create theme package
cd shopify-theme
./deploy.sh

# Upload via Shopify admin panel
# Online Store > Themes > Add theme > Upload theme
```

### Development Commands

#### Shopify CLI Commands
```bash
# Start development server with live reload
shopify theme dev

# Push theme to development store
shopify theme push

# Pull theme from store
shopify theme pull

# Check theme for issues
shopify theme check

# Deploy to production
shopify theme deploy

# Create new section
shopify theme generate section hero-banner

# Create new snippet
shopify theme generate snippet product-card
```

#### Manual Commands
```bash
# Create deployment package
./deploy.sh

# Validate theme structure
find . -name "*.liquid" -exec echo "Validating {}" \;

# Minify CSS and JS
npm run build

# Run tests
npm test
```

## Shopify CLI Integration

### Why Shopify CLI is Important
The Shopify CLI provides essential development tools:
- **Live Preview**: Real-time theme preview with hot reload
- **Theme Check**: Automated validation and best practices
- **Version Control**: Git integration and deployment
- **Development Store**: Isolated testing environment
- **Asset Optimization**: Automatic compression and optimization

### Setup Instructions

#### 1. Install Shopify CLI
```bash
# Install via npm
npm install -g @shopify/cli @shopify/theme

# Or install via Homebrew (macOS)
brew tap shopify/shopify
brew install shopify-cli
```

#### 2. Authenticate with Shopify
```bash
# Login to your Shopify account
shopify auth login

# Select your store
shopify store select
```

#### 3. Initialize Theme Development
```bash
# Create new theme from existing files
shopify theme init bloxmania-theme --clone-url=your-repo-url

# Or initialize in existing directory
cd shopify-theme
shopify theme init
```

#### 4. Development Workflow
```bash
# Start development server
shopify theme dev

# Make changes to files (live reload enabled)
# Edit sections/hero.liquid, assets/base.css, etc.

# Push changes to development store
shopify theme push

# Test on development store
# Visit your-store.myshopify.com

# Deploy to production when ready
shopify theme deploy
```

### Theme Check Integration
Shopify CLI includes automated theme validation:

```bash
# Run theme check
shopify theme check

# Check specific files
shopify theme check sections/hero.liquid

# Fix auto-fixable issues
shopify theme check --auto-correct
```

### Git Integration
```bash
# Initialize git repository
git init

# Add files
git add .

# Commit changes
git commit -m "Initial theme commit"

# Push to remote repository
git push origin main

# Create development branch
git checkout -b feature/new-section

# Merge changes
git checkout main
git merge feature/new-section
```

## Customization Guide

### Theme Settings
Configure the theme through `config/settings_schema.json`:

```json
{
  "name": "Theme Info",
  "settings": [
    {
      "type": "header",
      "content": "Colors"
    },
    {
      "type": "color",
      "id": "primary_color",
      "label": "Primary Color",
      "default": "#ffd800"
    },
    {
      "type": "header",
      "content": "Typography"
    },
    {
      "type": "font_picker",
      "id": "heading_font",
      "label": "Heading Font",
      "default": "helvetica_n4"
    }
  ]
}
```

### Section Customization
Each section can be customized independently:

```liquid
{% comment %} sections/hero.liquid {% endcomment %}
<div class="hero-section" style="background-image: url({{ section.settings.hero_image | img_url: '1920x' }})">
  <div class="hero-content">
    <h1>{{ section.settings.hero_title }}</h1>
    <p>{{ section.settings.hero_subtitle }}</p>
    <a href="{{ section.settings.cta_link }}" class="btn btn-primary">
      {{ section.settings.cta_text }}
    </a>
  </div>
</div>

{% schema %}
{
  "name": "Hero Section",
  "settings": [
    {
      "type": "text",
      "id": "hero_title",
      "label": "Hero Title",
      "default": "Welcome to BloxMania"
    },
    {
      "type": "textarea",
      "id": "hero_subtitle",
      "label": "Hero Subtitle",
      "default": "Your ultimate destination for gaming items"
    },
    {
      "type": "image_picker",
      "id": "hero_image",
      "label": "Background Image"
    },
    {
      "type": "url",
      "id": "cta_link",
      "label": "CTA Link"
    },
    {
      "type": "text",
      "id": "cta_text",
      "label": "CTA Text",
      "default": "Shop Now"
    }
  ],
  "presets": [
    {
      "name": "Hero Section"
    }
  ]
}
{% endschema %}
```

### Adding New Sections
Create new sections for additional functionality:

```bash
# Using Shopify CLI
shopify theme generate section newsletter-signup

# Or manually create sections/newsletter-signup.liquid
```

### Custom JavaScript
Add custom functionality to `assets/global.js`:

```javascript
// Custom product quick view
function initQuickView() {
  const quickViewButtons = document.querySelectorAll('.quick-view-btn');
  
  quickViewButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const productId = this.dataset.productId;
      openQuickView(productId);
    });
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  initQuickView();
});
```

## Performance Optimization

### Asset Optimization
- **CSS Minification**: Compress CSS files
- **JavaScript Bundling**: Combine and minify JS files
- **Image Optimization**: Use WebP format and responsive images
- **Lazy Loading**: Load images as needed

### Code Optimization
```liquid
{% comment %} Optimize product loops {% endcomment %}
{% assign products = collections.featured.products | slice: 0, 8 %}
{% for product in products %}
  {% render 'product-card', product: product %}
{% endfor %}
```

### Caching Strategies
- **Browser Caching**: Set appropriate cache headers
- **CDN**: Use Shopify's global CDN
- **Asset Versioning**: Include version numbers in asset URLs

## Troubleshooting

### Common Issues

#### 1. Theme Not Loading
```bash
# Check theme syntax
shopify theme check

# Validate Liquid syntax
# Look for missing {% endfor %} or {% endif %} tags
```

#### 2. Assets Not Loading
```bash
# Check file paths
# Ensure assets are in the correct directory
# Verify file permissions
```

#### 3. Mobile Menu Not Working
```javascript
// Check JavaScript console for errors
// Verify event listeners are attached
// Test on different devices
```

#### 4. Performance Issues
```bash
# Run performance audit
shopify theme check --performance

# Optimize images
# Minify CSS and JavaScript
# Enable lazy loading
```

### Debug Tools
- **Shopify Theme Inspector**: Browser extension for debugging
- **Liquid Debug**: Use `{{ debug }}` in templates
- **Console Logging**: Add `console.log()` statements
- **Network Tab**: Check asset loading in browser dev tools

### Getting Help
- **Shopify Documentation**: https://shopify.dev/themes
- **Shopify Community**: https://community.shopify.com
- **Theme Check**: https://shopify.dev/themes/tools/theme-check
- **Liquid Reference**: https://shopify.dev/docs/api/liquid

## Best Practices

### Code Organization
- Keep sections modular and reusable
- Use consistent naming conventions
- Comment complex logic
- Follow Shopify's coding standards

### Performance
- Minimize HTTP requests
- Optimize images and assets
- Use efficient Liquid loops
- Implement lazy loading

### Accessibility
- Use semantic HTML
- Provide alt text for images
- Ensure keyboard navigation
- Test with screen readers

### SEO
- Use descriptive page titles
- Include meta descriptions
- Implement structured data
- Optimize for Core Web Vitals

This documentation provides a comprehensive guide to understanding, developing, and maintaining the BloxMania Shopify theme. The Shopify CLI integration is highly recommended for efficient development workflow and better debugging capabilities.