/**
 * BloxMania Theme Service Worker
 * Handles asset caching and offline support following modern patterns
 */

const CACHE_NAME = 'bloxmania-theme-cache-v1';
const RUNTIME_CACHE = 'bloxmania-runtime-cache-v1';
const IMAGE_CACHE = 'bloxmania-images-cache-v1';

// Assets to cache on install
const PRECACHE_ASSETS = [
  '/',
  '/assets/style-base.css',
  '/assets/core-global.js',
  '/assets/system-theme-editor.js',
  '/assets/core-dom.js',
  '/assets/helper-html-update.js',
  '/assets/helper-section-id.js',
  '/assets/system-performance.js',
];

// Cache strategies
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
};

// Install event - precache critical assets
self.addEventListener('install', (event) => {
  // Service Worker installing...

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        // Precaching assets...
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        // Assets precached successfully
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Failed to precache assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  // Service Worker activating...

  const currentCaches = [CACHE_NAME, RUNTIME_CACHE, IMAGE_CACHE];

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return cacheNames.filter(
          (cacheName) => !currentCaches.includes(cacheName)
        );
      })
      .then((cachesToDelete) => {
        // Cleaning up old caches
        return Promise.all(
          cachesToDelete.map((cacheToDelete) => caches.delete(cacheToDelete))
        );
      })
      .then(() => {
        // Service Worker activated
        return self.clients.claim();
      })
  );
});

// Fetch event - handle different types of requests with appropriate strategies
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip cross-origin requests (except for fonts and images)
  if (
    !url.origin.includes(self.location.origin) &&
    !isCrossOriginAsset(request)
  ) {
    return;
  }

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip Shopify admin and checkout requests
  if (isShopifySystemRequest(request)) {
    return;
  }

  // Route requests to appropriate handlers
  if (isHTMLRequest(request)) {
    event.respondWith(handleHTMLRequest(request));
  } else if (isImageRequest(request)) {
    event.respondWith(handleImageRequest(request));
  } else if (isAssetRequest(request)) {
    event.respondWith(handleAssetRequest(request));
  } else if (isAPIRequest(request)) {
    event.respondWith(handleAPIRequest(request));
  } else {
    event.respondWith(handleGenericRequest(request));
  }
});

// Request type checkers
function isHTMLRequest(request) {
  return request.headers.get('accept')?.includes('text/html');
}

function isImageRequest(request) {
  return request.url.match(/\.(png|jpg|jpeg|webp|svg|gif|ico)(\?.*)?$/i);
}

function isAssetRequest(request) {
  return request.url.match(/\.(js|css|woff|woff2|eot|ttf|otf)(\?.*)?$/i);
}

function isAPIRequest(request) {
  return (
    request.url.includes('/cart.js') ||
    request.url.includes('/search.json') ||
    request.url.includes('/products.json') ||
    request.url.includes('.json')
  );
}

function isCrossOriginAsset(request) {
  return (
    request.url.includes('fonts.googleapis.com') ||
    request.url.includes('fonts.gstatic.com') ||
    request.url.includes('cdn.shopify.com')
  );
}

function isShopifySystemRequest(request) {
  return (
    request.url.includes('/admin') ||
    request.url.includes('/cart') ||
    request.url.includes('/checkout') ||
    request.url.includes('/account') ||
    request.url.includes('/password')
  );
}

// Request handlers
async function handleHTMLRequest(request) {
  return handleWithStrategy(
    request,
    RUNTIME_CACHE,
    CACHE_STRATEGIES.NETWORK_FIRST
  );
}

async function handleImageRequest(request) {
  return handleWithStrategy(
    request,
    IMAGE_CACHE,
    CACHE_STRATEGIES.CACHE_FIRST,
    {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      maxEntries: 100,
    }
  );
}

async function handleAssetRequest(request) {
  return handleWithStrategy(request, CACHE_NAME, CACHE_STRATEGIES.CACHE_FIRST);
}

async function handleAPIRequest(request) {
  return handleWithStrategy(
    request,
    RUNTIME_CACHE,
    CACHE_STRATEGIES.NETWORK_FIRST,
    {
      maxAge: 5 * 60 * 1000, // 5 minutes
    }
  );
}

async function handleGenericRequest(request) {
  return handleWithStrategy(
    request,
    RUNTIME_CACHE,
    CACHE_STRATEGIES.STALE_WHILE_REVALIDATE
  );
}

// Generic strategy handler
async function handleWithStrategy(request, cacheName, strategy, options = {}) {
  const cache = await caches.open(cacheName);

  switch (strategy) {
    case CACHE_STRATEGIES.CACHE_FIRST:
      return handleCacheFirst(request, cache, options);

    case CACHE_STRATEGIES.NETWORK_FIRST:
      return handleNetworkFirst(request, cache, options);

    case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
      return handleStaleWhileRevalidate(request, cache, options);

    default:
      return fetch(request);
  }
}

// Cache-first strategy
async function handleCacheFirst(request, cache, options) {
  try {
    const cachedResponse = await cache.match(request);

    if (cachedResponse && !isExpired(cachedResponse, options.maxAge)) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);

    if (networkResponse.status === 200) {
      // Clone the response before caching
      const responseToCache = networkResponse.clone();
      await cache.put(request, responseToCache);

      // Clean up cache if needed
      if (options.maxEntries) {
        await cleanupCache(cache, options.maxEntries);
      }
    }

    return networkResponse;
  } catch (error) {
    console.error('Cache-first strategy failed:', error);
    const cachedResponse = await cache.match(request);
    return cachedResponse || new Response('Network error', { status: 503 });
  }
}

// Network-first strategy
async function handleNetworkFirst(request, cache, options) {
  try {
    const networkResponse = await fetch(request);

    if (networkResponse.status === 200) {
      const responseToCache = networkResponse.clone();
      await cache.put(request, responseToCache);
    }

    return networkResponse;
  } catch (error) {
    // Network failed, trying cache
    const cachedResponse = await cache.match(request);

    if (cachedResponse && !isExpired(cachedResponse, options.maxAge)) {
      return cachedResponse;
    }

    return new Response('Network and cache failed', { status: 503 });
  }
}

// Stale-while-revalidate strategy
async function handleStaleWhileRevalidate(request, cache, options) {
  const cachedResponse = await cache.match(request);

  // Start network request (don't await)
  const networkResponsePromise = fetch(request)
    .then((response) => {
      if (response.status === 200) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch((error) => {
      // Background fetch failed
    });

  // Return cached response immediately if available
  if (cachedResponse && !isExpired(cachedResponse, options.maxAge)) {
    return cachedResponse;
  }

  // If no cache, wait for network
  return networkResponsePromise;
}

// Utility functions
function isExpired(response, maxAge) {
  if (!maxAge) return false;

  const dateHeader = response.headers.get('date');
  if (!dateHeader) return false;

  const responseTime = new Date(dateHeader).getTime();
  const now = Date.now();

  return now - responseTime > maxAge;
}

async function cleanupCache(cache, maxEntries) {
  const keys = await cache.keys();

  if (keys.length > maxEntries) {
    const keysToDelete = keys.slice(0, keys.length - maxEntries);
    await Promise.all(keysToDelete.map((key) => cache.delete(key)));
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(handleBackgroundSync());
  }
});

async function handleBackgroundSync() {
  // Handle any queued actions when back online
  // Background sync triggered
  // This could include:
  // - Sending queued form submissions
  // - Updating cart data
  // - Syncing user preferences
}

// Push notifications (if needed)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();

    const options = {
      body: data.body,
      icon: '/assets/icon-192x192.png',
      badge: '/assets/badge-72x72.png',
      tag: data.tag || 'default',
      requireInteraction: data.requireInteraction || false,
      actions: data.actions || [],
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action) {
    // Handle action button clicks
    handleNotificationAction(event.action, event.notification.data);
  } else {
    // Handle notification click
    event.waitUntil(clients.openWindow(event.notification.data?.url || '/'));
  }
});

function handleNotificationAction(action, data) {
  switch (action) {
    case 'view':
      clients.openWindow(data?.url || '/');
      break;
    case 'dismiss':
      // Just close the notification
      break;
    default:
    // Unknown notification action
  }
}

// Message handler for communication with main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type) {
    switch (event.data.type) {
      case 'SKIP_WAITING':
        self.skipWaiting();
        break;
      case 'GET_VERSION':
        event.ports[0].postMessage({ version: CACHE_NAME });
        break;
      case 'CLEAR_CACHE':
        clearAllCaches().then(() => {
          event.ports[0].postMessage({ success: true });
        });
        break;
      default:
      // Unknown message type
    }
  }
});

async function clearAllCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.map((name) => caches.delete(name)));
}

// Error handler
self.addEventListener('error', (event) => {
  console.error('Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('Service Worker unhandled rejection:', event.reason);
});

// Service Worker loaded successfully
