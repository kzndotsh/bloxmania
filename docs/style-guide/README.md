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

### Component Standards

#### Buttons
```css
/* Primary Button */
.btn--primary {
  @apply bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg;
  @apply hover:bg-yellow-400 transition-colors duration-200;
}

/* Secondary Button */
.btn--secondary {
  @apply bg-transparent border-2 border-yellow-500 text-yellow-500;
  @apply hover:bg-yellow-500 hover:text-black transition-all duration-200;
}

/* Ghost Button */
.btn--ghost {
  @apply bg-transparent text-white hover:bg-white/10;
  @apply transition-colors duration-200;
}
```

#### Cards
```css
.card {
  @apply bg-white/5 border border-white/10 rounded-2xl p-6;
  @apply backdrop-blur-sm shadow-lg;
}

.card--elevated {
  @apply bg-white/10 border-white/20 shadow-xl;
}
```

#### Forms
```css
.form-input {
  @apply bg-white/5 border border-white/20 rounded-lg px-4 py-3;
  @apply text-white placeholder-white/50 focus:border-yellow-500;
  @apply transition-colors duration-200;
}
```

### Animation System

#### Duration
- **Fast**: `150ms` - Quick interactions
- **Normal**: `300ms` - Standard transitions
- **Slow**: `500ms` - Complex animations

#### Easing
- **Smooth**: `cubic-bezier(0.4, 0, 0.2, 1)` - Standard easing
- **Bounce**: `cubic-bezier(0.68, -0.55, 0.265, 1.55)` - Playful animations
- **Linear**: `linear` - Simple transitions

#### Hover Effects
```css
.hover-lift {
  @apply transition-transform duration-200 hover:-translate-y-1;
}

.hover-glow {
  @apply transition-shadow duration-200 hover:shadow-lg hover:shadow-yellow-500/25;
}
```

## 🔧 Coding Standards

### CSS Standards

#### BEM Methodology
Follow BEM (Block, Element, Modifier) methodology for class naming:

```css
/* Block */
.product-card { }

/* Element */
.product-card__image { }
.product-card__title { }
.product-card__price { }

/* Modifier */
.product-card--featured { }
.product-card__image--large { }
```

#### File Organization
- **Base Styles**: `dev/css/styles.css` - Main stylesheet
- **Component Styles**: Use BEM classes in main stylesheet
- **Utility Classes**: Leverage Tailwind utilities
- **Custom Properties**: Use CSS custom properties for theming

#### Best Practices
- **Mobile-First**: Start with mobile styles, enhance for larger screens
- **Semantic Class Names**: Use descriptive, meaningful class names
- **Consistent Spacing**: Use the defined spacing system
- **Performance**: Minimize specificity and avoid deep nesting

### JavaScript Standards

#### ES6+ Features
Use modern JavaScript features:

```javascript
// Arrow functions
const handleClick = () => {
  // Handle click event
};

// Destructuring
const { id, title, price } = product;

// Template literals
const message = `Product ${title} costs $${price}`;

// Async/await
const fetchProduct = async (id) => {
  const response = await fetch(`/products/${id}.js`);
  return response.json();
};
```

#### Module Organization
```javascript
// Core utilities
import { debounce } from '../core/utils.js';

// Feature modules
import { ProductGallery } from '../features/product-gallery.js';

// UI components
import { Modal } from '../ui/modal.js';
```

#### Error Handling
```javascript
try {
  const result = await riskyOperation();
  return result;
} catch (error) {
  console.error('Operation failed:', error);
  // Graceful fallback
  return defaultValue;
}
```

### Liquid Standards

#### Template Structure
```liquid
{% comment %}
  Section: Product Card
  Description: Displays a product in card format
{% endcomment %}

<div class="product-card{% if featured %} product-card--featured{% endif %}">
  <img class="product-card__image" src="{{ product.featured_image | img_url: '400x' }}" alt="{{ product.title }}">
  <h3 class="product-card__title">{{ product.title }}</h3>
  <p class="product-card__price">{{ product.price | money }}</p>
</div>
```

#### Variable Naming
```liquid
{% comment %} Good: Descriptive variable names {% endcomment %}
{% assign featured_product = section.settings.product %}
{% assign product_price = featured_product.price %}

{% comment %} Avoid: Generic names {% endcomment %}
{% assign p = section.settings.product %}
```

#### Conditional Logic
```liquid
{% if product.available %}
  <button class="btn btn--primary">Add to Cart</button>
{% else %}
  <span class="product-unavailable">Out of Stock</span>
{% endif %}
```

## ♿ Accessibility Standards

### WCAG 2.1 AA Compliance
- **Color Contrast**: Minimum 4.5:1 ratio for normal text
- **Focus Indicators**: Visible focus rings on all interactive elements
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels and descriptions

### Semantic HTML
```html
<!-- Good: Semantic structure -->
<main>
  <section>
    <h1>Page Title</h1>
    <article>
      <h2>Article Title</h2>
      <p>Content here</p>
    </article>
  </section>
</main>

<!-- Avoid: Generic divs -->
<div class="main">
  <div class="section">
    <div class="title">Page Title</div>
  </div>
</div>
```

### ARIA Attributes
```html
<!-- Navigation -->
<nav aria-label="Main navigation">
  <ul role="menubar">
    <li role="none">
      <a role="menuitem" href="/products">Products</a>
    </li>
  </ul>
</nav>

<!-- Form elements -->
<input type="text" aria-label="Search products" aria-describedby="search-help">
<div id="search-help">Enter product name or keywords</div>
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: `0px - 639px` - Base styles
- **Small**: `640px+` - Small tablets
- **Medium**: `768px+` - Tablets
- **Large**: `1024px+` - Small desktops
- **Extra Large**: `1280px+` - Large desktops
- **2XL**: `1536px+` - Extra large screens

### Mobile-First Approach
```css
/* Mobile styles (default) */
.product-grid {
  @apply grid-cols-1 gap-4;
}

/* Small screens and up */
@media (min-width: 640px) {
  .product-grid {
    @apply grid-cols-2 gap-6;
  }
}

/* Medium screens and up */
@media (min-width: 768px) {
  .product-grid {
    @apply grid-cols-3 gap-8;
  }
}
```

### Touch Targets
- **Minimum Size**: `44px × 44px` for touch targets
- **Spacing**: `8px` minimum between touch targets
- **Visual Feedback**: Clear hover and active states

## 🚀 Performance Standards

### CSS Performance
- **Efficient Selectors**: Use simple, efficient selectors
- **Minimal Specificity**: Avoid overly specific selectors
- **Critical CSS**: Inline critical styles for above-the-fold content
- **Purge Unused**: Remove unused CSS in production

### JavaScript Performance
- **Lazy Loading**: Load non-critical JavaScript asynchronously
- **Event Delegation**: Use event delegation for dynamic content
- **Debouncing**: Debounce scroll and resize events
- **Minimal DOM**: Keep DOM manipulation minimal

### Image Optimization
- **WebP Format**: Use WebP with fallbacks
- **Responsive Images**: Use appropriate image sizes
- **Lazy Loading**: Load images as they enter viewport
- **Alt Text**: Always include descriptive alt text

## 📚 Documentation Standards

### Code Comments
```javascript
/**
 * Fetches product data from Shopify API
 * @param {number} productId - The product ID
 * @returns {Promise<Object>} Product data
 */
const fetchProduct = async (productId) => {
  // Implementation
};
```

### Component Documentation
Each component should include:
- **Purpose**: What the component does
- **Props/Parameters**: Available options and their types
- **Usage Examples**: Code examples and use cases
- **Dependencies**: Any required dependencies

---

**Follow these standards for consistent, maintainable code! 🎯**
