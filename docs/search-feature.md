# Search Feature Documentation

## Overview
The BloxMania theme includes a comprehensive search feature with multiple components:

1. **Header Search Button** - Opens a modal search interface
2. **Search Modal** - Full-screen modal with predictive search
3. **Search Page** - Dedicated search results page
4. **Reusable Search Form** - Component for use across the site
5. **404 Page Search** - Search functionality on error pages

## Components

### 1. Header Search Button

**Location**: `theme/sections/header.liquid`

**Features**:
- Search icon button in header navigation
- Opens search modal on click
- Consistent with existing header styling
- Accessible with proper ARIA labels

**Implementation**:
```html
<button
  class="text-white no-underline transition-all duration-300 relative flex items-center p-2 rounded-lg bg-primary/20 backdrop-blur-md border border-primary/30 hover:text-primary hover:bg-primary/30 search-toggle"
  aria-label="Search"
  type="button"
  data-search-toggle
>
  <svg class="w-6 h-6 lg:w-7 lg:h-7" fill="currentColor" viewBox="0 0 24 24">
    <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clip-rule="evenodd"/>
  </svg>
</button>
```

### 2. Search Modal

**Location**: `theme/sections/header.liquid`

**Features**:
- Full-screen modal overlay
- Real-time predictive search with 300ms debounce
- Keyboard navigation (Escape to close, Enter to submit)
- Loading states and error handling
- Mobile-responsive design
- BloxMania-themed styling

**API Endpoint**: `/search/suggest.json`

**Response Structure**:
```json
{
  "resources": {
    "products": [...],
    "collections": [...],
    "pages": [...],
    "articles": [...]
  }
}
```

### 3. Enhanced Search Page

**Location**: `theme/sections/main-search.liquid`

**Features**:
- BloxMania-themed styling
- Responsive grid layout
- Product cards with images and prices
- No results state
- Search filters and sorting

### 4. Reusable Search Form

**Location**: `theme/snippets/search-form.liquid`

**Usage**:
```liquid
{% render 'search-form', 
  placeholder: 'Search products...', 
  class: 'my-custom-class',
  id: 'custom-search',
  action: '/search',
  method: 'get'
%}
```

**Features**:
- Consistent styling across the site
- Customizable placeholder text
- Accessible form controls
- Clear button functionality
- Mobile-responsive design

### 5. 404 Page Search

**Location**: `theme/sections/main-404.liquid`

**Features**:
- Search form on 404 error pages
- Helps users find what they're looking for
- Consistent with main search styling

## JavaScript Functionality

### Search Modal JavaScript

**Key Functions**:

1. **`performPredictiveSearch(query)`**
   - Makes API call to `/search/suggest.json`
   - Handles different response structures
   - Debounced with 300ms delay

2. **`displaySearchResults(results, query)`**
   - Renders search results in modal
   - Highlights search terms
   - Shows product images and prices
   - Handles different result types

3. **`highlightQuery(text, query)`**
   - Highlights search terms in results
   - Uses case-insensitive matching

### Error Handling

The search functionality includes robust error handling:

```javascript
// Handle different possible response structures
let results = [];
if (data.resources) {
  if (data.resources.results) {
    results = Array.isArray(data.resources.results) ? data.resources.results : [];
  } else if (data.resources.products) {
    results = Array.isArray(data.resources.products) ? data.resources.products : [];
  } else if (data.resources.collections) {
    results = Array.isArray(data.resources.collections) ? data.resources.collections : [];
  }
  // ... more fallbacks
}
```

## Styling

### Search Modal Styles

**Location**: `theme/src/styles.css`

**Key Features**:
- Dark theme with neon yellow accents
- Backdrop blur effects
- Smooth animations
- Mobile-responsive design
- Accessibility-focused styling

### CSS Classes

- `.search-modal` - Main modal container
- `.search-modal__overlay` - Backdrop overlay
- `.search-modal__container` - Modal content container
- `.search-modal__input` - Search input field
- `.search-modal__results` - Results container
- `.search-result-item` - Individual result items

## Accessibility

### ARIA Labels and Roles

```html
<button aria-label="Search" data-search-toggle>
<form role="search">
<input aria-label="Search" type="search">
```

### Keyboard Navigation

- **Escape**: Close search modal
- **Enter**: Submit search form
- **Tab**: Navigate through search results
- **Arrow keys**: Navigate search results (future enhancement)

### Screen Reader Support

- Proper heading structure
- Descriptive button labels
- Form field associations
- Loading state announcements

## Performance Optimization

### Debouncing

Search requests are debounced to prevent excessive API calls:

```javascript
let searchTimeout;
searchInput.addEventListener('input', function () {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    performPredictiveSearch(query);
  }, 300);
});
```

### Lazy Loading

Search results are loaded on-demand, not preloaded.

### Error Handling

Graceful fallbacks for network errors and malformed responses.

## Troubleshooting

### Common Issues

1. **"No results found" for valid searches**
   - Check if store has products
   - Verify search API endpoint is working
   - Check browser console for errors

2. **Search modal not opening**
   - Verify JavaScript is loaded
   - Check for CSS conflicts
   - Ensure proper event listeners

3. **Search results not displaying**
   - Check API response structure
   - Verify result parsing logic
   - Check for JavaScript errors

### Debug Information

The search functionality includes detailed console logging:

```javascript
console.log('Search API response:', data);
console.log('Resources object:', data.resources);
console.log('Resources keys:', Object.keys(data.resources));
console.log('Extracted results:', results);
```

### Testing

**Test Search Terms**:
- Use demo product names: "sheckles", "raccoon", "fennec", "disco", "dragonfly"
- Test with partial matches: "she", "rac", "fen"
- Test with no results: "xyz123"

**Test Scenarios**:
1. Open search modal
2. Type search query
3. Verify results display
4. Test keyboard navigation
5. Test mobile responsiveness
6. Test accessibility features

## Configuration

### Settings

**Location**: `theme/config/settings_data.json`

```json
{
  "predictive_search_enabled": false,
  "search_results_limit": 6
}
```

### Translations

**Location**: `theme/locales/en.default.json`

```json
{
  "general": {
    "search": {
      "search": "Search",
      "reset": "Reset",
      "placeholder": "Search for products, collections, or pages..."
    }
  }
}
```

## Future Enhancements

### Planned Features

1. **Advanced Filtering**
   - Price range filters
   - Category filters
   - Availability filters

2. **Search Analytics**
   - Popular search terms
   - Search performance metrics
   - User behavior tracking

3. **Enhanced Results**
   - Product variants in search
   - Related products
   - Search suggestions

4. **Voice Search**
   - Voice input support
   - Speech recognition
   - Voice navigation

### Performance Improvements

1. **Caching**
   - Search result caching
   - Popular searches cache
   - CDN optimization

2. **Indexing**
   - Product search indexing
   - Content optimization
   - SEO improvements

## Support

For issues with the search functionality:

1. Check browser console for errors
2. Verify store has products
3. Test with different search terms
4. Check network requests
5. Review this documentation

The search feature is designed to be robust and user-friendly, with comprehensive error handling and accessibility support. 