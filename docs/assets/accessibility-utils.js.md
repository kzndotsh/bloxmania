# accessibility-utils.js

Accessibility Utilities Enhances theme accessibility with focus management, ARIA support, and keyboard navigation /


## Functions


### init
Accessibility Utilities Enhances theme accessibility with focus management, ARIA support, and keyboard navigation / class AccessibilityUtils { constructor() { this.focusableSelectors = [ 'a[href]:not([tabindex="-1"])', 'button:not([disabled]):not([tabindex="-1"])', 'input:not([disabled]):not([tabindex="-1"])', 'select:not([disabled]):not([tabindex="-1"])', 'textarea:not([disabled]):not([tabindex="-1"])', '[tabindex="0"]', 'details:not([tabindex="-1"])', 'summary:not([tabindex="-1"])', 'iframe:not([tabindex="-1"])', 'audio[controls]:not([tabindex="-1"])', 'video[controls]:not([tabindex="-1"])', ].join(", "); this.init(); } Initialize accessibility enhancements

**Parameters:**


**Returns:** 



### setupSkipLinks
Setup skip links for keyboard navigation - DISABLED

**Parameters:**


**Returns:** 



### setupFocusRing
Setup focus ring for keyboard navigation

**Parameters:**


**Returns:** 



### setupKeyboardNavigation
Setup keyboard navigation for interactive elements

**Parameters:**


**Returns:** 



### setupScreenReaderAnnouncements
Setup screen reader announcements

**Parameters:**


**Returns:** 



### enhanceExistingElements
Enhance existing elements with proper accessibility attributes

**Parameters:**


**Returns:** 



### getFocusableElements
Get all focusable elements within a container

**Parameters:**
- `container` (HTMLElement): Container element

**Returns:** NodeList - List of focusable elements



### trapFocus
Trap focus within a container

**Parameters:**
- `container` (HTMLElement): Container to trap focus within

**Returns:** Function - Function to remove the focus trap



### announce
Announce a message to screen readers

**Parameters:**
- `message` (string): Message to announce
- `priority` (string): Announcement priority (polite or assertive)

**Returns:** 



### createScreenReaderText
Create a visually hidden element for screen readers

**Parameters:**
- `text` (string): Text content
- `tag` (string): HTML tag (default: span)

**Returns:** HTMLElement - Created element



### addLoadingAnnouncement
Add loading state announcements

**Parameters:**
- `element` (HTMLElement): Element that's loading
- `loadingText` (string): Text to announce while loading
- `loadedText` (string): Text to announce when loaded

**Returns:** 



### enhanceFormAccessibility
Enhance form accessibility

**Parameters:**
- `form` (HTMLFormElement): Form to enhance

**Returns:** 



### checkColorContrast
Add color contrast checking (development helper)

**Parameters:**
- `element` (HTMLElement): Element to check

**Returns:** Object - Contrast ratio information






## Classes


### .AccessibilityUtils
Accessibility Utilities Enhances theme accessibility with focus management, ARIA support, and keyboard navigation

**Example:**
```html
undefined
```


