# BloxMania Theme - Modern Build System

This document describes the modern build system implemented for the BloxMania Shopify theme, following Dawn theme patterns and best practices.

## Overview

The build system provides:
- **Component-based CSS architecture** following Dawn's patterns
- **CSS custom properties integration** with Shopify theme settings
- **Tailwind CSS compilation** with production optimizations
- **Automated component building** with watch mode support
- **Theme settings integration** for dynamic styling

## Architecture

### File Structure

```
theme/
├── src/
│   ├── styles.css              # Main Tailwind CSS file
│   ├── theme-settings.css      # Theme settings integration
│   └── components/             # Component-specific CSS
│       ├── button.css
│       ├── card.css
│       └── header.css
├── build/                      # Build scripts
│   ├── build-components.js     # Component CSS builder
│   └── build-theme-settings.js # Theme settings builder
├── assets/                     # Generated CSS files
│   ├── base.css               # Main compiled CSS
│   ├── component-button.css   # Generated component CSS
│   ├── component-card.css
│   └── component-header.css
└── snippets/
    └── theme-settings-css.liquid # Generated theme settings
```

### CSS Custom Properties (Dawn Pattern)

Following Dawn's architecture, the theme uses CSS custom properties for:

- **Color system**: RGB values for alpha manipulation
- **Component theming**: Border radius, shadows, spacing
- **Layout variables**: Page width, container padding
- **Typography**: Font scales and families
- **Animation**: Duration and easing values

Example:
```css
:root {
  --color-primary: 255 216 0;
  --color-background: 29 30 38;
  --page-width: 1280px;
  --border-radius: 0.5rem;
}
```

### Component-Specific CSS Loading

Components are built separately and loaded conditionally, following Dawn's pattern:

```liquid
<!-- In layout/theme.liquid -->
{{ 'component-button.css' | asset_url | stylesheet_tag }}
{{ 'component-card.css' | asset_url | stylesheet_tag }}
```

## Build Scripts

### Main CSS Build

```bash
# Development build
npm run build:css:dev

# Watch mode
npm run build:css:watch

# Production build (minified)
npm run build:css:prod
```

### Component CSS Build

```bash
# Build all components
npm run build:components

# Watch components for changes
npm run build:components:watch
```

### Theme Settings Integration

```bash
# Generate theme settings CSS snippet
npm run build:theme-settings
```

### Complete Build

```bash
# Build everything and deploy
npm run build
```

## Component Development

### Creating New Components

1. Create a new CSS file in `src/components/`:
   ```css
   /* src/components/my-component.css */
   .my-component {
     @apply bg-white/5 border border-white/10 rounded-lg;
     /* Custom properties integration */
     border-radius: var(--border-radius, 0.5rem);
   }
   ```

2. Run the build system:
   ```bash
   npm run build:components
   ```

3. Include in your Liquid templates:
   ```liquid
   {{ 'component-my-component.css' | asset_url | stylesheet_tag }}
   ```

### Component Guidelines

- **Follow Dawn patterns**: Use CSS custom properties for theming
- **Accessibility first**: Include focus states and ARIA support
- **Responsive design**: Use mobile-first approach
- **Performance**: Keep components lightweight and specific
- **Maintainability**: Use clear naming conventions

### CSS Custom Properties Integration

Components can integrate with theme settings:

```css
.card--product {
  --border-radius: var(--product-card-corner-radius, 1rem);
  --border-width: var(--product-card-border-width, 1px);
  --shadow-opacity: var(--product-card-shadow-opacity, 0.1);
}
```

## Theme Settings Integration

The build system automatically generates CSS custom properties from Shopify theme settings:

### Settings Schema Integration

```json
{
  "type": "range",
  "id": "card_corner_radius",
  "min": 0,
  "max": 40,
  "step": 2,
  "unit": "px",
  "label": "Card corner radius",
  "default": 16
}
```

### Generated CSS

```css
:root {
  --product-card-corner-radius: {{ settings.card_corner_radius | default: 1 }}rem;
}
```

### Usage in Components

```css
.card {
  border-radius: var(--product-card-corner-radius, 1rem);
}
```

## Development Workflow

### Local Development

1. **Start development server**:
   ```bash
   npm run dev:concurrent
   ```
   This runs both CSS watch mode and Shopify theme dev server.

2. **Component development**:
   ```bash
   npm run build:components:watch
   ```
   Watches for component changes and rebuilds automatically.

### Production Deployment

1. **Build all assets**:
   ```bash
   npm run build
   ```
   This builds CSS, components, theme settings, and deploys to Shopify.

2. **Package theme**:
   ```bash
   npm run package
   ```
   Creates a theme package for distribution.

## Performance Optimizations

### CSS Optimization

- **PurgeCSS**: Removes unused Tailwind classes
- **CSSnano**: Minifies CSS in production
- **Component splitting**: Loads only needed CSS
- **Critical CSS**: Base styles loaded first

### Build Optimizations

- **Incremental builds**: Only rebuilds changed components
- **Watch mode**: Fast rebuilds during development
- **Source maps**: Available in development mode
- **Caching**: Efficient dependency resolution

## Troubleshooting

### Common Issues

1. **Missing dependencies**:
   ```bash
   npm install
   ```

2. **Build failures**:
   ```bash
   npm run clean && npm install
   ```

3. **Component not loading**:
   - Check if CSS file exists in `assets/`
   - Verify Liquid include syntax
   - Check browser console for 404 errors

### Debug Mode

Enable verbose logging:
```bash
DEBUG=true npm run build:components
```

## Migration from Legacy System

### Before (Legacy)
- Single large CSS file
- Inline styles in components
- No theme settings integration
- Manual CSS compilation

### After (Modern)
- Component-based architecture
- CSS custom properties
- Automated build system
- Theme settings integration
- Production optimizations

## Best Practices

1. **Component Isolation**: Each component should be self-contained
2. **CSS Custom Properties**: Use for all themeable values
3. **Accessibility**: Include focus states and ARIA support
4. **Performance**: Keep components lightweight
5. **Documentation**: Comment complex CSS logic
6. **Testing**: Test components across different screen sizes

## Future Enhancements

- **CSS-in-JS support**: For dynamic styling
- **Design tokens**: Centralized design system
- **Component library**: Reusable component documentation
- **Visual regression testing**: Automated UI testing
- **Bundle analysis**: CSS size optimization