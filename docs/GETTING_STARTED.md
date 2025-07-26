# 🚀 Getting Started

Welcome to BloxMania! This guide will help you set up and run the theme locally for development.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** (v8.0.0 or higher)
- **Shopify CLI** (v3.82.0 or higher)
- **Git** (for version control)

### Installing Prerequisites

#### Node.js and npm
```bash
# Check if Node.js is installed
node --version
npm --version

# If not installed, download from https://nodejs.org/
```

#### Shopify CLI
```bash
# Install Shopify CLI globally
npm install -g @shopify/cli @shopify/theme

# Verify installation
shopify version
```

## 🛠️ Initial Setup

### 1. Clone the Repository
```bash
# Clone the repository
git clone https://github.com/kzndotsh/bloxmania.git
cd bloxmania

# Verify you're in the correct directory
ls -la
```

### 2. Install Dependencies
```bash
# Install all project dependencies
npm install

# Verify installation
npm list --depth=0
```

### 3. Environment Configuration
```bash
# Set up environment variables
npm run env:setup

# Edit the .env file with your store settings
nano .env
```

**Required Environment Variables:**
```bash
# Your Shopify store URL
SHOPIFY_STORE=your-store.myshopify.com

# Your theme ID (optional, will auto-detect if not set)
SHOPIFY_THEME_ID=your-theme-id

# API credentials (if using private apps)
SHOPIFY_API_KEY=your-api-key
SHOPIFY_API_SECRET=your-api-secret
```

### 4. Shopify Store Setup

#### Option A: Development Store (Recommended)
1. Create a development store in your Shopify Partner account
2. Use the development store URL in your `.env` file
3. This allows safe testing without affecting production

#### Option B: Production Store
1. Use your production store URL
2. **⚠️ Warning**: Changes will affect live customers
3. Consider using a theme backup before development

## 🚀 Running the Theme

### Development Mode
```bash
# Start development server with live reload
npm run dev

# The theme will be available at your Shopify store URL
# Changes will automatically reload in the browser
```

### Alternative Development Modes
```bash
# Hot reload CSS and sections only
npm run dev:hot

# Full page refresh on changes
npm run dev:full

# No live reload (manual refresh)
npm run dev:off

# Auto-open browser on start
npm run dev:open
```

## 🔄 Development Workflow

### 1. Start Development
```bash
# Start the development server
npm run dev
```

### 2. Make Changes
- Edit files in the `dev/` directory
- Never edit files in the `theme/` directory directly
- Changes automatically trigger rebuilds
- Browser automatically reloads with changes

### 3. Build for Production
```bash
# Build optimized files for production
npm run build
```

### 4. Deploy to Shopify
```bash
# Deploy the theme to your Shopify store
npm run push
```

## 📁 Project Structure

### Key Directories
```
bloxmania/
├── dev/                    # 🛠️ Development files (edit here)
│   ├── css/               # CSS source files
│   ├── js/                # JavaScript source files
│   ├── sections/          # Shopify sections
│   ├── snippets/          # Shopify snippets
│   ├── templates/         # Shopify templates
│   └── ...
├── theme/                  # 🚀 Production files (generated)
│   ├── assets/            # Compiled assets
│   ├── sections/          # Processed sections
│   └── ...
└── docs/                   # 📚 Documentation
```

### Important Notes
- **Always work in `dev/`**: Never edit files in `theme/` directly
- **Build Process**: Files are automatically processed from `dev/` to `theme/`
- **Live Reload**: Changes in `dev/` automatically update the browser

## 🛠️ Available Commands

### Development Commands
```bash
npm run dev              # Start development server
npm run dev:hot          # Hot reload CSS and sections
npm run dev:full         # Full page refresh
npm run dev:off          # No live reload
npm run dev:open         # Auto-open browser
npm run dev:watch        # Watch for changes
```

### Build Commands
```bash
npm run build            # Production build
npm run build:dev        # Development build
npm run build:css:dev    # Build CSS for development
npm run build:css:prod   # Build CSS for production
npm run build:js:dev     # Build JavaScript for development
npm run build:js:prod    # Build JavaScript for production
```

### Deploy Commands
```bash
npm run push             # Build and deploy to Shopify
npm run pull             # Pull latest theme from Shopify
npm run package          # Create theme package
```

### Quality Commands
```bash
npm run check            # Check theme for issues
npm run check:fix        # Auto-fix theme issues
npm run format           # Format code with Prettier
npm run lint:css         # Lint CSS files
npm run lint:css:fix     # Auto-fix CSS issues
```

### Cleanup Commands
```bash
npm run clean            # Clean build and theme directories
npm run clean:build      # Clean build directory only
npm run clean:theme      # Clean theme directory only
```

## 🎨 CSS Development

### CSS Architecture
The project uses a modular CSS architecture:

```
dev/css/
├── main.css              # Main entry point with imports
├── design-tokens.css     # CSS custom properties
├── base/                 # Foundation styles
├── layout/               # Layout components
├── components/           # Reusable components
├── sections/             # Section-specific styles
└── utilities/            # Utility classes
```

### Adding New Styles
1. Create your CSS file in the appropriate directory
2. Import it in `dev/css/main.css`
3. The build system will automatically compile and include it

## 🔧 JavaScript Development

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

### Adding New JavaScript
1. Create your JavaScript file in the appropriate directory
2. Use ES6 modules for imports/exports
3. The bundler will automatically include it in the final bundle

## 🚨 Troubleshooting

### Common Issues

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

**Theme Not Loading**
```bash
# Check environment configuration
cat .env

# Verify Shopify CLI connection
shopify theme list
```

**CSS Changes Not Reflecting**
```bash
# Force CSS rebuild
npm run build:css:dev

# Check CSS compilation
npm run lint:css
```

### Debug Commands
```bash
# Check build status
npm run build:dev -- --verbose

# Validate theme structure
npm run check

# Check for unused code
npm run knip
```

## 📚 Next Steps

### Learn More
- **[Development Workflow](DEVELOPMENT.md)** - Detailed development process
- **[Build System](BUILD_SYSTEM.md)** - How the build system works
- **[Project Structure](PROJECT_STRUCTURE.md)** - Complete file organization
- **[Development Scripts](DEVELOPMENT_SCRIPTS.md)** - All available commands

### Best Practices
1. **Always work in `dev/`**: Never edit files in `theme/` directly
2. **Use modular CSS**: Follow the CSS architecture guidelines
3. **Test changes**: Verify changes work before committing
4. **Keep backups**: Backup important files before major changes
5. **Follow conventions**: Use consistent naming and structure

### Getting Help
- **Documentation**: Check the docs directory for detailed guides
- **Issues**: Report problems on GitHub Issues
- **Community**: Join the development community

---

**Ready to start building! 🚀** 