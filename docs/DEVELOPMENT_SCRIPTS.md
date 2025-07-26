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
npm run dev:watch
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
npm run dev:watch

# Alternative development modes
npm run dev:hot          # Hot reload CSS and sections only
npm run dev:full         # Full page refresh on changes
npm run dev:off          # No live reload (manual refresh)
npm run dev:open         # Auto-open browser on start
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
```

### 🧹 Maintenance Commands

#### Cleanup
```bash
# Clean build and theme directories
npm run clean

# Clean build directory only
npm run clean:build

# Clean theme directory only
npm run clean:theme
```

#### Status and Monitoring
```bash
# Check theme for issues
npm run check

# Auto-fix theme issues
npm run check:fix

# Check for unused code
npm run knip
```

### 🔧 Configuration Commands

#### Environment Setup
```bash
# Setup environment variables
npm run env:setup

# Install dependencies
npm run setup

# Guide for backfilling merchant changes
npm run backfill
```

#### Shopify Integration
```bash
# Pull latest theme from Shopify
npm run pull

# Push theme to Shopify
npm run push

# Package theme for distribution
npm run package
```

### 🎨 Code Quality Commands

#### Formatting and Linting
```bash
# Format code with Prettier
npm run format

# Lint CSS files
npm run lint:css

# Auto-fix CSS issues
npm run lint:css:fix
```

## 📖 Detailed Command Reference

### 🚀 Development Commands

| Command | Description | Use Case |
|---------|-------------|----------|
| `npm run dev` | Start development server with live reload | Daily development |
| `npm run dev:hot` | Hot reload CSS and sections only | CSS/HTML changes |
| `npm run dev:full` | Full page refresh on changes | JavaScript changes |
| `npm run dev:off` | No live reload (manual refresh) | Debugging |
| `npm run dev:open` | Auto-open browser on start | Quick testing |
| `npm run dev:watch` | Watch for changes and rebuild | Alternative to dev |

### 🔨 Build Commands

| Command | Description | Use Case |
|---------|-------------|----------|
| `npm run build` | Build for production | Deployment |
| `npm run build:dev` | Build for development | Testing |
| `npm run build:css:dev` | Build CSS for development | CSS development |
| `npm run build:css:prod` | Build CSS for production | CSS optimization |
| `npm run build:js:dev` | Build JavaScript for development | JS development |
| `npm run build:js:prod` | Build JavaScript for production | JS optimization |

### 📦 Deploy Commands

| Command | Description | Use Case |
|---------|-------------|----------|
| `npm run push` | Build and deploy to Shopify | Live deployment |
| `npm run pull` | Pull latest theme from Shopify | Sync changes |
| `npm run package` | Create theme package | Distribution |

### ✅ Quality Commands

| Command | Description | Use Case |
|---------|-------------|----------|
| `npm run check` | Check theme for issues | Pre-deployment |
| `npm run check:fix` | Auto-fix theme issues | Automated fixes |
| `npm run format` | Format code with Prettier | Code consistency |
| `npm run lint:css` | Lint CSS files | CSS quality |
| `npm run lint:css:fix` | Auto-fix CSS issues | CSS fixes |
| `npm run knip` | Check for unused code | Code cleanup |

### 🧹 Cleanup Commands

| Command | Description | Use Case |
|---------|-------------|----------|
| `npm run clean` | Clean build and theme directories | Fresh start |
| `npm run clean:build` | Clean build directory only | CSS/JS rebuild |
| `npm run clean:theme` | Clean theme directory only | Theme rebuild |

### ⚙️ Setup Commands

| Command | Description | Use Case |
|---------|-------------|----------|
| `npm run setup` | Install dependencies | Initial setup |
| `npm run env:setup` | Set up environment file | Configuration |
| `npm run backfill` | Guide for backfilling merchant changes | Theme updates |

## 🔄 Development Workflow Examples

### Daily Development
```bash
# Start development server
npm run dev

# Make changes in dev/ directory
# Files automatically rebuild and reload
```

### CSS Development
```bash
# Start development with hot reload
npm run dev:hot

# Build CSS for development
npm run build:css:dev

# Lint CSS files
npm run lint:css
```

### JavaScript Development
```bash
# Start development with full page refresh
npm run dev:full

# Build JavaScript for development
npm run build:js:dev
```

### Production Deployment
```bash
# Build for production
npm run build

# Check for issues
npm run check

# Deploy to Shopify
npm run push
```

### Theme Updates
```bash
# Pull latest changes from Shopify
npm run pull

# Make changes in dev/ directory
npm run build

# Push changes back to Shopify
npm run push
```

## ⚙️ Script Configuration

### Package.json Scripts
All scripts are defined in `package.json` and can be customized:

```json
{
  "scripts": {
    "dev": "npm run build:dev && shopify theme dev --path=theme",
    "dev:hot": "npm run build:dev && shopify theme dev --path=theme --live-reload=hot-reload",
    "dev:full": "npm run build:dev && shopify theme dev --path=theme --live-reload=full-page",
    "dev:off": "npm run build:dev && shopify theme dev --path=theme --live-reload=off",
    "dev:open": "npm run build:dev && shopify theme dev --path=theme --open",
    "dev:watch": "nodemon",
    "build": "node build.js --mode=production",
    "build:dev": "node build.js --mode=development",
    "build:css:dev": "tailwindcss -i ./dev/css/main.css -o ./build/css/main.css --config ./tailwind.config.js",
    "build:css:prod": "NODE_ENV=production tailwindcss -i ./dev/css/main.css -o ./build/css/main.css --config ./tailwind.config.js --minify",
    "build:js:dev": "node ./dev/utils/bundler.js --mode=development",
    "build:js:prod": "node ./dev/utils/bundler.js --mode=production",
    "push": "npm run build && shopify theme push --path=theme",
    "pull": "shopify theme pull --path=theme",
    "package": "npm run build && shopify theme package --path=theme",
    "check": "shopify theme check --path=theme",
    "check:fix": "shopify theme check --auto-correct --path=theme",
    "format": "prettier --write \"dev/**/*.{liquid,html,css,js,json}\"",
    "lint:css": "stylelint \"dev/**/*.css\"",
    "lint:css:fix": "stylelint \"dev/**/*.css\" --fix",
    "clean": "rm -rf build theme",
    "clean:build": "rm -rf build",
    "clean:theme": "rm -rf theme",
    "setup": "npm install",
    "env:setup": "cp dev/shopify.env.example .env && echo 'Created .env file from example. Please edit .env with your store settings.'",
    "backfill": "echo '🔍 Backfilling merchant changes...' && echo '1. Check git diff for changes to compiled files' && echo '2. Apply changes to source files in dev/' && echo '3. Run npm run build to regenerate' && echo '4. Run npm run push to deploy'",
    "knip": "knip"
  }
}
```

### Environment Variables
Scripts use environment variables from `.env` file:

```bash
# .env file
SHOPIFY_STORE=your-store.myshopify.com
SHOPIFY_THEME_ID=your-theme-id
```

## 🚨 Troubleshooting

### Common Issues

**Script Not Found**
```bash
# Check if script exists in package.json
npm run

# Install dependencies if missing
npm install
```

**Build Fails**
```bash
# Clean and rebuild
npm run clean
npm run build:dev

# Check for syntax errors
npm run check
```

**Live Reload Not Working**
```bash
# Try different reload modes
npm run dev:hot
npm run dev:full
npm run dev:off
```

### Debug Commands
```bash
# Check script definitions
npm run

# Run with verbose output
npm run build:dev -- --verbose

# Check theme structure
npm run check
```

## 📚 Related Documentation

- **[Getting Started](GETTING_STARTED.md)** - Initial setup guide
- **[Development Workflow](DEVELOPMENT.md)** - Development process
- **[Build System](BUILD_SYSTEM.md)** - Build system architecture
- **[Project Structure](PROJECT_STRUCTURE.md)** - File organization

---

**Comprehensive script coverage for all development needs! 🛠️** 