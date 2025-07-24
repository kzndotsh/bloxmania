# Development Guide

## Development Scripts

We've created multiple development scripts to handle different scenarios and preferences:

### 🚀 Recommended: Simple Development
```bash
npm run dev:simple
```
- Builds the theme once and starts Shopify development server
- No file watching - manually rebuild when needed
- Most stable option, no conflicts with Shopify sync
- **Best for**: Stable development, debugging, when you want full control

### 🎯 Interactive Development
```bash
npm run dev:interactive
```
- Interactive command-line interface
- Manual control over builds and development server
- Commands: `build`, `dev`, `watch`, `exit`
- **Best for**: When you want full control over the development process

### ⚡ Fast Development (Experimental)
```bash
npm run dev:fast
```
- Uses the original nodemon configuration
- Faster rebuilds but may cause conflicts
- **Best for**: When you need rapid iteration and can handle occasional conflicts

### 🔧 Stable Development (Experimental)
```bash
npm run dev:stable
```
- Uses optimized nodemon configuration with longer delays
- Reduced conflicts but slower rebuilds
- **Best for**: When you want file watching but with fewer conflicts

### 📦 Manual Build
```bash
npm run build:manual
```
- Builds the theme once without starting development server
- **Best for**: One-time builds, CI/CD, testing

## Troubleshooting

### Common Issues

1. **Excessive rebuilds and conflicts**
   - Use `npm run dev:simple` instead of `npm run dev:stable`
   - The concurrent file watching can cause conflicts with Shopify's sync

2. **Build failures**
   - Check that all dependencies are installed: `npm install`
   - Ensure you're in the correct directory
   - Check for syntax errors in your files

3. **Shopify sync errors**
   - Stop the development server (Ctrl+C)
   - Run `npm run build:dev` to ensure clean build
   - Restart with `npm run dev:simple`

### Development Workflow

1. **Start development**: `npm run dev:simple`
2. **Make changes** to files in `dev/` directory
3. **Rebuild manually**: Stop server (Ctrl+C) and run `npm run build:dev`
4. **Restart development**: `npm run dev:simple`

### File Structure

- `dev/` - Source files (edit these)
- `theme/` - Built theme (don't edit directly)
- `build/` - Intermediate build files

### Best Practices

1. **Use `dev:simple` for most development**
2. **Build manually when you make significant changes**
3. **Keep the `dev/` directory clean and organized**
4. **Test changes in the browser after each build**
5. **Use version control to track changes**

## Advanced Configuration

### Customizing Build Delays

Edit `nodemon.stable.json` to adjust file watching behavior:
- `delay`: Time to wait before triggering build (milliseconds)
- `watchOptions.interval`: File system polling interval
- `watchOptions.binaryInterval`: Binary file polling interval

### Build Script Optimization

Edit `build.js` to adjust build behavior:
- `minBuildInterval`: Minimum time between builds
- Build timeout delays for development mode 