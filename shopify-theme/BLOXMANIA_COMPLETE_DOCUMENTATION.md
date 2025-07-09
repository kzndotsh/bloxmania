# BloxMania Shopify Theme - Complete Documentation

---

## Table of Contents
1. [Introduction](#introduction)
2. [Quick Start](#quick-start)
3. [Theme Features](#theme-features)
4. [Installation & Setup](#installation--setup)
5. [Customization Guide](#customization-guide)
6. [File Structure & Safe Editing](#file-structure--safe-editing)
7. [Development Workflow](#development-workflow)
8. [Technical Architecture](#technical-architecture)
9. [Advanced Customization](#advanced-customization)
10. [Troubleshooting & Support](#troubleshooting--support)
11. [Pre-Launch Checklist](#pre-launch-checklist)
12. [Performance Optimization](#performance-optimization)
13. [Credits & License](#credits--license)

---

## Introduction
BloxMania is a modern, responsive Shopify theme designed for digital goods marketplaces, specifically optimized for gaming items and virtual products. It features a dark gaming aesthetic with neon accents, smooth animations, and is built for both non-technical clients and developers.

### Key Design Principles
- **Modularity**: Each section is self-contained and reusable
- **Responsive Design**: Mobile-first approach with progressive enhancement
- **Performance**: Optimized assets and lazy loading
- **Accessibility**: WCAG 2.1 AA compliance
- **SEO**: Structured data and meta tags

---

## Quick Start

### For Clients (Non-Technical Users)
1. **Upload Theme**: Shopify Admin → Online Store → Themes → Add theme → Upload theme ZIP → Publish
2. **Basic Customization**: Use the Shopify theme editor to update logo, store name, contact info, and social links
3. **Add Products**: Shopify Admin → Products → Add product
4. **Test Everything**: Ensure homepage, products, and mobile version work

### For Developers
1. `npm install` (in `shopify-theme/`)
2. `npm run setup` (Shopify CLI setup)
3. `npm run dev` (start development server)
4. `npm run push` (deploy to development store)

---

## Theme Features

### 🎨 Design & UX
- **Dark Gaming Aesthetic**: Modern dark theme with neon accents
- **Responsive Design**: Fully responsive across all devices
- **Smooth Animations**: CSS animations and transitions throughout
- **Custom Typography**: Optimized font hierarchy and readability
- **Interactive Elements**: Hover effects, loading states, and micro-interactions

### 🛍️ E-commerce Features
- **Product Showcase**: Featured products with hover effects
- **Shopping Cart**: Real-time cart updates and notifications
- **Product Variants**: Support for multiple product options
- **Inventory Management**: Stock status indicators
- **Quick Add to Cart**: One-click product addition

### 📱 Mobile Optimized
- **Mobile-First Design**: Optimized for mobile devices
- **Touch-Friendly**: Large touch targets and gestures
- **Mobile Menu**: Slide-out navigation menu
- **Responsive Images**: Optimized image loading

### ⚡ Performance
- **Fast Loading**: Optimized CSS and JavaScript
- **Lazy Loading**: Images load as needed
- **Minified Assets**: Compressed CSS and JS files
- **CDN Ready**: Compatible with Shopify's CDN

---

## Installation & Setup

### Method 1: Shopify CLI (Recommended for Developers)
```bash
# Install dependencies
npm install

# Setup Shopify CLI
npm run setup

# Start development server
npm run dev

# Deploy to development store
npm run push
```

### Method 2: Manual Upload (For Clients)
1. Go to your Shopify admin panel
2. Navigate to Online Store > Themes
3. Click "Add theme" > "Upload theme"
4. Upload the theme ZIP file
5. Click "Publish" to activate the theme

### Method 3: Development Setup
1. Install Shopify CLI: `npm install -g @shopify/cli`
2. Clone the repository
3. Run `shopify theme dev` to start development server
4. Make changes and preview in real-time

---

## Customization Guide

### Safe to Edit (No Coding Required)
- **Theme Editor**: Colors, fonts, logo, hero, footer, social links
- **Config Files**: `config/client-settings.json` (store info, colors, hero, social), `config/content.json` (site text)

### Advanced (Optional)
- **Theme Settings**: Shopify Admin → Customize → Theme Settings
- **Section Content**: Edit via theme editor or config files

### Example: Change Store Name
```json
// config/client-settings.json
{
  "store": { "name": "Your Store Name" }
}
```

### Example: Update Social Media Links
```json
// config/client-settings.json
{
  "social": {
    "discord": "https://discord.gg/your-server",
    "youtube": "https://youtube.com/@your-channel",
    "twitter": "https://twitter.com/your-handle"
  }
}
```

### Example: Customize Hero Section
```json
// config/client-settings.json
{
  "hero": {
    "title": "Welcome to Your Store",
    "subtitle": "Your amazing tagline here",
    "cta_text": "Shop Now",
    "cta_link": "/collections/all"
  }
}
```

### Complete Configuration Reference

#### Store Information
```json
{
  "store": {
    "name": "Your Store Name",           // Your business name
    "description": "Your description",   // Brief business description
    "email": "your@email.com",          // Contact email
    "phone": "+1 (555) 123-4567",       // Contact phone
    "address": "Your address"           // Business address
  }
}
```

#### Colors
```json
{
  "colors": {
    "primary": "#ffd800",      // Main accent color (neon yellow)
    "secondary": "#4791f0",    // Secondary accent (blue)
    "background": "#181926",   // Main background (dark)
    "surface": "#23243a",      // Card backgrounds
    "text": "#ffffff",         // Main text color
    "text_muted": "#9ca3af"    // Secondary text color
  }
}
```

#### Features
```json
{
  "features": {
    "show_creator_endorsements": true,  // Show YouTube creators
    "show_trust_indicators": true,      // Show trust badges
    "show_newsletter_signup": true,     // Show newsletter signup
    "show_social_links": true,          // Show social media links
    "enable_quick_view": true,          // Enable quick product view
    "enable_wishlist": false            // Enable wishlist feature
  }
}
```

#### Content Text (config/content.json)
```json
{
  "homepage": {
    "hero": {
      "title": "Welcome to Your Store",
      "subtitle": "Your amazing tagline",
      "cta_text": "Shop Now",
      "cta_link": "/collections/all"
    },
    "featured_products": {
      "title": "Featured Products",
      "subtitle": "Handpicked items for you"
    }
  },
  "product": {
    "add_to_cart": "Add to Cart",
    "out_of_stock": "Out of Stock",
    "free_shipping": "Free Shipping",
    "money_back": "30-Day Money Back Guarantee",
    "secure_checkout": "Secure Checkout"
  },
  "cart": {
    "title": "Shopping Cart",
    "empty_message": "Your cart is empty",
    "checkout": "Proceed to Checkout",
    "continue_shopping": "Continue Shopping"
  }
}
```

---

## File Structure & Safe Editing

```
shopify-theme/
├── assets/         # CSS, JS, images (DON'T TOUCH)
├── config/         # client-settings.json, content.json (SAFE TO EDIT)
├── layout/         # Main layout (DON'T TOUCH)
├── sections/       # Theme sections (DON'T TOUCH)
├── snippets/       # Code snippets (DON'T TOUCH)
├── templates/      # Page templates (DON'T TOUCH)
├── locales/        # Translations
├── README.md       # Main documentation
├── ...
```

- **SAFE TO EDIT**: `config/client-settings.json`, `config/content.json`
- **DON'T TOUCH**: `.liquid`, `.css`, `.js`, `assets/`, `layout/`, `sections/`, `templates/`

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

---

## Development Workflow

### CLI Commands
```bash
npm run dev          # Start development server
npm run watch        # Watch for changes
npm run check        # Run theme validation
npm run lint         # Run linting
npm run push         # Push to development store
npm run deploy       # Deploy to production
npm run package      # Create ZIP package
npm run optimize     # Optimize assets
```

### Manual Shopify CLI
```bash
shopify theme dev
shopify theme push
shopify theme check
shopify theme deploy
```

### Available Scripts
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

---

## Technical Architecture

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

---

## Advanced Customization

### Theme Settings
Access theme customization through:
1. Shopify Admin > Online Store > Themes
2. Click "Customize" on the active theme
3. Modify settings in the theme editor

### Available Sections
- **Header**: Logo, navigation, mobile menu
- **Hero**: Main banner with call-to-action
- **Featured Products**: Product showcase grid
- **Footer**: Links, social media, newsletter

### Color Scheme
The theme uses CSS custom properties for easy color customization:
```css
:root {
  --primary-color: #ffd800;    /* Main accent color */
  --secondary-color: #4791f0;  /* Secondary accent */
  --background-color: #181926; /* Main background */
  --surface-color: #23243a;    /* Card backgrounds */
  --text-color: #ffffff;       /* Primary text */
  --text-muted: #9ca3af;       /* Secondary text */
}
```

### Typography
The theme uses Inter font family by default. To change:
1. Go to Theme Settings > Typography
2. Select your preferred font
3. Adjust font sizes and weights

---

## Troubleshooting & Support

### Common Issues
- **Theme not loading**: Clear cache, check assets
- **Mobile menu not working**: Ensure JS enabled
- **Products not displaying**: Check collections, product availability
- **Colors not updating**: Clear browser cache, check CSS custom properties

### Support Resources
- **Shopify Help Center**: https://help.shopify.com
- **Theme Documentation**: See this file for complete documentation
- **Developer Support**: Contact your theme developer

### Quick Questions:
- **"How do I change colors?"** → Use the theme editor
- **"How do I add my logo?"** → Theme editor → Header section
- **"How do I change text?"** → Edit config files or use theme editor
- **"Something's not working!"** → Check the troubleshooting guide

---

## Pre-Launch Checklist

Before going live with your theme:

- [ ] Theme uploaded and published
- [ ] Logo uploaded and positioned correctly
- [ ] Store name and contact information updated
- [ ] Social media links added and working
- [ ] Hero section content customized
- [ ] Colors match your brand
- [ ] At least one product added
- [ ] Mobile version tested
- [ ] Contact forms working
- [ ] Newsletter signup functional
- [ ] Test purchase flow completed
- [ ] SEO meta tags configured
- [ ] Performance optimized

---

## Performance Optimization

### Images
- Use WebP format when possible
- Optimize image sizes before upload
- Enable lazy loading for product images

### CSS/JS
- Minify CSS and JavaScript in production
- Use CSS custom properties for theming
- Implement critical CSS inline

### Caching
- Enable browser caching
- Use Shopify's CDN
- Optimize font loading

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Credits & License
- **Design**: Inspired by modern gaming UIs
- **Development**: BloxMania Team
- **License**: MIT (see LICENSE file)

---

**Remember:** When in doubt, use the Shopify theme editor—it's the safest way to make changes!

### ✅ DO:
- Use the Shopify theme editor for most changes
- Edit configuration files for advanced customization
- Test changes before going live
- Keep backups of your settings
- Contact support if you're unsure

### ❌ DON'T:
- Edit any `.liquid` files
- Edit any `.css` or `.js` files
- Delete or rename theme files
- Make changes directly to live store without testing
- Ignore error messages