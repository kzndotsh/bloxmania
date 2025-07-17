# BloxMania Theme - API Reference

## JavaScript Utilities

### DOMUtils

Utility class for DOM manipulation following Dawn's patterns.

#### Methods

##### `getFocusableElements(container)`
Get focusable elements within a container.

**Parameters:**
- `container` (Element): Container element to search within

**Returns:** NodeList - List of focusable elements

**Example:**
```javascript
const focusableElements = DOMUtils.getFocusableElements(modal);
```

##### `trapFocus(container, elementToFocus)`
Trap focus within a container for accessibility.

**Parameters:**
- `container` (Element): Container to trap focus within
- `elementToFocus` (Element): Element to focus initially

**Example:**
```javascript
DOMUtils.trapFocus(modal, modal.querySelector('input'));
```

##### `removeTrapFocus(container)`
Remove focus trap from container.

**Parameters:**
- `container` (Element): Container to remove focus trap from

**Example:**
```javascript
DOMUtils.removeTrapFocus(modal);
```

##### `animateHeight(element, show)`
Animate element height with smooth transitions.

**Parameters:**
- `element` (Element): Element to animate
- `show` (Boolean): Whether to show or hide

**Example:**
```javascript
DOMUtils.animateHeight(dropdown, true);
```

##### `isElementVisible(element)`
Check if element is visible in viewport.

**Parameters:**
- `element` (Element): Element to check

**Returns:** Boolean - Whether element is visible

**Example:**
```javascript
if (DOMUtils.isElementVisible(element)) {
  // Element is in viewport
}
```

##### `debounce(func, wait)`
Debounce function calls to improve performance.

**Parameters:**
- `func` (Function): Function to debounce
- `wait` (Number): Wait time in milliseconds

**Returns:** Function - Debounced function

**Example:**
```javascript
const debouncedSearch = DOMUtils.debounce(searchFunction, 300);
```

##### `throttle(func, limit)`
Throttle function calls to limit execution frequency.

**Parameters:**
- `func` (Function): Function to throttle
- `limit` (Number): Limit in milliseconds

**Returns:** Function - Throttled function

**Example:**
```javascript
const throttledScroll = DOMUtils.throttle(scrollHandler, 100);
```

### HTMLUpdateUtility

Utility for updating HTML content with proper script execution.

#### Methods

##### `updateHTML(targetElement, newHTML, options)`
Update HTML content with proper script execution.

**Parameters:**
- `targetElement` (Element): Element to update
- `newHTML` (String): New HTML content
- `options` (Object): Update options

**Example:**
```javascript
HTMLUpdateUtility.updateHTML(container, newContent, {
  executeScripts: true,
  preserveScroll: false
});
```

##### `updateSections(sections, options)`
Update specific sections of the page.

**Parameters:**
- `sections` (Object): Object with section IDs as keys and HTML as values
- `options` (Object): Update options

**Example:**
```javascript
HTMLUpdateUtility.updateSections({
  'cart-items': newCartHTML,
  'cart-total': newTotalHTML
});
```

### APIUtils

Utility for Shopify API interactions.

#### Methods

##### `fetchCart()`
Fetch current cart data.

**Returns:** Promise<Object> - Cart data

**Example:**
```javascript
const cart = await APIUtils.fetchCart();
```

##### `addToCart(items)`
Add items to cart.

**Parameters:**
- `items` (Array): Array of items to add

**Returns:** Promise<Object> - Updated cart data

**Example:**
```javascript
const updatedCart = await APIUtils.addToCart([{
  id: variantId,
  quantity: 1
}]);
```

##### `updateCart(updates)`
Update cart quantities.

**Parameters:**
- `updates` (Object): Object with variant IDs and quantities

**Returns:** Promise<Object> - Updated cart data

**Example:**
```javascript
const updatedCart = await APIUtils.updateCart({
  [variantId]: 2
});
```

## Web Components

### ProductForm

Custom element for product forms with variant selection and cart functionality.

#### Attributes
- `data-section-id`: Section identifier
- `data-product-id`: Product identifier

#### Events
- `product:variant-change`: Fired when variant changes
- `product:add-to-cart`: Fired when item added to cart

#### Methods

##### `updateVariant(variant)`
Update selected variant and UI.

**Parameters:**
- `variant` (Object): Variant object

**Example:**
```javascript
productForm.updateVariant(newVariant);
```

### SearchModal

Custom element for predictive search functionality.

#### Attributes
- `data-search-url`: Search endpoint URL
- `data-section-id`: Section identifier

#### Events
- `search:open`: Fired when search modal opens
- `search:close`: Fired when search modal closes
- `search:query`: Fired when search query changes

#### Methods

##### `open()`
Open search modal.

**Example:**
```javascript
searchModal.open();
```

##### `close()`
Close search modal.

**Example:**
```javascript
searchModal.close();
```

### CartNotification

Custom element for cart notifications.

#### Attributes
- `data-cart-url`: Cart endpoint URL

#### Events
- `cart:notification-show`: Fired when notification shows
- `cart:notification-hide`: Fired when notification hides

#### Methods

##### `show(product)`
Show cart notification for added product.

**Parameters:**
- `product` (Object): Product data

**Example:**
```javascript
cartNotification.show(productData);
```

##### `hide()`
Hide cart notification.

**Example:**
```javascript
cartNotification.hide();
```

## CSS Classes

### Layout Classes

#### `.container`
Main container with responsive max-widths.

**Usage:**
```html
<div class="container mx-auto px-4">
  <!-- Content -->
</div>
```

#### `.section-padding`
Standard section padding.

**Usage:**
```html
<section class="section-padding">
  <!-- Section content -->
</section>
```

### Component Classes

#### `.card`
Base card component with glassmorphism effect.

**Usage:**
```html
<div class="card">
  <!-- Card content -->
</div>
```

#### `.btn-primary`
Primary button styling.

**Usage:**
```html
<button class="btn-primary">
  Click me
</button>
```

#### `.btn-secondary`
Secondary button styling.

**Usage:**
```html
<button class="btn-secondary">
  Secondary action
</button>
```

#### `.text-gradient`
Gradient text effect.

**Usage:**
```html
<h1 class="text-gradient">
  Gradient heading
</h1>
```

### Animation Classes

#### `.animate-fade-in-up`
Fade in from bottom animation.

**Usage:**
```html
<div class="animate-fade-in-up">
  <!-- Animated content -->
</div>
```

#### `.animate-slide-in-left`
Slide in from left animation.

**Usage:**
```html
<div class="animate-slide-in-left">
  <!-- Animated content -->
</div>
```

#### `.animate-slide-in-right`
Slide in from right animation.

**Usage:**
```html
<div class="animate-slide-in-right">
  <!-- Animated content -->
</div>
```

#### `.animate-float`
Floating animation effect.

**Usage:**
```html
<div class="animate-float">
  <!-- Floating element -->
</div>
```

### Utility Classes

#### `.visually-hidden`
Hide element visually but keep accessible to screen readers.

**Usage:**
```html
<span class="visually-hidden">
  Screen reader only text
</span>
```

#### `.sr-only`
Screen reader only content.

**Usage:**
```html
<span class="sr-only">
  Additional context for screen readers
</span>
```

#### `.line-clamp-2`
Truncate text to 2 lines with ellipsis.

**Usage:**
```html
<p class="line-clamp-2">
  Long text that will be truncated...
</p>
```

## Liquid Snippets

### card-product

Renders a product card with customizable options.

#### Parameters
- `card_product` (Object): Product Liquid object
- `show_vendor` (Boolean): Show product vendor
- `show_quick_add` (Boolean): Show quick add button
- `lazy_load` (Boolean): Enable lazy loading
- `layout` (String): 'grid' or 'list' layout

#### Usage
```liquid
{% render 'card-product', 
   card_product: product, 
   show_vendor: true,
   layout: 'grid' %}
```

### button

Renders an accessible button component.

#### Parameters
- `button_text` (String): Button text
- `button_type` (String): Button type ('primary', 'secondary')
- `button_url` (String): Button URL
- `button_class` (String): Additional CSS classes

#### Usage
```liquid
{% render 'button',
   button_text: 'Shop Now',
   button_type: 'primary',
   button_url: '/collections/all' %}
```

### responsive-image

Renders a responsive image with lazy loading.

#### Parameters
- `image` (String): Image filename or object
- `alt` (String): Alt text
- `class` (String): CSS classes
- `width` (Number): Image width
- `height` (Number): Image height
- `loading` (String): Loading strategy

#### Usage
```liquid
{% render 'responsive-image',
   image: 'hero-image.jpg',
   alt: 'Hero image',
   class: 'w-full h-auto',
   loading: 'lazy' %}
```

## Theme Settings

### Color Settings
- `colors_primary`: Primary brand color
- `colors_secondary`: Secondary brand color
- `colors_background`: Background color
- `colors_text`: Text color

### Typography Settings
- `type_header_font`: Header font family
- `type_body_font`: Body font family
- `type_base_size`: Base font size

### Layout Settings
- `layout_page_width`: Maximum page width
- `layout_section_padding`: Section padding
- `layout_grid_gap`: Grid gap spacing

### Performance Settings
- `performance_lazy_loading`: Enable lazy loading
- `performance_critical_css`: Enable critical CSS
- `performance_minify_css`: Minify CSS output

## Events

### Theme Events

#### `theme:loaded`
Fired when theme is fully loaded.

```javascript
document.addEventListener('theme:loaded', function() {
  // Theme is ready
});
```

#### `theme:cart:updated`
Fired when cart is updated.

```javascript
document.addEventListener('theme:cart:updated', function(event) {
  const cart = event.detail.cart;
  // Handle cart update
});
```

#### `theme:variant:changed`
Fired when product variant changes.

```javascript
document.addEventListener('theme:variant:changed', function(event) {
  const variant = event.detail.variant;
  // Handle variant change
});
```

### Custom Events

#### `bloxmania:search:open`
Fired when search modal opens.

#### `bloxmania:search:close`
Fired when search modal closes.

#### `bloxmania:cart:notification:show`
Fired when cart notification shows.

#### `bloxmania:cart:notification:hide`
Fired when cart notification hides.

## Configuration

### Theme Configuration (theme.config.js)

Central configuration file with design tokens and settings.

#### Colors
```javascript
COLORS: {
  primary: {
    DEFAULT: '#ffd800',
    // ... color variations
  },
  secondary: {
    DEFAULT: '#4791f0',
    // ... color variations
  }
}
```

#### Typography
```javascript
TYPOGRAPHY: {
  fonts: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    heading: ['Inter', 'system-ui', 'sans-serif']
  },
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    // ... size scale
  }
}
```

#### Layout
```javascript
LAYOUT: {
  breakpoints: {
    sm: '640px',
    md: '768px',
    // ... breakpoints
  },
  spacing: {
    sections: '52px',
    gridVertical: '32px',
    gridHorizontal: '32px'
  }
}
```

### Tailwind Configuration (tailwind.config.js)

Tailwind CSS configuration extending the theme configuration.

#### Custom Colors
Uses CSS variables for dynamic theming:
```javascript
colors: {
  primary: 'rgb(var(--color-primary) / <alpha-value>)',
  secondary: 'rgb(var(--color-secondary) / <alpha-value>)'
}
```

#### Custom Components
```javascript
theme: {
  extend: {
    animation: {
      'fade-in-up': 'fadeInUp 0.5s ease-out',
      'slide-in-left': 'slideInLeft 0.5s ease-out'
    }
  }
}
```

## Error Handling

### JavaScript Error Handling

#### Global Error Handler
```javascript
window.addEventListener('error', function(event) {
  console.error('Theme Error:', event.error);
  // Handle error gracefully
});
```

#### API Error Handling
```javascript
try {
  const cart = await APIUtils.fetchCart();
} catch (error) {
  console.error('Cart fetch failed:', error);
  // Show user-friendly error message
}
```

### Liquid Error Handling

#### Safe Property Access
```liquid
{%- liquid
  assign product_title = product.title | default: 'Product'
  assign product_price = product.price | default: 0
-%}
```

#### Conditional Rendering
```liquid
{%- if product and product != empty -%}
  {% render 'card-product', card_product: product %}
{%- else -%}
  <p>No product available</p>
{%- endif -%}
```

This API reference provides comprehensive documentation for all JavaScript utilities, Web Components, CSS classes, Liquid snippets, and configuration options available in the BloxMania theme.