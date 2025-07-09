# BloxMania Shopify Theme - Development Guide

## Quick Start

### Option 1: Shopify CLI (Recommended)
```bash
# Install dependencies
npm install

# Setup Shopify CLI
npm run setup

# Start development server
npm run dev

# Deploy to development store
npm run push

# Deploy to production
npm run deploy
```

### Option 2: Manual Development
```bash
# Create deployment package
npm run package

# Upload via Shopify admin panel
# Online Store > Themes > Add theme > Upload theme
```

## Development Workflow

### 1. Initial Setup

#### Install Dependencies
```bash
# Install Node.js dependencies
npm install

# Install Shopify CLI globally
npm install -g @shopify/cli @shopify/theme
```

#### Authenticate with Shopify
```bash
# Login to your Shopify account
shopify auth login

# Select your development store
shopify store select

# Initialize theme development
shopify theme init
```

### 2. Development Commands

#### Available Scripts
```bash
# Development
npm run dev          # Start development server with live reload
npm run watch        # Watch for file changes
npm run serve        # Serve theme locally

# Deployment
npm run push         # Push to development store
npm run pull         # Pull from store
npm run deploy       # Deploy to production
npm run package      # Create ZIP package

# Quality Assurance
npm run check        # Run theme check
npm run check:fix    # Auto-fix theme issues
npm run lint         # Run linting checks
npm run test         # Generate theme check report

# Optimization
npm run optimize     # Optimize assets for production
npm run build        # Build theme for production
```

#### Manual Commands
```bash
# Development server
shopify theme dev

# Theme operations
shopify theme push
shopify theme pull
shopify theme deploy

# Theme validation
shopify theme check
shopify theme check --auto-correct

# Generate new components
shopify theme generate section hero-banner
shopify theme generate snippet product-card
```

### 3. File Structure

```
shopify-theme/
├── assets/                 # Static assets
│   ├── base.css           # Main stylesheet
│   ├── global.js          # JavaScript functionality
│   └── [images]/          # Theme images
├── config/                 # Theme configuration
│   ├── settings_schema.json
│   └── settings_data.json
├── layout/                 # Main layout
│   └── theme.liquid
├── sections/               # Reusable sections
│   ├── header.liquid
│   ├── hero.liquid
│   ├── featured-products.liquid
│   └── footer.liquid
├── snippets/               # Reusable code snippets
│   └── meta-tags.liquid
├── templates/              # Page templates
│   ├── index.liquid
│   ├── product.liquid
│   └── collection.liquid
├── locales/                # Translation files
├── package.json            # Node.js dependencies
├── deploy.sh              # Deployment script
└── README.md              # Theme documentation
```

## Theme Architecture

### 1. Layout System
The theme uses a modular layout system:

```liquid
{% comment %} layout/theme.liquid {% endcomment %}
<!DOCTYPE html>
<html lang="{{ request.locale.iso_code }}">
<head>
  {% render 'meta-tags' %}
  {{ 'base.css' | asset_url | stylesheet_tag }}
</head>
<body>
  {% section 'header' %}
  
  <main role="main">
    {{ content_for_layout }}
  </main>
  
  {% section 'footer' %}
  
  {{ 'global.js' | asset_url | script_tag }}
</body>
</html>
```

### 2. Section System
Sections are modular, configurable content blocks:

```liquid
{% comment %} sections/hero.liquid {% endcomment %}
<div class="hero-section">
  <div class="hero-content">
    <h1>{{ section.settings.hero_title }}</h1>
    <p>{{ section.settings.hero_subtitle }}</p>
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
    }
  ]
}
{% endschema %}
```

### 3. Asset Management
Assets are optimized for performance:

```css
/* assets/base.css */
:root {
  --primary-color: #ffd800;
  --secondary-color: #4791f0;
  --background-color: #181926;
  --surface-color: #23243a;
  --text-color: #ffffff;
  --text-muted: #9ca3af;
}

/* Responsive design */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
```

## Customization Guide

### 1. Theme Settings
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

### 2. Adding New Sections
Create new sections for additional functionality:

```bash
# Using Shopify CLI
shopify theme generate section newsletter-signup

# Or manually create sections/newsletter-signup.liquid
```

### 3. Custom JavaScript
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

## Deployment Options

### 1. Shopify CLI Deployment (Recommended)

#### Development Deployment
```bash
# Push to development store
npm run push

# Or using CLI directly
shopify theme push
```

#### Production Deployment
```bash
# Deploy to production
npm run deploy

# Or using CLI directly
shopify theme deploy
```

#### Live Theme Deployment
```bash
# Make theme live
shopify theme push --live
```

### 2. Manual Deployment

#### Create Package
```bash
# Create ZIP package
npm run package

# Or using deployment script
./deploy.sh
```

#### Upload via Admin Panel
1. Go to Shopify admin panel
2. Navigate to Online Store > Themes
3. Click "Add theme" > "Upload theme"
4. Upload the ZIP file
5. Click "Publish" to activate

### 3. Automated Deployment

#### Using Deployment Script
```bash
# Manual deployment (default)
./deploy.sh

# Shopify CLI deployment
./deploy.sh --cli

# Show help
./deploy.sh --help
```

## Quality Assurance

### 1. Theme Check
```bash
# Run comprehensive theme check
npm run check

# Auto-fix issues
npm run check:fix

# Check specific categories
shopify theme check --include-categories Liquid,Performance,Accessibility
```

### 2. Performance Testing
```bash
# Run performance audit
shopify theme check --performance

# Generate performance report
shopify theme check --output=json > performance-report.json
```

### 3. Browser Testing
- Test on Chrome, Firefox, Safari, Edge
- Test on mobile devices (iOS, Android)
- Test responsive design at different breakpoints
- Verify accessibility compliance

## Troubleshooting

### Common Issues

#### 1. Shopify CLI Not Working
```bash
# Check installation
shopify version

# Reinstall CLI
npm uninstall -g @shopify/cli @shopify/theme
npm install -g @shopify/cli @shopify/theme

# Clear cache
shopify auth logout
shopify auth login
```

#### 2. Theme Not Loading
```bash
# Check theme syntax
shopify theme check

# Validate Liquid syntax
# Look for missing {% endfor %} or {% endif %} tags
```

#### 3. Assets Not Loading
```bash
# Check file paths
# Ensure assets are in the correct directory
# Verify file permissions
```

#### 4. Development Server Issues
```bash
# Check port availability
lsof -i :9292

# Use different port
shopify theme dev --port=9293

# Clear cache and restart
shopify theme dev --reset
```

### Debug Tools
- **Shopify Theme Inspector**: Browser extension for debugging
- **Liquid Debug**: Use `{{ debug }}` in templates
- **Console Logging**: Add `console.log()` statements
- **Network Tab**: Check asset loading in browser dev tools

## Best Practices

### 1. Development Workflow
- Always work on a development store first
- Use feature branches for new development
- Test thoroughly before pushing to production
- Use theme check regularly

### 2. Code Organization
- Keep sections modular and reusable
- Use consistent naming conventions
- Comment complex Liquid logic
- Follow Shopify's file structure

### 3. Performance
- Minimize HTTP requests
- Optimize images and assets
- Use efficient Liquid loops
- Implement lazy loading

### 4. Accessibility
- Use semantic HTML
- Provide alt text for images
- Ensure keyboard navigation
- Test with screen readers

## Resources

### Documentation
- [Shopify CLI Documentation](https://shopify.dev/docs/themes/tools/cli)
- [Theme Check Documentation](https://shopify.dev/docs/themes/tools/theme-check)
- [Liquid Reference](https://shopify.dev/docs/api/liquid)

### Community
- [Shopify Community](https://community.shopify.com)
- [Shopify Partners](https://partners.shopify.com)
- [GitHub Discussions](https://github.com/Shopify/shopify-cli/discussions)

### Tools
- [Shopify Theme Inspector](https://chrome.google.com/webstore/detail/shopify-theme-inspector/fndafploccfngojkjcbghbflflgajnnj)
- [Liquid Syntax Highlighting](https://marketplace.visualstudio.com/items?itemName=neilding.language-liquid)

This development guide provides everything you need to efficiently develop, test, and deploy the BloxMania Shopify theme using both manual and Shopify CLI workflows.