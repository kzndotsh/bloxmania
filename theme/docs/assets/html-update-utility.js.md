# html-update-utility.js

HTML Update Utility - Following Dawn's HTMLUpdateUtility pattern Handles dynamic HTML updates with proper script execution and event handling /


## Functions


### updateHTML
HTML Update Utility - Following Dawn's HTMLUpdateUtility pattern Handles dynamic HTML updates with proper script execution and event handling / class HTMLUpdateUtility { Update HTML content with proper script execution

**Parameters:**
- `targetElement` (Element): Element to update
- `newHTML` (string): New HTML content
- `options` (Object): Update options

**Returns:** 



### updateSections
Update specific sections of the page (Dawn pattern)

**Parameters:**
- `sections` (Object): Object with section IDs as keys and HTML as values
- `options` (Object): Update options

**Returns:** 



### parseHTML
Safely parse HTML string

**Parameters:**
- `htmlString` (string): HTML string to parse

**Returns:** DocumentFragment - Parsed document fragment



### extractElement
Extract specific element from HTML string

**Parameters:**
- `htmlString` (string): HTML string
- `selector` (string): CSS selector

**Returns:** Element|null - Found element or null



### mergeAttributes
Merge HTML attributes from source to target

**Parameters:**
- `target` (Element): Target element
- `source` (Element): Source element
- `excludeAttributes` (Array): Attributes to exclude from merge

**Returns:** 






## Classes


### .HTMLUpdateUtility
HTML Update Utility - Following Dawn's HTMLUpdateUtility pattern Handles dynamic HTML updates with proper script execution and event handling

**Example:**
```html
undefined
```


