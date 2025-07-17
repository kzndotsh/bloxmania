# api-utils.js

API Utilities - Consolidated Shopify API interaction utilities Handles common API patterns with proper error handling and caching /


## Functions


### clearCache
API Utilities - Consolidated Shopify API interaction utilities Handles common API patterns with proper error handling and caching / class APIUtils { constructor() { this.cache = new Map(); this.abortControllers = new Map(); this.baseUrl = window.shopUrl || ''; this.config = window.THEME_CONFIG?.API || {}; } Generic fetch wrapper with error handling and caching

**Parameters:**
- `url` (string): API endpoint URL
- `options` (Object): Fetch options
- `useCache` (boolean): Whether to use caching
- `formData` (FormData|Object): Product form data
- `updates` (Object): Cart updates object
- `useCache` (boolean): Whether to use caching
- `variantId` (string): Variant ID
- `quantity` (number): New quantity
- `query` (string): Search query
- `options` (Object): Search options
- `productId` (string): Product ID
- `limit` (number): Number of recommendations
- `collectionHandle` (string): Collection handle
- `options` (Object): Query options
- `formData` (FormData): Form data
- `email` (string): Email address
- `additionalData` (Object): Additional form data

**Returns:** Promise - Response promise



### abortAllRequests
Abort all pending requests

**Parameters:**


**Returns:** 



### getCacheStats
Get cache statistics

**Parameters:**


**Returns:** Object - Cache stats






## Classes


### .APIUtils
API Utilities - Consolidated Shopify API interaction utilities Handles common API patterns with proper error handling and caching

**Example:**
```html
undefined
```


