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
# Hot reload (CSS and sections only)
npm run dev:hot

# Full page refresh on changes
npm run dev:full

# No live reload (manual refresh)
npm run dev:off

# Auto-open browser
npm run dev:open
```

### Building for Production
```bash
# Build for production (optimized)
npm run build

# Build for development (faster)
npm run build:dev
```

### Deploying to Shopify
```bash
# Build and deploy to Shopify
npm run push

# Pull latest changes from Shopify
npm run pull

# Create theme package
npm run package
```

## 📁 Project Structure

Understanding the project structure is crucial for development:

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
│   ├── sections/          # Shopify sections
│   ├── snippets/          # Shopify snippets
│   ├── templates/         # Shopify templates
│   ├── layout/            # Shopify layouts
│   ├── config/            # Shopify configuration
│   └── locales/           # Translation files
├── build/                  # 🔨 Built Assets (Intermediate)
├── theme/                  # 🚀 Production Theme (for Shopify)
└── docs/                   # 📚 Documentation
```

## 🔧 Development Workflow

### 1. Making Changes
- **Always work in the `dev/` directory**
- Never edit files in `theme/` directly
- Changes automatically rebuild and reload

### 2. File Types
- **CSS**: Edit `dev/css/styles.css` (BEM methodology)
- **JavaScript**: Edit files in `dev/js/` directories
- **Sections**: Edit `dev/sections/` files
- **Snippets**: Edit `dev/snippets/` files
- **Templates**: Edit `dev/templates/` files

### 3. Build Process
1. Files in `dev/` are processed by the build system
2. Processed files are copied to `theme/`
3. Shopify CLI serves from the `theme/` directory
4. Changes trigger automatic rebuilds

### 4. Testing Changes
- View changes in your Shopify store
- Test on different devices and browsers
- Use browser developer tools for debugging
- Check for console errors

## 🎨 Customization

### Theme Settings
1. Go to your Shopify admin
2. Navigate to **Online Store > Themes**
3. Click **Customize** on your theme
4. Use the theme editor to modify settings

### Code Customization
- **Sections**: Add/remove content blocks
- **Snippets**: Reusable components
- **CSS**: Styling and layout changes
- **JavaScript**: Interactive functionality

## 🔍 Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clean build directories
npm run clean

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### Shopify CLI Issues
```bash
# Check Shopify CLI version
shopify version

# Update Shopify CLI
npm update -g @shopify/cli @shopify/theme

# Re-authenticate
shopify auth logout
shopify auth login
```

#### Environment Issues
```bash
# Verify environment file
cat .env

# Check if store is accessible
curl -I https://your-store.myshopify.com
```

### Getting Help
- **Documentation**: Check the [main documentation](README.md)
- **Issues**: [GitHub Issues](https://github.com/kzndotsh/bloxmania/issues)
- **Development Guide**: [Development Workflow](DEVELOPMENT.md)

## ✅ Next Steps

1. **Explore the Documentation**: Read through the [main documentation](README.md)
2. **Learn the Build System**: Understand [how the build system works](BUILD_SYSTEM.md)
3. **Review Components**: Check out [sections](sections/README.md) and [snippets](snippets/README.md)
4. **Follow Standards**: Read the [style guide](style-guide/README.md)
5. **Start Developing**: Make your first changes and see them live!

---

**Happy coding! 🎮** 