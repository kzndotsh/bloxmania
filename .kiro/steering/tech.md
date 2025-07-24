# BloxMania Technical Stack

## Core Technologies

- **Platform**: Shopify Liquid templating engine
- **CSS Framework**: Tailwind CSS 3.4+ with custom component layer
- **Build System**: Node.js with npm scripts, PostCSS, and Autoprefixer
- **JavaScript**: Modern ES6+ with Web Components and custom elements
- **Package Manager**: npm (requires Node.js 16+ and npm 8+)

## Build System

### Development Commands
```bash
# Start development with CSS watching and Shopify dev server
npm run dev:concurrent

# Development server only (builds CSS once)
npm run dev

# Watch CSS changes only
npm run dev:watch

# Build CSS for development
npm run build:css:dev
```

### Production Commands
```bash
# Build and deploy to Shopify
npm run build

# Build production CSS (minified)
npm run build:css:prod

# Deploy to store
npm run push

# Create theme package
npm run package
```

### Shopify CLI Commands
```bash
# Theme management
npm run pull          # Pull from store
npm run check         # Run theme validation
npm run check:fix     # Auto-fix theme issues
npm run lint          # Run linting
```

## Architecture Patterns

### CSS Architecture
- **Dawn-inspired patterns**: CSS custom properties with :root variables
- **Component-based**: Separate CSS files for each component (component-*.css)
- **Tailwind integration**: Utility-first with custom component layer
- **Design tokens**: Centralized colors, spacing, and typography in theme.config.js

### JavaScript Architecture
- **Web Components**: Custom elements extending HTMLElement
- **Modular utilities**: Separate files for DOM, API, and validation utilities
- **Event-driven**: Modern addEventListener patterns with proper cleanup
- **Performance-focused**: Intersection observers, lazy loading, and debouncing

### File Organization
```
theme/
├── assets/           # Compiled CSS, JS, and images
├── src/             # Source files for Tailwind CSS
├── build/           # Build scripts and utilities
├── sections/        # Shopify sections (Liquid)
├── snippets/        # Reusable Liquid components
├── templates/       # Page templates
├── config/          # Theme settings and configuration
└── locales/         # Translation files
```

## Key Dependencies

- **@shopify/cli**: Shopify development tools
- **tailwindcss**: Utility-first CSS framework
- **postcss**: CSS processing with autoprefixer and cssnano
- **dotenv-cli**: Environment variable management
- **concurrently**: Run multiple npm scripts simultaneously

## Development Workflow

1. **Setup**: `npm install` to install dependencies
2. **Environment**: Copy `.env.example` to `.env` and configure store settings
3. **Development**: Use `npm run dev:concurrent` for optimal development experience
4. **Testing**: Run `npm run check` before deployment
5. **Deployment**: Use `npm run build` to build and deploy

## Performance Optimizations

- **Critical CSS**: Inline critical styles for above-the-fold content
- **CSS Purging**: Remove unused Tailwind utilities in production
- **Image Optimization**: WebP format with fallbacks, lazy loading
- **JavaScript**: Code splitting, tree shaking, and service worker caching
- **Build Optimization**: Minification, compression, and bundle analysis