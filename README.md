# 🎮 BloxMania Shopify Theme

A high-performance, modern Shopify theme designed specifically for digital goods marketplaces, with a focus on gaming items, Roblox assets, and Fortnite cosmetics.

[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![Shopify CLI](https://img.shields.io/badge/Shopify%20CLI-3.82+-blue.svg)](https://shopify.dev/themes/tools/cli)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4+-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/kzndotsh/bloxmania.git
cd bloxmania

# Install dependencies
npm install

# Set up environment
npm run env:setup

# Start development server
npm run dev
```

## 📋 Table of Contents

- [Features](#-features)
- [Project Structure](#-project-structure)
- [Development Workflow](#-development-workflow)
- [Build System](#-build-system)
- [Commands Reference](#-commands-reference)
- [Configuration](#-configuration)
- [Performance](#-performance)
- [Accessibility](#-accessibility)
- [Contributing](#-contributing)
- [Documentation](#-documentation)

## ✨ Features

### 🎯 Core Features
- **Digital Goods Marketplace**: Optimized for gaming items, Roblox assets, Fortnite cosmetics
- **High Performance**: Optimized assets, lazy loading, and efficient build system
- **Mobile-First Design**: Responsive design that works on all devices
- **Accessibility**: WCAG 2.1 AA compliant with semantic HTML and ARIA support
- **Modern Tech Stack**: Tailwind CSS, ES6 modules, and modern JavaScript

### 🛍️ E-commerce Features
- **Product Galleries**: Advanced image galleries with zoom and lightbox
- **Quick Add to Cart**: Streamlined purchasing experience
- **Search & Filtering**: Intelligent search with predictive results
- **Customer Accounts**: Full account management system
- **Reviews & Ratings**: Product review system with star ratings

### 🎨 Design Features
- **Customizable Sections**: Modular section system for easy customization
- **Theme Editor Support**: Full Shopify theme editor integration
- **Dark/Light Mode**: Built-in theme switching capability
- **Animations**: Smooth CSS animations and transitions
- **Typography**: Modern, readable typography system

## 📁 Project Structure

```
bloxmania/
├── dev/                    # 🛠️ Development Environment
│   ├── js/                # JavaScript source files
│   │   ├── core/          # Core utilities and constants
│   │   ├── features/      # Feature-specific modules
│   │   ├── ui/            # UI components and interactions
│   │   ├── helpers/       # Helper utilities
│   │   └── system/        # System-level files
│   ├── css/               # CSS source files
│   │   └── styles.css     # Main stylesheet (BEM methodology)
│   ├── images/            # Image source files
│   ├── sections/          # Shopify sections
│   ├── snippets/          # Shopify snippets
│   ├── templates/         # Shopify templates
│   ├── layout/            # Shopify layouts
│   ├── config/            # Shopify configuration
│   └── locales/           # Translation files
├── build/                  # 🔨 Built Assets (Intermediate)
│   ├── css/               # Generated CSS files
│   ├── js/                # Generated JavaScript files
│   └── images/            # Optimized images
├── theme/                  # 🚀 Production Theme (for Shopify)
│   ├── assets/            # Final assets for Shopify
│   ├── sections/          # Shopify sections
│   ├── snippets/          # Shopify snippets
│   ├── templates/         # Shopify templates
│   ├── layout/            # Shopify layouts
│   ├── config/            # Shopify configuration
│   └── locales/           # Translation files
├── docs/                   # 📚 Documentation
├── .vscode/               # VS Code configuration
│   ├── settings.json      # Editor settings
│   └── extensions.json    # Recommended extensions
├── build.js               # Build script
├── package.json           # Project dependencies
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
├── nodemon.json           # File watching configuration
├── knip.ts                # Unused code detection
├── .env                   # Environment variables (local)
├── .gitignore             # Git exclusions
├── .prettierrc            # Prettier configuration
├── .prettierignore        # Prettier exclusions
├── .stylelintrc.json      # Stylelint configuration
├── .stylelintignore       # Stylelint exclusions
└── .theme-check.yml       # Shopify theme validation
```

## 🔄 Development Workflow

### 1. Setup
```bash
# Install dependencies
npm install

# Set up environment variables
npm run env:setup
```

### 2. Development
```bash
# Start development server with live reload
npm run dev

# Make changes in the dev/ directory
# Files automatically rebuild and reload
```

### 3. Build & Deploy
```bash
# Build for production
npm run build

# Deploy to Shopify
npm run push
```

## 🛠️ Build System

### JavaScript Processing
- **Bundler**: Custom bundler (`dev/utils/bundler.js`)
- **Input**: All JavaScript files from `dev/js/`
- **Output**: Single `main.js` bundle in `theme/assets/`
- **Features**: ES6 modules, minification, source maps

### CSS Processing
- **Framework**: Tailwind CSS 3.4+
- **Source**: `dev/css/styles.css` (BEM methodology)
- **Output**: Compiled CSS in `theme/assets/main.css`
- **Features**: PostCSS processing, autoprefixer, minification

### Asset Optimization
- **Images**: Automatic optimization and compression
- **Fonts**: Optimized loading with `font-display: swap`
- **Performance**: Lazy loading, critical CSS inlining

## 📜 Commands Reference

### 🚀 Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (default hot-reload) |
| `npm run dev:hot` | Hot reload CSS and sections only |
| `npm run dev:full` | Full page refresh on changes |
| `npm run dev:off` | No live reload (manual refresh) |
| `npm run dev:open` | Auto-open browser on start |
| `npm run dev:watch` | Watch for changes and rebuild |

### 🔨 Build Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Build for production |
| `npm run build:dev` | Build for development |
| `npm run build:css:dev` | Build CSS for development |
| `npm run build:css:prod` | Build CSS for production |
| `npm run build:js:dev` | Build JavaScript for development |
| `npm run build:js:prod` | Build JavaScript for production |

### 📦 Deploy Commands

| Command | Description |
|---------|-------------|
| `npm run push` | Build and deploy to Shopify |
| `npm run pull` | Pull latest theme from Shopify |
| `npm run package` | Create theme package |

### ✅ Quality Commands

| Command | Description |
|---------|-------------|
| `npm run check` | Check theme for issues |
| `npm run check:fix` | Auto-fix theme issues |
| `npm run format` | Format code with Prettier |
| `npm run lint:css` | Lint CSS files |
| `npm run lint:css:fix` | Auto-fix CSS issues |

### 🧹 Cleanup Commands

| Command | Description |
|---------|-------------|
| `npm run clean` | Clean build and theme directories |
| `npm run clean:build` | Clean build directory only |
| `npm run clean:theme` | Clean theme directory only |

### ⚙️ Setup Commands

| Command | Description |
|---------|-------------|
| `npm run setup` | Install dependencies |
| `npm run env:setup` | Set up environment file |
| `npm run backfill` | Guide for backfilling merchant changes |

## ⚙️ Configuration

### Environment Setup
```bash
# Copy environment template
cp dev/shopify.env.example .env

# Edit .env with your store settings
SHOPIFY_STORE=your-store.myshopify.com
SHOPIFY_THEME_ID=your-theme-id
```

### Build Configuration
- **Build Script**: `build.js` - Main build system
- **PostCSS**: `postcss.config.js` - CSS processing pipeline
- **Tailwind**: `tailwind.config.js` - CSS framework configuration
- **Nodemon**: `nodemon.json` - File watching configuration
- **Knip**: `knip.ts` - Unused code detection

### Code Quality & Formatting
- **Prettier**: `.prettierrc` - Code formatting rules
- **Prettier Ignore**: `.prettierignore` - Files to skip formatting
- **Stylelint**: `.stylelintrc.json` - CSS linting rules
- **Stylelint Ignore**: `.stylelintignore` - Files to skip linting
- **Theme Check**: `.theme-check.yml` - Shopify theme validation

### Development Tools
- **Git Ignore**: `.gitignore` - Version control exclusions
- **VS Code**: `.vscode/settings.json` - Editor configuration
- **VS Code Extensions**: `.vscode/extensions.json` - Recommended extensions

### Environment Files
- **Environment**: `.env` - Local environment variables (not in version control)
- **Example**: `dev/shopify.env.example` - Environment template

## ⚡ Performance

### Optimizations
- **Fast Development**: 200ms build intervals
- **Incremental Builds**: Only rebuilds changed files
- **Asset Optimization**: Minification and compression
- **Lazy Loading**: Images and non-critical resources
- **Critical CSS**: Inline critical styles for above-the-fold content

### Core Web Vitals
- **LCP**: Optimized image loading and critical resources
- **FID**: Minimal JavaScript execution blocking
- **CLS**: Stable layouts with proper image dimensions

### Caching Strategy
- **Browser Caching**: Optimized cache headers
- **Shopify CDN**: Leverages Shopify's global CDN
- **Service Workers**: Offline functionality when appropriate

## ♿ Accessibility

### WCAG 2.1 AA Compliance
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **ARIA Attributes**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: Minimum 4.5:1 ratio for text
- **Focus Management**: Visible focus indicators

### Screen Reader Support
- **Skip Links**: Quick navigation for keyboard users
- **ARIA Live Regions**: Dynamic content announcements
- **Alt Text**: Descriptive image alternatives
- **Form Labels**: Proper form labeling and grouping

## 🤝 Contributing

### Development Guidelines
1. **Work in `dev/`**: Never edit files in `theme/` directly
2. **Use BEM**: Follow BEM methodology for CSS classes
3. **Test Accessibility**: Ensure keyboard navigation works
4. **Follow Standards**: Use Prettier and Stylelint
5. **Document Changes**: Update documentation as needed

### Code Style
- **CSS**: BEM methodology, alphabetical properties
- **JavaScript**: ES6+, meaningful variable names
- **Liquid**: Proper indentation, meaningful comments
- **HTML**: Semantic elements, proper attributes

### Testing
- **Cross-browser**: Test on Chrome, Firefox, Safari, Edge
- **Mobile**: Test on various screen sizes
- **Accessibility**: Use screen readers and keyboard navigation
- **Performance**: Monitor Core Web Vitals

## 📚 Documentation

### Key Documentation Files
- [`docs/README.md`](docs/README.md) - Main documentation index
- [`docs/GETTING_STARTED.md`](docs/GETTING_STARTED.md) - Setup and installation guide
- [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) - Development workflow
- [`docs/DEVELOPMENT_SCRIPTS.md`](docs/DEVELOPMENT_SCRIPTS.md) - Development scripts guide
- [`docs/BUILD_SYSTEM.md`](docs/BUILD_SYSTEM.md) - Build system documentation
- [`docs/PROJECT_STRUCTURE.md`](docs/PROJECT_STRUCTURE.md) - Project structure guide

### Component Documentation
- [`docs/sections/README.md`](docs/sections/README.md) - Sections overview
- [`docs/snippets/README.md`](docs/snippets/README.md) - Snippets overview
- [`docs/templates/README.md`](docs/templates/README.md) - Templates overview

### Style Guide
- [`docs/style-guide/README.md`](docs/style-guide/README.md) - Design and coding standards

## 🛠️ Tech Stack

### Frontend
- **CSS Framework**: Tailwind CSS 3.4+
- **JavaScript**: ES6+ modules
- **Build Tool**: Custom bundler
- **Package Manager**: npm

### Shopify
- **CLI**: Shopify CLI 3.82+
- **Theme Check**: Shopify theme validation
- **Liquid**: Shopify's templating language

### Development Tools
- **Prettier**: Code formatting
- **Stylelint**: CSS linting
- **PostCSS**: CSS processing
- **Nodemon**: File watching

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/kzndotsh/bloxmania/issues)
- **Documentation**: [Documentation Index](docs/README.md)
- **Development Guide**: [Development Workflow](docs/DEVELOPMENT.md)
- **Shopify Docs**: [Shopify Theme Development](https://shopify.dev/themes)

---

**Built with ❤️ for the gaming community**
