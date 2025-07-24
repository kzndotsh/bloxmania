# 📁 Project Structure

This document provides a comprehensive overview of the BloxMania project structure, explaining the organization of files and directories.

## 🎯 Overview

The BloxMania project follows a clean separation between development and production files, with a modern build system that processes source files and generates optimized output for Shopify deployment.

## 📂 Directory Structure

```
bloxmania/
├── dev/                    # 🛠️ Development Environment (Source Files)
│   ├── js/                # JavaScript source files
│   │   ├── core/          # Core utilities and constants
│   │   ├── features/      # Feature-specific modules
│   │   ├── ui/            # UI components and interactions
│   │   ├── helpers/       # Helper utilities
│   │   └── system/        # System-level files
│   ├── css/               # CSS source files
│   │   └── styles.css     # Main stylesheet with Tailwind directives
│   ├── images/            # Image source files
│   ├── sections/          # Shopify sections (Liquid)
│   ├── snippets/          # Shopify snippets (Liquid)
│   ├── templates/         # Shopify templates (Liquid/JSON)
│   ├── layout/            # Shopify layouts
│   ├── config/            # Shopify configuration
│   ├── locales/           # Translation files
│   └── utils/             # Build utilities
├── build/                  # 🔨 Built Assets (Intermediate)
│   ├── css/               # Generated CSS files
│   ├── js/                # Generated JavaScript files
│   └── images/            # Optimized images
├── theme/                  # 🚀 Production Theme (for Shopify)
│   ├── assets/            # Final assets for Shopify
│   ├── sections/          # Shopify sections
│   ├── snippets/          # Shopify snippets
│   ├── templates/         # Shopify templates
│   ├── layout/            # Shopify layouts
│   ├── config/            # Shopify configuration
│   └── locales/           # Translation files
├── docs/                   # 📚 Documentation
├── build.js               # Build script
├── package.json           # Project dependencies
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
├── nodemon.json           # File watching configuration
├── knip.ts                # Unused code detection
├── .env                   # Environment variables (local)
├── .gitignore             # Git exclusions
├── .prettierrc            # Prettier configuration
├── .prettierignore        # Prettier exclusions
├── .stylelintrc.json      # Stylelint configuration
├── .stylelintignore       # Stylelint exclusions
└── .theme-check.yml       # Shopify theme validation
```

## 🛠️ Development Environment (`dev/`)

### JavaScript Organization (`dev/js/`)

#### Core (`dev/js/core/`)
Core utilities and constants used throughout the application.

```
core/
├── api.js                 # Shopify API utilities
├── constants.js           # Application constants
├── dom.js                 # DOM manipulation utilities
├── global.js              # Global variables and settings
├── init.js                # Application initialization
└── pubsub.js              # Event system
```

#### Features (`dev/js/features/`)
Feature-specific modules for different functionality.

```
features/
├── cart.js                # Shopping cart functionality
├── collection.js          # Collection page features
├── customer.js            # Customer account features
├── gallery.js             # Image gallery functionality
├── product.js             # Product page features
├── quick-add.js           # Quick add to cart
└── search.js              # Search functionality
```

#### UI (`dev/js/ui/`)
User interface components and interactions.

```
ui/
├── cart-notification.js   # Cart notification system
├── header-blur.js         # Header blur effects
├── header-components.js   # Header component logic
├── header.js              # Header functionality
├── modal.js               # Modal system
├── quantity.js            # Quantity input component
└── search-modal.js        # Search modal functionality
```

#### Helpers (`dev/js/helpers/`)
Helper utilities for common tasks.

```
helpers/
├── accessibility.js       # Accessibility utilities
├── html-update.js         # HTML update utilities
├── keyboard.js            # Keyboard navigation
├── screen-reader.js       # Screen reader optimization
└── section-id.js          # Section ID utilities
```

#### System (`dev/js/system/`)
System-level files and configurations.

```
system/
├── console-cleanup.js     # Console cleanup utilities
├── performance-monitoring.js # Performance monitoring
├── service-worker-registration.js # Service worker setup
├── shopify-analytics-fix.js # Analytics fixes
├── system-performance.js  # System performance utilities
├── system-service-worker.js # Service worker logic
├── system-theme-editor.js # Theme editor integration
└── system-web-components.js # Web components setup
```

### CSS Organization (`dev/css/`)

#### Main Stylesheet (`dev/css/styles.css`)
The main CSS file containing all styles using Tailwind CSS directives.

```css
/* Tailwind CSS directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom component styles */
@layer components {
  .btn--primary { /* ... */ }
  .card { /* ... */ }
  .form-input { /* ... */ }
}

/* Custom utilities */
@layer utilities {
  .text-shadow { /* ... */ }
  .backdrop-blur-sm { /* ... */ }
}
```

### Shopify Files (`dev/sections/`, `dev/snippets/`, `dev/templates/`)

#### Sections (`dev/sections/`)
Shopify sections are customizable content blocks.

```
sections/
├── contact-form.liquid    # Contact form section
├── customer-reviews.liquid # Customer reviews section
├── faq.liquid            # FAQ section
├── featured-collection.liquid # Featured collection
├── featured-product.liquid # Featured product
├── featured-products.liquid # Featured products grid
├── footer.liquid         # Footer section
├── header.liquid         # Header section
├── hero.liquid           # Hero banner section
├── image-banner.liquid   # Image banner section
├── image-with-text.liquid # Image with text section
├── main-404.liquid       # 404 page section
├── main-account.liquid   # Account page section
├── main-activate-account.liquid # Account activation
├── main-addresses.liquid # Addresses page section
├── main-article.liquid   # Article page section
├── main-blog.liquid      # Blog page section
├── main-cart.liquid      # Cart page section
├── main-collection-banner.liquid # Collection banner
├── main-collection-product-grid.liquid # Collection grid
├── main-guarantee.liquid # Guarantee page section
├── main-login.liquid     # Login page section
├── main-order.liquid     # Order page section
├── main-password.liquid  # Password page section
├── main-product.liquid   # Product page section
├── main-register.liquid  # Register page section
├── main-reset-password.liquid # Reset password
├── main-search.liquid    # Search page section
├── newsletter.liquid     # Newsletter section
├── rich-text.liquid      # Rich text section
├── supported-games.liquid # Supported games section
└── why-choose-us.liquid  # Why choose us section
```

#### Snippets (`dev/snippets/`)
Reusable Liquid components.

```
snippets/
├── accessible-button.liquid # Accessible button component
├── accessible-form.liquid   # Accessible form wrapper
├── accessible-input.liquid  # Accessible input field
├── article-card.liquid      # Article card component
├── breadcrumb.liquid        # Breadcrumb navigation
├── button.liquid            # Button component
├── card-product.liquid      # Product card component
├── cart-notification.liquid # Cart notification
├── chat-widget.liquid       # Chat widget component
├── collapsible-content.liquid # Collapsible content
├── creators-carousel.liquid # Creators carousel
├── icon.liquid              # Icon component
├── loading-spinner.liquid   # Loading spinner
├── meta-tags.liquid         # Meta tags component
├── pagination.liquid        # Pagination component
├── product-buy-buttons.liquid # Product buy buttons
├── product-features.liquid  # Product features
├── product-inventory.liquid # Product inventory
├── product-media-gallery.liquid # Product gallery
├── product-price.liquid     # Product price display
├── product-rating.liquid    # Product rating
├── product-reviews.liquid   # Product reviews
├── product-variant-picker.liquid # Variant picker
├── quantity-input.liquid    # Quantity input
├── related-products.liquid  # Related products
├── responsive-image.liquid  # Responsive image
├── search-form.liquid       # Search form
└── share-button.liquid      # Share button
```

#### Templates (`dev/templates/`)
Page templates that define page structure.

```
templates/
├── 404.json               # 404 error page
├── article.json           # Blog article page
├── blog.json              # Blog listing page
├── cart.json              # Cart page
├── collection.liquid      # Collection page
├── customers/             # Customer account pages
│   ├── account.json       # Account dashboard
│   ├── activate_account.json # Account activation
│   ├── addresses.json     # Address management
│   ├── login.json         # Login page
│   ├── order.json         # Order details
│   ├── register.json      # Registration page
│   └── reset_password.json # Password reset
├── debug-collections.liquid # Debug collections page
├── index.liquid           # Homepage
├── page.guarantee.liquid  # Guarantee page
├── page.liquid            # Generic page
├── password.json          # Password protection
├── product.liquid         # Product page
└── search.json            # Search results
```

### Configuration (`dev/config/`, `dev/layout/`, `dev/locales/`)

#### Layout (`dev/layout/`)
Shopify layout templates.

```
layout/
├── password.liquid        # Password protection layout
└── theme.liquid           # Main theme layout
```

#### Configuration (`dev/config/`)
Shopify theme configuration.

```
config/
├── settings_data.json     # Theme settings data
└── settings_schema.json   # Theme settings schema
```

#### Locales (`dev/locales/`)
Translation files.

```
locales/
├── en.default.json        # English translations
└── en.default.schema.json # English schema
```

## 🔨 Build Directory (`build/`)

The build directory contains intermediate files generated during the build process.

```
build/
├── css/                   # Compiled CSS files
│   └── main.css          # Generated Tailwind CSS
├── js/                    # Bundled JavaScript files
│   └── main.js           # Generated JavaScript bundle
└── images/                # Optimized images
```

## 🚀 Production Theme (`theme/`)

The theme directory contains the final production-ready files for Shopify deployment.

```
theme/
├── assets/                # Production assets
│   ├── main.css          # Final CSS file
│   ├── main.js           # Final JavaScript file
│   └── [images]          # Optimized images
├── sections/              # Shopify sections
├── snippets/              # Shopify snippets
├── templates/             # Shopify templates
├── layout/                # Shopify layouts
├── config/                # Shopify configuration
└── locales/               # Translation files
```

## 📚 Documentation (`docs/`)

Comprehensive documentation for the project.

```
docs/
├── README.md              # Main documentation index
├── GETTING_STARTED.md     # Setup and installation guide
├── DEVELOPMENT.md         # Development workflow
├── DEVELOPMENT_SCRIPTS.md # Development scripts guide
├── BUILD_SYSTEM.md        # Build system documentation
├── PROJECT_STRUCTURE.md   # This file
├── sections/              # Section documentation
├── snippets/              # Snippet documentation
├── templates/             # Template documentation
└── style-guide/           # Style guide and standards
```

## ⚙️ Configuration Files

### Build Configuration
- **`build.js`**: Main build script
- **`package.json`**: Project dependencies and scripts
- **`tailwind.config.js`**: Tailwind CSS configuration
- **`postcss.config.js`**: PostCSS configuration
- **`nodemon.json`**: File watching configuration

### Code Quality
- **`.prettierrc`**: Prettier code formatting
- **`.prettierignore`**: Prettier exclusions
- **`.stylelintrc.json`**: Stylelint CSS linting
- **`.stylelintignore`**: Stylelint exclusions
- **`.theme-check.yml`**: Shopify theme validation

### Development Tools
- **`knip.ts`**: Unused code detection
- **`.env`**: Environment variables
- **`.gitignore`**: Git exclusions

## 🔄 Development Workflow

### File Flow
1. **Development**: Edit files in `dev/` directory
2. **Build Process**: `build.js` processes and compiles files
3. **Intermediate**: Files are generated in `build/` directory
4. **Production**: Final files are copied to `theme/` directory
5. **Deployment**: Only `theme/` directory is deployed to Shopify

### Build Process
1. **CSS Processing**: Tailwind CSS compilation
2. **JavaScript Bundling**: Module bundling and optimization
3. **Asset Optimization**: Image compression and optimization
4. **File Copying**: Shopify files copied to production
5. **Validation**: Theme structure validation

## 🎯 Best Practices

### File Organization
- **Keep `dev/` organized**: Maintain clear structure in development files
- **Use descriptive names**: Name files and directories clearly
- **Group related files**: Keep related functionality together
- **Follow conventions**: Use consistent naming and structure

### Development
- **Never edit `theme/` directly**: All changes should be made in `dev/`
- **Use build commands**: Let the build system handle file generation
- **Test changes**: Verify changes work before committing
- **Keep backups**: Backup important files before major changes

### Performance
- **Optimize assets**: Compress images and minify code
- **Use efficient selectors**: Keep CSS selectors simple
- **Minimize dependencies**: Only include necessary files
- **Monitor file sizes**: Keep production files lean

## 🚨 Important Notes

### Directory Purposes
- **`dev/`**: Source files for development (edit here)
- **`build/`**: Intermediate files (generated, don't edit)
- **`theme/`**: Production files (generated, don't edit)
- **`docs/`**: Documentation (edit for updates)

### File Types
- **`.liquid`**: Shopify Liquid templates
- **`.json`**: JSON templates and configuration
- **`.css`**: Stylesheets
- **`.js`**: JavaScript files
- **`.md`**: Documentation files

### Build Output
- **CSS**: Single optimized file in `theme/assets/main.css`
- **JavaScript**: Single bundled file in `theme/assets/main.js`
- **Images**: Optimized images in `theme/assets/`
- **Shopify Files**: Direct copies from `dev/` to `theme/`

---

**Organized for efficient development and deployment! 📁** 