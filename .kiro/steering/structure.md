# BloxMania Project Structure

## Repository Organization

The repository contains multiple projects and reference materials:

```
├── .kiro/                    # Kiro AI configuration and specs
│   └── specs/               # Project specifications and tasks
├── dawn-reference/          # Shopify Dawn theme reference (read-only)
├── old-site/               # Legacy Next.js site (archived)
└── theme/                  # Main BloxMania Shopify theme (active development)
```

## Main Theme Structure (`theme/`)

### Core Directories

```
theme/
├── assets/                  # Compiled assets and static files
│   ├── *.css               # Compiled CSS (base.css, component-*.css)
│   ├── *.js                # JavaScript modules and utilities
│   └── image-*             # Optimized images and assets
├── src/                    # Source files for build system
│   ├── styles.css          # Main Tailwind CSS source
│   └── components/         # Component-specific CSS sources
├── build/                  # Build scripts and automation
├── config/                 # Shopify theme configuration
├── layout/                 # Base layout templates
├── sections/               # Shopify sections (page building blocks)
├── snippets/               # Reusable Liquid components
├── templates/              # Page templates
└── locales/                # Translation files
```

### Asset Organization

#### CSS Files
- **`base.css`**: Main compiled Tailwind CSS with custom components
- **`component-*.css`**: Individual component stylesheets (Dawn pattern)
- **`theme-config.css`**: CSS custom properties and design tokens

#### JavaScript Files
- **Core utilities**: `dom-utils.js`, `api-utils.js`, `validation-utils.js`
- **Components**: `media-gallery.js`, `product-form.js`, `search-modal.js`
- **Features**: `cart-notification.js`, `predictive-search.js`
- **Performance**: `performance-optimizer.js`, `critical-css-optimizer.js`

#### Images
- **Naming convention**: `image-[name].[ext]` (e.g., `image-hero.png`)
- **Creator images**: YouTube creator profile images for endorsements
- **Product images**: Gaming-related product showcase images
- **Icons**: UI icons and gaming-themed graphics

### Liquid Template Structure

#### Sections (Page Building Blocks)
- **`header.liquid`**: Navigation and mobile menu
- **`hero.liquid`**: Main banner with creator carousel
- **`featured-products.liquid`**: Product showcase grid
- **`footer.liquid`**: Footer with newsletter and social links

#### Snippets (Reusable Components)
- **`card-product.liquid`**: Product card component with variants
- **`button.liquid`**: Button component with accessibility features
- **`icon.liquid`**: SVG icon system with proper alt text
- **`creators-carousel.liquid`**: YouTube creator showcase

#### Templates (Page Types)
- **`index.liquid`**: Homepage template
- **`product.liquid`**: Individual product pages
- **`collection.liquid`**: Product collection pages
- **`cart.liquid`**: Shopping cart page

## File Naming Conventions

### CSS Files
- **Components**: `component-[name].css` (e.g., `component-product-media-gallery.css`)
- **Utilities**: `[purpose]-[type].css` (e.g., `animation-utilities.css`)
- **Base styles**: `base.css`, `theme-config.css`

### JavaScript Files
- **Utilities**: `[purpose]-utils.js` (e.g., `dom-utils.js`)
- **Components**: `[component-name].js` (e.g., `media-gallery.js`)
- **Features**: `[feature-name].js` (e.g., `cart-notification.js`)

### Liquid Files
- **Sections**: `[section-name].liquid` (kebab-case)
- **Snippets**: `[component-name].liquid` (kebab-case)
- **Templates**: `[page-type].liquid` or `[page-type].[variant].liquid`

### Image Files
- **Assets**: `image-[name].[ext]` (e.g., `image-hero.png`)
- **Icons**: `icon-[name].svg` (if using separate icon files)

## Development Patterns

### CSS Architecture
- **Tailwind-first**: Use utility classes for most styling
- **Component layer**: Custom components for repeated patterns
- **CSS custom properties**: For theme settings integration
- **Mobile-first**: Responsive design with progressive enhancement

### JavaScript Architecture
- **Web Components**: Custom elements for interactive components
- **Utility modules**: Shared functions in separate files
- **Event delegation**: Efficient event handling patterns
- **Performance-focused**: Lazy loading and intersection observers

### Liquid Patterns
- **Snippet parameters**: Use comprehensive parameter systems
- **Conditional rendering**: Safe property access with defaults
- **Performance**: Minimize Liquid logic in templates
- **Accessibility**: Proper semantic HTML and ARIA attributes

## Configuration Files

### Build Configuration
- **`package.json`**: npm scripts and dependencies
- **`tailwind.config.js`**: Tailwind CSS configuration with custom theme
- **`postcss.config.js`**: PostCSS processing configuration

### Theme Configuration
- **`theme.config.js`**: Centralized theme constants and settings
- **`.env`**: Environment variables for Shopify CLI
- **`config/settings_schema.json`**: Shopify theme settings

## Reference Materials

### Dawn Reference (`dawn-reference/`)
- Complete Shopify Dawn theme for pattern reference
- Use for understanding modern Shopify theme architecture
- Reference for component patterns and best practices

### Legacy Site (`old-site/`)
- Archived Next.js implementation
- Contains original design assets and components
- Reference for design patterns and content structure