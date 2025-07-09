# BloxMania Shopify Theme

A modern, responsive Shopify theme designed for digital goods marketplaces, specifically optimized for gaming items and virtual products. Built with a dark gaming aesthetic and smooth animations.

## Features

### 🎨 Design & UX
- **Dark Gaming Aesthetic**: Modern dark theme with neon accents
- **Responsive Design**: Fully responsive across all devices
- **Smooth Animations**: CSS animations and transitions throughout
- **Custom Typography**: Optimized font hierarchy and readability
- **Interactive Elements**: Hover effects, loading states, and micro-interactions

### 🛍️ E-commerce Features
- **Product Showcase**: Featured products with hover effects
- **Shopping Cart**: Real-time cart updates and notifications
- **Product Variants**: Support for multiple product options
- **Inventory Management**: Stock status indicators
- **Quick Add to Cart**: One-click product addition

### 📱 Mobile Optimized
- **Mobile-First Design**: Optimized for mobile devices
- **Touch-Friendly**: Large touch targets and gestures
- **Mobile Menu**: Slide-out navigation menu
- **Responsive Images**: Optimized image loading

### ⚡ Performance
- **Fast Loading**: Optimized CSS and JavaScript
- **Lazy Loading**: Images load as needed
- **Minified Assets**: Compressed CSS and JS files
- **CDN Ready**: Compatible with Shopify's CDN

## Documentation

### 📚 Complete Documentation
- **[Development Guide](DEVELOPMENT_GUIDE.md)** - Complete development workflow and commands
- **[Technical Documentation](TECHNICAL_DOCUMENTATION.md)** - Architecture, how it works, and customization
- **[Shopify CLI Setup](SHOPIFY_CLI_SETUP.md)** - Detailed CLI setup and configuration
- **[Conversion Summary](CONVERSION_SUMMARY.md)** - Overview of the Next.js to Shopify conversion

### � Client-Friendly Documentation
- **[Client Setup Guide](client-setup.md)** - Quick start guide for non-technical users
- **[Client Customization Guide](CLIENT_GUIDE.md)** - What you can safely customize
- **[Client Constants Guide](config/CLIENT_CONSTANTS.md)** - All customizable settings

### �🚀 Quick Commands
```bash
# Development
npm run dev          # Start development server
npm run watch        # Watch for changes
npm run check        # Run theme validation

# Deployment
npm run push         # Push to development store
npm run deploy       # Deploy to production
npm run package      # Create ZIP package

# Quality Assurance
npm run check:fix    # Auto-fix issues
npm run lint         # Run linting
npm run test         # Generate reports
```

## Installation

### Method 1: Shopify CLI (Recommended)
```bash
# Install dependencies
npm install

# Setup Shopify CLI
npm run setup

# Start development server
npm run dev

# Deploy to development store
npm run push
```

### Method 2: Manual Upload
1. Go to your Shopify admin panel
2. Navigate to Online Store > Themes
3. Click "Add theme" > "Upload theme"
4. Upload the theme ZIP file
5. Click "Publish" to activate the theme

### Method 3: Development Setup
1. Install Shopify CLI: `npm install -g @shopify/cli`
2. Clone the repository
3. Run `shopify theme dev` to start development server
4. Make changes and preview in real-time

## Customization

### Theme Settings
Access theme customization through:
1. Shopify Admin > Online Store > Themes
2. Click "Customize" on the active theme
3. Modify settings in the theme editor

### Available Sections
- **Header**: Logo, navigation, mobile menu
- **Hero**: Main banner with call-to-action
- **Featured Products**: Product showcase grid
- **Footer**: Links, social media, newsletter

### Color Scheme
The theme uses CSS custom properties for easy color customization:
```css
:root {
  --primary-color: #ffd800;    /* Main accent color */
  --secondary-color: #4791f0;  /* Secondary accent */
  --background-color: #181926; /* Main background */
  --surface-color: #23243a;    /* Card backgrounds */
  --text-color: #ffffff;       /* Primary text */
  --text-muted: #9ca3af;       /* Secondary text */
}
```

### Typography
The theme uses Inter font family by default. To change:
1. Go to Theme Settings > Typography
2. Select your preferred font
3. Adjust font sizes and weights

## File Structure

```
shopify-theme/
├── assets/                 # CSS, JS, and image files
│   ├── base.css           # Main stylesheet
│   ├── global.js          # JavaScript functionality
│   └── [images]           # Theme images
├── config/                # Theme configuration
│   └── settings_schema.json
├── layout/                # Layout templates
│   └── theme.liquid       # Main layout
├── sections/              # Reusable sections
│   ├── header.liquid      # Header section
│   ├── hero.liquid        # Hero banner
│   ├── featured-products.liquid
│   └── footer.liquid      # Footer section
├── snippets/              # Reusable code snippets
├── templates/             # Page templates
│   └── index.liquid       # Homepage
└── locales/               # Translation files
```

## Sections

### Header Section
- **Logo**: Upload your brand logo
- **Navigation**: Customize menu items
- **Discord URL**: Link to your Discord server
- **Mobile Menu**: Responsive mobile navigation

### Hero Section
- **Background Image**: Hero background
- **Title**: Main headline
- **Subtitle**: Supporting text
- **CTA Button**: Call-to-action link
- **Featured Creators**: YouTube creator showcase

### Featured Products
- **Collection**: Select products to display
- **Products Count**: Number of products to show
- **View All Link**: Link to full collection

### Footer Section
- **Company Description**: About your business
- **Social Links**: Discord, YouTube, Twitter
- **Contact Info**: Email and phone
- **Newsletter**: Email subscription form

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization

### Images
- Use WebP format when possible
- Optimize image sizes before upload
- Enable lazy loading for product images

### CSS/JS
- Minify CSS and JavaScript in production
- Use CSS custom properties for theming
- Implement critical CSS inline

### Caching
- Enable browser caching
- Use Shopify's CDN
- Optimize font loading

## Troubleshooting

### Common Issues

**Theme not loading properly:**
- Clear browser cache
- Check for JavaScript errors in console
- Verify all assets are uploaded

**Mobile menu not working:**
- Ensure JavaScript is enabled
- Check for conflicting scripts
- Verify mobile menu IDs match

**Products not displaying:**
- Check collection settings
- Verify product availability
- Clear theme cache

### Support

For support and questions:
1. Check the Shopify documentation
2. Review theme settings
3. Contact theme developer

## Changelog

### Version 1.0.0
- Initial release
- Dark gaming theme design
- Responsive layout
- Product showcase functionality
- Mobile menu implementation

## License

This theme is licensed under the MIT License. See LICENSE file for details.

## Credits

- Design inspired by modern gaming aesthetics
- Built with Shopify Liquid templating
- CSS animations and transitions
- JavaScript functionality for interactivity

---

**Note**: This theme is designed for digital goods marketplaces and gaming-related products. Ensure compliance with your local laws and Shopify's terms of service when selling digital products.