# 🛠️ Development Scripts Guide

This guide covers all the development scripts and commands available in the BloxMania theme project.

## 🚀 Quick Start Commands

### Development Workflow
```bash
# Start development server with live reload (recommended)
npm run dev

# Fast development build
npm run build:dev

# Production build
npm run build

# Watch for changes and rebuild
npm run build:watch
```

## 📋 Available Scripts

### 🎯 Development Commands

#### Core Development
```bash
# Start development server with live reload
npm run dev

# Development build (fast, unminified)
npm run build:dev

# Watch mode with automatic rebuilds
npm run build:watch

# Manual build (when needed)
npm run build:manual
```

#### Production Commands
```bash
# Production build (optimized, minified)
npm run build

# Build and deploy to Shopify
npm run push

# Build and package theme
npm run package
```

#### Individual Asset Commands
```bash
# Build CSS only
npm run build:css:dev      # Development CSS
npm run build:css:prod     # Production CSS

# Build JavaScript only
npm run build:js:dev       # Development JS
npm run build:js:prod      # Production JS

# Build images only
npm run build:images
```

### 🧹 Maintenance Commands

#### Cleanup
```bash
# Clean build directories
npm run clean

# Clean and rebuild
npm run clean:rebuild

# Remove node_modules and reinstall
npm run reset
```

#### Status and Monitoring
```bash
# Check build status
npm run build:status

# Check file structure
npm run check:structure

# Validate theme
npm run theme:check
```

### 🔧 Configuration Commands

#### Environment Setup
```bash
# Setup environment variables
npm run env:setup

# Setup Shopify CLI
npm run shopify:setup

# Setup development environment
npm run setup:dev
```

#### Code Quality
```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Run theme validation
npm run theme:check

# Fix theme structure issues
npm run fix:theme
```

## 🔄 Development Workflows

### 🎯 Recommended Workflow

#### 1. Start Development
```bash
# Start development server
npm run dev
```
This command:
- Starts the build system in watch mode
- Launches Shopify CLI development server
- Enables live reload for CSS and sections
- Provides fast development experience

#### 2. Make Changes
- Edit files in `dev/` directory
- Changes automatically trigger rebuilds
- Browser automatically reloads
- CSS changes are hot-reloaded

#### 3. Build for Production
```bash
# Production build
npm run build
```

#### 4. Deploy
```bash
# Deploy to Shopify
npm run push
```

### 🚀 Alternative Workflows

#### Conservative Workflow (Maximum Stability)
```bash
# Start with minimal auto-reload
npm run dev:conservative

# Manual rebuilds when needed
npm run build:manual
```

#### Fast Workflow (Maximum Speed)
```bash
# Start with aggressive auto-reload
npm run dev:fast

# Watch for all changes
npm run build:watch
```

#### Manual Workflow (Full Control)
```bash
# Start Shopify dev server only
npm run shopify:dev

# Manual builds as needed
npm run build:dev
npm run build:css:dev
npm run build:js:dev
```

## ⚙️ Build System Configuration

### Build Script (`build.js`)
The main build script handles:
- **File Watching**: Monitors `dev/` directory for changes
- **Asset Processing**: CSS compilation, JS bundling, image optimization
- **Incremental Builds**: Only rebuilds changed files
- **Error Handling**: Graceful error handling and reporting
- **Performance**: Optimized for fast development builds

### Configuration Files

#### `nodemon.json`
```json
{
  "watch": ["dev/"],
  "ignore": ["build/", "theme/", "node_modules/", ".git/"],
  "ext": "css,js,liquid,json",
  "delay": 1000,
  "exec": "node build.js"
}
```

#### `package.json` Scripts
```json
{
  "scripts": {
    "dev": "concurrently \"npm run build:watch\" \"shopify theme dev --path=theme\"",
    "build:dev": "node build.js --mode=development",
    "build": "node build.js --mode=production",
    "build:watch": "nodemon --config nodemon.json",
    "clean": "rm -rf build/ theme/",
    "push": "npm run build && shopify theme push --path=theme"
  }
}
```

## 🔧 Build Process Details

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

### Asset Processing

#### CSS Processing
```bash
# Source: dev/css/styles.css
# Output: theme/assets/main.css

# Development
tailwindcss -i ./dev/css/styles.css -o ./build/css/main.css --config ./tailwind.config.js

# Production
NODE_ENV=production tailwindcss -i ./dev/css/styles.css -o ./build/css/main.css --config ./tailwind.config.js --minify
```

#### JavaScript Processing
```bash
# Source: dev/js/**/*.js
# Output: theme/assets/main.js

# Custom bundler processes all JavaScript files
node ./dev/utils/bundler.js --mode=development
node ./dev/utils/bundler.js --mode=production
```

#### Asset Processing
```bash
# Images: dev/images/ → theme/assets/
# Fonts: dev/fonts/ → theme/assets/
# Other: dev/assets/ → theme/assets/
```

## 🚨 Troubleshooting

### Common Issues

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

#### Shopify CLI Issues
```bash
# Restart Shopify CLI
npm run shopify:dev

# Check theme structure
npm run theme:check

# Fix theme structure
npm run fix:theme
```

### Debug Commands

#### Enable Verbose Logging
```bash
# Enable debug logging
DEBUG=* npm run build:dev

# Check build timing
time npm run build:dev
```

#### Check File Structure
```bash
# Validate project structure
npm run check:structure

# Check build output
ls -la theme/assets/
```

#### Performance Monitoring
```bash
# Monitor build performance
npm run build:status

# Check file sizes
du -sh theme/assets/*
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

## 🎯 Best Practices

### Development
1. **Use `npm run dev`**: For most development work
2. **Monitor Build Status**: Use `npm run build:status` to check builds
3. **Clean Regularly**: Use `npm run clean` when builds get stuck
4. **Check Structure**: Use `npm run check:structure` to validate files

### Production
1. **Always Test**: Test production builds locally before deploying
2. **Optimize Assets**: Ensure images and assets are optimized
3. **Validate Theme**: Use `npm run theme:check` before deployment
4. **Backup**: Keep backups before major deployments

### Performance
1. **Use Incremental Builds**: Let the build system handle file watching
2. **Optimize File Count**: Keep `dev/` directory organized
3. **Monitor Build Times**: Watch for build performance degradation
4. **Clean Regularly**: Remove unnecessary files to speed up builds

---

**Optimized for fast, reliable development! ⚡** 