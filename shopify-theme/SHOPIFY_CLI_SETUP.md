# Shopify CLI Setup Guide for BloxMania Theme

## Overview
This guide will help you set up Shopify CLI for efficient theme development, testing, and deployment of the BloxMania theme.

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Shopify Partner account
- Development store (free)

## Installation

### 1. Install Shopify CLI
```bash
# Install via npm (recommended)
npm install -g @shopify/cli @shopify/theme

# Verify installation
shopify version
```

### 2. Alternative Installation Methods
```bash
# macOS with Homebrew
brew tap shopify/shopify
brew install shopify-cli

# Windows with Chocolatey
choco install shopify-cli

# Linux with Snap
sudo snap install shopify-cli
```

## Authentication & Setup

### 1. Login to Shopify
```bash
# Authenticate with your Shopify account
shopify auth login

# This will open your browser for authentication
# Follow the prompts to complete login
```

### 2. Select Your Store
```bash
# List available stores
shopify store list

# Select your development store
shopify store select

# Or select by store URL
shopify store select your-store.myshopify.com
```

### 3. Initialize Theme Development
```bash
# Navigate to your theme directory
cd shopify-theme

# Initialize Shopify CLI in existing theme
shopify theme init

# This will create a .shopifyignore file and configure the theme
```

## Development Workflow

### 1. Start Development Server
```bash
# Start local development server with live reload
shopify theme dev

# This will:
# - Start a local server (usually http://localhost:9292)
# - Enable live reload for file changes
# - Connect to your development store
# - Show real-time preview of changes
```

### 2. Development Commands
```bash
# Push theme to development store
shopify theme push

# Pull theme from store
shopify theme pull

# Check theme for issues
shopify theme check

# Deploy to production
shopify theme deploy

# Create new section
shopify theme generate section hero-banner

# Create new snippet
shopify theme generate snippet product-card
```

### 3. Theme Check Integration
```bash
# Run comprehensive theme check
shopify theme check

# Check specific files
shopify theme check sections/hero.liquid

# Auto-fix issues where possible
shopify theme check --auto-correct

# Check for performance issues
shopify theme check --performance

# Generate detailed report
shopify theme check --output=json > theme-check-report.json
```

## Configuration Files

### 1. .shopifyignore
Create a `.shopifyignore` file to exclude files from deployment:
```
# Development files
node_modules/
.git/
.gitignore
README.md
*.log

# Build files
dist/
build/

# IDE files
.vscode/
.idea/

# OS files
.DS_Store
Thumbs.db
```

### 2. shopify.theme.toml
Create a `shopify.theme.toml` configuration file:
```toml
name = "bloxmania-theme"
id = 123456789

[development]
store = "your-store.myshopify.com"
theme_id = "123456789"
ignore_files = [
  "config/settings_data.json",
  "*.log"
]

[development.password]
scopes = ["write_themes", "read_themes"]

[development.ignore]
- "*.log"
- ".git/"
- "node_modules/"
```

## Advanced Features

### 1. Hot Reload Development
```bash
# Start development with hot reload
shopify theme dev --hot-reload

# Customize hot reload settings
shopify theme dev --hot-reload --port=9292 --host=localhost
```

### 2. Theme Check Configuration
Create a `.theme-check.yml` file for custom rules:
```yaml
root: .
extends: :theme_app_extension
include_categories:
  - Liquid
  - Performance
  - Accessibility
  - Translation

LiquidTag:
  enabled: true
  exclude:
    - "snippets/legacy-code.liquid"

Performance:
  AssetUrlFilters:
    enabled: true
  ImgWidthAndHeight:
    enabled: true
```

### 3. Git Integration
```bash
# Initialize git repository
git init

# Add .shopifyignore to .gitignore
echo ".shopifyignore" >> .gitignore

# Create development branch
git checkout -b feature/new-section

# Commit changes
git add .
git commit -m "Add new hero section"

# Push to remote
git push origin feature/new-section
```

## Troubleshooting

### Common Issues

#### 1. Authentication Problems
```bash
# Clear authentication cache
shopify auth logout
shopify auth login

# Check authentication status
shopify auth list
```

#### 2. Store Connection Issues
```bash
# Re-select store
shopify store select

# Check store permissions
shopify store list

# Verify store URL format
# Should be: your-store.myshopify.com
```

#### 3. Theme Check Errors
```bash
# Update theme check
npm update -g @shopify/theme-check

# Run with verbose output
shopify theme check --verbose

# Check specific categories
shopify theme check --include-categories Liquid,Performance
```

#### 4. Development Server Issues
```bash
# Check port availability
lsof -i :9292

# Use different port
shopify theme dev --port=9293

# Clear cache and restart
shopify theme dev --reset
```

### Performance Optimization

#### 1. Asset Optimization
```bash
# Enable asset compression
shopify theme dev --compress

# Optimize images
shopify theme dev --optimize-images

# Minify CSS/JS
shopify theme dev --minify
```

#### 2. Development Performance
```bash
# Use faster development mode
shopify theme dev --fast

# Disable unnecessary checks
shopify theme dev --no-theme-check

# Custom development settings
shopify theme dev --development-store=your-store.myshopify.com
```

## Best Practices

### 1. Development Workflow
- Always work on a development store first
- Use feature branches for new development
- Test thoroughly before pushing to production
- Use theme check regularly

### 2. File Organization
- Keep sections modular and reusable
- Use consistent naming conventions
- Comment complex Liquid logic
- Follow Shopify's file structure

### 3. Version Control
- Commit frequently with descriptive messages
- Use semantic versioning for releases
- Tag important releases
- Keep deployment history

### 4. Testing
- Test on multiple devices and browsers
- Verify mobile responsiveness
- Check accessibility compliance
- Test performance metrics

## Deployment

### 1. Development to Production
```bash
# Push to development store for testing
shopify theme push

# Test thoroughly on development store
# Visit your-store.myshopify.com

# Deploy to production when ready
shopify theme deploy
```

### 2. Production Deployment
```bash
# Create production theme
shopify theme push --theme=production

# Set as live theme
shopify theme push --live

# Verify deployment
shopify theme list
```

### 3. Rollback Strategy
```bash
# List theme versions
shopify theme list

# Rollback to previous version
shopify theme push --theme=previous-theme-id

# Archive old themes
shopify theme delete --theme=old-theme-id
```

## Resources

### Documentation
- [Shopify CLI Documentation](https://shopify.dev/docs/themes/tools/cli)
- [Theme Check Documentation](https://shopify.dev/docs/themes/tools/theme-check)
- [Liquid Reference](https://shopify.dev/docs/api/liquid)

### Community
- [Shopify Community](https://community.shopify.com)
- [Shopify Partners](https://partners.shopify.com)
- [GitHub Discussions](https://github.com/Shopify/shopify-cli/discussions)

### Tools
- [Shopify Theme Inspector](https://chrome.google.com/webstore/detail/shopify-theme-inspector/fndafploccfngojkjcbghbflflgajnnj)
- [Liquid Syntax Highlighting](https://marketplace.visualstudio.com/items?itemName=neilding.language-liquid)
- [Theme Kit](https://shopify.github.io/themekit/) (Legacy tool)

This setup guide provides everything you need to efficiently develop, test, and deploy the BloxMania theme using Shopify CLI. The CLI integration significantly improves development workflow and provides better debugging capabilities.