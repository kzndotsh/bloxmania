# Tailwind CSS Setup for BloxMania Shopify Theme

## ✅ Setup Complete!

Tailwind CSS has been successfully configured for your Shopify theme. Here's what was set up:

### 📁 Files Added/Modified:

1. **`tailwind.config.js`** - Tailwind configuration with your custom colors and theme
2. **`postcss.config.js`** - PostCSS configuration for processing
3. **`src/styles.css`** - Source CSS file with Tailwind directives and custom components
4. **`package.json`** - Updated with Tailwind dependencies and build scripts
5. **`assets/base.css`** - Generated output file (automatically compiled)

### 🎨 Custom Colors Available:

```css
/* Your brand colors are configured in Tailwind */
primary: #ffd800 (your main yellow)
secondary: #4791f0 (blue)
background: #1d1e26 (dark theme)
accent: #59bab9 (teal)
```

### 🛠️ Available Commands:

```bash
# Development (with file watching)
npm run dev

# Build CSS for production
npm run build:css:prod

# Build CSS for development
npm run build:css

# Deploy to Shopify
npm run push
```

### 📝 How to Use Tailwind in Your Liquid Files:

#### 1. Standard Tailwind Classes:
```liquid
<!-- Use any Tailwind utility class -->
<div class="flex items-center justify-center p-4 bg-primary text-black rounded-lg">
  <h2 class="text-2xl font-bold">{{ product.title }}</h2>
</div>
```

#### 2. Custom Component Classes:
```liquid
<!-- Use the pre-built component classes -->
<button class="btn-primary">Add to Cart</button>
<button class="btn-secondary">Learn More</button>
<button class="btn-outline">View Details</button>

<div class="card">
  <h3 class="text-xl font-bold">{{ product.title }}</h3>
  <p class="text-gray-400">{{ product.description }}</p>
</div>
```

#### 3. Responsive Design:
```liquid
<!-- Mobile-first responsive design -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {% for product in collection.products %}
    <div class="card">
      <img src="{{ product.featured_image | img_url: '400x400' }}" 
           class="w-full h-48 object-cover rounded-t-lg">
      <div class="p-4">
        <h3 class="text-lg font-semibold">{{ product.title }}</h3>
        <p class="text-primary font-bold">{{ product.price | money }}</p>
      </div>
    </div>
  {% endfor %}
</div>
```

### 🎯 Pre-built Components:

- **`.btn-primary`** - Yellow primary button
- **`.btn-secondary`** - Blue secondary button  
- **`.btn-outline`** - Outlined button
- **`.card`** - Card component with hover effects
- **`.text-gradient-primary`** - Gradient text effect
- **`.container`** - Responsive container
- **`.section-padding`** - Standard section padding
- **`.flex-center`** - Flex center utility
- **`.flex-between`** - Flex space-between utility

### 🔧 Development Workflow:

1. **Edit your Liquid files** with Tailwind classes
2. **Run `npm run dev`** to start development server with CSS watching
3. **CSS automatically rebuilds** when you save changes
4. **Deploy with `npm run push`** when ready

### 📋 Best Practices:

1. **Use utility classes** for most styling
2. **Create custom components** in `src/styles.css` for repeated patterns
3. **Use responsive classes** (sm:, md:, lg:, xl:) for different screen sizes
4. **Leverage the custom color palette** for brand consistency

### 🚀 Benefits:

- **Faster development** with utility classes
- **Consistent spacing** and sizing
- **Built-in responsive design** 
- **Optimized CSS** (only used classes are included)
- **Dark theme ready** with custom variables
- **Gaming aesthetic** with custom animations

### 📖 Need Help?

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shopify Liquid Documentation](https://shopify.dev/docs/themes/liquid)
- Check existing sections for examples of Tailwind usage

---

**Note**: The original CSS styles are preserved as CSS variables and custom components, so your existing theme continues to work while gaining all the benefits of Tailwind CSS! 