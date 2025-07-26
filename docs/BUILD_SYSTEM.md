# 🏗️ Build System

The BloxMania theme uses a modern, efficient build system that processes source files from the `dev/` directory and outputs optimized files to the `theme/` directory for Shopify deployment.

## 🎯 Overview

### Build System Features
- **Fast Development**: 200ms build intervals for rapid development
- **Production Optimization**: Minified and optimized assets for production
- **Incremental Builds**: Only rebuilds changed files
- **Asset Processing**: CSS compilation, JavaScript bundling, image optimization
- **Live Reload**: Automatic rebuilds trigger Shopify CLI live reload

### Architecture
```
dev/                    # 🛠️ Source Files
├── css/               # CSS source (modular architecture)
├── js/                # JavaScript modules
├── sections/          # Shopify sections
├── snippets/          # Shopify snippets
├── templates/         # Shopify templates
└── ...

theme/                  # 🚀 Production Files
├── assets/            # Final assets for Shopify
├── sections/          # Shopify sections
├── snippets/          # Shopify snippets
└── ...
```

## 🚀 Build Commands

### Development Commands
```bash
# Start development server with live reload
npm run dev

# Fast development build
npm run build:dev

# Watch for changes and rebuild
npm run dev:watch
```

### Production Commands
```bash
# Production build (optimized)
npm run build

# Build and deploy to Shopify
npm run push
```

### Individual Asset Commands
```bash
# Build CSS only
npm run build:css:dev      # Development CSS
npm run build:css:prod     # Production CSS

# Build JavaScript only
npm run build:js:dev       # Development JS
npm run build:js:prod      # Production JS
```

## 🔧 Build Process

### Development Build Process
1. **File Watching**: Monitors `dev/` directory for changes
2. **Fast Copy**: Direct file copying with minimal processing
3. **CSS Compilation**: Tailwind CSS compilation
4. **Asset Copying**: Copy processed assets to `theme/`
5. **Live Reload**: Shopify CLI triggers browser reload

### Production Build Process
1. **Clean Build**: Remove existing `theme/` directory
2. **Asset Optimization**: Minify CSS and JavaScript
3. **Image Optimization**: Compress and optimize images
4. **File Processing**: Process all theme files
5. **Final Copy**: Copy optimized files to `theme/`

## 📁 File Processing

### CSS Processing
```bash
# Source: dev/css/main.css
# Output: theme/assets/main.css

# Development
tailwindcss -i ./dev/css/main.css -o ./build/css/main.css --config ./tailwind.config.js

# Production
NODE_ENV=production tailwindcss -i ./dev/css/main.css -o ./build/css/main.css --config ./tailwind.config.js --minify
```

**Features:**
- **Modular Architecture**: CSS organized into logical modules
- **Design Tokens**: CSS custom properties for consistent values
- **Tailwind Integration**: Utility-first CSS framework
- **PostCSS Processing**: Autoprefixer and optimization
- **Minification**: Production builds are minified

### JavaScript Processing
```bash
# Source: dev/js/ (all JavaScript files)
# Output: theme/assets/main.js

# Development
node ./dev/utils/bundler.js --mode=development

# Production
node ./dev/utils/bundler.js --mode=production
```

**Features:**
- **ES6 Modules**: Modern JavaScript module system
- **Bundling**: All modules bundled into single file
- **Minification**: Production builds are minified with Terser
- **Source Maps**: Development builds include source maps
- **Tree Shaking**: Unused code elimination

### Asset Optimization
- **Images**: Automatic compression and optimization
- **Fonts**: Optimized loading with `font-display: swap`
- **Performance**: Lazy loading and critical resource optimization

## 🛠️ Build Script Architecture

### Main Build Script (`build.js`)
The build system is orchestrated by a custom Node.js script that provides:

#### Key Features
- **Dual Mode Operation**: Development and production modes
- **Incremental Builds**: Only processes changed files
- **Debounced Builds**: Prevents excessive rebuilds
- **Error Handling**: Graceful error handling and recovery
- **Progress Reporting**: Clear build status and progress

#### Build Modes

**Development Mode (`--mode=development`)**
- Fast file copying with minimal processing
- CSS compilation with source maps
- JavaScript bundling with source maps
- Live reload integration
- Optimized for rapid iteration

**Production Mode (`--mode=production`)**
- Full optimization and minification
- Asset compression and optimization
- Clean builds with complete regeneration
- Performance-focused output
- Optimized for deployment

#### Build Process Flow

1. **Initialization**
   - Parse command line arguments
   - Set up build mode and configuration
   - Initialize file watchers and timers

2. **Development Build**
   - Fast file copying from `dev/` to `theme/`
   - CSS compilation with Tailwind
   - JavaScript bundling
   - Asset optimization

3. **Production Build**
   - Clean `theme/` directory
   - Full asset optimization
   - Minification and compression
   - Complete file regeneration

4. **File Processing**
   - Copy Shopify theme files (sections, snippets, templates)
   - Process and optimize assets
   - Generate final production files

## 📦 Asset Processing

### CSS Architecture
The CSS follows a modular architecture with clear separation of concerns:

```
dev/css/
├── main.css              # Main entry point with imports
├── design-tokens.css     # CSS custom properties
├── base/                 # Foundation styles
│   ├── reset.css
│   ├── typography.css
│   ├── animations.css
│   └── accessibility.css
├── layout/               # Layout components
│   ├── header.css
│   ├── footer.css
│   ├── grid.css
│   └── spacing.css
├── components/           # Reusable components
│   ├── component-button.css
│   ├── component-card.css
│   └── ...
├── sections/             # Section-specific styles
│   ├── section-header.css
│   ├── section-hero.css
│   └── ...
└── utilities/            # Utility classes
    ├── responsive.css
    ├── states.css
    └── ...
```

### JavaScript Architecture
JavaScript is organized into logical modules:

```
dev/js/
├── core/                 # Core utilities and constants
├── features/             # Feature-specific modules
├── ui/                   # UI components and interactions
├── helpers/              # Helper utilities
└── system/               # System-level files
```

## ⚡ Performance Optimizations

### Development Performance
- **Fast Builds**: 200ms build intervals
- **Incremental Processing**: Only rebuilds changed files
- **Debounced Changes**: Prevents excessive rebuilds
- **Live Reload**: Instant browser updates

### Production Performance
- **Asset Minification**: CSS and JavaScript compression
- **Image Optimization**: Automatic compression and optimization
- **Tree Shaking**: Unused code elimination
- **Critical CSS**: Inline critical styles for above-the-fold content

### Caching Strategy
- **Browser Caching**: Optimized cache headers
- **Shopify CDN**: Leverages Shopify's global CDN
- **Service Workers**: Offline functionality when appropriate

## 🔧 Configuration

### Build Configuration Files
- **`build.js`**: Main build script
- **`tailwind.config.js`**: Tailwind CSS configuration
- **`postcss.config.js`**: PostCSS processing pipeline
- **`nodemon.json`**: File watching configuration

### Environment Configuration
- **`.env`**: Local environment variables
- **`dev/shopify.env.example`**: Environment template

### Code Quality Tools
- **`knip.ts`**: Unused code detection
- **`.prettierrc`**: Code formatting rules
- **`.stylelintrc.json`**: CSS linting rules
- **`.theme-check.yml`**: Shopify theme validation

## 🚨 Troubleshooting

### Common Issues

**Build Fails**
- Check for syntax errors in source files
- Verify all dependencies are installed
- Check file permissions and paths

**Slow Builds**
- Reduce file watching scope
- Optimize source file organization
- Check for unnecessary file changes

**Live Reload Not Working**
- Verify Shopify CLI is running
- Check theme ID configuration
- Ensure build process completes successfully

### Debug Commands
```bash
# Check build system status
npm run build:dev -- --verbose

# Validate theme structure
npm run check

# Check for unused code
npm run knip
```

## 📚 Related Documentation

- **[Project Structure](PROJECT_STRUCTURE.md)** - Complete file organization
- **[Development Workflow](DEVELOPMENT.md)** - Development process
- **[Development Scripts](DEVELOPMENT_SCRIPTS.md)** - All available commands

---

**Optimized for fast development and production deployment! 🚀**