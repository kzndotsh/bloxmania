# 🎨 Style Guide

This style guide defines the design system, coding standards, and best practices for the BloxMania Shopify theme.

## 🎯 Design System

### Color Palette
Our color system is designed for gaming aesthetics with high contrast and accessibility.

#### Primary Colors
- **Gaming Yellow**: `#ffd800` - Primary brand color
- **Gaming Blue**: `#4791f0` - Secondary accent color
- **Success Green**: `#10b981` - Success states and confirmations
- **Warning Orange**: `#f59e0b` - Warning states and alerts
- **Error Red**: `#ef4444` - Error states and destructive actions

#### Background Colors
- **Dark Background**: `#1d1e26` - Main page background
- **Surface Background**: `#252730` - Card and component backgrounds
- **Overlay Background**: `#0f0f13` - Modal and overlay backgrounds

#### Text Colors
- **Primary Text**: `#ffffff` - Main text color
- **Secondary Text**: `#94a3b8` - Muted and secondary text
- **Inverted Text**: `#000000` - Text on light backgrounds

### Typography

#### Font Stack
```css
font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

#### Font Weights
- **Light**: `300` - Subtle text and captions
- **Regular**: `400` - Body text and general content
- **Medium**: `500` - Emphasis and subheadings
- **Semibold**: `600` - Headings and important text
- **Bold**: `700` - Strong emphasis and titles
- **Extrabold**: `800` - Hero text and large headings

#### Font Sizes
- **xs**: `0.75rem` (12px) - Small captions and labels
- **sm**: `0.875rem` (14px) - Small body text
- **base**: `1rem` (16px) - Default body text
- **lg**: `1.125rem` (18px) - Large body text
- **xl**: `1.25rem` (20px) - Small headings
- **2xl**: `1.5rem` (24px) - Medium headings
- **3xl**: `1.875rem` (30px) - Large headings
- **4xl**: `2.25rem` (36px) - Extra large headings
- **5xl**: `3rem` (48px) - Hero headings

### Spacing System

#### Base Spacing
- **xs**: `0.25rem` (4px) - Minimal spacing
- **sm**: `0.5rem` (8px) - Small spacing
- **md**: `1rem` (16px) - Medium spacing
- **lg**: `1.5rem` (24px) - Large spacing
- **xl**: `2rem` (32px) - Extra large spacing
- **2xl**: `3rem` (48px) - Double extra large spacing

#### Layout Spacing
- **Section Padding**: `3.25rem` (52px) - Standard section padding
- **Page Width**: `75rem` (1200px) - Maximum page width
- **Container Padding**: `1rem` (16px) - Container side padding
- **Grid Gap**: `2rem` (32px) - Standard grid spacing

## 🎨 CSS Architecture

### Design Tokens
CSS custom properties are defined in `dev/css/design-tokens.css`:

```css
:root {
  /* Colors */
  --color-primary: #ffd800;
  --color-secondary: #4791f0;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  
  /* Typography */
  --font-family-base: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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

### Modular CSS Structure
The CSS follows a modular architecture with clear separation of concerns:

```
dev/css/
├── main.css              # Main entry point with imports
├── design-tokens.css     # CSS custom properties
├── base/                 # Foundation styles
│   ├── reset.css
│   ├── typography.css
│   ├── animations.css
│   └── accessibility.css
├── layout/               # Layout components
│   ├── header.css
│   ├── footer.css
│   ├── grid.css
│   └── spacing.css
├── components/           # Reusable components
│   ├── component-button.css
│   ├── component-card.css
│   └── ...
├── sections/             # Section-specific styles
│   ├── section-header.css
│   ├── section-hero.css
│   └── ...
└── utilities/            # Utility classes
    ├── responsive.css
    ├── states.css
    └── ...
```

### Component Standards

#### Buttons
```css
/* Primary Button */
.btn--primary {
  background-color: var(--color-primary);
  color: var(--color-inverted-text);
  font-weight: var(--font-weight-semibold);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  transition: background-color var(--transition-duration);
}

.btn--primary:hover {
  background-color: var(--color-primary-hover);
}

/* Secondary Button */
.btn--secondary {
  background-color: transparent;
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
  transition: all var(--transition-duration);
}

.btn--secondary:hover {
  background-color: var(--color-primary);
  color: var(--color-inverted-text);
}

/* Ghost Button */
.btn--ghost {
  background-color: transparent;
  color: var(--color-text-primary);
  transition: background-color var(--transition-duration);
}

.btn--ghost:hover {
  background-color: var(--color-overlay-light);
}
```

#### Cards
```css
.card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-xl);
  padding: var(--spacing-lg);
  backdrop-filter: blur(var(--backdrop-blur));
  box-shadow: var(--shadow-lg);
}

.card--elevated {
  background-color: var(--color-surface-elevated);
  border-color: var(--color-border-elevated);
  box-shadow: var(--shadow-xl);
}
```

## 📝 Coding Standards

### CSS Standards

#### BEM Methodology
Follow BEM (Block, Element, Modifier) methodology for class naming:

```css
/* Block */
.card { }

/* Element */
.card__title { }
.card__content { }
.card__footer { }

/* Modifier */
.card--featured { }
.card--compact { }
.card__title--large { }
```

#### File Organization
- Create separate CSS files for each component
- Use descriptive file names
- Import files in the correct order in `main.css`
- Keep related styles together

#### CSS Properties Order
Use alphabetical order for CSS properties:

```css
.element {
  background-color: var(--color-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  color: var(--color-text-primary);
  display: flex;
  font-size: var(--font-size-base);
  margin: var(--spacing-md);
  padding: var(--spacing-sm);
  text-align: center;
}
```

#### Responsive Design
Use mobile-first approach with CSS custom properties:

```css
.component {
  padding: var(--spacing-sm);
}

@media (min-width: 768px) {
  .component {
    padding: var(--spacing-md);
  }
}

@media (min-width: 1024px) {
  .component {
    padding: var(--spacing-lg);
  }
}
```

### JavaScript Standards

#### ES6+ Features
Use modern JavaScript features:

```javascript
// Use const and let instead of var
const config = { /* ... */ };
let state = { /* ... */ };

// Use arrow functions
const handleClick = (event) => {
  // Handle click
};

// Use destructuring
const { title, content } = section.settings;

// Use template literals
const message = `Hello, ${name}!`;
```

#### Module Organization
Organize JavaScript into logical modules:

```javascript
// dev/js/features/cart.js
export function initCart() {
  // Cart initialization
}

export function addToCart(productId) {
  // Add to cart logic
}

export function removeFromCart(productId) {
  // Remove from cart logic
}
```

#### Error Handling
Always include proper error handling:

```javascript
export function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle error appropriately
  }
}
```

### Liquid Standards

#### Template Structure
Use consistent template structure:

```liquid
{% comment %}
  Section: Hero Banner
  Purpose: Main hero section for homepage
  Author: BloxMania Team
  Date: 2024-01-01
{% endcomment %}

<section class="hero" data-section-id="{{ section.id }}">
  <div class="hero__container">
    <h1 class="hero__title">{{ section.settings.title }}</h1>
    <p class="hero__subtitle">{{ section.settings.subtitle }}</p>
    {% if section.settings.button_text %}
      <a href="{{ section.settings.button_url }}" class="btn btn--primary">
        {{ section.settings.button_text }}
      </a>
    {% endif %}
  </div>
</section>

{% schema %}
{
  "name": "Hero Banner",
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "Title",
      "default": "Welcome to BloxMania"
    }
  ]
}
{% endschema %}
```

#### Variable Naming
Use descriptive variable names:

```liquid
{% comment %} Good {% endcomment %}
{% assign product_title = product.title %}
{% assign collection_products = collection.products %}

{% comment %} Avoid {% endcomment %}
{% assign t = product.title %}
{% assign p = collection.products %}
```

## ♿ Accessibility Standards

### Semantic HTML
Use proper HTML elements:

```html
<!-- Good -->
<header class="header">
  <nav class="nav" role="navigation">
    <ul class="nav__list">
      <li class="nav__item">
        <a href="/" class="nav__link">Home</a>
      </li>
    </ul>
  </nav>
</header>

<!-- Avoid -->
<div class="header">
  <div class="nav">
    <div class="nav__list">
      <div class="nav__item">
        <a href="/" class="nav__link">Home</a>
      </div>
    </div>
  </div>
</div>
```

### ARIA Attributes
Include appropriate ARIA attributes:

```html
<button 
  class="btn btn--primary" 
  aria-label="Add to cart"
  aria-describedby="product-description">
  Add to Cart
</button>

<div class="modal" role="dialog" aria-labelledby="modal-title">
  <h2 id="modal-title">Product Details</h2>
  <!-- Modal content -->
</div>
```

### Keyboard Navigation
Ensure full keyboard accessibility:

```css
/* Focus styles */
.btn:focus,
.nav__link:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Skip links */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--color-primary);
  color: var(--color-inverted-text);
  padding: 8px;
  text-decoration: none;
  z-index: 1000;
}

.skip-link:focus {
  top: 6px;
}
```

## 🎯 Performance Standards

### CSS Performance
- Use CSS custom properties for consistent values
- Minimize CSS bundle size
- Use efficient selectors
- Leverage CSS Grid and Flexbox

### JavaScript Performance
- Use event delegation for dynamic content
- Debounce user input events
- Lazy load non-critical resources
- Minimize DOM queries

### Image Optimization
- Use appropriate image formats (WebP, AVIF)
- Implement lazy loading
- Provide multiple sizes for responsive images
- Use descriptive alt text

## 📚 Related Documentation

- **[Project Structure](../PROJECT_STRUCTURE.md)** - File organization
- **[Development Workflow](../DEVELOPMENT.md)** - Development process
- **[Build System](../BUILD_SYSTEM.md)** - Build system architecture

---

**Maintain consistent, accessible, and performant code! 🎨**
