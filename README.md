# 🎮 BloxMania - Digital Goods Marketplace

> A high-performance, modern Shopify theme designed specifically for digital goods marketplaces, with a focus on gaming items, Roblox assets, and Fortnite cosmetics.

[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![Shopify CLI](https://img.shields.io/badge/Shopify%20CLI-3.82+-blue.svg)](https://shopify.dev/themes/tools/cli)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4+-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🚀 Quick Start

```bash
# Clone and setup
git clone https://github.com/kzndotsh/bloxmania.git
cd bloxmania
npm install

# Configure environment
npm run env:setup
# Edit .env with your Shopify store credentials

# Start development
npm run dev
```

## 📋 Table of Contents

- [✨ Features](#-features)
- [📁 Project Structure](#-project-structure)
- [🔄 Development Workflow](#-development-workflow)
- [🛠️ Build System](#️-build-system)
- [📜 Commands Reference](#-commands-reference)
- [⚙️ Configuration](#️-configuration)
- [⚡ Performance](#-performance)
- [♿ Accessibility](#-accessibility)
- [🤝 Contributing](#-contributing)
- [📚 Documentation](#-documentation)
- [🛠️ Tech Stack](#️-tech-stack)

## ✨ Features

### 🎯 Core Features
- **Gaming-First Design**: Optimized UI/UX for Roblox, Fortnite, and gaming communities
- **Digital Marketplace**: Streamlined purchasing flow for virtual goods and game items
- **Performance Optimized**: Advanced build system with incremental builds and asset optimization
- **Mobile-First Responsive**: Seamless experience across all devices and screen sizes
- **Modern Tech Stack**: Tailwind CSS 3.4+, ES6 modules, PostCSS pipeline

### 🛍️ E-commerce Features
- **Advanced Product Gallery**: Image zoom, lightbox, and media optimization
- **Quick Purchase Flow**: Streamlined add-to-cart and checkout experience  
- **Intelligent Search**: Real-time search with filtering and predictive results
- **Customer Dashboard**: Complete account management and order history
- **Review System**: Product ratings and customer feedback integration

### 🎨 Design System
- **Modular CSS Architecture**: Organized component-based styling system
- **Design Tokens**: Consistent colors, typography, and spacing variables
- **Theme Customization**: Full Shopify theme editor integration
- **Animation System**: Smooth CSS transitions and scroll-based animations
- **Dark Theme Ready**: Built-in support for dark/light mode switching

### 🔧 Developer Experience
- **Hot Reload Development**: Instant file changes with live browser updates
- **Custom Build System**: Optimized bundling for JavaScript and CSS
- **Code Quality Tools**: Prettier, Stylelint, and Theme Check integration
- **Unused Code Detection**: Knip integration for dead code elimination
- **Comprehensive Documentation**: Detailed guides and component documentation

## 📁 Project Structure

```
bloxmania/
├── 🛠️ Development Environment
│   ├── dev/                     # Source files for development
│   │   ├── js/                  # JavaScript modules
│   │   │   ├── core/           # Core utilities (api, dom, constants)
│   │   │   ├── features/       # Feature modules (cart, search, product)
│   │   │   ├── ui/             # UI components (header, modals, mobile-menu)
│   │   │   ├── helpers/        # Helper utilities (accessibility, keyboard)
│   │   │   └── system/         # System files (service-worker, analytics)
│   │   ├── css/                 # Modular CSS architecture
│   │   │   ├── main.css        # Main entry point with imports
│   │   │   ├── design-tokens.css # CSS custom properties
│   │   │   ├── base/           # Reset, typography, accessibility
│   │   │   ├── layout/         # Grid, header, footer, spacing
│   │   │   ├── components/     # Reusable UI components
│   │   │   ├── sections/       # Shopify section styles
│   │   │   └── utilities/      # Utility classes and responsive helpers
│   │   ├── images/             # Source images and assets
│   │   ├── sections/           # Shopify liquid sections
│   │   ├── snippets/           # Reusable liquid snippets
│   │   ├── templates/          # Shopify page templates
│   │   ├── layout/             # Theme layout files
│   │   ├── config/             # Shopify theme configuration
│   │   ├── locales/            # Translation files
│   │   └── utils/              # Build utilities and processors
│   │
├── 🚀 Production Output
│   ├── theme/                   # Compiled Shopify theme
│   │   ├── assets/             # Optimized CSS, JS, and images
│   │   ├── sections/           # Compiled Shopify sections
│   │   ├── snippets/           # Compiled snippets
│   │   ├── templates/          # Compiled templates
│   │   ├── layout/             # Theme layouts
│   │   ├── config/             # Theme configuration
│   │   └── locales/            # Localization files
│   │
├── 📚 Documentation & Configuration
│   ├── docs/                    # Comprehensive documentation
│   │   ├── GETTING_STARTED.md  # Setup and installation guide
│   │   ├── DEVELOPMENT.md      # Development workflow
│   │   ├── BUILD_SYSTEM.md     # Build system documentation
│   │   ├── PROJECT_STRUCTURE.md # Architecture overview
│   │   └── sections/           # Section-specific documentation
│   │
├── 🔧 Configuration Files
│   ├── build.js                # Custom build system
│   ├── package.json            # Project dependencies and scripts
│   ├── tailwind.config.js      # Tailwind CSS configuration
│   ├── postcss.config.js       # PostCSS processing pipeline
│   ├── nodemon.json            # File watching configuration
│   ├── knip.ts                 # Unused code detection
│   └── .env                    # Environment variables (local)
```

## 🔄 Development Workflow

### 1. Initial Setup
```bash
# Install dependencies
npm install

# Setup environment file
npm run env:setup

# Edit .env with your Shopify store details
SHOPIFY_STORE=your-store.myshopify.com
SHOPIFY_THEME_ID=auto
```

### 2. Development Process
```bash
# Start development server with hot reload
npm run dev

# The build system automatically:
# - Watches for file changes in dev/
# - Compiles CSS with Tailwind and PostCSS
# - Bundles JavaScript modules
# - Copies assets and liquid files to theme/
# - Syncs changes with Shopify store
```

**Key Development Rules:**
- ✅ **Always edit files in `dev/` directory**
- ❌ **Never edit files in `theme/` directory** (auto-generated)
- 🔄 **Changes in `dev/` trigger automatic rebuilds**
- 📱 **Test on multiple devices and browsers**

### 3. Production Deployment
```bash
# Build optimized theme
npm run build

# Deploy to Shopify
npm run push

# Create theme package
npm run package
```

## 🛠️ Build System

### JavaScript Processing
- **Custom Bundler**: [`dev/utils/bundler.js`](dev/utils/bundler.js)
- **Source**: Modular ES6 files in `dev/js/`
- **Output**: Single optimized `main.js` in `theme/assets/`
- **Features**: Tree shaking, minification, source maps (dev mode)

### CSS Processing Pipeline
```bash
Tailwind CSS → PostCSS → Autoprefixer → CSSnano (prod) → theme/assets/main.css
```
- **Framework**: Tailwind CSS 3.4+ with custom configuration
- **Architecture**: Modular CSS with design tokens and component-based organization
- **Optimization**: Unused CSS purging, minification, and duplicate removal

### Asset Optimization
- **Images**: Automatic compression and format optimization
- **Fonts**: Preload with `font-display: swap` for performance
- **Critical Resources**: Optimized loading order and lazy loading

### File Watching & Live Reload
- **Nodemon**: Watches `dev/` directory for changes
- **Debounced Builds**: Prevents excessive rebuilds during rapid changes
- **Shopify CLI**: Provides live reload functionality during development

## 📜 Commands Reference

### 🚀 Development Commands

| Command | Description | Live Reload |
|---------|-------------|-------------|
| `npm run dev` | Start development server | Hot reload (default) |
| `npm run dev:hot` | CSS and sections only | Hot reload |
| `npm run dev:full` | Full page refresh | Full page |
| `npm run dev:off` | No live reload | Manual refresh |
| `npm run dev:open` | Auto-open browser | Hot reload |
| `npm run dev:watch` | File watching only | No Shopify sync |

### 🔨 Build Commands

| Command | Description | Mode |
|---------|-------------|------|
| `npm run build` | Production build | Minified, optimized |
| `npm run build:dev` | Development build | Source maps, faster |
| `npm run build:css:dev` | CSS only (dev) | Readable output |
| `npm run build:css:prod` | CSS only (prod) | Minified, purged |
| `npm run build:js:dev` | JavaScript only (dev) | Source maps |
| `npm run build:js:prod` | JavaScript only (prod) | Minified, tree-shaken |

### 📦 Deployment Commands

| Command | Description |
|---------|-------------|
| `npm run push` | Build and deploy to Shopify |
| `npm run pull` | Download theme from Shopify |
| `npm run package` | Create .zip theme package |

### ✅ Quality & Maintenance

| Command | Description |
|---------|-------------|
| `npm run check` | Shopify theme validation |
| `npm run check:fix` | Auto-fix theme issues |
| `npm run format` | Format code with Prettier |
| `npm run lint:css` | Lint CSS with Stylelint |
| `npm run lint:css:fix` | Auto-fix CSS issues |
| `npm run knip` | Find unused code |

### 🧹 Cleanup Commands

| Command | Description |
|---------|-------------|
| `npm run clean` | Remove build/ and theme/ |
| `npm run clean:build` | Remove build/ only |
| `npm run clean:theme` | Remove theme/ only |

### ⚙️ Setup Commands

| Command | Description |
|---------|-------------|
| `npm run setup` | Install all dependencies |
| `npm run env:setup` | Create .env from template |
| `npm run backfill` | Guide for merchant changes |

## ⚙️ Configuration

### Environment Setup
Create `.env` file with your Shopify store details:
```bash
# Copy template
npm run env:setup

# Required variables
SHOPIFY_STORE=your-store.myshopify.com
SHOPIFY_PASSWORD=your-private-app-password
SHOPIFY_THEME_ID=auto
```

### Build Configuration Files

| File | Purpose |
|------|---------|
| [`build.js`](build.js) | Custom build system with incremental builds |
| [`tailwind.config.js`](tailwind.config.js) | Tailwind CSS configuration and custom theme |
| [`postcss.config.js`](postcss.config.js) | PostCSS plugins and optimization |
| [`nodemon.json`](nodemon.json) | File watching and build triggering |
| [`knip.ts`](knip.ts) | Unused code detection configuration |

### Code Quality Configuration

| File | Purpose |
|------|---------|
| `.prettierrc` | Code formatting rules |
| `.stylelintrc.json` | CSS linting and style rules |
| `.theme-check.yml` | Shopify theme validation |

### Tailwind CSS Theme
Custom color palette and design tokens:
```css
Primary: #ffd800 (Gaming Yellow)
Secondary: #4791f0 (Gaming Blue)  
Background: #1d1e26 (Dark Theme)
Accent: #59bab9 (Teal)
```

## ⚡ Performance

### Build Performance
- **Incremental Builds**: Only rebuilds changed files
- **Fast Development**: ~200ms rebuild times
- **Debounced Compilation**: Prevents excessive rebuilds
- **Parallel Processing**: CSS and JS built concurrently

### Runtime Performance
- **Core Web Vitals Optimized**: LCP, FID, and CLS optimization
- **Lazy Loading**: Images and non-critical resources
- **Critical CSS**: Above-the-fold styles inlined
- **Tree Shaking**: Unused JavaScript eliminated
- **Asset Optimization**: Minified CSS/JS, optimized images

### Caching Strategy
- **Browser Caching**: Proper cache headers for static assets
- **Shopify CDN**: Global content delivery network
- **Service Worker**: Offline functionality and asset caching

## ♿ Accessibility

### WCAG 2.1 AA Compliance
- **Semantic HTML**: Proper heading hierarchy and landmark elements
- **ARIA Support**: Screen reader compatibility and dynamic content announcements
- **Keyboard Navigation**: Full tab-based navigation support
- **Color Contrast**: Minimum 4.5:1 ratio for all text elements
- **Focus Management**: Visible focus indicators and logical tab order

### Inclusive Design Features
- **Skip Links**: Quick navigation for keyboard users
- **Alt Text**: Descriptive image alternatives
- **Form Labels**: Proper labeling and error handling
- **Responsive Design**: Usable on all devices and orientations

## 🤝 Contributing

### Development Guidelines
1. **Source Control**: Only edit files in `dev/` directory
2. **Modular Architecture**: Follow established CSS and JavaScript patterns
3. **Accessibility First**: Test with keyboard navigation and screen readers
4. **Code Quality**: Use Prettier and Stylelint before committing
5. **Documentation**: Update relevant docs when adding features

### Code Standards
- **CSS**: Alphabetical property ordering, modular architecture
- **JavaScript**: ES6+, meaningful naming, proper error handling
- **Liquid**: Semantic HTML, proper indentation, accessibility attributes
- **Performance**: Optimize images, minimize HTTP requests, use lazy loading

### Testing Checklist
- ✅ Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- ✅ Mobile responsiveness across screen sizes
- ✅ Accessibility with keyboard navigation and screen readers
- ✅ Performance monitoring with Lighthouse
- ✅ Shopify theme validation with `npm run check`

## 📚 Documentation

### Core Documentation
- [`docs/README.md`](docs/README.md) - Documentation index and overview
- [`docs/GETTING_STARTED.md`](docs/GETTING_STARTED.md) - Complete setup guide
- [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) - Development workflow and best practices
- [`docs/BUILD_SYSTEM.md`](docs/BUILD_SYSTEM.md) - Build system architecture
- [`docs/PROJECT_STRUCTURE.md`](docs/PROJECT_STRUCTURE.md) - Detailed project organization

### Component Documentation
- [`docs/sections/README.md`](docs/sections/README.md) - Shopify sections overview
- [`docs/snippets/README.md`](docs/snippets/README.md) - Reusable snippets guide
- [`docs/templates/README.md`](docs/templates/README.md) - Template system documentation

### Style Guide
- [`docs/style-guide/README.md`](docs/style-guide/README.md) - Design system and coding standards

## 🛠️ Tech Stack

### Frontend Technologies
- **CSS Framework**: Tailwind CSS 3.4+ with custom configuration
- **CSS Architecture**: Modular CSS with design tokens and component organization
- **JavaScript**: ES6+ modules with custom bundling system
- **Build System**: Custom Node.js build pipeline with incremental compilation
- **Package Management**: npm with lock file for dependency consistency

### Shopify Integration
- **Shopify CLI**: 3.82+ for theme development and deployment
- **Theme Check**: Automated Shopify theme validation
- **Liquid Templates**: Shopify's templating language for dynamic content
- **Section Groups**: Modern Shopify 2.0 theme architecture

### Development Tools
- **Code Formatting**: Prettier with Liquid plugin
- **CSS Linting**: Stylelint with Shopify-specific rules
- **PostCSS**: CSS processing pipeline with autoprefixer and minification
- **File Watching**: Nodemon for automatic rebuilds
- **Dead Code Detection**: Knip for unused code identification

### Performance Tools
- **Image Optimization**: Sharp for image processing and compression
- **CSS Optimization**: CSSnano for production minification
- **JavaScript Optimization**: Terser for minification and tree shaking
- **Bundle Analysis**: Custom bundler with dependency tracking

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Resources

- **Issues**: [GitHub Issues](https://github.com/kzndotsh/bloxmania/issues)
- **Documentation**: [Complete Documentation](docs/README.md)
- **Development Guide**: [Development Workflow](docs/DEVELOPMENT.md)
- **Shopify Resources**: [Shopify Theme Development](https://shopify.dev/themes)

---

**Built with ❤️ for the gaming community**

*BloxMania Theme v1.0.0 - Empowering digital goods marketplaces with modern web technology*