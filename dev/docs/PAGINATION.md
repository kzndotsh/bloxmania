# Pagination System Documentation

## Overview

The BloxMania theme includes a comprehensive, accessible pagination system that provides modern navigation with keyboard support, loading states, and responsive design.

## Features

### 🎨 **Modern Design**
- Glassmorphism styling with backdrop blur effects
- Neon yellow accent colors matching the BloxMania theme
- Smooth hover animations and transitions
- Responsive design that adapts to mobile devices

### ♿ **Accessibility**
- Full keyboard navigation support (Arrow keys, Home, End)
- Screen reader friendly with proper ARIA labels
- Focus indicators for keyboard users
- High contrast mode support
- Reduced motion support for users with vestibular disorders

### 📱 **Responsive Design**
- Mobile-optimized with smaller touch targets
- Adaptive layout that hides page numbers on very small screens
- Maintains functionality across all device sizes

### ⚡ **Performance**
- Lightweight CSS with efficient animations
- Minimal JavaScript footprint
- Loading states for better user experience

## Usage

### Basic Implementation

The pagination is automatically included in collection pages using the `paginate` tag:

```liquid
{%- paginate collection.products by 24 -%}
  <!-- Product grid here -->
  
  {%- if paginate.pages > 1 -%}
    <div class="pagination-wrapper">
      {% render 'pagination', paginate: paginate %}
    </div>
  {%- endif -%}
{%- endpaginate -%}
```

### JavaScript Integration

The pagination system includes JavaScript enhancements:

```javascript
// Automatic initialization
document.addEventListener('DOMContentLoaded', () => {
  new PaginationManager();
});

// Manual initialization
const pagination = new PaginationManager();
```

## CSS Classes

### Core Classes
- `.pagination-wrapper` - Main container
- `.pagination` - Unordered list of pagination items
- `.pagination__item` - Individual pagination item
- `.pagination__item-link` - Clickable link or span

### State Classes
- `.pagination__item--current` - Current page indicator
- `.pagination__item--prev` - Previous page button
- `.pagination__item--next` - Next page button
- `.pagination__item-link--disabled` - Disabled state
- `.pagination__item-link--ellipsis` - Ellipsis for skipped pages

### Interactive Classes
- `.pagination__item--focused` - Keyboard focus indicator
- `.pagination-loading` - Loading state overlay

## JavaScript API

### PaginationManager Class

```javascript
class PaginationManager {
  constructor() // Initialize pagination functionality
  init() // Set up event listeners and keyboard navigation
  handlePaginationClick(event, link) // Handle click events
  addLoadingState(container) // Add loading indicator
  scrollToTop() // Smooth scroll to top
  handleKeyboardNavigation(event) // Handle keyboard input
  updatePaginationState(newState) // Update pagination content
}
```

### Keyboard Navigation

- **Arrow Left/Right** - Navigate between pagination items
- **Home** - Jump to first page
- **End** - Jump to last page
- **Enter/Space** - Activate current item

## Customization

### Colors
The pagination uses CSS custom properties that can be overridden:

```css
:root {
  --pagination-primary: #fbbf24;
  --pagination-hover: #f59e0b;
  --pagination-text: #ffffff;
  --pagination-background: rgba(0, 0, 0, 0.2);
}
```

### Sizing
Adjust pagination size by modifying the base classes:

```css
.pagination__item-link {
  min-width: 3rem; /* Adjust width */
  height: 3rem; /* Adjust height */
  font-size: 0.875rem; /* Adjust font size */
}
```

### Animations
Customize animations by modifying transition properties:

```css
.pagination__item-link {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Browser Support

- ✅ Chrome 88+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Edge 88+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Considerations

- CSS animations use `transform` and `opacity` for optimal performance
- JavaScript uses event delegation for efficient event handling
- Loading states are lightweight and don't block the UI
- Reduced motion support respects user preferences

## Troubleshooting

### Common Issues

1. **Pagination not showing**: Ensure `paginate.pages > 1`
2. **Styling issues**: Check that `component-pagination.css` is imported
3. **JavaScript errors**: Verify `pagination.js` is loaded
4. **Accessibility issues**: Ensure proper ARIA labels are present

### Debug Mode

Enable debug logging by setting:

```javascript
window.PAGINATION_DEBUG = true;
```

## Future Enhancements

- [ ] AJAX pagination for seamless page transitions
- [ ] Infinite scroll option
- [ ] Custom pagination layouts
- [ ] Analytics integration
- [ ] Advanced filtering with pagination

## Contributing

When modifying the pagination system:

1. Maintain accessibility standards
2. Test across different devices and browsers
3. Update this documentation
4. Follow the existing code style
5. Add appropriate tests if applicable 