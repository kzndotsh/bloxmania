# 📄 Sections

Sections are customizable content blocks that can be added to pages through the Shopify theme editor. They provide the building blocks for creating rich, dynamic content on your store.

## 🎯 Overview

### What are Sections?
Sections are the main content blocks of your Shopify theme. They can be:
- **Added/Removed**: Through the theme editor
- **Reordered**: Drag and drop to change layout
- **Customized**: Settings control appearance and content
- **Reused**: Same section can be used on multiple pages

### Section Structure
Each section consists of:
- **Liquid Template**: HTML structure and logic
- **CSS Styling**: Component-specific styles
- **JavaScript**: Interactive functionality
- **Schema**: Theme editor settings and blocks

## 📋 Available Sections

### 🏠 Main Pages
Core page sections that define the structure of main pages.

| Section | Description | File |
|---------|-------------|------|
| [Header](header.md) | Site navigation and branding | `header.liquid` |
| [Footer](footer.md) | Site footer and links | `footer.liquid` |
| [Hero](hero.md) | Hero banner section | `hero.liquid` |
| [Main Cart](main-cart.md) | Shopping cart page | `main-cart.liquid` |
| [Main Product](main-product.md) | Product detail page | `main-product.liquid` |
| [Main Search](main-search.md) | Search results page | `main-search.liquid` |
| [Main Collection](main-collection-product-grid.md) | Collection listing page | `main-collection-product-grid.liquid` |
| [Main Blog](main-blog.md) | Blog listing page | `main-blog.liquid` |
| [Main Article](main-article.md) | Blog article page | `main-article.liquid` |
| [Main 404](main-404.md) | 404 error page | `main-404.liquid` |
| [Main Password](main-password.md) | Password protection page | `main-password.liquid` |

### 👤 Customer Pages
Sections for customer account and authentication pages.

| Section | Description | File |
|---------|-------------|------|
| [Main Account](main-account.md) | Customer account dashboard | `main-account.liquid` |
| [Main Login](main-login.md) | Customer login page | `main-login.liquid` |
| [Main Register](main-register.md) | Customer registration page | `main-register.liquid` |
| [Main Addresses](main-addresses.md) | Address management | `main-addresses.liquid` |
| [Main Order](main-order.md) | Order details page | `main-order.liquid` |
| [Main Activate Account](main-activate-account.md) | Account activation | `main-activate-account.liquid` |
| [Main Reset Password](main-reset-password.md) | Password reset | `main-reset-password.liquid` |

### 🛍️ Product Sections
Sections for showcasing products and collections.

| Section | Description | File |
|---------|-------------|------|
| [Featured Product](featured-product.md) | Single product showcase | `featured-product.liquid` |
| [Featured Products](featured-products.md) | Multiple products showcase | `featured-products.liquid` |
| [Featured Collection](featured-collection.md) | Collection showcase | `featured-collection.liquid` |

### 🎨 Content Sections
Sections for rich content and marketing.

| Section | Description | File |
|---------|-------------|------|
| [Image Banner](image-banner.md) | Image with overlay text | `image-banner.liquid` |
| [Image with Text](image-with-text.md) | Image and text side-by-side | `image-with-text.liquid` |
| [Rich Text](rich-text.md) | Rich text content | `rich-text.liquid` |
| [Newsletter](newsletter.md) | Email newsletter signup | `newsletter.liquid` |
| [FAQ](faq.md) | Frequently asked questions | `faq.liquid` |
| [Customer Reviews](customer-reviews.md) | Product reviews display | `customer-reviews.liquid` |
| [Contact Form](contact-form.md) | Contact form | `contact-form.liquid` |
| [Why Choose Us](why-choose-us.md) | Value proposition section | `why-choose-us.liquid` |
| [Supported Games](supported-games.md) | Games showcase | `supported-games.liquid` |
| [Main Guarantee](main-guarantee.md) | Guarantee page | `main-guarantee.liquid` |

## 🛠️ Section Development

### Creating a New Section

1. **Create the Liquid File**
```liquid
<!-- dev/sections/my-section.liquid -->
<section class="my-section">
  <div class="my-section__container">
    <h2 class="my-section__title">{{ section.settings.title }}</h2>
    <div class="my-section__content">
      {{ section.settings.content }}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "My Section",
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "Title",
      "default": "My Section Title"
    },
    {
      "type": "richtext",
      "id": "content",
      "label": "Content",
      "default": "<p>Add your content here</p>"
    }
  ],
  "presets": [
    {
      "name": "My Section"
    }
  ]
}
{% endschema %}
```

2. **Add CSS Styles**
```css
/* dev/css/sections/section-my-section.css */
.my-section {
  padding: var(--spacing-lg) 0;
}

.my-section__container {
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

.my-section__title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-md);
}

.my-section__content {
  line-height: var(--line-height-base);
}
```

3. **Import CSS in Main File**
```css
/* dev/css/main.css */
@import "./sections/section-my-section.css";
```

4. **Add JavaScript (if needed)**
```javascript
// dev/js/features/my-section.js
export function initMySection() {
  // Section-specific JavaScript
}

// Import in main.js or appropriate feature file
```

### Section Best Practices

#### HTML Structure
- Use semantic HTML elements
- Follow BEM methodology for class names
- Ensure accessibility compliance
- Use proper heading hierarchy

#### CSS Organization
- Create section-specific CSS files
- Use CSS custom properties for consistent values
- Follow the modular CSS architecture
- Ensure responsive design

#### JavaScript Integration
- Keep JavaScript modular and reusable
- Use ES6 modules for imports/exports
- Ensure proper error handling
- Maintain accessibility features

#### Schema Design
- Provide meaningful default values
- Use appropriate input types
- Group related settings logically
- Include helpful descriptions

## 🎨 Section Customization

### Theme Editor Settings
Sections can be customized through the Shopify theme editor:

1. **Go to Theme Editor**: Online Store > Themes > Customize
2. **Select Page**: Choose the page to edit
3. **Add Section**: Click "Add section" to add new sections
4. **Configure Settings**: Use the sidebar to customize appearance
5. **Reorder Sections**: Drag and drop to change layout

### Common Settings Types
- **Text**: Simple text input
- **Rich Text**: Formatted text with HTML
- **Image**: Image upload and selection
- **Color**: Color picker
- **Select**: Dropdown selection
- **Checkbox**: Boolean toggle
- **Range**: Numeric slider
- **URL**: Link input

### Section Blocks
Sections can include blocks for dynamic content:

```liquid
{% for block in section.blocks %}
  <div class="my-section__block" {{ block.shopify_attributes }}>
    <h3>{{ block.settings.title }}</h3>
    <p>{{ block.settings.content }}</p>
  </div>
{% endfor %}

{% schema %}
{
  "blocks": [
    {
      "type": "content_block",
      "name": "Content Block",
      "settings": [
        {
          "type": "text",
          "id": "title",
          "label": "Block Title"
        },
        {
          "type": "richtext",
          "id": "content",
          "label": "Block Content"
        }
      ]
    }
  ]
}
{% endschema %}
```

## 🔧 Section Integration

### Template Integration
Sections are included in templates using Liquid:

```liquid
<!-- dev/templates/index.liquid -->
{% section 'hero' %}
{% section 'featured-products' %}
{% section 'newsletter' %}
```

### CSS Integration
Section styles are automatically included through the main CSS file:

```css
/* dev/css/main.css */
@import "./sections/section-header.css";
@import "./sections/section-hero.css";
@import "./sections/section-featured-products.css";
/* ... other sections */
```

### JavaScript Integration
Section JavaScript is bundled and available globally:

```javascript
// dev/js/features/hero.js
export function initHero() {
  // Hero section functionality
}

// dev/js/features/featured-products.js
export function initFeaturedProducts() {
  // Featured products functionality
}
```

## 📚 Related Documentation

- **[Snippets](../snippets/README.md)** - Reusable components
- **[Templates](../templates/README.md)** - Page templates
- **[CSS Architecture](../../PROJECT_STRUCTURE.md)** - CSS organization
- **[JavaScript Modules](../../PROJECT_STRUCTURE.md)** - JavaScript organization

---

**Build rich, dynamic content with flexible sections! 🎨**

