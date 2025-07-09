# BloxMania Theme - Client Customization Guide

## 🎯 What You Can Safely Customize

### ✅ SAFE TO CHANGE - These files are designed for easy customization:

#### 1. Theme Settings (Easiest - No coding required!)
- **Location**: Shopify Admin → Online Store → Themes → Customize
- **What you can change**:
  - Colors and fonts
  - Logo and branding
  - Hero section text and images
  - Social media links
  - Contact information
  - Product display settings

#### 2. Client Configuration File
- **File**: `config/client-settings.json`
- **Purpose**: Easy customization of common settings
- **What you can change**:
  - Store name and description
  - Contact information
  - Social media links
  - Default colors
  - Hero section content

#### 3. Content Files
- **File**: `config/content.json`
- **Purpose**: Manage text content without touching code
- **What you can change**:
  - Hero section text
  - Footer information
  - Newsletter signup text
  - Trust indicators text

### ⚠️ DON'T TOUCH - These files require technical knowledge:

#### 1. Code Files (Don't edit unless you know what you're doing)
- `assets/base.css` - Main styling
- `assets/global.js` - JavaScript functionality
- `layout/theme.liquid` - Main layout
- `sections/*.liquid` - Section templates
- `templates/*.liquid` - Page templates

#### 2. Development Files (Not needed for customization)
- `package.json` - Development dependencies
- `deploy.sh` - Deployment script
- `.shopifyignore` - Development exclusions
- All `.md` documentation files

## 🎨 Quick Customization Guide

### Step 1: Basic Theme Settings (Recommended)
1. Go to your Shopify admin panel
2. Navigate to **Online Store** → **Themes**
3. Click **Customize** on your active theme
4. Use the visual editor to change:
   - Colors and fonts
   - Logo and branding
   - Hero section content
   - Social media links

### Step 2: Advanced Settings (Optional)
1. Download the `config/client-settings.json` file
2. Edit the values you want to change
3. Upload the updated file back to your theme
4. Refresh your store to see changes

### Step 3: Content Management (Optional)
1. Edit `config/content.json` to update text content
2. Save the file and upload to your theme
3. Your changes will appear immediately

## 📝 Client Configuration File

### What is it?
The `config/client-settings.json` file is a simple way to customize your theme without touching any code. It contains all the common settings you might want to change.

### How to use it:
1. **Download** the file from your theme
2. **Edit** the values you want to change
3. **Upload** the file back to your theme
4. **Refresh** your store to see changes

### Example Configuration:
```json
{
  "store": {
    "name": "Your Store Name",
    "description": "Your store description",
    "email": "contact@yourstore.com",
    "phone": "+1 (555) 123-4567"
  },
  "social": {
    "discord": "https://discord.gg/your-server",
    "youtube": "https://youtube.com/@your-channel",
    "twitter": "https://twitter.com/your-handle",
    "instagram": "https://instagram.com/your-handle"
  },
  "hero": {
    "title": "Welcome to Your Store",
    "subtitle": "Your amazing tagline here",
    "cta_text": "Shop Now",
    "cta_link": "/collections/all"
  },
  "colors": {
    "primary": "#ffd800",
    "secondary": "#4791f0",
    "background": "#181926",
    "surface": "#23243a"
  }
}
```

## 🎯 What Each Setting Does

### Store Information
- **name**: Your store name (appears in header and footer)
- **description**: Brief description of your business
- **email**: Contact email address
- **phone**: Contact phone number

### Social Media Links
- **discord**: Link to your Discord server
- **youtube**: Link to your YouTube channel
- **twitter**: Link to your Twitter profile
- **instagram**: Link to your Instagram profile

### Hero Section
- **title**: Main headline on your homepage
- **subtitle**: Supporting text below the title
- **cta_text**: Text on the call-to-action button
- **cta_link**: Where the button links to

### Colors
- **primary**: Main accent color (neon yellow by default)
- **secondary**: Secondary accent color (blue by default)
- **background**: Main background color (dark by default)
- **surface**: Card and section background color

## 🔧 Common Customizations

### Changing Your Logo
1. Go to **Online Store** → **Themes** → **Customize**
2. Click on the **Header** section
3. Upload your logo image
4. Adjust size and position as needed

### Updating Hero Section
1. Go to **Online Store** → **Themes** → **Customize**
2. Click on the **Hero** section
3. Change the title, subtitle, and button text
4. Upload a new background image if desired

### Changing Colors
1. Go to **Online Store** → **Themes** → **Customize**
2. Click on **Theme Settings**
3. Navigate to **Colors**
4. Choose your preferred color scheme

### Adding Social Media Links
1. Go to **Online Store** → **Themes** → **Customize**
2. Click on the **Footer** section
3. Add your social media URLs
4. Icons will appear automatically

## 🚨 Important Notes

### ✅ DO:
- Use the Shopify theme editor for most changes
- Edit the client configuration file for advanced settings
- Test changes on a development store first
- Keep backups of your configuration files
- Contact support if you're unsure about something

### ❌ DON'T:
- Edit any `.liquid` files unless you know Liquid code
- Edit any `.css` or `.js` files
- Delete or rename any theme files
- Make changes directly to the live store without testing
- Ignore error messages or warnings

## 🆘 Getting Help

### If Something Goes Wrong:
1. **Don't panic** - Most issues can be fixed easily
2. **Check the error message** - It usually tells you what's wrong
3. **Revert to backup** - Restore from your last working version
4. **Contact support** - We're here to help!

### Before Making Changes:
1. **Make a backup** of your current theme
2. **Test on development store** if possible
3. **Take screenshots** of current settings
4. **Document your changes** so you can revert if needed

### Support Resources:
- **Shopify Help Center**: https://help.shopify.com
- **Theme Documentation**: Check the README.md file
- **Developer Support**: Contact your theme developer

## 📋 Pre-Launch Checklist

Before going live with your customized theme:

- [ ] Logo is uploaded and positioned correctly
- [ ] Store name and contact information are updated
- [ ] Social media links are working
- [ ] Hero section content is accurate
- [ ] Colors match your brand
- [ ] All pages load correctly
- [ ] Mobile version looks good
- [ ] Contact forms are working
- [ ] Newsletter signup is functional
- [ ] Test purchase flow works

## 🎉 You're Ready!

With this guide, you can safely customize your BloxMania theme without any technical knowledge. The client configuration file makes it easy to update common settings, while the Shopify theme editor handles the visual customization.

Remember: When in doubt, use the Shopify theme editor - it's the safest way to make changes!