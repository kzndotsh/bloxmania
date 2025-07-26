# 🔄 Development Workflow

This guide covers the development workflow for the BloxMania theme, including best practices, troubleshooting, and advanced configuration.

## 🚀 Development Modes

### Primary Development Mode
```bash
npm run dev
```
- Builds the theme and starts Shopify development server
- Enables live reload for automatic browser updates
- **Best for**: Daily development work

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

# Watch for changes and rebuild
npm run dev:watch
```

## 🔄 Development Process

### 1. Start Development
```bash
# Start the development server
npm run dev
```

### 2. Make Changes
- Edit files in the `dev/` directory
- Never edit files in `theme/` directly
- Changes automatically trigger rebuilds
- Browser automatically reloads with updates

### 3. Test Changes
- View changes in your Shopify store
- Test on different devices and browsers
- Use browser developer tools for debugging
- Check for console errors

### 4. Build for Production
```bash
# Build optimized files for production
npm run build
```

### 5. Deploy to Shopify
```bash
# Deploy the theme to your Shopify store
npm run push
```

## 📁 File Organization

### Development Structure
```
dev/                    # 🛠️ Source files (edit here)
├── css/               # CSS source files
│   ├── main.css       # Main entry point
│   ├── design-tokens.css # CSS custom properties
│   ├── base/          # Foundation styles
│   ├── layout/        # Layout components
│   ├── components/    # Reusable components
│   ├── sections/      # Section-specific styles
│   └── utilities/     # Utility classes
├── js/                # JavaScript source files
│   ├── core/          # Core utilities
│   ├── features/      # Feature modules
│   ├── ui/            # UI components
│   ├── helpers/       # Helper utilities
│   └── system/        # System files
├── sections/          # Shopify sections
├── snippets/          # Shopify snippets
├── templates/         # Shopify templates
├── layout/            # Shopify layouts
├── config/            # Shopify configuration
├── locales/           # Translation files
└── utils/             # Build utilities
```

### Production Structure
```
theme/                  # 🚀 Production files (generated)
├── assets/            # Compiled assets
├── sections/          # Processed sections
├── snippets/          # Processed snippets
├── templates/         # Processed templates
├── layout/            # Processed layouts
├── config/            # Theme configuration
└── locales/           # Translation files
```

## 🎨 CSS Development

### Modular CSS Architecture
The project uses a modular CSS architecture with clear separation of concerns:

1. **Design Tokens** (`design-tokens.css`): CSS custom properties for consistent values
2. **Base Styles** (`base/`): Foundation styles like reset, typography, animations
3. **Layout Styles** (`layout/`): Layout components like header, footer, grid
4. **Component Styles** (`components/`): Reusable component styles
5. **Section Styles** (`sections/`): Section-specific styles
6. **Utility Styles** (`utilities/`): Utility classes and helpers

### Adding New Styles
1. Create your CSS file in the appropriate directory
2. Import it in `dev/css/main.css`
3. The build system will automatically compile and include it

### CSS Best Practices
- Use CSS custom properties for consistent values
- Follow the modular architecture
- Keep styles organized and maintainable
- Use Tailwind utilities when appropriate
- Ensure accessibility compliance

## 🔧 JavaScript Development

### Module Organization
JavaScript is organized into logical modules:

1. **Core** (`core/`): Core utilities and constants
2. **Features** (`features/`): Feature-specific modules
3. **UI** (`ui/`): UI components and interactions
4. **Helpers** (`helpers/`): Helper utilities
5. **System** (`system/`): System-level files

### Adding New JavaScript
1. Create your JavaScript file in the appropriate directory
2. Use ES6 modules for imports/exports
3. The bundler will automatically include it in the final bundle

### JavaScript Best Practices
- Use ES6+ features and modules
- Follow consistent naming conventions
- Keep functions small and focused
- Add proper error handling
- Ensure accessibility compliance

## 🛠️ Build System

### Development Builds
- Fast builds with minimal processing
- Source maps for debugging
- Live reload integration
- Optimized for rapid iteration

### Production Builds
- Full optimization and minification
- Asset compression
- Tree shaking for unused code elimination
- Performance-focused output

### Build Process
1. **File Watching**: Monitors `dev/` directory for changes
2. **Asset Processing**: CSS compilation, JavaScript bundling
3. **File Copying**: Copy processed files to `theme/`
4. **Live Reload**: Trigger browser updates

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

**CSS Changes Not Reflecting**
```bash
# Force CSS rebuild
npm run build:css:dev

# Check CSS compilation
npm run lint:css
```

**JavaScript Changes Not Working**
```bash
# Force JavaScript rebuild
npm run build:js:dev

# Check for syntax errors
npm run check
```

**Theme Not Loading**
```bash
# Check environment configuration
cat .env

# Verify Shopify CLI connection
shopify theme list
```

### Debug Commands
```bash
# Check build status
npm run build:dev -- --verbose

# Validate theme structure
npm run check

# Check for unused code
npm run knip

# Format code
npm run format
```

## 🎯 Best Practices

### Development Workflow
1. **Always work in `dev/`**: Never edit files in `theme/` directly
2. **Use appropriate development mode**: Choose the right mode for your needs
3. **Test frequently**: Verify changes work before committing
4. **Keep backups**: Backup important files before major changes
5. **Follow conventions**: Use consistent naming and structure

### Code Quality
1. **Use linting**: Run `npm run lint:css` to check CSS quality
2. **Format code**: Use `npm run format` to maintain consistency
3. **Check for issues**: Use `npm run check` to validate theme structure
4. **Remove unused code**: Use `npm run knip` to find unused files

### Performance
1. **Optimize assets**: Ensure images and assets are optimized
2. **Minimize bundle size**: Keep CSS and JavaScript lean
3. **Use lazy loading**: Implement lazy loading for non-critical resources
4. **Monitor performance**: Use browser dev tools to monitor performance

### Accessibility
1. **Semantic HTML**: Use proper HTML structure and landmarks
2. **ARIA support**: Add ARIA attributes for screen readers
3. **Keyboard navigation**: Ensure full keyboard accessibility
4. **Color contrast**: Maintain minimum 4.5:1 contrast ratio
5. **Focus management**: Provide visible focus indicators

## ⚙️ Advanced Configuration

### Customizing Build Behavior
Edit `build.js` to adjust build behavior:
- `minBuildInterval`: Minimum time between builds
- Build timeout delays for development mode
- File watching configuration

### Customizing File Watching
Edit `nodemon.json` to adjust file watching:
- `delay`: Time to wait before triggering build
- `watchOptions.interval`: File system polling interval
- `watchOptions.binaryInterval`: Binary file polling interval

### Environment Configuration
Edit `.env` file to configure development environment:
- Shopify store URL
- Theme ID
- API credentials

## 📚 Related Documentation

- **[Getting Started](GETTING_STARTED.md)** - Initial setup guide
- **[Build System](BUILD_SYSTEM.md)** - Build system architecture
- **[Development Scripts](DEVELOPMENT_SCRIPTS.md)** - All available commands
- **[Project Structure](PROJECT_STRUCTURE.md)** - File organization

---

**Optimized for efficient and reliable development! 🚀** 