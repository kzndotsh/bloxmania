# BloxMania Shopify Theme - Complete Documentation

---

## Table of Contents
1. [Introduction](#introduction)
2. [Quick Start](#quick-start)
3. [Theme Features](#theme-features)
4. [Customization Guide](#customization-guide)
5. [File Structure & Safe Editing](#file-structure--safe-editing)
6. [Development Workflow](#development-workflow)
7. [Advanced Customization & Technical Details](#advanced-customization--technical-details)
8. [Troubleshooting & Support](#troubleshooting--support)
9. [Pre-Launch Checklist](#pre-launch-checklist)
10. [Credits & License](#credits--license)

---

## Introduction
BloxMania is a modern, responsive Shopify theme designed for digital goods marketplaces, optimized for gaming items and virtual products. It features a dark gaming aesthetic, smooth animations, and is built for both non-technical clients and developers.

---

## Quick Start
### For Clients
1. **Upload Theme**: Shopify Admin → Online Store → Themes → Add theme → Upload theme ZIP → Publish.
2. **Basic Customization**: Use the Shopify theme editor to update logo, store name, contact info, and social links.
3. **Add Products**: Shopify Admin → Products → Add product.
4. **Test Everything**: Ensure homepage, products, and mobile version work.

### For Developers
1. `npm install` (in `shopify-theme/`)
2. `npm run setup` (Shopify CLI setup)
3. `npm run dev` (start development server)
4. `npm run push` (deploy to development store)

---

## Theme Features
- **Dark Gaming Aesthetic**: Neon accents, modern UI
- **Responsive Design**: Mobile-first, touch-friendly
- **E-commerce Ready**: Cart, product variants, checkout
- **Performance Optimized**: Fast loading, lazy loading, minified assets
- **SEO & Accessibility**: Structured data, WCAG 2.1 AA compliance
- **Client-Friendly**: Visual editor, safe config files, clear docs

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
- **SAFE TO EDIT**: `config/client-settings.json`, `config/content.json`, `config/CLIENT_CONSTANTS.md`
- **DON'T TOUCH**: `.liquid`, `.css`, `.js`, `assets/`, `layout/`, `sections/`, `templates/`

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

---

## Advanced Customization & Technical Details
- **Section System**: Modular, configurable via theme editor
- **Liquid Templating**: Shopify's templating language for dynamic content
- **CSS Custom Properties**: Easy color and theme changes
- **JavaScript**: For interactivity (mobile menu, add to cart)
- **Performance**: Minified assets, lazy loading, CDN-ready
- **Accessibility**: ARIA labels, keyboard navigation

---

## Troubleshooting & Support
### Common Issues
- **Theme not loading**: Clear cache, check assets
- **Mobile menu not working**: Ensure JS enabled
- **Products not displaying**: Check collections, product availability

### Support Resources
- **Shopify Help Center**: https://help.shopify.com
- **Theme Documentation**: See this file and README.md
- **Developer Support**: Contact your theme developer

---

## Pre-Launch Checklist
- [ ] Theme uploaded and published
- [ ] Logo and branding updated
- [ ] Store info and social links set
- [ ] Hero and footer content customized
- [ ] At least one product added
- [ ] Mobile version tested
- [ ] Contact forms and newsletter working
- [ ] Test purchase flow

---

## Credits & License
- **Design**: Inspired by modern gaming UIs
- **Development**: BloxMania Team
- **License**: MIT (see LICENSE file)

---

**Remember:** When in doubt, use the Shopify theme editor—it's the safest way to make changes!