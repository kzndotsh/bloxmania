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
| [Main Search](main-search.md) | Search results page | `main-search.md` |
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
      "label": "Content"
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

2. **Add CSS Styling**
```css
/* dev/css/styles.css */
.my-section {
  @apply py-12 px-4;
}

.my-section__container {
  @apply max-w-6xl mx-auto;
}

.my-section__title {
  @apply text-3xl font-bold mb-6;
}

.my-section__content {
  @apply prose prose-lg;
}
```

3. **Add JavaScript (if needed)**
```javascript
// dev/js/features/my-section.js
export class MySection {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    // Initialize section functionality
  }
}
```

### Section Best Practices

#### HTML Structure
- **Semantic HTML**: Use proper HTML elements
- **BEM Methodology**: Follow BEM class naming
- **Accessibility**: Include ARIA attributes
- **SEO**: Use proper heading hierarchy

#### CSS Styling
- **Mobile-First**: Start with mobile styles
- **Responsive**: Use Tailwind responsive classes
- **Performance**: Keep styles lightweight
- **Maintainability**: Use BEM methodology

#### JavaScript
- **Modular**: Use ES6 modules
- **Event Delegation**: Handle dynamic content
- **Error Handling**: Graceful error handling
- **Performance**: Optimize for performance

#### Schema Design
- **Clear Labels**: Use descriptive labels
- **Sensible Defaults**: Provide good defaults
- **Validation**: Add input validation
- **Documentation**: Include help text

## 🎨 Section Customization

### Theme Editor Settings
Sections can be customized through the theme editor:

1. **Go to Theme Editor**: Shopify Admin → Online Store → Themes → Customize
2. **Select Page**: Choose the page to edit
3. **Add Section**: Click "Add section" to add new sections
4. **Customize**: Use the settings panel to customize
5. **Reorder**: Drag and drop to reorder sections

### Common Settings Types
- **Text**: Simple text input
- **Rich Text**: Rich text editor
- **Image**: Image picker
- **Color**: Color picker
- **Range**: Slider input
- **Select**: Dropdown selection
- **Checkbox**: Boolean toggle
- **Product**: Product picker
- **Collection**: Collection picker

### Blocks
Blocks allow for repeatable content within sections:

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
          "label": "Title"
        },
        {
          "type": "richtext",
          "id": "content",
          "label": "Content"
        }
      ]
    }
  ]
}
{% endschema %}
```

## 🔧 Section Development Workflow

### 1. Planning
- Define section purpose and functionality
- Plan HTML structure and content
- Design settings and customization options
- Consider accessibility and performance

### 2. Development
- Create Liquid template with schema
- Add CSS styling with BEM methodology
- Implement JavaScript functionality
- Test across different devices

### 3. Testing
- Test in theme editor
- Verify responsive behavior
- Check accessibility
- Test performance

### 4. Documentation
- Document section purpose
- Explain settings and options
- Provide usage examples
- Include customization tips

## 📚 Section Documentation

Each section has detailed documentation including:
- **Purpose**: What the section does
- **Settings**: Available customization options
- **Blocks**: Repeatable content options
- **Usage**: How to use the section
- **Customization**: Advanced customization tips
- **Examples**: Usage examples and code snippets

## 🎯 Performance Considerations

### Loading Performance
- **Lazy Loading**: Load images and content as needed
- **Minimal JavaScript**: Keep JavaScript lightweight
- **Optimized Images**: Use appropriate image sizes
- **CSS Optimization**: Minimize CSS bundle size

### Rendering Performance
- **Efficient Liquid**: Optimize Liquid template logic
- **Caching**: Leverage Shopify's caching
- **CDN**: Use Shopify's CDN for assets
- **Critical CSS**: Load critical styles first

---

**Build amazing content with powerful sections! 🚀**

