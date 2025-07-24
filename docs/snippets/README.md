# 🧩 Snippets

Snippets are reusable components that can be included in templates and sections. They provide modular, maintainable code that can be shared across different parts of your theme.

## 🎯 Overview

### What are Snippets?
Snippets are Liquid template files that contain reusable HTML, CSS, and JavaScript components. They can be:
- **Included**: Using `{% render 'snippet-name' %}`
- **Parameterized**: Pass data and settings as parameters
- **Nested**: Include other snippets within snippets
- **Conditional**: Render different content based on conditions

### Snippet Structure
Each snippet typically includes:
- **HTML Template**: Structure and markup
- **Liquid Logic**: Conditional rendering and loops
- **CSS Classes**: BEM methodology styling
- **JavaScript**: Interactive functionality (if needed)

## 📋 Available Snippets

### 🛍️ Product Components
Snippets for displaying and interacting with products.

| Snippet | Description | File |
|---------|-------------|------|
| [Product Media Gallery](product-media-gallery.md) | Product image gallery with zoom and lightbox | `product-media-gallery.liquid` |
| [Product Buy Buttons](product-buy-buttons.md) | Add to cart functionality and buttons | `product-buy-buttons.liquid` |
| [Product Variant Picker](product-variant-picker.md) | Product options selection (size, color, etc.) | `product-variant-picker.liquid` |
| [Product Price](product-price.md) | Price display with sale prices and formatting | `product-price.liquid` |
| [Product Rating](product-rating.md) | Star rating display | `product-rating.liquid` |
| [Product Reviews](product-reviews.md) | Customer reviews and ratings | `product-reviews.liquid` |
| [Product Features](product-features.md) | Product feature list | `product-features.liquid` |
| [Product Inventory](product-inventory.md) | Stock status and availability | `product-inventory.liquid` |
| [Card Product](card-product.md) | Product card component for grids | `card-product.liquid` |
| [Related Products](related-products.md) | Related products display | `related-products.liquid` |

### 🎨 UI Components
Reusable UI components for consistent design.

| Snippet | Description | File |
|---------|-------------|------|
| [Button](button.md) | Button component with variants | `button.liquid` |
| [Accessible Button](accessible-button.md) | Accessible button variant | `accessible-button.liquid` |
| [Accessible Form](accessible-form.md) | Accessible form wrapper | `accessible-form.liquid` |
| [Accessible Input](accessible-input.md) | Accessible input field | `accessible-input.liquid` |
| [Loading Spinner](loading-spinner.md) | Loading indicator component | `loading-spinner.liquid` |
| [Icon](icon.md) | Icon component with SVG support | `icon.liquid` |
| [Breadcrumb](breadcrumb.md) | Navigation breadcrumbs | `breadcrumb.liquid` |
| [Pagination](pagination.md) | Page navigation component | `pagination.liquid` |
| [Collapsible Content](collapsible-content.md) | Expandable content component | `collapsible-content.liquid` |
| [Cart Notification](cart-notification.md) | Cart update notifications | `cart-notification.liquid` |

### 📄 Content Components
Snippets for displaying content and media.

| Snippet | Description | File |
|---------|-------------|------|
| [Article Card](article-card.md) | Blog article preview card | `article-card.liquid` |
| [Creators Carousel](creators-carousel.md) | Content creators showcase | `creators-carousel.liquid` |
| [Chat Widget](chat-widget.md) | Live chat component | `chat-widget.liquid` |
| [Search Form](search-form.md) | Search functionality | `search-form.liquid` |
| [Share Button](share-button.md) | Social sharing component | `share-button.liquid` |
| [Responsive Image](responsive-image.md) | Responsive image component | `responsive-image.liquid` |
| [Quantity Input](quantity-input.md) | Quantity selector component | `quantity-input.liquid` |
| [Meta Tags](meta-tags.md) | SEO meta tags | `meta-tags.liquid` |

## 🛠️ Snippet Development

### Creating a New Snippet

1. **Create the Liquid File**
```liquid
<!-- dev/snippets/my-component.liquid -->
<div class="my-component">
  <h3 class="my-component__title">{{ title | default: 'Default Title' }}</h3>
  <div class="my-component__content">
    {{ content }}
  </div>
  {% if show_button %}
    <button class="my-component__button" type="button">
      {{ button_text | default: 'Click Me' }}
    </button>
  {% endif %}
</div>
```

2. **Add CSS Styling**
```css
/* dev/css/styles.css */
.my-component {
  @apply bg-white rounded-lg shadow-md p-6;
}

.my-component__title {
  @apply text-xl font-bold mb-4;
}

.my-component__content {
  @apply text-gray-700 mb-4;
}

.my-component__button {
  @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700;
}
```

3. **Add JavaScript (if needed)**
```javascript
// dev/js/ui/my-component.js
export class MyComponent {
  constructor(element) {
    this.element = element;
    this.button = element.querySelector('.my-component__button');
    this.init();
  }

  init() {
    if (this.button) {
      this.button.addEventListener('click', this.handleClick.bind(this));
    }
  }

  handleClick(event) {
    // Handle button click
  }
}
```

### Using Snippets

#### Basic Usage
```liquid
{% render 'my-component' %}
```

#### With Parameters
```liquid
{% render 'my-component',
  title: 'Custom Title',
  content: 'Custom content here',
  show_button: true,
  button_text: 'Custom Button'
%}
```

#### With Product Data
```liquid
{% render 'product-card',
  product: product,
  show_vendor: true,
  show_rating: true
%}
```

#### Conditional Rendering
```liquid
{% if product.available %}
  {% render 'product-buy-buttons', product: product %}
{% else %}
  {% render 'product-out-of-stock', product: product %}
{% endif %}
```

## 🎨 Snippet Best Practices

### HTML Structure
- **Semantic HTML**: Use proper HTML elements
- **BEM Methodology**: Follow BEM class naming conventions
- **Accessibility**: Include ARIA attributes and proper labels
- **SEO**: Use semantic markup for better SEO

### CSS Styling
- **BEM Classes**: Use BEM methodology for class names
- **Responsive**: Make components responsive by default
- **Performance**: Keep styles lightweight and efficient
- **Maintainability**: Use consistent naming and structure

### JavaScript
- **Modular**: Use ES6 modules for JavaScript
- **Event Delegation**: Handle dynamic content properly
- **Error Handling**: Include graceful error handling
- **Performance**: Optimize for performance

### Liquid Logic
- **Default Values**: Provide sensible defaults for parameters
- **Conditional Rendering**: Use conditional logic appropriately
- **Error Handling**: Handle missing or invalid data gracefully
- **Performance**: Optimize Liquid template logic

## 🔧 Snippet Parameters

### Common Parameter Types
- **Strings**: Text content and labels
- **Booleans**: Show/hide functionality
- **Objects**: Product, collection, or article data
- **Arrays**: Lists of items to loop through
- **Numbers**: Quantities, limits, or IDs

### Parameter Validation
```liquid
{% comment %} Validate required parameters {% endcomment %}
{% unless product %}
  {% assign product = blank %}
{% endunless %}

{% comment %} Provide default values {% endcomment %}
{% assign show_vendor = show_vendor | default: false %}
{% assign max_products = max_products | default: 4 %}
```

### Complex Parameters
```liquid
{% render 'product-card',
  product: product,
  settings: {
    show_vendor: true,
    show_rating: true,
    show_price: true,
    show_compare_price: true
  },
  classes: 'product-card--featured'
%}
```

## 📚 Snippet Documentation

Each snippet has detailed documentation including:
- **Purpose**: What the snippet does
- **Parameters**: Available parameters and their types
- **Usage**: How to use the snippet
- **Examples**: Code examples and use cases
- **Customization**: How to customize the snippet
- **Dependencies**: Any required dependencies

## 🎯 Performance Considerations

### Loading Performance
- **Minimal HTML**: Keep snippet HTML lightweight
- **Efficient Liquid**: Optimize Liquid template logic
- **Conditional Loading**: Only load what's needed
- **Caching**: Leverage Shopify's snippet caching

### Rendering Performance
- **Efficient Loops**: Optimize Liquid loops and iterations
- **Minimal DOM**: Keep DOM structure simple
- **Event Delegation**: Use event delegation for dynamic content
- **Lazy Loading**: Load content as needed

### CSS Performance
- **Efficient Selectors**: Use efficient CSS selectors
- **Minimal Specificity**: Avoid overly specific selectors
- **Shared Styles**: Reuse common styles across snippets
- **Critical CSS**: Load critical styles first

## 🔄 Snippet Development Workflow

### 1. Planning
- Define snippet purpose and functionality
- Plan HTML structure and content
- Design parameter interface
- Consider reusability and flexibility

### 2. Development
- Create Liquid template with parameters
- Add CSS styling with BEM methodology
- Implement JavaScript functionality
- Test across different contexts

### 3. Testing
- Test with different parameters
- Verify responsive behavior
- Check accessibility
- Test performance

### 4. Documentation
- Document snippet purpose
- Explain parameters and options
- Provide usage examples
- Include customization tips

## 🛠️ Advanced Snippet Techniques

### Nested Snippets
```liquid
{% comment %} Main snippet {% endcomment %}
<div class="product-grid">
  {% for product in products %}
    {% render 'product-card', product: product %}
  {% endfor %}
</div>

{% comment %} Nested snippet {% endcomment %}
{% render 'product-card',
  product: product,
  show_image: true,
  show_title: true,
  show_price: true
%}
```

### Dynamic Snippets
```liquid
{% comment %} Dynamic snippet selection {% endcomment %}
{% assign snippet_name = 'product-card-' | append: card_style %}
{% render snippet_name, product: product %}
```

### Snippet Composition
```liquid
{% comment %} Compose complex components {% endcomment %}
<div class="product-showcase">
  {% render 'product-media-gallery', product: product %}
  <div class="product-info">
    {% render 'product-title', product: product %}
    {% render 'product-price', product: product %}
    {% render 'product-variant-picker', product: product %}
    {% render 'product-buy-buttons', product: product %}
  </div>
</div>
```

---

**Build modular, reusable components with powerful snippets! 🧩**

