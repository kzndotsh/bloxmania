# BloxMania Theme - Component Documentation

## Overview

The BloxMania theme has been refactored into a modular component-based architecture for better maintainability, reusability, and scalability. This document outlines the new component structure and how to use each component.

## Directory Structure

```
theme/
├── snippets/
│   ├── ui/                    # Reusable UI components
│   │   ├── button.liquid      # Button component with variants
│   │   ├── card.liquid        # Card wrapper component
│   │   └── icon.liquid        # Icon component with common icons
│   ├── layout/                # Layout components
│   │   ├── mobile-menu.liquid # Mobile navigation menu
│   │   ├── navigation.liquid  # Desktop navigation
│   │   └── section-wrapper.liquid # Section wrapper with consistent styling
│   ├── content/               # Content-specific components
│   │   ├── creator-card.liquid     # Creator card for carousel
│   │   ├── creators-carousel.liquid # Creators carousel component
│   │   ├── faq-item.liquid         # FAQ item component
│   │   ├── game-card.liquid        # Game card for supported games
│   │   └── product-card.liquid     # Product card component
│   └── forms/                 # Form components (for future use)
├── sections/                  # Main sections using components
└── utils/                     # Utility functions (for future use)
```

## Component Categories

### 1. UI Components (`snippets/ui/`)

Basic reusable UI elements that can be used throughout the theme.

#### Button Component (`ui/button.liquid`)

A versatile button component with multiple variants and sizes.

**Usage:**
```liquid
{% render 'ui/button', 
  text: 'Click me',
  url: '/link',
  variant: 'primary',
  size: 'medium',
  icon: 'arrow-right',
  classes: 'custom-class'
%}
```

**Parameters:**
- `text` (required): Button text
- `url` (optional): Link URL (creates `<a>` tag instead of `<button>`)
- `variant` (optional): `'primary'`, `'secondary'`, `'outline'`, `'ghost'` (default: `'primary'`)
- `size` (optional): `'small'`, `'medium'`, `'large'` (default: `'medium'`)
- `icon` (optional): Icon name to display
- `classes` (optional): Additional CSS classes
- `type` (optional): `'button'`, `'submit'` (default: `'button'`)
- `disabled` (optional): Boolean to disable button

**Variants:**
- **Primary**: Yellow background, black text
- **Secondary**: Blue background, white text
- **Outline**: Transparent background, primary border
- **Ghost**: Transparent background, no border

#### Card Component (`ui/card.liquid`)

A flexible card wrapper for consistent styling.

**Usage:**
```liquid
{% render 'ui/card', 
  classes: 'custom-class',
  hover: true,
  padding: 'large',
  background: 'widget'
%}
  <h3>Card Title</h3>
  <p>Card content</p>
{% endrender %}
```

**Parameters:**
- `classes` (optional): Additional CSS classes
- `hover` (optional): Enable hover effects (default: `true`)
- `padding` (optional): `'small'`, `'medium'`, `'large'` (default: `'medium'`)
- `background` (optional): `'default'`, `'widget'`, `'gradient'`

#### Icon Component (`ui/icon.liquid`)

Centralized icon management with common icons.

**Usage:**
```liquid
{% render 'ui/icon', name: 'arrow-right', classes: 'w-4 h-4' %}
```

**Parameters:**
- `name` (required): Icon name
- `classes` (optional): Additional CSS classes

**Available Icons:**
- `arrow-right`, `chevron-down`, `menu`, `close`, `plus`
- `star`, `heart`, `shopping-cart`, `user`, `search`
- `youtube`, `discord`

### 2. Layout Components (`snippets/layout/`)

Components for page structure and navigation.

#### Mobile Menu Component (`layout/mobile-menu.liquid`)

Full-screen mobile navigation menu.

**Usage:**
```liquid
{% render 'layout/mobile-menu', 
  menu: linklists.main-menu,
  classes: 'custom-class'
%}
```

**Parameters:**
- `menu` (optional): Menu object (default: `linklists.main-menu`)
- `classes` (optional): Additional CSS classes

#### Navigation Component (`layout/navigation.liquid`)

Desktop navigation menu.

**Usage:**
```liquid
{% render 'layout/navigation', 
  menu: linklists.main-menu,
  classes: 'custom-class'
%}
```

**Parameters:**
- `menu` (optional): Menu object (default: `linklists.main-menu`)
- `classes` (optional): Additional CSS classes

#### Section Wrapper Component (`layout/section-wrapper.liquid`)

Consistent wrapper for sections with padding and background options.

**Usage:**
```liquid
{% render 'layout/section-wrapper', 
  classes: 'custom-class',
  background: 'dark',
  padding: 'large',
  max_width: 'container'
%}
  <h2>Section Content</h2>
{% endrender %}
```

**Parameters:**
- `classes` (optional): Additional CSS classes
- `background` (optional): `'default'`, `'dark'`, `'gradient'`, `'image'`
- `padding` (optional): `'small'`, `'medium'`, `'large'` (default: `'medium'`)
- `max_width` (optional): `'container'`, `'full'` (default: `'container'`)

### 3. Content Components (`snippets/content/`)

Specialized components for specific content types.

#### Product Card Component (`content/product-card.liquid`)

Displays product information in a card format.

**Usage:**
```liquid
{% render 'content/product-card', 
  product: product,
  classes: 'custom-class',
  show_vendor: true,
  image_size: 'medium'
%}
```

**Parameters:**
- `product` (required): Shopify product object
- `classes` (optional): Additional CSS classes
- `show_vendor` (optional): Show product vendor (default: `false`)
- `image_size` (optional): `'small'`, `'medium'`, `'large'` (default: `'medium'`)
- `background` (optional): Background style variant

#### Creator Card Component (`content/creator-card.liquid`)

Displays creator information with subscriber count.

**Usage:**
```liquid
{% render 'content/creator-card', 
  name: 'Ali-A',
  image: 'Ali-A.png',
  subscribers: '19.6M',
  classes: 'custom-class'
%}
```

**Parameters:**
- `name` (required): Creator name
- `image` (required): Image filename
- `subscribers` (required): Subscriber count
- `classes` (optional): Additional CSS classes

#### Creators Carousel Component (`content/creators-carousel.liquid`)

Animated carousel displaying multiple creator cards.

**Usage:**
```liquid
{% render 'content/creators-carousel', 
  creators: creators_array,
  classes: 'custom-class'
%}
```

**Parameters:**
- `creators` (optional): Array of creator objects
- `classes` (optional): Additional CSS classes

#### Game Card Component (`content/game-card.liquid`)

Displays supported games with coming soon overlay.

**Usage:**
```liquid
{% render 'content/game-card', 
  name: 'Fortnite',
  image: 'fortnite.png',
  coming_soon: false,
  classes: 'custom-class'
%}
```

**Parameters:**
- `name` (required): Game name
- `image` (required): Image filename
- `coming_soon` (optional): Show coming soon overlay (default: `false`)
- `classes` (optional): Additional CSS classes

#### FAQ Item Component (`content/faq-item.liquid`)

Interactive FAQ item with expand/collapse functionality.

**Usage:**
```liquid
{% render 'content/faq-item', 
  question: 'How does it work?',
  answer: 'It works great!',
  index: 1,
  classes: 'custom-class'
%}
```

**Parameters:**
- `question` (required): FAQ question text
- `answer` (required): FAQ answer text
- `index` (required): Unique index for the FAQ item
- `classes` (optional): Additional CSS classes

## Benefits of Component Architecture

### 1. **Maintainability**
- Changes to UI elements only need to be made in one place
- Consistent styling across the entire theme
- Easier debugging and testing

### 2. **Reusability**
- Components can be used in multiple sections
- Reduces code duplication
- Faster development of new features

### 3. **Scalability**
- Easy to add new components
- Modular structure supports growth
- Clear separation of concerns

### 4. **Consistency**
- Uniform styling and behavior
- Standardized parameter patterns
- Predictable component API

## Best Practices

### 1. **Component Naming**
- Use descriptive, kebab-case names
- Group related components in appropriate directories
- Follow the pattern: `category/component-name.liquid`

### 2. **Parameter Handling**
- Always provide sensible defaults
- Use liquid `default` filter for optional parameters
- Document all parameters in component comments

### 3. **Styling**
- Use Tailwind CSS classes for consistency
- Include component-specific styles when necessary
- Maintain responsive design principles

### 4. **Documentation**
- Include usage examples in component comments
- Document all parameters and their types
- Provide clear descriptions of component purpose

## Migration Guide

### From Old Structure to New Components

**Old Way:**
```liquid
<button class="bg-primary text-black px-6 py-3 rounded-md">
  Click me
</button>
```

**New Way:**
```liquid
{% render 'ui/button', text: 'Click me', variant: 'primary' %}
```

**Old Way:**
```liquid
<div class="product-card">
  <img src="{{ product.image | img_url }}" alt="{{ product.title }}">
  <h3>{{ product.title }}</h3>
  <p>{{ product.price | money }}</p>
</div>
```

**New Way:**
```liquid
{% render 'content/product-card', product: product %}
```

## Future Enhancements

### Planned Components
- `forms/newsletter-signup.liquid` - Newsletter subscription form
- `forms/contact-form.liquid` - Contact form component
- `ui/modal.liquid` - Modal/popup component
- `ui/tooltip.liquid` - Tooltip component
- `content/testimonial-card.liquid` - Customer testimonial card

### Utility Functions
- `utils/responsive-image.liquid` - Responsive image helper
- `utils/price-formatter.liquid` - Price formatting utility
- `utils/date-formatter.liquid` - Date formatting utility

## Troubleshooting

### Common Issues

1. **Component not rendering**
   - Check file path is correct
   - Ensure all required parameters are provided
   - Verify component exists in `snippets/` directory

2. **Styling not applied**
   - Check Tailwind CSS classes are correct
   - Ensure custom styles are properly scoped
   - Verify CSS build process is working

3. **JavaScript not working**
   - Check for script tag conflicts
   - Ensure DOM elements exist before JavaScript runs
   - Verify event listeners are properly attached

### Getting Help

- Review component documentation and examples
- Check the theme's main documentation
- Test components in isolation
- Use browser developer tools for debugging

## Conclusion

The new component-based architecture provides a solid foundation for maintaining and extending the BloxMania theme. By following these guidelines and best practices, you can efficiently work with the theme while maintaining consistency and quality.

For questions or suggestions about the component system, please refer to the main theme documentation or contact the development team. 