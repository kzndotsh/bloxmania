# 🎯 Client Constants - Easy Customization Guide

## What is this file?
This guide shows you all the settings you can easily change in your BloxMania theme without touching any code.

## 🏪 Store Information
Change these in `config/client-settings.json`:

```json
{
  "store": {
    "name": "Your Store Name",           // Your business name
    "description": "Your description",   // Brief business description
    "email": "your@email.com",          // Contact email
    "phone": "+1 (555) 123-4567",       // Contact phone
    "address": "Your address"           // Business address
  }
}
```

## 📱 Social Media Links
Update your social media URLs:

```json
{
  "social": {
    "discord": "https://discord.gg/your-server",
    "youtube": "https://youtube.com/@your-channel",
    "twitter": "https://twitter.com/your-handle",
    "instagram": "https://instagram.com/your-handle",
    "tiktok": "https://tiktok.com/@your-handle"
  }
}
```

## 🎨 Colors
Customize your theme colors:

```json
{
  "colors": {
    "primary": "#ffd800",      // Main accent color (neon yellow)
    "secondary": "#4791f0",    // Secondary accent (blue)
    "background": "#181926",   // Main background (dark)
    "surface": "#23243a",      // Card backgrounds
    "text": "#ffffff",         // Main text color
    "text_muted": "#9ca3af"    // Secondary text color
  }
}
```

## 🏠 Hero Section
Customize your homepage hero banner:

```json
{
  "hero": {
    "title": "Your Main Headline",
    "subtitle": "Your supporting text",
    "cta_text": "Shop Now",
    "cta_link": "/collections/all",
    "background_image": "your-image.jpg"
  }
}
```

## 🔧 Features
Enable or disable theme features:

```json
{
  "features": {
    "show_creator_endorsements": true,  // Show YouTube creators
    "show_trust_indicators": true,      // Show trust badges
    "show_newsletter_signup": true,     // Show newsletter signup
    "show_social_links": true,          // Show social media links
    "enable_quick_view": true,          // Enable quick product view
    "enable_wishlist": false            // Enable wishlist feature
  }
}
```

## 📝 Content Text
Update text content in `config/content.json`:

### Homepage Content
```json
{
  "homepage": {
    "hero": {
      "title": "Welcome to Your Store",
      "subtitle": "Your amazing tagline",
      "cta_text": "Shop Now",
      "cta_link": "/collections/all"
    },
    "featured_products": {
      "title": "Featured Products",
      "subtitle": "Handpicked items for you"
    }
  }
}
```

### Trust Indicators
```json
{
  "homepage": {
    "trust_indicators": {
      "title": "Trusted by Customers",
      "subtitle": "Join thousands of satisfied customers",
      "indicators": [
        {
          "icon": "shield",
          "title": "100% Money Back Guarantee",
          "description": "Not satisfied? Get your money back."
        }
      ]
    }
  }
}
```

### Footer Content
```json
{
  "footer": {
    "company": {
      "description": "Your company description",
      "copyright": "© 2024 Your Company. All rights reserved."
    },
    "newsletter": {
      "title": "Stay Updated",
      "subtitle": "Get the latest news and offers",
      "placeholder": "Enter your email",
      "button_text": "Subscribe"
    }
  }
}
```

## 🛍️ Product Page Text
```json
{
  "product": {
    "add_to_cart": "Add to Cart",
    "out_of_stock": "Out of Stock",
    "free_shipping": "Free Shipping",
    "money_back": "30-Day Money Back Guarantee",
    "secure_checkout": "Secure Checkout"
  }
}
```

## 🛒 Cart & Checkout Text
```json
{
  "cart": {
    "title": "Shopping Cart",
    "empty_message": "Your cart is empty",
    "checkout": "Proceed to Checkout",
    "continue_shopping": "Continue Shopping"
  },
  "checkout": {
    "title": "Checkout",
    "place_order": "Place Order",
    "secure_message": "Your payment information is secure"
  }
}
```

## 🔍 SEO Settings
```json
{
  "seo": {
    "meta_title": "Your Store - Premium Gaming Items",
    "meta_description": "Shop the best gaming items and digital goods.",
    "keywords": "gaming items, digital goods, your keywords"
  }
}
```

## 📋 How to Update These Settings

### Method 1: Edit JSON Files (Advanced)
1. Download the config files from your theme
2. Edit the values you want to change
3. Upload the files back to your theme
4. Refresh your store

### Method 2: Use Shopify Theme Editor (Recommended)
1. Go to Shopify Admin → Online Store → Themes
2. Click "Customize" on your theme
3. Use the visual editor to change colors, text, and images
4. Click "Save" to apply changes

## 🎯 Quick Reference

### Most Common Changes:
- **Store Name**: `store.name`
- **Contact Email**: `store.email`
- **Logo**: Use theme editor
- **Colors**: Use theme editor or `colors.*`
- **Hero Text**: `hero.title` and `hero.subtitle`
- **Social Links**: `social.*`

### Text Content:
- **Homepage**: `content.homepage.*`
- **Footer**: `content.footer.*`
- **Products**: `content.product.*`
- **Cart**: `content.cart.*`

## ⚠️ Important Notes

### ✅ DO:
- Use the theme editor for most changes
- Edit JSON files for advanced customization
- Test changes before going live
- Keep backups of your settings

### ❌ DON'T:
- Edit any `.liquid` files
- Edit any `.css` or `.js` files
- Delete or rename theme files
- Ignore error messages

## 🆘 Need Help?

- **Theme Editor**: Easiest way to make changes
- **Client Guide**: See CLIENT_GUIDE.md for detailed instructions
- **Shopify Help**: https://help.shopify.com
- **Developer Support**: Contact your theme developer

Remember: When in doubt, use the Shopify theme editor - it's the safest way to make changes!