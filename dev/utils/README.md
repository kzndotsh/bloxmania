# Development Utilities

This directory contains build tools and utilities for the BloxMania Shopify theme.

## 📁 **Available Utilities**

### 🔧 **Build Tools**

#### `bundler.js`
JavaScript bundler that combines all JS files from `dev/js/` into a single `main.js` bundle.

**Usage:**
```bash
# Development mode
node ./dev/utils/bundler.js --mode=development

# Production mode (minified)
node ./dev/utils/bundler.js --mode=production

# Watch mode
node ./dev/utils/bundler.js --mode=development --watch
```

**Features:**
- Combines core, helpers, features, UI, and system modules
- Minifies code in production mode
- Maintains proper loading order
- Generates single output file

### 🎨 **CSS Optimization**

#### `css-optimizer.js`
Advanced CSS optimization and analysis tool.

**Commands:**
```bash
# Extract critical CSS
node ./dev/utils/css-optimizer.js extract-critical

# Optimize CSS with PostCSS
node ./dev/utils/css-optimizer.js optimize

# Generate CSS manifest
node ./dev/utils/css-optimizer.js manifest

# Run all optimizations
npm run css:analyze
```

**Features:**
- Critical CSS extraction for above-the-fold content
- PostCSS optimization with cssnano
- CSS manifest generation
- Performance analysis and reporting
- Non-critical CSS separation for lazy loading
- Industry-standard naming and structure

### 📚 **Documentation**

#### `liquid-doc-generator.js`
Automated documentation generator for Liquid templates, snippets, and sections.

**Usage:**
```bash
# Generate documentation
npm run docs:generate

# Serve documentation locally
npm run docs:serve
```

**Features:**
- Parses Liquid files for documentation
- Extracts schema information from sections
- Generates API reference
- Creates comprehensive documentation structure
- Supports JSDoc-style comments

## 🚀 **NPM Scripts**

All utilities are accessible through npm scripts:

```bash
# JavaScript bundling
npm run build:js:dev      # Development bundle
npm run build:js:prod     # Production bundle
npm run build:js:watch    # Watch mode

# CSS optimization
npm run css:critical      # Extract critical CSS
npm run css:optimize      # Optimize CSS
npm run css:manifest      # Generate manifest
npm run css:analyze       # Run all CSS optimizations

# Documentation
npm run docs:generate     # Generate docs
npm run docs:serve        # Serve docs locally
```

## 📊 **Output Files**

### Build Output (`build/`)
- `css/main.css` - Compiled Tailwind CSS
- `css/critical.css` - Critical CSS (if extracted)
- `css/non-critical.css` - Non-critical CSS (if extracted)
- `css/main-optimized.css` - Optimized CSS (if optimized)
- `css/css-manifest.json` - CSS manifest
- `js/main.js` - JavaScript bundle
- `images/` - Copied images

### Documentation Output (`docs/`)
- `README.md` - Main documentation index
- `sections/` - Section documentation
- `snippets/` - Snippet documentation
- `templates/` - Template documentation
- `api/` - API reference
- `style-guide/` - Style guide

## 🔧 **Configuration**

### Tailwind CSS
- Config: `tailwind.config.js`
- Input: `dev/css/styles.css`
- Output: `build/css/main.css`

### JavaScript Bundling
- Source: `dev/js/`
- Output: `build/js/main.js`
- Order: core → helpers → features → ui → system

### CSS Optimization
- Input: `build/css/main.css`
- Output: Various optimized files in `build/css/`
- Report: `build/css-optimization-report.json`

## 📝 **Development Workflow**

1. **Source files** in `dev/`
2. **Build process** uses utilities in `dev/utils/`
3. **Build output** in `build/`
4. **Final theme** in `theme/`
5. **Documentation** in `docs/`

## 🛠 **Adding New Utilities**

To add a new utility:

1. Create the utility file in `dev/utils/`
2. Add npm scripts to `package.json`
3. Update this README with documentation
4. Test the utility thoroughly
5. Update build process if needed

## 📋 **Requirements**

- Node.js 16+
- npm or yarn
- Tailwind CSS
- PostCSS (for CSS optimization)
- fs-extra (for file operations)
- Shopify CLI (for theme commands) 