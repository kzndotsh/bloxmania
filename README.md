# BloxMania Shopify Theme

A modern, dark gaming-themed Shopify store built with Tailwind CSS.

## 🚀 Quick Start

### Setup
```bash
# Install dependencies
npm install

# Set up environment (if not already done)
npm run env:setup
```

### Development
```bash
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
├── dev/                     # Source files
│   ├── css/                # CSS source files
│   │   └── styles.css      # Main Tailwind CSS file
│   ├── js/                 # JavaScript modules
│   │   ├── core/           # Core functionality
│   │   ├── helpers/        # Utility helpers
│   │   ├── features/       # Feature modules
│   │   ├── ui/             # UI components
│   │   └── system/         # System utilities
│   ├── utils/              # Build tools and utilities
│   │   ├── bundler.js
│   │   ├── css-optimizer.js
│   │   └── liquid-doc-generator.js
│   ├── sections/           # Theme sections
│   ├── snippets/           # Reusable snippets
│   ├── templates/          # Page templates
│   ├── layout/             # Layout templates
│   ├── config/             # Theme configuration
│   ├── locales/            # Translation files
│   └── images/             # Source images
├── build/                  # Build output (generated)
│   ├── css/               # Compiled CSS files
│   ├── js/                # JavaScript bundles
│   └── images/            # Processed images
├── theme/                  # Final Shopify theme (generated)
│   ├── assets/            # Production assets
│   ├── sections/          # Theme sections
│   ├── snippets/          # Theme snippets
│   └── templates/         # Theme templates
├── docs/                   # Documentation (generated)
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
└── package.json            # Dependencies and scripts
```

## 🎨 Styling

The theme uses a modern Tailwind CSS setup:

- **Single CSS file**: All styles are compiled into `theme/assets/main.css`
- **Dark gaming theme**: Primary colors are yellow (#ffd800) and blue (#4791f0)
- **Modern components**: Cards, buttons, and animations built with Tailwind utilities
- **Responsive design**: Mobile-first approach with custom breakpoints
- **CSS optimization**: Critical CSS extraction and PostCSS optimization

## 🔧 Available Scripts

### 🚀 Development
- `npm run dev:concurrent` - Start development server with live reloading
- `npm run dev:watch` - Watch for changes and rebuild
- `npm run dev` - Build and start development server

### 🔨 Build & Deploy
- `npm run build:dev` - Development build (unminified)
- `npm run build` - Production build (minified)
- `npm run push` - Build and push to Shopify
- `npm run pull` - Pull theme from Shopify
- `npm run package` - Create theme package

### 🎨 CSS Optimization
- `npm run css:analyze` - Run all CSS optimizations
- `npm run css:critical` - Extract critical CSS
- `npm run css:optimize` - Optimize CSS with PostCSS
- `npm run css:manifest` - Generate CSS manifest

### 📚 Documentation
- `npm run docs:generate` - Generate documentation
- `npm run docs:serve` - Serve documentation locally

### ✅ Quality Assurance
- `npm run check` - Check theme for issues
- `npm run check:fix` - Auto-fix theme issues
- `npm run test` - Run theme tests

## 🎯 Key Features

- **Modern build system** - Advanced CSS optimization and JavaScript bundling
- **Single CSS file** - All styles in one optimized file with critical CSS extraction
- **JavaScript bundling** - Modular JS architecture with single bundle output
- **Modern Tailwind CSS** - Latest version with custom gaming theme
- **Shopify CLI integration** - Easy development and deployment
- **Dark gaming theme** - Perfect for gaming products with yellow/blue color scheme
- **Responsive design** - Mobile-first approach with custom breakpoints
- **Automated documentation** - LiquidDoc generation for all templates
- **Performance optimization** - CSS minification, critical path optimization

## 🛠️ Customization

To customize the theme:

1. Edit `dev/css/styles.css` for global styles
2. Modify `tailwind.config.js` for theme colors and utilities
3. Update Liquid templates in `dev/sections/` and `dev/snippets/`
4. Add new JavaScript modules in `dev/js/`
5. Add new sections in `dev/sections/`

The build system automatically processes all changes and updates the theme.

### Development Workflow

1. **Source files** in `dev/` directory
2. **Build process** uses utilities in `dev/utils/`
3. **Build output** in `build/` directory
4. **Final theme** in `theme/` directory
5. **Documentation** in `docs/` directory

All changes are automatically processed and the theme is updated in real-time during development.
