# Supported Games Section

## Overview

The Supported Games section showcases the games and platforms that BloxMania supports. Each game card is now clickable and navigates to its respective collection page, making it easy for customers to browse products for specific games.

## Features

### 🎮 **Clickable Game Cards**
- Each game card is now a clickable link that navigates to the game's collection page
- Automatic URL generation based on game name (e.g., "Grow A Garden" → `/collections/grow-a-garden`)
- Custom URL support through the theme editor
- Coming Soon games remain non-clickable with overlay

### 🎨 **Visual Design**
- Gaming-inspired design with glassmorphism effects
- Responsive layout that adapts to mobile, tablet, and desktop
- Hover animations with neon yellow accents
- Backdrop blur and gradient effects

### 📱 **Responsive Behavior**
- **Mobile**: Horizontal layout with game image and title side-by-side
- **Tablet**: Pyramid layout with larger cards and enhanced effects
- **Desktop**: Grid layout with maximum visual impact

## Configuration

### Section Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| **Section Title** | Text | "Supported Titles" | Main heading for the section |
| **Section Subtitle** | Textarea | "Discover the games we support with instant delivery" | Subtitle text |
| **Layout** | Select | "3 Columns" | Grid layout (3, 4, or 5 columns) |
| **Show 'Coming Soon' overlay** | Checkbox | true | Display overlay for coming soon games |
| **Coming Soon Text** | Text | "Coming Soon" | Text for coming soon overlay |
| **Coming Soon Subtext** | Text | "Stay tuned for updates!" | Subtext for coming soon overlay |

### Game Block Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| **Game Image** | Image Picker | - | Game logo or screenshot |
| **Game Name** | Text | "Game Title" | Name of the game |
| **Game Link** | URL | - | Custom collection URL (optional) |
| **Mark as Coming Soon** | Checkbox | false | Show coming soon overlay |
| **Custom Coming Soon Text** | Text | - | Custom text for coming soon overlay |

## URL Generation

The section automatically generates collection URLs based on game names:

1. **Custom Link**: If a custom URL is provided in the "Game Link" field, it will be used
2. **Auto-Generated**: If no custom link is provided, the system generates a URL using the game name:
   - "Grow A Garden" → `/collections/grow-a-garden`
   - "Fortnite" → `/collections/fortnite`
   - "Pet Simulator 99" → `/collections/pet-simulator-99`

## Usage Examples

### Basic Game Card
```liquid
{% comment %} This will create a clickable card for "Grow A Garden" {% endcomment %}
{% render 'supported-games' %}
```

### Custom Collection Link
```liquid
{% comment %} In the theme editor, set Game Link to "/collections/custom-grow-garden" {% endcomment %}
```

### Coming Soon Game
```liquid
{% comment %} In the theme editor, check "Mark as Coming Soon" {% endcomment %}
```

## Fallback Content

If no game blocks are configured in the theme editor, the section displays three default games:

1. **Grow A Garden** → `/collections/grow-a-garden`
2. **Fortnite** → `/collections/fortnite`
3. **Pet Simulator 99** → `/collections/pet-simulator-99`

All fallback games are marked as "Coming Soon" with overlay effects.

## Accessibility

- Proper ARIA labels for screen readers
- Keyboard navigation support
- Focus indicators for accessibility
- Semantic HTML structure

## CSS Classes

### Core Classes
- `.supported-games-grid` - Main grid container
- `.game-card` - Individual game card
- `.game-content` - Card content wrapper

### State Classes
- `.game-card[href]` - Clickable game cards
- `.game-card:not([href])` - Non-clickable coming soon cards

## JavaScript Integration

The section works with the existing theme JavaScript for:
- Smooth scrolling animations
- Intersection Observer for fade-in effects
- Hover state management

## Troubleshooting

### Game Cards Not Clickable
1. Check that the game is not marked as "Coming Soon"
2. Verify the collection exists in Shopify
3. Ensure the game name is properly set

### Custom Links Not Working
1. Verify the URL is correct and accessible
2. Check that the collection exists
3. Test the URL directly in the browser

### Styling Issues
1. Ensure the CSS is properly loaded
2. Check for conflicting styles
3. Verify responsive breakpoints

## Related Files

- **Template**: `dev/sections/supported-games.liquid`
- **CSS**: Inline styles in the section file
- **JavaScript**: Uses theme-wide scripts
- **Collection Template**: `dev/templates/collection.liquid`