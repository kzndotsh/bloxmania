# BloxMania Theme Configuration

This document explains the centralized theme configuration system implemented in the BloxMania Shopify theme.

## Overview

The theme uses a centralized configuration system that consolidates all constants, settings, and configuration values into a single source of truth. This approach follows Dawn's patterns and ensures consistency across JavaScript and CSS.

## Configuration Files

### Core Configuration Files

- **`theme.config.js`** - Main configuration file containing all theme constants
- **`theme-config.css`** - Static CSS custom properties file
- **`css-config-generator.js`** - Dynamic CSS generator from JavaScript config

## Configuration Structure

### Theme Information
```javascript
THEME_INFO: {
  name: 'BloxMania',
  version: '1.0.0',
  author: 'BloxMania',
  description: 'Gaming-focused Shopify theme for digital products'
}
```

### Colors
Comprehensive color palette with semantic naming:
```javascript
COLORS: {
  primary: { DEFAULT: '#ffd800', 50: '#fffbeb', ... },
  secondary: { DEFAULT: '#4791f0', 50: '#eff6ff', ... },
  background: { DEFAULT: '#1d1e26', surface: '#252730', card: '#252730' },
  text: { DEFAULT: '#ffffff', muted: '#94a3b8' },
  // ... more colors
}
```

### Typography
Font families, sizes, and weights:
```javascript
TYPOGRAPHY: {
  fonts: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    heading: ['Inter', 'system-ui', 'sans-serif']
  },
  sizes: { xs: '0.75rem', sm: '0.875rem', ... },
  weights: { light: '300', normal: '400', ... }
}
```

### Layout & Spacing
Breakpoints, containers, and spacing values:
```javascript
LAYOUT: {
  breakpoints: { sm: '640px', md: '768px', ... },
  spacing: { sections: '52px', pageWidth: '1200px', ... },
  zIndex: { modal: 1050, notification: 10000, ... }
}
```

### Animations
Duration, easing, and keyframe definitions:
```javascript
ANIMATIONS: {
  durations: { fast: '150ms', normal: '300ms', ... },
  easings: { smooth: 'cubic-bezier(0.4, 0, 0.2, 1)', ... },
  keyframes: { fadeInUp: { ... }, slideInLeft: { ... } }
}
```

### Components
Default styling for theme components:
```javascript
COMPONENTS: {
  card: { borderRadius: '16px', padding: '1rem', ... },
  button: { borderRadius: '50px', padding: { x: '1.5rem', y: '0.75rem' }, ... },
  input: { borderRadius: '8px', borderOpacity: '55%', ... }
}
```

### Performance
Performance optimization settings:
```javascript
PERFORMANCE: {
  lazyLoading: { rootMargin: '200px 0px', enableWebP: true, ... },
  caching: { apiCacheTimeout: 300000, ... },
  optimization: { deferNonCritical: true, ... }
}
```

### API Configuration
Shopify API endpoints and defaults:
```javascript
API: {
  endpoints: { cart: '/cart.js', cartAdd: '/cart/add.js', ... },
  defaults: { timeout: 10000, retries: 2, ... },
  search: { limit: 10, resources: 'product,collection,page,article' }
}
```

## Usage Examples

### JavaScript Usage

#### Accessing Configuration Values
```javascript
// Get theme configuration
const config = window.THEME_CONFIG;

// Access colors
const primaryColor = config.COLORS.primary.DEFAULT;
const textColor = config.COLORS.text.DEFAULT;

// Access layout values
const pageWidth = config.LAYOUT.spacing.pageWidth;
const sectionSpacing = config.LAYOUT.spacing.sections;

// Access animation settings
const normalDuration = config.ANIMATIONS.durations.normal;
const smoothEasing = config.ANIMATIONS.easings.smooth;
```

#### Using Utility Functions
```javascript
// Get color by path
const primaryColor = config.getColor('primary.DEFAULT');
const primaryLight = config.getColor('primary.100');

// Get breakpoint
const mdBreakpoint = config.getBreakpoint('md');

// Get component configuration
const cardConfig = config.getComponent('card');
```

#### API Configuration Usage
```javascript
// API utilities automatically use centralized config
const apiUtils = new APIUtils(); // Uses THEME_CONFIG.API

// Performance optimizer uses centralized config
const perfOptimizer = new PerformanceOptimizer(); // Uses THEME_CONFIG.PERFORMANCE
```

### CSS Usage

#### Using CSS Custom Properties
```css
/* Colors */
.primary-button {
  background-color: var(--color-primary);
  color: var(--color-primary-foreground);
}

/* Typography */
.heading {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
}

/* Layout */
.container {
  max-width: var(--spacing-page-width);
  padding: var(--spacing-sections) 0;
}

/* Animations */
.smooth-transition {
  transition: all var(--duration-normal) var(--easing-smooth);
}

/* Components */
.card {
  border-radius: var(--card-border-radius);
  padding: var(--card-padding);
  box-shadow: var(--card-shadow-offset-x) var(--card-shadow-offset-y) var(--card-shadow-blur) rgba(0, 0, 0, calc(var(--card-shadow-opacity) / 100));
}
```

#### Using Utility Classes
```html
<!-- Color utilities -->
<div class="text-primary bg-surface">Primary text on surface background</div>

<!-- Component base classes -->
<div class="card-base">Card with default styling</div>
<button class="button-base">Button with default styling</button>
<input class="input-base" type="text" placeholder="Input with default styling">

<!-- Layout utilities -->
<div class="container section-spacing">
  <div class="grid-gap">Grid with consistent spacing</div>
</div>
```

### Liquid Template Usage

#### Accessing Configuration in Liquid
```liquid
<!-- Access theme settings that correspond to configuration -->
<div style="color: {{ settings.colors_accent_1 }};">
  Primary colored text
</div>

<!-- Use CSS custom properties -->
<div class="text-primary">
  Text using CSS custom property
</div>
```

## Dynamic CSS Generation

The theme includes a CSS generator that creates CSS custom properties from the JavaScript configuration:

```javascript
// Generate CSS custom properties
const generator = new CSSConfigGenerator();
const css = generator.generateAll();

// Inject into document
generator.injectCSS();
```

This ensures that CSS and JavaScript always use the same values.

## Configuration Validation

The configuration includes validation to ensure required values are present:

```javascript
const validation = THEME_CONFIG.validateConfig();
if (!validation.isValid) {
  console.error('Configuration errors:', validation.errors);
}
```

## Best Practices

### 1. Always Use Configuration Values
```javascript
// ❌ Don't hardcode values
const primaryColor = '#ffd800';

// ✅ Use configuration
const primaryColor = THEME_CONFIG.COLORS.primary.DEFAULT;
```

### 2. Use CSS Custom Properties
```css
/* ❌ Don't hardcode in CSS */
.button {
  background: #ffd800;
  border-radius: 50px;
}

/* ✅ Use CSS custom properties */
.button {
  background: var(--color-primary);
  border-radius: var(--button-border-radius);
}
```

### 3. Extend Configuration When Needed
```javascript
// Add new configuration sections as needed
THEME_CONFIG.CUSTOM_FEATURE = {
  enabled: true,
  settings: { ... }
};
```

### 4. Use Utility Functions
```javascript
// ❌ Don't access nested properties directly
const color = THEME_CONFIG.COLORS.primary.DEFAULT;

// ✅ Use utility functions
const color = THEME_CONFIG.getColor('primary.DEFAULT');
```

## File Loading Order

Ensure configuration files are loaded in the correct order:

1. `theme.config.js` - Core configuration
2. `css-config-generator.js` - CSS generation (optional)
3. Other theme JavaScript files that depend on configuration

## Customization

### Adding New Configuration Sections
```javascript
// Add to theme.config.js
const NEW_FEATURE = {
  enabled: true,
  settings: {
    option1: 'value1',
    option2: 'value2'
  }
};

// Add to main THEME_CONFIG object
const THEME_CONFIG = {
  // ... existing config
  NEW_FEATURE,
  // ... rest of config
};
```

### Modifying Existing Values
```javascript
// Update colors
COLORS.primary.DEFAULT = '#new-color';

// Update component defaults
COMPONENTS.button.borderRadius = '8px';
```

## Integration with Shopify Settings

The configuration works alongside Shopify's settings system:

- **JavaScript Configuration**: For complex objects, arrays, and computed values
- **Shopify Settings**: For simple values that merchants can customize
- **CSS Custom Properties**: Bridge between both systems

## Performance Considerations

- Configuration is loaded once and cached globally
- CSS custom properties provide efficient styling
- Dynamic CSS generation only runs when needed
- Validation runs only in development mode

## Troubleshooting

### Configuration Not Available
```javascript
// Check if configuration is loaded
if (!window.THEME_CONFIG) {
  console.error('Theme configuration not loaded');
}
```

### CSS Variables Not Working
```css
/* Provide fallbacks for CSS custom properties */
.element {
  color: var(--color-primary, #ffd800);
}
```

### Validation Errors
```javascript
// Run validation to check for issues
const validation = THEME_CONFIG.validateConfig();
console.log('Validation result:', validation);
```

This centralized configuration system provides a robust foundation for maintaining consistency across the entire theme while making it easy to customize and extend.