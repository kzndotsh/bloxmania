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
├── css/               # CSS source (Tailwind + BEM)
├── js/                # JavaScript modules
├── sections/          # Shopify sections
├── snippets/          # Shopify snippets
├── templates/         # Shopify templates
└── ...

build/                  # 🔨 Intermediate Files
├── css/               # Compiled CSS
├── js/                # Bundled JavaScript
└── images/            # Optimized images

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
npm run build:watch
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
# Source: dev/css/styles.css
# Output: theme/assets/main.css

# Development
tailwindcss -i ./dev/css/styles.css -o ./build/css/main.css --config ./tailwind.config.js

# Production
NODE_ENV=production tailwindcss -i ./dev/css/styles.css -o ./build/css/main.css --config ./tailwind.config.js --minify
```

**Features:**
- **Tailwind CSS**: Utility-first CSS framework
- **BEM Methodology**: Component-based CSS architecture
- **PostCSS Processing**: Autoprefixer, CSS optimization
- **Purge CSS**: Remove unused styles in production

### JavaScript Processing
```bash
# Source: dev/js/**/*.js
# Output: theme/assets/main.js

# Custom bundler processes all JavaScript files
node ./dev/utils/bundler.js --mode=development
node ./dev/utils/bundler.js --mode=production
```

**Features:**
- **ES6 Modules**: Modern JavaScript module system
- **Bundling**: Single file output for performance
- **Minification**: Code compression in production
- **Source Maps**: Debugging support in development

### Asset Processing
```bash
# Images: dev/images/ → theme/assets/
# Fonts: dev/fonts/ → theme/assets/
# Other: dev/assets/ → theme/assets/
```

**Features:**
- **Image Optimization**: Automatic compression
- **Format Conversion**: WebP with fallbacks
- **Responsive Images**: Multiple sizes for different devices

## ⚙️ Configuration Files

### Build Script
- **File**: `build.js` (root directory)
- **Purpose**: Main build orchestration
- **Features**: File watching, incremental builds, mode switching

### Tailwind Configuration
- **File**: `tailwind.config.js`
- **Purpose**: CSS framework configuration
- **Features**: Custom colors, fonts, utilities, purge settings

### PostCSS Configuration
- **File**: `postcss.config.js`
- **Purpose**: CSS processing pipeline
- **Features**: Autoprefixer, CSS optimization

### JavaScript Bundler
- **File**: `dev/utils/bundler.js`
- **Purpose**: JavaScript module bundling
- **Features**: ES6 modules, minification, source maps

## 🔄 Development Workflow

### 1. Start Development
```bash
npm run dev
```

### 2. Make Changes
- Edit files in `dev/` directory
- Changes automatically trigger rebuilds
- Browser automatically reloads

### 3. Build for Production
```bash
npm run build
```

### 4. Deploy
```bash
npm run push
```

## ⚡ Performance Optimizations

### Development Optimizations
- **Fast Builds**: 200ms minimum interval between builds
- **Incremental Processing**: Only process changed files
- **Direct Copying**: Minimal file system operations
- **Parallel Processing**: Concurrent asset processing

### Production Optimizations
- **Asset Minification**: Compressed CSS and JavaScript
- **Image Optimization**: Compressed images with modern formats
- **Tree Shaking**: Remove unused code
- **Caching**: Optimized cache headers

### Build Performance
```bash
# Development build time: ~1-2 seconds
# Production build time: ~5-10 seconds
# File watching overhead: <100ms
```

## 🛠️ Customization

### Adding New Asset Types
1. **Update Build Script**: Add processing logic to `build.js`
2. **Add Build Commands**: Create npm scripts for new assets
3. **Update Documentation**: Document new asset types

### Modifying Build Process
1. **Edit build.js**: Modify main build orchestration
2. **Update Configuration**: Modify framework configs
3. **Test Changes**: Verify build process works correctly

### Build Hooks
```javascript
// Add custom build steps
class ThemeBuilder {
  async customBuildStep() {
    // Custom build logic
  }
}
```

## 🔍 Troubleshooting

### Common Build Issues

#### Build Fails
```bash
# Check build logs
npm run build:dev

# Clean and rebuild
npm run clean
npm run build:dev
```

#### Slow Builds
```bash
# Check file watching
# Reduce file count in dev/ directory
# Optimize build configuration
```

#### Missing Assets
```bash
# Verify file paths
# Check build output
# Ensure assets are copied correctly
```

### Debug Build Process
```bash
# Enable verbose logging
DEBUG=* npm run build:dev

# Check build timing
time npm run build:dev
```

## 📊 Build Statistics

### File Counts
- **Sections**: ~30 files
- **Snippets**: ~25 files
- **Templates**: ~15 files
- **JavaScript**: ~50 modules
- **CSS**: 1 main file + utilities

### Build Times
- **Development**: 1-2 seconds
- **Production**: 5-10 seconds
- **Incremental**: <500ms

### Asset Sizes
- **CSS**: ~50KB (development), ~15KB (production)
- **JavaScript**: ~100KB (development), ~30KB (production)
- **Images**: Optimized for web delivery

## 🔮 Future Enhancements

### Planned Improvements
- **Webpack Integration**: More advanced bundling
- **TypeScript Support**: Type-safe JavaScript
- **CSS Modules**: Scoped CSS components
- **Hot Module Replacement**: Instant updates

### Performance Goals
- **Build Time**: <1 second for development
- **Bundle Size**: <20KB for production
- **Load Time**: <2 seconds for initial page load

---

**Build system designed for speed and efficiency! ⚡**