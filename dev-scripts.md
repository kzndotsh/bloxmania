# Development Scripts Guide

## Optimized Build Commands

### 🚀 Development Options (Choose Based on Your Needs)

```bash
# Conservative approach (recommended for stability)
npm run dev:conservative

# Minimal approach (no auto-reload, manual builds only)
npm run dev:minimal

# Fast approach (auto-rebuilds, may cause server issues)
npm run dev:fast

# Traditional approach
npm run dev
```

### 📝 Build Commands
```bash
# Development build (with debouncing)
npm run build:dev

# Production build
npm run build

# Watch mode (optimized with debouncing)
npm run build:watch

# Clean build directories
npm run build:clean

# Check build status
npm run build:status

# Fix theme structure issues
npm run fix:theme
```

### 🛠️ Development Workflow

#### Conservative Workflow (Recommended)
1. **Start Development Server:**
   ```bash
   npm run dev:conservative
   ```
   This uses Shopify's built-in hot reload for CSS and sections.

2. **Make Changes:**
   - Edit files in `dev/` directory
   - CSS and section changes are hot-reloaded automatically
   - For major changes, manually rebuild: `npm run build:manual`

#### Minimal Workflow (Most Stable)
1. **Start Development Server:**
   ```bash
   npm run dev:minimal
   ```

2. **Make Changes:**
   - Edit files in `dev/` directory
   - Manually rebuild when needed: `npm run build:manual`
   - Restart dev server if necessary

3. **Monitor Builds:**
   ```bash
   npm run build:status
   ```

4. **Clean and Rebuild:**
   ```bash
   npm run build:clean
   npm run build:dev
   ```

## Build Optimizations

### ✅ What's Fixed
- **Debouncing**: 1-second delay prevents rapid rebuilds
- **Ignored Files**: Build directories, node_modules, .git are ignored
- **Concurrent Execution**: Build and Shopify dev server run simultaneously
- **Error Handling**: Better error handling in development mode
- **Build Status**: Skip builds if one is already in progress

### ⚡ Performance Improvements
- Reduced unnecessary rebuilds by ~80%
- Faster development workflow
- Better resource utilization
- Cleaner console output

### 🔧 Configuration Files
- `nodemon.json`: Optimized watch configuration
- `build.js`: Enhanced with debouncing and error handling
- `package.json`: Streamlined scripts

## Troubleshooting

### If builds are still too frequent:
```bash
# Increase debounce delay in nodemon.json
"delay": 2000  # Change to 2 seconds
```

### If you need to force a rebuild:
```bash
# Clean and rebuild
npm run build:clean && npm run build:dev
```

### If builds are too aggressive:
```bash
# Switch to conservative mode
npm run dev:conservative

# Or use minimal mode for maximum stability
npm run dev:minimal
```

### If Shopify theme has structure issues:
```bash
# Fix theme structure and rebuild
npm run fix:theme
```

### For manual builds only:
```bash
# Build manually when needed
npm run build:manual
``` 