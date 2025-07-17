# section-id-utility.js

Section ID Utility - Following Dawn's SectionId pattern Manages section IDs and provides utilities for section-based operations /


## Functions


### getIdForSection
Section ID Utility - Following Dawn's SectionId pattern Manages section IDs and provides utilities for section-based operations / class SectionId { constructor(value) { this.value = value; } Get section ID from element

**Parameters:**
- `element` (Element): Element to get section ID from

**Returns:** SectionId|null - Section ID instance or null



### parseId
Parse section ID from URL or string

**Parameters:**
- `url` (string): URL or string containing section ID

**Returns:** SectionId|null - Section ID instance or null



### getSection
Get section element by ID

**Parameters:**


**Returns:** Element|null - Section element or null



### getSettings
Get section settings element

**Parameters:**


**Returns:** Element|null - Section settings script element or null



### parseSettings
Parse section settings JSON

**Parameters:**


**Returns:** Object|null - Parsed settings object or null



### updateSettings
Update section settings

**Parameters:**
- `newSettings` (Object): New settings object

**Returns:** 



### getBlocks
Get all blocks within the section

**Parameters:**


**Returns:** NodeList - List of block elements



### getBlock
Get specific block by ID

**Parameters:**
- `blockId` (string): Block ID to find

**Returns:** Element|null - Block element or null



### generateUrl
Generate section URL with parameters

**Parameters:**
- `params` (Object): URL parameters

**Returns:** string - Generated URL



### exists
Check if section exists in DOM

**Parameters:**


**Returns:** boolean - Whether section exists



### getType
Get section type from class or data attribute

**Parameters:**


**Returns:** string|null - Section type or null



### isVisible
Check if section is currently visible

**Parameters:**


**Returns:** boolean - Whether section is visible






## Classes


### .SectionId
Section ID Utility - Following Dawn's SectionId pattern Manages section IDs and provides utilities for section-based operations

**Example:**
```html
undefined
```


