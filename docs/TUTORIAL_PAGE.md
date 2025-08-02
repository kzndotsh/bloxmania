# Tutorial Page

## Overview
The tutorial page is a custom page template that displays a video tutorial with optional additional content.

## Files Created
- `dev/templates/page.tutorial.liquid` - The page template
- `dev/templates/page.tutorial.json` - Template configuration
- `dev/sections/main-tutorial.liquid` - The tutorial section with video

## How to Use

### 1. Create the Page in Shopify Admin
1. Go to your Shopify admin
2. Navigate to **Online Store** > **Pages**
3. Click **Add page**
4. Set the page title (e.g., "Tutorial")
5. Set the page handle to `tutorial` (this will create the URL `/tutorial`)
6. Save the page

### 2. Configure the Section
The page will automatically use the `main-tutorial` section with the following settings:

- **Video URL**: `https://cdn.shopify.com/videos/c/o/v/adf333779cd947ce963557ea17c3db0a.mp4`
- **Video Poster Image**: Optional poster image for the video
- **Show Content**: Toggle to show/hide additional content below the video
- **Tutorial Content**: Rich text content that appears below the video
- **Section Padding**: Adjust top and bottom padding

### 3. Customization
You can customize the tutorial page by:

1. **Changing the video**: Update the `video_url` setting in the section
2. **Adding a poster image**: Upload an image and set it as the video poster
3. **Adding content**: Use the rich text editor to add content below the video
4. **Styling**: The video is responsive and styled with a dark theme to match the site

## Features
- ✅ Responsive video player
- ✅ Fallback for browsers that don't support HTML5 video
- ✅ Optional poster image
- ✅ Rich text content support
- ✅ Customizable padding
- ✅ Dark theme styling
- ✅ Mobile-friendly design

## URL
The tutorial page will be accessible at: `/tutorial`

## Technical Details
- Uses HTML5 `<video>` element with controls
- Supports MP4 video format
- Includes fallback download link for unsupported browsers
- Responsive design with max-width of 800px on desktop
- Styled with Tailwind CSS classes
- Follows the site's dark theme color scheme 