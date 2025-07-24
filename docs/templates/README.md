# 📄 Templates

Templates define the structure and layout of different page types in your Shopify theme. They determine which sections are displayed and how the page is organized.

## 🎯 Overview

### What are Templates?
Templates are Liquid files that define the structure of different page types. They can be:
- **JSON Templates**: For dynamic sections and content
- **Liquid Templates**: For static content and logic
- **Alternate Templates**: For specialized page layouts

### Template Types
- **Page Templates**: Define the structure of specific pages
- **Collection Templates**: Handle collection listing pages
- **Product Templates**: Handle product detail pages
- **Customer Templates**: Handle customer account pages

## 📋 Available Templates

### 🏠 Main Pages
Core page templates that define the structure of main pages.

| Template | Description | File |
|---------|-------------|------|
| [Index](index.md) | Homepage template | `index.liquid` |
| [Product](product.md) | Product detail page | `product.liquid` |
| [Collection](collection.md) | Collection listing page | `collection.liquid` |
| [Page](page.md) | Generic page template | `page.liquid` |
| [Page Guarantee](page-guarantee.md) | Guarantee page template | `page.guarantee.liquid` |

### 🛍️ E-commerce Pages
Templates for shopping and cart functionality.

| Template | Description | File |
|---------|-------------|------|
| [Cart](cart.md) | Shopping cart page | `cart.json` |
| [Search](search.md) | Search results page | `search.json` |

### 📝 Content Pages
Templates for blog and content pages.

| Template | Description | File |
|---------|-------------|------|
| [Blog](blog.md) | Blog listing page | `blog.json` |
| [Article](article.md) | Blog article page | `article.json` |

### 🔐 System Pages
Templates for system and error pages.

| Template | Description | File |
|---------|-------------|------|
| [404](404.md) | 404 error page | `404.json` |
| [Password](password.md) | Password protection page | `password.json` |

### 👤 Customer Pages
Templates for customer account pages.

| Template | Description | File |
|---------|-------------|------|
| [Customer Account](customers/account.md) | Customer account dashboard | `customers/account.json` |
| [Customer Login](customers/login.md) | Customer login page | `customers/login.json` |
| [Customer Register](customers/register.md) | Customer registration page | `customers/register.json` |
| [Customer Addresses](customers/addresses.md) | Address management | `customers/addresses.json` |
| [Customer Order](customers/order.md) | Order details page | `customers/order.json` |
| [Customer Activate Account](customers/activate_account.md) | Account activation | `customers/activate_account.json` |
| [Customer Reset Password](customers/reset_password.md) | Password reset | `customers/reset_password.json` |

### 🛠️ Development Templates
Templates for development and debugging.

| Template | Description | File |
|---------|-------------|------|
| [Debug Collections](debug-collections.md) | Debug collections page | `debug-collections.liquid` |

## 🛠️ Template Development

### Creating a New Template

1. **Create the Template File**
```liquid
<!-- dev/templates/my-template.liquid -->
{% comment %}
  Template: My Custom Template
  Description: Custom template for specific page type
{% endcomment %}

{% section 'header' %}

<main class="my-template">
  <div class="my-template__container">
    <h1 class="my-template__title">{{ page_title }}</h1>
    <div class="my-template__content">
      {{ page_content }}
    </div>
  </div>
</main>

{% section 'footer' %}
```

2. **Add CSS Styling**
```css
/* dev/css/styles.css */
.my-template {
  @apply py-12 px-4;
}

.my-template__container {
  @apply max-w-6xl mx-auto;
}

.my-template__title {
  @apply text-3xl font-bold mb-6;
}

.my-template__content {
  @apply prose prose-lg;
}
```

### JSON Templates
JSON templates allow for dynamic sections and content:

```json
{
  "sections": {
    "header": {
      "type": "header",
      "settings": {
        "logo_width": 100,
        "menu": "main-menu"
      }
    },
    "hero": {
      "type": "hero",
      "settings": {
        "title": "Welcome to our store",
        "subtitle": "Find amazing products"
      }
    },
    "featured_products": {
      "type": "featured-products",
      "settings": {
        "collection": "frontpage",
        "products_to_show": 4
      }
    },
    "footer": {
      "type": "footer",
      "settings": {
        "show_social": true
      }
    }
  },
  "order": [
    "header",
    "hero",
    "featured_products",
    "footer"
  ]
}
```

### Liquid Templates
Liquid templates provide more control over logic and content:

```liquid
{% comment %}
  Template: Product Template
  Description: Product detail page with custom logic
{% endcomment %}

{% section 'header' %}

<main class="product-template">
  {% if product %}
    {% section 'main-product' %}
    {% section 'product-recommendations' %}
  {% else %}
    <div class="product-not-found">
      <h1>Product not found</h1>
      <p>Sorry, this product is no longer available.</p>
    </div>
  {% endif %}
</main>

{% section 'footer' %}
```

## 🎨 Template Customization

### Theme Editor Customization
Templates can be customized through the theme editor:

1. **Go to Theme Editor**: Shopify Admin → Online Store → Themes → Customize
2. **Select Template**: Choose the template to edit
3. **Add Sections**: Add new sections to the template
4. **Reorder Sections**: Drag and drop to reorder sections
5. **Customize Settings**: Modify section settings

### Code Customization
Templates can be customized by editing the Liquid files:

- **Add Custom Logic**: Add conditional rendering and loops
- **Include Snippets**: Use snippets for reusable components
- **Custom Styling**: Add custom CSS classes and styling
- **JavaScript Integration**: Add custom JavaScript functionality

## 🔧 Template Best Practices

### HTML Structure
- **Semantic HTML**: Use proper HTML elements
- **BEM Methodology**: Follow BEM class naming conventions
- **Accessibility**: Include ARIA attributes and proper labels
- **SEO**: Use semantic markup for better SEO

### CSS Styling
- **BEM Classes**: Use BEM methodology for class names
- **Responsive**: Make templates responsive by default
- **Performance**: Keep styles lightweight and efficient
- **Maintainability**: Use consistent naming and structure

### Liquid Logic
- **Default Values**: Provide sensible defaults for variables
- **Conditional Rendering**: Use conditional logic appropriately
- **Error Handling**: Handle missing or invalid data gracefully
- **Performance**: Optimize Liquid template logic

### JavaScript
- **Modular**: Use ES6 modules for JavaScript
- **Event Delegation**: Handle dynamic content properly
- **Error Handling**: Include graceful error handling
- **Performance**: Optimize for performance

## 📚 Template Documentation

Each template has detailed documentation including:
- **Purpose**: What the template does
- **Sections**: Available sections and their settings
- **Usage**: How to use the template
- **Customization**: How to customize the template
- **Examples**: Code examples and use cases

## 🎯 Performance Considerations

### Loading Performance
- **Minimal HTML**: Keep template HTML lightweight
- **Efficient Liquid**: Optimize Liquid template logic
- **Conditional Loading**: Only load what's needed
- **Caching**: Leverage Shopify's template caching

### Rendering Performance
- **Efficient Loops**: Optimize Liquid loops and iterations
- **Minimal DOM**: Keep DOM structure simple
- **Event Delegation**: Use event delegation for dynamic content
- **Lazy Loading**: Load content as needed

### CSS Performance
- **Efficient Selectors**: Use efficient CSS selectors
- **Minimal Specificity**: Avoid overly specific selectors
- **Shared Styles**: Reuse common styles across templates
- **Critical CSS**: Load critical styles first

## 🔄 Template Development Workflow

### 1. Planning
- Define template purpose and functionality
- Plan HTML structure and content
- Design section layout and organization
- Consider accessibility and performance

### 2. Development
- Create Liquid template with sections
- Add CSS styling with BEM methodology
- Implement JavaScript functionality
- Test across different devices

### 3. Testing
- Test in theme editor
- Verify responsive behavior
- Check accessibility
- Test performance

### 4. Documentation
- Document template purpose
- Explain sections and settings
- Provide usage examples
- Include customization tips

---

**Build powerful page layouts with flexible templates! 📄** 