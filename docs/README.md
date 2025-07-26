# 📚 BloxMania Theme Documentation

Welcome to the comprehensive documentation for the BloxMania Shopify theme - a high-performance, modern theme designed for digital goods marketplaces with a focus on gaming items, Roblox assets, and Fortnite cosmetics.

## 🚀 Quick Start

- **[Getting Started Guide](GETTING_STARTED.md)** - Set up and run the theme locally
- **[Development Workflow](DEVELOPMENT.md)** - Learn the development process
- **[Build System](BUILD_SYSTEM.md)** - Understand how the build system works

## 📋 Documentation Index

### 🛠️ Development Guides
- **[Getting Started](GETTING_STARTED.md)** - Initial setup and installation
- **[Development Workflow](DEVELOPMENT.md)** - Development process and best practices
- **[Development Scripts](DEVELOPMENT_SCRIPTS.md)** - All available npm scripts and commands
- **[Build System](BUILD_SYSTEM.md)** - Build system architecture and configuration
- **[Project Structure](PROJECT_STRUCTURE.md)** - Complete project organization and file structure

### 🎨 Design & Standards
- **[Style Guide](style-guide/README.md)** - Coding standards and conventions

### 🧩 Component Documentation

#### 📄 Sections
Sections are customizable content blocks that can be added to pages through the Shopify theme editor.

**[Sections Overview](sections/README.md)**

**Main Pages:**
- [Header](sections/header.md) - Site navigation and branding
- [Footer](sections/footer.md) - Site footer and links
- [Hero](sections/hero.md) - Hero banner section
- [Main Cart](sections/main-cart.md) - Shopping cart page
- [Main Product](sections/main-product.md) - Product detail page
- [Main Search](sections/main-search.md) - Search results page
- [Main Collection](sections/main-collection-product-grid.md) - Collection listing page
- [Main Blog](sections/main-blog.md) - Blog listing page
- [Main Article](sections/main-article.md) - Blog article page
- [Main 404](sections/main-404.md) - 404 error page
- [Main Password](sections/main-password.md) - Password protection page

**Customer Pages:**
- [Main Account](sections/main-account.md) - Customer account dashboard
- [Main Login](sections/main-login.md) - Customer login page
- [Main Register](sections/main-register.md) - Customer registration page
- [Main Addresses](sections/main-addresses.md) - Address management
- [Main Order](sections/main-order.md) - Order details page
- [Main Activate Account](sections/main-activate-account.md) - Account activation
- [Main Reset Password](sections/main-reset-password.md) - Password reset

**Content Sections:**
- [Featured Product](sections/featured-product.md) - Single product showcase
- [Featured Products](sections/featured-products.md) - Multiple products showcase
- [Featured Collection](sections/featured-collection.md) - Collection showcase
- [Image Banner](sections/image-banner.md) - Image with overlay text
- [Image with Text](sections/image-with-text.md) - Image and text side-by-side
- [Rich Text](sections/rich-text.md) - Rich text content
- [Newsletter](sections/newsletter.md) - Email newsletter signup
- [FAQ](sections/faq.md) - Frequently asked questions
- [Customer Reviews](sections/customer-reviews.md) - Product reviews display
- [Contact Form](sections/contact-form.md) - Contact form
- [Why Choose Us](sections/why-choose-us.md) - Value proposition section
- [Supported Games](sections/supported-games.md) - Games showcase
- [Main Guarantee](sections/main-guarantee.md) - Guarantee page

#### 🧩 Snippets
Snippets are reusable components that can be included in templates and sections.

**[Snippets Overview](snippets/README.md)**

**Product Components:**
- [Product Media Gallery](snippets/product-media-gallery.md) - Product image gallery
- [Product Buy Buttons](snippets/product-buy-buttons.md) - Add to cart functionality
- [Product Variant Picker](snippets/product-variant-picker.md) - Product options selection
- [Product Price](snippets/product-price.md) - Price display
- [Product Rating](snippets/product-rating.md) - Star rating display
- [Product Reviews](snippets/product-reviews.md) - Customer reviews
- [Product Features](snippets/product-features.md) - Product feature list
- [Product Inventory](snippets/product-inventory.md) - Stock status
- [Card Product](snippets/card-product.md) - Product card component
- [Related Products](snippets/related-products.md) - Related products display

**UI Components:**
- [Button](snippets/button.md) - Button component
- [Accessible Button](snippets/accessible-button.md) - Accessible button variant
- [Accessible Form](snippets/accessible-form.md) - Accessible form wrapper
- [Accessible Input](snippets/accessible-input.md) - Accessible input field
- [Loading Spinner](snippets/loading-spinner.md) - Loading indicator
- [Icon](snippets/icon.md) - Icon component
- [Breadcrumb](snippets/breadcrumb.md) - Navigation breadcrumbs
- [Pagination](snippets/pagination.md) - Page navigation
- [Collapsible Content](snippets/collapsible-content.md) - Expandable content
- [Cart Notification](snippets/cart-notification.md) - Cart update notifications

**Content Components:**
- [Article Card](snippets/article-card.md) - Blog article preview
- [Creators Carousel](snippets/creators-carousel.md) - Content creators showcase
- [Chat Widget](snippets/chat-widget.md) - Live chat component
- [Search Form](snippets/search-form.md) - Search functionality
- [Share Button](snippets/share-button.md) - Social sharing
- [Responsive Image](snippets/responsive-image.md) - Responsive image component
- [Quantity Input](snippets/quantity-input.md) - Quantity selector
- [Meta Tags](snippets/meta-tags.md) - SEO meta tags

#### 📄 Templates
Page templates that define the structure of different page types.

**[Templates Overview](templates/README.md)**

- [Index](templates/index.md) - Homepage template
- [Product](templates/product.md) - Product page template
- [Collection](templates/collection.md) - Collection page template
- [Page](templates/page.md) - Generic page template
- [Page Guarantee](templates/page-guarantee.md) - Guarantee page template
- [Blog](templates/blog.md) - Blog listing template
- [Article](templates/article.md) - Blog article template
- [Cart](templates/cart.md) - Cart page template
- [Search](templates/search.md) - Search results template
- [404](templates/404.md) - 404 error template
- [Password](templates/password.md) - Password protection template

### 🎨 Style Guide
- **[Style Guide Overview](style-guide/README.md)** - Design system and standards
- **[CSS Standards](style-guide/CSS.md)** - Modular CSS architecture and conventions
- **[JavaScript Standards](style-guide/JAVASCRIPT.md)** - JavaScript coding standards
- **[Liquid Standards](style-guide/LIQUID.md)** - Liquid templating standards

## 🔧 Project Structure

```
bloxmania/
├── dev/                    # 🛠️ Development Environment
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
│   ├── sections/          # Shopify sections
│   ├── snippets/          # Shopify snippets
│   ├── templates/         # Shopify templates
│   ├── layout/            # Shopify layouts
│   ├── config/            # Shopify configuration
│   ├── locales/           # Translation files
│   └── utils/             # Build utilities
├── theme/                  # 🚀 Production Theme
│   ├── assets/            # Final assets for Shopify
│   ├── sections/          # Shopify sections
│   ├── snippets/          # Shopify snippets
│   ├── templates/         # Shopify templates
│   ├── layout/            # Shopify layouts
│   ├── config/            # Shopify configuration
│   └── locales/           # Translation files
├── docs/                   # 📚 This documentation
└── ...
```

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/kzndotsh/bloxmania/issues)
- **Development**: [Development Guide](DEVELOPMENT.md)
- **Build System**: [Build System Documentation](BUILD_SYSTEM.md)

---

**Built with ❤️ for the gaming community**
