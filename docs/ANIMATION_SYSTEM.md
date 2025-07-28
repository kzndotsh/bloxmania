# BloxMania Animation System

BloxMania uses `tailwindcss-animate` for a comprehensive, performant animation system.

## Overview

The animation system combines:
- **tailwindcss-animate** - For standard animations and transitions
- **Custom CSS** - For specific UI animations (loading spinners, etc.)
- **JavaScript Controllers** - For programmatic animations

## Usage

### Basic Animations

```html
<!-- Fade in -->
<div class="animate-in fade-in duration-300">Content</div>

<!-- Slide in from top -->
<div class="animate-in slide-in-from-top duration-300">Content</div>

<!-- Zoom in -->
<div class="animate-in zoom-in duration-300">Content</div>

<!-- Exit animations -->
<div class="animate-out fade-out duration-300">Content</div>
<div class="animate-out slide-out-to-right duration-300">Content</div>
```

### Animation Durations

```html
<!-- Available durations -->
<div class="animate-in fade-in duration-75">75ms</div>
<div class="animate-in fade-in duration-100">100ms</div>
<div class="animate-in fade-in duration-150">150ms</div>
<div class="animate-in fade-in duration-200">200ms</div>
<div class="animate-in fade-in duration-300">300ms</div>
<div class="animate-in fade-in duration-500">500ms</div>
<div class="animate-in fade-in duration-700">700ms</div>
<div class="animate-in fade-in duration-1000">1000ms</div>
```

### Animation Delays

```html
<!-- Add delays -->
<div class="animate-in fade-in duration-300 delay-150">Delayed</div>
<div class="animate-in fade-in duration-300 delay-300">More delayed</div>
```

### Easing Functions

```html
<!-- Available easing -->
<div class="animate-in fade-in duration-300 ease-linear">Linear</div>
<div class="animate-in fade-in duration-300 ease-in">Ease in</div>
<div class="animate-in fade-in duration-300 ease-out">Ease out</div>
<div class="animate-in fade-in duration-300 ease-in-out">Ease in-out</div>
```

### Data Attributes for JavaScript

```html
<!-- Automatic animations via JavaScript -->
<div data-animate="fade-in">Will animate when in viewport</div>
<div data-animate="slide-in" data-direction="top">Slide from top</div>
<div data-animate="scale-in">Scale in animation</div>
```

### Programmatic Animations

```javascript
// Using the animation controller
const animationController = window.BloxManiaCore?.animationController;

// Animate a single element
animationController.animateElement(element, 'fade-in', 100);

// Animate multiple elements with stagger
animationController.animateElements(elements, 'slide-in-up', 100);
```

## Available Animation Types

### Enter Animations
- `fade-in` - Fade in from transparent
- `slide-in-from-top` - Slide in from top
- `slide-in-from-bottom` - Slide in from bottom
- `slide-in-from-left` - Slide in from left
- `slide-in-from-right` - Slide in from right
- `zoom-in` - Scale in from 0
- `spin-in` - Rotate in

### Exit Animations
- `fade-out` - Fade out to transparent
- `slide-out-to-top` - Slide out to top
- `slide-out-to-bottom` - Slide out to bottom
- `slide-out-to-left` - Slide out to left
- `slide-out-to-right` - Slide out to right
- `zoom-out` - Scale out to 0
- `spin-out` - Rotate out

## Accessibility

The animation system respects user preferences:

```html
<!-- Only animate if user hasn't requested reduced motion -->
<div class="motion-safe:animate-in motion-safe:fade-in">Accessible</div>
```

## Performance

- Uses `transform` and `opacity` for optimal performance
- Hardware acceleration enabled by default
- Reduced motion support built-in
- Mobile performance optimizations

## Custom Animations

For specific UI animations, use custom CSS classes:

```css
/* Custom loading animation */
.animate-spin-custom {
  animation: spin 1s linear infinite;
}

/* Custom heartbeat animation */
.animate-heartbeat {
  animation: heartbeat 2s ease-in-out infinite;
}
```

## Constants

Animation durations are available in JavaScript:

```javascript
const { ANIMATION_DURATIONS, TAILWIND_ANIMATE_DURATIONS } = window.THEME_CONFIG;

// Use in JavaScript
setTimeout(callback, ANIMATION_DURATIONS.normal); // 300ms
```

## Best Practices

1. **Use tailwindcss-animate for standard animations**
2. **Respect reduced motion preferences**
3. **Keep animations short and purposeful**
4. **Use appropriate easing functions**
5. **Test on mobile devices**
6. **Avoid animating layout-triggering properties**

## Examples

### Card Hover Effects
```html
<div class="transition-all duration-300 hover:scale-105 hover:shadow-lg">
  Card content
</div>
```

### Loading States
```html
<div class="animate-spin duration-1000">
  Loading...
</div>
```

### Staggered Animations
```html
<div class="space-y-4">
  <div class="animate-in fade-in duration-300 delay-0">Item 1</div>
  <div class="animate-in fade-in duration-300 delay-100">Item 2</div>
  <div class="animate-in fade-in duration-300 delay-200">Item 3</div>
</div>
``` 