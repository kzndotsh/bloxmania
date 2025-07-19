# BloxMania Shopify Theme

A modern, dark gaming-themed Shopify store built with Tailwind CSS.

## 🚀 Quick Start

### Development
```bash
# Install dependencies
npm install

# Start development server with live CSS reloading
npm run dev:concurrent

# Or just watch CSS changes
npm run dev:watch
```

### Building for Production
```bash
# Build CSS for production
npm run build:css:prod

# Full build and push to Shopify
npm run build

# Or just push (builds CSS first)
npm run push
```

## 📁 Project Structure

```
bloxmania/
├── theme/                    # Shopify theme files
│   ├── assets/              # Compiled CSS and assets
│   ├── layout/              # Theme layout templates
│   ├── sections/            # Theme sections
│   ├── snippets/            # Reusable template snippets
│   ├── templates/           # Page templates
│   └── src/                 # Source files
│       └── styles.css       # Main Tailwind CSS file
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
└── package.json             # Dependencies and scripts
```

## 🎨 Styling

The theme uses a simplified Tailwind CSS setup:

- **Single CSS file**: All styles are compiled into `theme/assets/base.css`
- **Dark gaming theme**: Primary colors are yellow (#ffd800) and blue (#4791f0)
- **Modern components**: Cards, buttons, and animations built with Tailwind utilities
- **Responsive design**: Mobile-first approach with custom breakpoints

## 🔧 Available Scripts

- `npm run dev:concurrent` - Start development server with CSS watching
- `npm run dev:watch` - Watch CSS changes only
- `npm run build:css:dev` - Build CSS for development
- `npm run build:css:prod` - Build minified CSS for production
- `npm run build` - Build and push to Shopify
- `npm run push` - Push theme to Shopify
- `npm run pull` - Pull theme from Shopify
- `npm run check` - Check theme for issues
- `npm run package` - Create theme package

## 🎯 Key Features

- **Simplified build system** - No complex component builds or optimizers
- **Single CSS file** - All styles in one optimized file
- **Modern Tailwind CSS** - Latest version with custom gaming theme
- **Shopify CLI integration** - Easy development and deployment
- **Dark theme** - Perfect for gaming products
- **Responsive design** - Works on all devices

## 🛠️ Customization

To customize the theme:

1. Edit `theme/src/styles.css` for global styles
2. Modify `tailwind.config.js` for theme colors and utilities
3. Update Liquid templates in `theme/sections/` and `theme/snippets/`
4. Add new sections in `theme/sections/`

The build system automatically processes all changes and updates the theme.
