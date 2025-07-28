# BloxMania Simple Scroll Fade System

BloxMania uses a simple, performant scroll fade system that triggers when sections come into view.

## Overview

The animation system provides:
- **Simple scroll fade effects** - Sections fade in as they come into view
- **Performance optimized** - Uses only opacity and transform
- **Accessibility compliant** - Respects reduced motion preferences
- **Mobile optimized** - Disabled on mobile for performance

## Usage

### Basic Section Fade

```html
<!-- Add the section-fade-in class to any element -->
<div class="section-fade-in">
  Content that will fade in when scrolled into view
</div>
```

### Automatic Section Detection

The system automatically detects and animates:
- All `<section>` elements
- Elements with `.section-fade-in` class

### Manual Trigger

```javascript
// Manually trigger fade in for an element
element.classList.add('section-fade-in', 'fade-in-visible');
```

## How It Works

1. **Intersection Observer** - Watches for elements entering the viewport
2. **Threshold** - Triggers when 10% of element is visible
3. **Root Margin** - Starts animation slightly before element is fully in view
4. **One-time Trigger** - Each element animates only once

## CSS Classes

### Primary Classes
- `.section-fade-in` - Base class for fade-in elements
- `.fade-in-visible` - Applied when element should be visible

### Hover Effects
- `.hover-lift` - Subtle lift on hover
- `.hover-scale` - Subtle scale on hover
- `.focus-ring` - Focus ring for accessibility

## Animation Properties

- **Duration**: 0.6 seconds
- **Easing**: ease-out
- **Transform**: translateY(30px) to translateY(0)
- **Opacity**: 0 to 1

## Accessibility

The system respects user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  .section-fade-in {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

## Mobile Optimization

Animations are disabled on mobile for performance:

```css
@media (max-width: 768px) {
  .section-fade-in {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

## JavaScript API

```javascript
// Access the scroll fade controller
const scrollFadeController = window.BloxManiaCore?.animationController;

// Check if reduced motion is preferred
const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

## Best Practices

1. **Use sparingly** - Only animate key sections
2. **Keep it simple** - Avoid complex animations
3. **Test on mobile** - Ensure good performance
4. **Respect preferences** - Always check reduced motion

## Examples

### Section with Fade
```html
<section class="section-fade-in">
  <h2>Section Title</h2>
  <p>Content that fades in smoothly</p>
</section>
```

### Product Grid
```html
<div class="product-grid">
  <div class="product-card section-fade-in">
    Product content
  </div>
</div>
```

### Newsletter Form
```html
<div class="newsletter-form__field-wrapper section-fade-in">
  <input type="email" placeholder="Enter your email">
  <button type="submit">Subscribe</button>
</div>
```

## Performance

- Uses `transform` and `opacity` for optimal performance
- Hardware acceleration enabled
- Intersection Observer for efficient detection
- One-time triggers prevent re-animation

## Troubleshooting

### Animation not working?
1. Check if reduced motion is enabled
2. Verify element has `.section-fade-in` class
3. Ensure element is in the DOM
4. Check mobile viewport size

### Performance issues?
1. Reduce number of animated elements
2. Check for conflicting CSS
3. Verify mobile optimization is working 