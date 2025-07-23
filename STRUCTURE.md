# BloxMania Project Structure

This project now follows a clean separation between development and production files.

## 📁 Project Structure

```
bloxmania/
├── dev/                    # 🛠️ Development Environment (Source Files)
│   ├── js/                # JavaScript source files
│   │   ├── core/          # Core utilities
│   │   ├── features/      # Feature modules
│   │   ├── ui/            # UI components
│   │   ├── helpers/       # Helper utilities
│   │   └── system/        # System files
│   ├── css/               # CSS source files
│   ├── images/            # Image source files
│   ├── build/             # Build tools and config
│   ├── sections/          # Shopify sections
│   ├── snippets/          # Shopify snippets
│   ├── templates/         # Shopify templates
│   ├── layout/            # Shopify layouts
│   ├── config/            # Shopify config
│   └── locales/           # Shopify locales
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
│   ├── config/            # Shopify config
│   └── locales/           # Shopify locales
├── build.js               # Build script
├── package.json           # Project dependencies
└── tailwind.config.js     # Tailwind configuration
```

## 🔄 Development Workflow

### Development Commands

```bash
# Start development server with live reload
npm run dev

# Build for development
npm run build:dev

# Build for production
npm run build

# Watch for changes and rebuild
npm run build:watch

# Deploy to Shopify
npm run push
```

### Build Process

1. **Source Files**: All development happens in `dev/` directory
2. **Build Process**: `build.js` compiles assets and copies to `theme/`
3. **Shopify Deployment**: Only `theme/` directory is deployed to Shopify

## 📝 File Organization

### Development (`dev/`)

- **`js/`**: JavaScript source files organized by type
  - `core/`: Core utilities and constants
  - `features/`: Feature-specific modules
  - `ui/`: UI components and interactions
  - `helpers/`: Helper utilities
  - `system/`: System-level files (service worker, etc.)

- **`css/`**: CSS source files
  - `styles.css`: Main stylesheet with Tailwind directives (customizable)

- **`images/`**: Image source files (PNG, JPG, ICO, etc.)

### Build (`build/`)

- **`css/`**: Generated CSS files
  - `main.css`: Compiled Tailwind output (includes all styles)

- **`js/`**: Generated JavaScript files
  - `main.js`: Single JavaScript bundle

- **`images/`**: Copied image files (ready for deployment)

### Production (`theme/`)

- **`assets/`**: Production-ready assets
  - `main.css`: Generated Tailwind CSS (do not edit)
  - `main.js`: Single JavaScript bundle
  - Image files (PNG, JPG, ICO, etc.)

- **Shopify Files**: Direct copies from `dev/`
  - `sections/`, `snippets/`, `templates/`, etc.

## 🛠️ Build System

### JavaScript Bundling

- **Bundler**: `dev/utils/bundler.js`
- **Bundle**: 
  - `main.js`: Single JavaScript file containing all functionality

### CSS Processing

- **Framework**: Tailwind CSS
- **Source**: `dev/css/styles.css` (customizable source file with all styles)
- **Generated**: `theme/assets/main.css` (compiled Tailwind output)

### JavaScript Processing

- **Framework**: Custom bundler
- **Input**: All JavaScript files from `dev/src/js/`
- **Output**: `theme/assets/main.js`

## 🚀 Deployment

### Shopify CLI Commands

All Shopify CLI commands point to the `theme/` directory:

```bash
# Development
shopify theme dev --path=theme

# Deploy
shopify theme push --path=theme

# Pull changes
shopify theme pull --path=theme
```

### Build Commands

```bash
# Full production build
npm run build

# Development build
npm run build:dev

# Watch mode
npm run build:watch
```

## ✅ Benefits

1. **Clean Separation**: Development vs production files clearly separated
2. **No Confusion**: Source files never mixed with built files
3. **Easy Deployment**: Only production files in `theme/`
4. **Better Organization**: Logical file structure
5. **Scalable**: Easy to add new features and maintain

## 🔧 Configuration

- **Tailwind**: `tailwind.config.js` (root level)
- **PostCSS**: `postcss.config.js` (root level)
- **Build Script**: `build.js` (root level)
- **Package Scripts**: `package.json` (root level)

## 📋 Development Tips

1. **Always work in `dev/`**: Never edit files in `theme/` directly
2. **Use build commands**: Let the build system handle file generation
3. **Watch mode**: Use `npm run build:watch` for live development
4. **Check structure**: Verify `theme/` only contains production files
5. **Deploy clean**: `theme/` directory is what gets deployed to Shopify 