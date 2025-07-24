# File Transformation Best Practices for BloxMania Theme

This document outlines our file transformation strategy based on [Shopify's official best practices](https://shopify.dev/docs/storefronts/themes/best-practices/file-transformation).

## Overview

Our build system transforms source code from the `dev/` directory into optimized, Shopify-compatible files in the `theme/` directory. This allows us to:

- Write maintainable, modular code
- Use modern development tools (Tailwind CSS, ES6 modules)
- Ship optimized, production-ready assets
- Maintain a clean development workflow

## File Transformations We Perform

| Source                                    | Output               | Benefit                                    |
| ----------------------------------------- | -------------------- | ------------------------------------------ |
| Multiple CSS files → Single `main.css`    | Optimized CSS bundle | Faster loading, easier maintenance         |
| ES6 JavaScript modules → Single `main.js` | Minified JS bundle   | Reduced file size, better performance      |
| SCSS-like Tailwind → CSS                  | Compiled CSS         | Modern CSS features, browser compatibility |
| SVG files → Inline snippets               | Embedded graphics    | Faster loading, better SEO                 |
| Multiple images → Optimized assets        | Compressed images    | Reduced bandwidth usage                    |

## Build Process Flow

```
dev/ (Source) → build/ (Processing) → theme/ (Final)
```

### 1. Source Files (`dev/`)
- **CSS**: `dev/css/styles.css` (Tailwind + custom styles)
- **JavaScript**: `dev/js/` (modular ES6 files)
- **Images**: `dev/images/` (source images)
- **Liquid**: `dev/sections/`, `dev/snippets/`, `dev/templates/`

### 2. Processing (`build/`)
- **CSS**: Compiled Tailwind → `build/css/main.css`
- **JavaScript**: Bundled modules → `build/js/main.js`
- **Images**: Optimized and copied → `build/images/`

### 3. Final Output (`theme/`)
- All files copied to Shopify-compatible structure
- Assets optimized for production
- Ready for deployment

## Handling Merchant Customizations

### The Challenge

When merchants edit compiled files (like `theme/assets/main.css`), those changes can be lost when we rebuild the theme. This is a common issue with file transformation workflows.

### Our Solution

1. **Source-First Development**: Always make changes in source files (`dev/`)
2. **Version Control**: Track both source and compiled files
3. **Backfilling Process**: When merchants edit compiled files, we backfill changes to source

### Backfilling Workflow

When a merchant makes changes to compiled files:

1. **Identify Changes**: Check Git commits or Shopify admin changes
2. **Locate Source**: Find the corresponding source file in `dev/`
3. **Backfill**: Apply the change to the source file
4. **Rebuild**: Run `npm run build` to regenerate compiled files
5. **Deploy**: Push updated theme to Shopify

### Example Backfilling

```bash
# Merchant edited theme/assets/main.css
# We need to backfill to dev/css/styles.css

# 1. Check what changed
git diff theme/assets/main.css

# 2. Apply change to source
# Edit dev/css/styles.css

# 3. Rebuild
npm run build

# 4. Deploy
npm run push
```

## Development Workflow

### For Developers

1. **Always edit source files** in `dev/` directory
2. **Use build commands** to generate compiled files
3. **Test changes** using `npm run dev`
4. **Deploy with confidence** using `npm run push`

### For Merchants

1. **Edit compiled files** in Shopify admin (if needed)
2. **Contact developer** for permanent changes
3. **Changes will be backfilled** to source code

## Best Practices

### ✅ Do's

- Always work in source files (`dev/`)
- Use version control for both source and compiled files
- Document any merchant customizations
- Test builds before deployment
- Keep source files organized and modular

### ❌ Don'ts

- Don't edit compiled files directly (unless backfilling)
- Don't ignore merchant customizations
- Don't deploy without testing
- Don't mix source and compiled code

## Shopify's Built-in Optimizations

Shopify automatically provides:

- **CSS Minification**: Automatic minification of CSS files
- **JavaScript Minification**: Automatic minification of JS files
- **Asset Optimization**: CDN delivery and caching
- **Gzip Compression**: Automatic compression of assets

## Just-in-Time (JIT) Transformations

For some transformations, we could use JIT services:

- **CSS Optimization**: Could use Shopify's built-in minification
- **JavaScript Minification**: Could rely on Shopify's automatic minification
- **Image Optimization**: Could use Shopify's CDN optimization

However, we prefer our build system because it:
- Gives us control over the transformation process
- Allows for custom optimizations
- Provides consistent development experience
- Enables advanced features (Tailwind, ES6 modules)

## Troubleshooting

### Common Issues

1. **Changes Lost After Rebuild**
   - Check if changes were made to compiled files
   - Backfill changes to source files
   - Rebuild and redeploy

2. **Build Failures**
   - Check source file syntax
   - Verify all dependencies are installed
   - Check build logs for errors

3. **Performance Issues**
   - Optimize source files
   - Check for duplicate code
   - Use Shopify's built-in optimizations

### Getting Help

- Check build logs for specific errors
- Review source file syntax
- Consult Shopify's documentation
- Contact the development team

## Conclusion

Our file transformation strategy balances developer experience with merchant flexibility. By maintaining clear separation between source and compiled files, we can provide both excellent development tools and merchant customization capabilities.

The key is always working in source files and properly backfilling any merchant changes to maintain a unified codebase. 