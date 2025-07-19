# BloxMania Theme Documentation

## Overview
BloxMania is a modern Shopify theme designed for digital goods marketplaces, with a focus on gaming items and virtual products.

## Quick Navigation

### 📄 [Templates](./templates/README.md)
Page templates that define the structure of different page types.
- [product](./templates/product.md)
- [page.guarantee](./templates/page.guarantee.md)
- [page.fouc-test](./templates/page.fouc-test.md)

- [collection](./templates/collection.md)

### 🧩 [Snippets](./snippets/README.md)
Reusable components that can be included in templates and sections.

- [share-button](./snippets/share-button.md)
- [responsive-image](./snippets/responsive-image.md)
- [related-products](./snippets/related-products.md)
- [quantity-input](./snippets/quantity-input.md)
- [product-variant-picker](./snippets/product-variant-picker.md)
- [product-reviews](./snippets/product-reviews.md)
- [product-rating](./snippets/product-rating.md)
- [product-price](./snippets/product-price.md)
- [product-media-gallery](./snippets/product-media-gallery.md)
- [product-inventory](./snippets/product-inventory.md)
- [product-features](./snippets/product-features.md)
- [product-buy-buttons](./snippets/product-buy-buttons.md)
- [pagination](./snippets/pagination.md)
- [loading-spinner](./snippets/loading-spinner.md)
- [icon](./snippets/icon.md)
- [creators-carousel](./snippets/creators-carousel.md)
- [collapsible-content](./snippets/collapsible-content.md)
- [cart-notification](./snippets/cart-notification.md)
- [card-product](./snippets/card-product.md)
- [button](./snippets/button.md)
- [breadcrumb](./snippets/breadcrumb.md)
- [accessible-input](./snippets/accessible-input.md)
- [accessible-form](./snippets/accessible-form.md)
- [accessible-button](./snippets/accessible-button.md)

### 📊 [Sections](./sections/README.md)
Customizable content blocks that can be added to pages through the theme editor.
- [why-choose-us](./sections/why-choose-us.md)
- [supported-games](./sections/supported-games.md)
- [main-product](./sections/main-product.md)
- [hero](./sections/hero.md)
- [header](./sections/header.md)
- [footer](./sections/footer.md)
- [featured-products](./sections/featured-products.md)
- [faq](./sections/faq.md)
- [customer-reviews](./sections/customer-reviews.md)

### 🎨 [Assets](./assets/README.md)
JavaScript, CSS, and other static files.
- [theme.config.js](./assets/theme.config.js.md)

- [section-id-utility.js](./assets/section-id-utility.js.md)
- [search-modal.js](./assets/search-modal.js.md)
- [screen-reader-optimization.js](./assets/screen-reader-optimization.js.md)
- [quantity-input.js](./assets/quantity-input.js.md)
- [product-form.js](./assets/product-form.js.md)
- [predictive-search.js](./assets/predictive-search.js.md)
- [media-gallery.js](./assets/media-gallery.js.md)
- [keyboard-navigation.js](./assets/keyboard-navigation.js.md)
- [html-update-utility.js](./assets/html-update-utility.js.md)
- [header-utils.js](./assets/header-utils.js.md)
- [dom-utils.js](./assets/dom-utils.js.md)
- [details-modal.js](./assets/details-modal.js.md)
- [collection-filters.js](./assets/collection-filters.js.md)
- [cart-notification.js](./assets/cart-notification.js.md)
- [api-utils.js](./assets/api-utils.js.md)
- [accessibility-utils.js](./assets/accessibility-utils.js.md)
- [theme-config.css](./assets/theme-config.css.md)
- [component-product-reviews.css](./assets/component-product-reviews.css.md)
- [component-product-media-gallery.css](./assets/component-product-media-gallery.css.md)
- [component-product-info.css](./assets/component-product-info.css.md)
- [component-product-form.css](./assets/component-product-form.css.md)
- [component-predictive-search.css](./assets/component-predictive-search.css.md)
- [component-header.css](./assets/component-header.css.md)

- [component-faq.css](./assets/component-faq.css.md)
- [component-cart-notification.css](./assets/component-cart-notification.css.md)
- [component-card.css](./assets/component-card.css.md)
- [component-button.css](./assets/component-button.css.md)
- [component-breadcrumb.css](./assets/component-breadcrumb.css.md)
- [base.css](./assets/base.css.md)
- [animation-utilities.css](./assets/animation-utilities.css.md)
- [accessibility.css](./assets/accessibility.css.md)

### ⚙️ [Configuration](./config/README.md)
Theme settings and configuration files.
- [settings_schema.json](./config/settings_schema.json.md)
- [settings_data.json](./config/settings_data.json.md)
- [tailwind.config.js](./config/tailwind.config.js.md)
- [theme.config.js](./config/theme.config.js.md)

### 📚 [API Reference](./api/README.md)
Complete reference for all theme functions, classes, and utilities.

### 🎨 [Style Guide](./style-guide/README.md)
Design system, components, and styling guidelines.

## Comprehensive Guides

### 📖 [Developer Guide](./DEVELOPER_GUIDE.md)
Complete guide for developers working with the theme, including architecture, workflows, and best practices.

### 📚 [API Reference](./API_REFERENCE.md)
Comprehensive reference for all JavaScript utilities, Web Components, CSS classes, and Liquid snippets.

### 📋 [Changelog](./CHANGELOG.md)
Detailed changelog documenting all changes, improvements, and breaking changes.

## Getting Started

1. **Installation**: Upload the theme to your Shopify store
2. **Configuration**: Use the theme editor to customize settings
3. **Customization**: Refer to individual component documentation for advanced customization

## Development Workflow

### Quick Start
```bash
# Install dependencies
npm install

# Start development
npm run dev:concurrent

# Generate documentation
npm run docs:generate

# Serve documentation locally
npm run docs:serve
```

### Documentation Updates
The documentation is automatically generated from code comments and can be regenerated at any time:

```bash
npm run docs:generate
```

## Development Resources

- **Build System**: [BUILD_SYSTEM.md](../BUILD_SYSTEM.md)
- **Tailwind Setup**: [TAILWIND_SETUP.md](../TAILWIND_SETUP.md)
- **Theme Configuration**: [THEME_CONFIGURATION.md](../THEME_CONFIGURATION.md)
- **Complete Documentation**: [BLOXMANIA_COMPLETE_DOCUMENTATION.md](../BLOXMANIA_COMPLETE_DOCUMENTATION.md)

## External Resources

- [Shopify Theme Development](https://shopify.dev/themes)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Dawn Theme Reference](https://github.com/Shopify/dawn)

## Support

For technical support and customization help:

1. **Check Documentation**: Start with component-specific documentation
2. **Developer Guide**: Refer to the comprehensive developer guide
3. **API Reference**: Check the API reference for specific functions
4. **Troubleshooting**: Review troubleshooting sections
5. **Changelog**: Check recent changes and breaking changes
