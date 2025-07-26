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
│   │   ├── main.css       # Main entry point with imports
│   │   ├── design-tokens.css # CSS custom properties
│   │   ├── base/          # Base styles (reset, typography, etc.)
│   │   ├── layout/        # Layout components
│   │   ├── components/    # Reusable components
│   │   ├── sections/      # Section-specific styles
│   │   └── utilities/     # Utility classes
│   ├── images/            # Image source files
│   ├── sections/          # Shopify sections (Liquid)
│   ├── snippets/          # Shopify snippets (Liquid)
│   ├── templates/         # Shopify templates (Liquid/JSON)
│   ├── layout/            # Shopify layouts
│   ├── config/            # Shopify configuration
│   ├── locales/           # Translation files
│   └── utils/             # Build utilities
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
├── html-update.js         # HTML update helpers
├── keyboard.js            # Keyboard navigation
├── screen-reader.js       # Screen reader support
└── section-id.js          # Section ID generation
```

#### System (`dev/js/system/`)
System-level files for performance and functionality.

```
system/
├── console-cleanup.js     # Console cleanup utilities
├── performance-monitoring.js # Performance monitoring
├── service-worker-registration.js # Service worker setup
├── shopify-analytics-fix.js # Analytics fixes
├── system-performance.js  # Performance optimizations
├── system-service-worker.js # Service worker functionality
├── system-theme-editor.js # Theme editor integration
└── system-web-components.js # Web components
```

### CSS Organization (`dev/css/`)

The CSS follows a modular architecture with clear separation of concerns.

#### Main Entry Point (`dev/css/main.css`)
The main CSS file that imports all other CSS modules in the correct order.

```css
/* Design Tokens - CSS Custom Properties */
@import "./design-tokens.css";

/* Base Layer - Reset, typography, animations, accessibility */
@import "./base/reset.css";
@import "./base/typography.css";
@import "./base/animations.css";
@import "./base/accessibility.css";

/* Layout Layer - Header, footer, grid, spacing */
@import "./layout/header.css";
@import "./layout/footer.css";
@import "./layout/grid.css";
@import "./layout/spacing.css";

/* Components Layer - Reusable component styles */
@import "./components/component-button.css";
@import "./components/component-card.css";
@import "./components/component-mobile-menu.css";
@import "./components/component-product-form.css";
@import "./components/component-hero.css";
@import "./components/component-search-modal.css";

/* Sections Layer - Section-specific styles */
@import "./sections/section-header.css";
@import "./sections/section-footer.css";
@import "./sections/section-hero.css";
@import "./sections/section-guarantee.css";
@import "./sections/section-customer-reviews.css";
@import "./sections/section-featured-products.css";

/* Utilities Layer - Responsive, states, overrides */
@import "./utilities/responsive.css";
@import "./utilities/states.css";
@import "./utilities/overrides.css";
@import "./utilities/spacing.css";
@import "./utilities/typography.css";

/* Tailwind CSS Layers */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### Design Tokens (`dev/css/design-tokens.css`)
CSS custom properties for consistent design values.

```css
:root {
  /* Colors */
  --color-primary: #3b82f6;
  --color-secondary: #64748b;
  --color-accent: #f59e0b;
  
  /* Typography */
  --font-family-base: 'Inter', sans-serif;
  --font-size-base: 1rem;
  --line-height-base: 1.5;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
}
```

#### Base Styles (`dev/css/base/`)
Foundation styles that apply globally.

```
base/
├── reset.css              # CSS reset and normalization
├── typography.css         # Typography rules and font settings
├── animations.css         # CSS animations and transitions
└── accessibility.css      # Accessibility-focused styles
```

#### Layout Styles (`dev/css/layout/`)
Layout-specific styles for major page sections.

```
layout/
├── header.css             # Header layout and styling
├── footer.css             # Footer layout and styling
├── grid.css               # Grid system and layout utilities
└── spacing.css            # Spacing utilities and layout helpers
```

#### Component Styles (`dev/css/components/`)
Reusable component styles.

```
components/
├── component-button.css   # Button component styles
├── component-card.css     # Card component styles
├── component-mobile-menu.css # Mobile menu styles
├── component-product-form.css # Product form styles
├── component-hero.css     # Hero section styles
└── component-search-modal.css # Search modal styles
```

#### Section Styles (`dev/css/sections/`)
Section-specific styles that correspond to Shopify sections.

```
sections/
├── section-header.css     # Header section styles
├── section-footer.css     # Footer section styles
├── section-hero.css       # Hero section styles
├── section-guarantee.css  # Guarantee section styles
├── section-customer-reviews.css # Customer reviews styles
└── section-featured-products.css # Featured products styles
```

#### Utility Styles (`dev/css/utilities/`)
Utility classes and helper styles.

```
utilities/
├── responsive.css         # Responsive design utilities
├── states.css             # State-based styles (hover, focus, etc.)
├── overrides.css          # Override styles for third-party components
├── spacing.css            # Spacing utility classes
└── typography.css         # Typography utility classes
```

### Shopify Theme Files

#### Sections (`dev/sections/`)
Shopify sections are customizable content blocks.

```
sections/
├── header.liquid          # Site header and navigation
├── footer.liquid          # Site footer
├── hero.liquid            # Hero banner section
├── main-cart.liquid       # Shopping cart page
├── main-product.liquid    # Product detail page
├── main-search.liquid     # Search results page
├── main-collection-product-grid.liquid # Collection listing
├── main-blog.liquid       # Blog listing page
├── main-article.liquid    # Blog article page
├── main-404.liquid        # 404 error page
├── main-password.liquid   # Password protection page
├── main-account.liquid    # Customer account dashboard
├── main-login.liquid      # Customer login page
├── main-register.liquid   # Customer registration page
├── main-addresses.liquid  # Address management
├── main-order.liquid      # Order details page
├── main-activate-account.liquid # Account activation
├── main-reset-password.liquid # Password reset
├── featured-product.liquid # Single product showcase
├── featured-products.liquid # Multiple products showcase
├── featured-collection.liquid # Collection showcase
├── image-banner.liquid    # Image with overlay text
├── image-with-text.liquid # Image and text side-by-side
├── rich-text.liquid       # Rich text content
├── newsletter.liquid      # Email newsletter signup
├── faq.liquid             # Frequently asked questions
├── customer-reviews.liquid # Product reviews display
├── contact-form.liquid    # Contact form
├── why-choose-us.liquid   # Value proposition section
├── supported-games.liquid # Games showcase
└── main-guarantee.liquid  # Guarantee page
```

#### Snippets (`dev/snippets/`)
Reusable components that can be included in templates and sections.

```
snippets/
├── accessible-button.liquid # Accessible button component
├── accessible-form.liquid   # Accessible form wrapper
├── accessible-input.liquid  # Accessible input field
├── article-card.liquid      # Blog article preview
├── breadcrumb.liquid        # Navigation breadcrumbs
├── button.liquid            # Button component
├── card-product.liquid      # Product card component
├── cart-notification.liquid # Cart update notifications
├── chat-widget.liquid       # Live chat component
├── collapsible-content.liquid # Expandable content
├── creators-carousel.liquid # Content creators showcase
├── icon.liquid              # Icon component
├── loading-spinner.liquid   # Loading indicator
├── meta-tags.liquid         # SEO meta tags
├── mobile-menu.liquid       # Mobile menu component
├── pagination.liquid        # Page navigation
├── product-buy-buttons.liquid # Add to cart functionality
├── product-features.liquid  # Product feature list
├── product-inventory.liquid # Stock status
├── product-media-gallery.liquid # Product image gallery
├── product-price.liquid     # Price display
├── product-rating.liquid    # Star rating display
├── product-reviews.liquid   # Customer reviews
├── product-variant-picker.liquid # Product options selection
├── quantity-input.liquid    # Quantity selector
├── related-products.liquid  # Related products display
├── responsive-image.liquid  # Responsive image component
├── search-form.liquid       # Search functionality
└── share-button.liquid      # Social sharing
```

#### Templates (`dev/templates/`)
Page templates that define the structure of different page types.

```
templates/
├── index.liquid            # Homepage template
├── product.liquid          # Product page template
├── collection.liquid       # Collection page template
├── page.liquid             # Generic page template
├── page.guarantee.liquid   # Guarantee page template
├── blog.json               # Blog listing template
├── article.json            # Blog article template
├── cart.json               # Cart page template
├── search.json             # Search results template
├── 404.json                # 404 error template
├── password.json           # Password protection template
├── customers/
│   ├── account.json        # Customer account template
│   ├── activate_account.json # Account activation template
│   ├── addresses.json      # Address management template
│   ├── login.json          # Customer login template
│   ├── order.json          # Order details template
│   ├── register.json       # Customer registration template
│   └── reset_password.json # Password reset template
└── debug-collections.liquid # Debug template for collections
```

#### Layouts (`dev/layout/`)
Layout files that define the overall page structure.

```
layout/
├── theme.liquid            # Main theme layout
└── password.liquid         # Password protection layout
```

#### Configuration (`dev/config/`)
Shopify theme configuration files.

```
config/
├── settings_data.json      # Theme settings data
└── settings_schema.json    # Theme settings schema
```

#### Locales (`dev/locales/`)
Translation files for internationalization.

```
locales/
├── en.default.json         # English translations
└── en.default.schema.json  # English translation schema
```

#### Utils (`dev/utils/`)
Build utilities and development tools.

```
utils/
├── bundler.js              # JavaScript bundler
├── css-deduplicator.js     # CSS deduplication utility
├── css-optimizer.js        # CSS optimization utility
├── liquid-doc-generator.js # Liquid documentation generator
└── README.md               # Utils documentation
```

## 🚀 Production Theme (`theme/`)

The `theme/` directory contains the processed and optimized files ready for Shopify deployment.

### Assets (`theme/assets/`)
Final assets for Shopify deployment.

```
assets/
├── main.css               # Compiled and optimized CSS
├── main.js                # Bundled and minified JavaScript
├── fa-brands-400.woff2    # Font Awesome brand icons
├── fa-regular-400.woff2   # Font Awesome regular icons
├── fa-solid-900.woff2     # Font Awesome solid icons
├── fa-v4compatibility.woff2 # Font Awesome compatibility
├── font-awesome.min.css   # Font Awesome CSS
├── system-service-worker.js # Service worker file
├── system-theme-editor.js # Theme editor integration
└── [optimized images]     # Optimized image files
```

### Theme Files
The theme directory contains processed versions of all Shopify theme files:
- `sections/` - Processed section files
- `snippets/` - Processed snippet files
- `templates/` - Processed template files
- `layout/` - Processed layout files
- `config/` - Theme configuration files
- `locales/` - Translation files

## 🔧 Build System

### Build Script (`build.js`)
The main build script that orchestrates the entire build process.

**Key Features:**
- Fast development builds with minimal processing
- Production builds with full optimization
- Incremental builds that only process changed files
- Asset optimization and compression
- Live reload integration with Shopify CLI

### Build Process
1. **Development Mode**: Fast file copying with minimal processing
2. **Production Mode**: Full optimization with minification and compression
3. **Asset Processing**: CSS compilation, JavaScript bundling, image optimization
4. **File Copying**: Copy processed files to `theme/` directory

## 📁 Root Configuration Files

### Package Management
- `package.json` - Project dependencies and scripts
- `package-lock.json` - Locked dependency versions

### Build Configuration
- `build.js` - Main build script
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS processing configuration
- `nodemon.json` - File watching configuration

### Code Quality
- `knip.ts` - Unused code detection configuration
- `.prettierrc` - Code formatting rules
- `.prettierignore` - Files to skip formatting
- `.stylelintrc.json` - CSS linting rules
- `.stylelintignore` - Files to skip CSS linting
- `.theme-check.yml` - Shopify theme validation

### Development Tools
- `.gitignore` - Version control exclusions
- `.env` - Local environment variables (not in version control)
- `dev/shopify.env.example` - Environment template

## 🎯 Key Principles

### Separation of Concerns
- **Development**: All source files in `dev/`
- **Production**: Processed files in `theme/`
- **Never edit files in `theme/` directly**

### Modular Architecture
- **CSS**: Modular CSS with clear separation of concerns
- **JavaScript**: ES6 modules organized by functionality
- **Components**: Reusable snippets and sections

### Performance Optimization
- **Development**: Fast builds for rapid iteration
- **Production**: Optimized assets for deployment
- **Incremental**: Only rebuild changed files

### Accessibility
- **Semantic HTML**: Proper structure and landmarks
- **ARIA Support**: Screen reader compatibility
- **Keyboard Navigation**: Full keyboard accessibility

This structure ensures a clean, maintainable, and scalable codebase that follows modern development practices while maintaining excellent performance and accessibility standards. 