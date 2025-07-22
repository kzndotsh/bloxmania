/*
 * BloxMania Theme - SYSTEM Bundle
 * Generated: 2025-07-22T09:54:11.897Z
 * Mode: development
 */

(function() {
  'use strict';

  // Bundle: system
  const BUNDLE_NAME = 'system';
  const BUNDLE_VERSION = '1.0.0';

  // Bundle initialization
  if (window.BloxMania && window.BloxMania.bundles) {
    window.BloxMania.bundles[BUNDLE_NAME] = {
      version: BUNDLE_VERSION,
      loaded: true,
      timestamp: Date.now()
    };
  }


// system-dawn.js
/**
 * BloxMania Dawn-Style Utilities
 * Following Dawn's utility patterns for maintainable theme architecture
 */

// Section ID utility following Dawn's pattern
// Only declare if not already declared
if (typeof SectionId === 'undefined') {
  class SectionId {
    static separator = '__';

    // For a qualified section id (e.g. 'template--22224696705326__main'), return just the section id (e.g. 'template--22224696705326')
    static parseId(qualifiedSectionId) {
      return qualifiedSectionId.split(SectionId.separator)[0];
    }

    // For a qualified section id (e.g. 'template--22224696705326__main'), return just the section name (e.g. 'main')
    static parseSectionName(qualifiedSectionId) {
      return qualifiedSectionId.split(SectionId.separator)[1];
    }

    // For a section id (e.g. 'template--22224696705326') and a section name (e.g. 'recommended-products'), return a qualified section id (e.g. 'template--22224696705326__recommended-products')
    static getIdForSection(sectionId, sectionName) {
      return `${sectionId}${SectionId.separator}${sectionName}`;
    }
  }

  // Export for global scope
  window.SectionId = SectionId;
}

// HTML Update Utility following Dawn's pattern
// Only declare if not already declared
if (typeof HTMLUpdateUtility === 'undefined') {
  class HTMLUpdateUtility {
    /**
     * Used to swap an HTML node with a new node.
     * The new node is inserted as a previous sibling to the old node, the old node is hidden, and then the old node is removed.
     *
     * The function currently uses a double buffer approach, but this should be replaced by a view transition once it is more widely supported https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API
     */
    static viewTransition(
      oldNode,
      newContent,
      preProcessCallbacks = [],
      postProcessCallbacks = []
    ) {
      preProcessCallbacks?.forEach((callback) => callback(newContent));

      const newNodeWrapper = document.createElement('div');
      HTMLUpdateUtility.setInnerHTML(newNodeWrapper, newContent.outerHTML);
      const newNode = newNodeWrapper.firstChild;

      // dedupe IDs
      const uniqueKey = Date.now();
      oldNode.querySelectorAll('[id], [form]').forEach((element) => {
        element.id && (element.id = `${element.id}-${uniqueKey}`);
        element.form &&
          element.setAttribute(
            'form',
            `${element.form.getAttribute('id')}-${uniqueKey}`
          );
      });

      oldNode.parentNode.insertBefore(newNode, oldNode);
      oldNode.style.display = 'none';

      postProcessCallbacks?.forEach((callback) => callback(newNode));

      setTimeout(() => oldNode.remove(), 500);
    }

    // Sets inner HTML and reinjects the script tags to allow execution. By default, scripts are disabled when using element.innerHTML.
    static setInnerHTML(element, html) {
      element.innerHTML = html;
      element.querySelectorAll('script').forEach((oldScriptTag) => {
        const newScriptTag = document.createElement('script');
        Array.from(oldScriptTag.attributes).forEach((attribute) => {
          newScriptTag.setAttribute(attribute.name, attribute.value);
        });
        newScriptTag.appendChild(
          document.createTextNode(oldScriptTag.innerHTML)
        );
        oldScriptTag.parentNode.replaceChild(newScriptTag, oldScriptTag);
      });
    }
  }

  // Export for global scope
  window.HTMLUpdateUtility = HTMLUpdateUtility;
}

// Focus management utilities following Dawn's pattern
const trapFocusHandlers = {};

// Only declare if not already declared
if (typeof trapFocus === 'undefined') {
  function trapFocus(container, elementToFocus = container) {
    const { getFocusableElements } = window.BloxManiaConstants || {};
    const elements = getFocusableElements
      ? getFocusableElements(container)
      : Array.from(
          container.querySelectorAll(
            "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
          )
        );

    const first = elements[0];
    const last = elements[elements.length - 1];

    removeTrapFocus();

    trapFocusHandlers.focusin = (event) => {
      if (
        event.target !== container &&
        event.target !== last &&
        event.target !== first
      )
        return;

      document.addEventListener('keydown', trapFocusHandlers.keydown);
    };

    trapFocusHandlers.focusout = function () {
      document.removeEventListener('keydown', trapFocusHandlers.keydown);
    };

    trapFocusHandlers.keydown = function (event) {
      if (event.code.toUpperCase() !== 'TAB') return; // If not TAB key
      // On the last focusable element and tab forward, focus the first element.
      if (event.target === last && !event.shiftKey) {
        event.preventDefault();
        first.focus();
      }

      //  On the first focusable element and tab backward, focus the last element.
      if (
        (event.target === container || event.target === first) &&
        event.shiftKey
      ) {
        event.preventDefault();
        last.focus();
      }
    };

    document.addEventListener('focusout', trapFocusHandlers.focusout);
    document.addEventListener('focusin', trapFocusHandlers.focusin);

    elementToFocus.focus();

    if (
      elementToFocus.tagName === 'INPUT' &&
      ['search', 'text', 'email', 'url'].includes(elementToFocus.type) &&
      elementToFocus.value
    ) {
      elementToFocus.setSelectionRange(0, elementToFocus.value.length);
    }
  }

  // Export for global scope
  window.trapFocus = trapFocus;
}

// Only declare if not already declared
if (typeof removeTrapFocus === 'undefined') {
  function removeTrapFocus(elementToFocus = null) {
    document.removeEventListener('focusin', trapFocusHandlers.focusin);
    document.removeEventListener('focusout', trapFocusHandlers.focusout);
    document.removeEventListener('keydown', trapFocusHandlers.keydown);

    if (elementToFocus) elementToFocus.focus();
  }

  // Export for global scope
  window.removeTrapFocus = removeTrapFocus;
}

// Keyboard event utilities
// Only declare if not already declared
if (typeof onKeyUpEscape === 'undefined') {
  function onKeyUpEscape(event) {
    if (event.code.toUpperCase() !== 'ESCAPE') return;

    const openDetailsElement = event.target.closest('details[open]');
    if (!openDetailsElement) return;

    const summaryElement = openDetailsElement.querySelector('summary');
    const openModalElement = openDetailsElement.closest(
      'details[open] > .modal__content'
    );

    if (openModalElement) {
      const modalElement = openModalElement.closest('details[open]');
      const modalToggle = modalElement.querySelector('summary');
      modalToggle.focus();
      modalToggle.click();
    } else if (summaryElement) {
      summaryElement.focus();
      summaryElement.click();
    }
  }

  // Export for global scope
  window.onKeyUpEscape = onKeyUpEscape;
}

// Media utilities following Dawn's pattern
// Only declare if not already declared
if (typeof pauseAllMedia === 'undefined') {
  function pauseAllMedia() {
    document.querySelectorAll('.js-youtube').forEach((video) => {
      video.contentWindow.postMessage(
        '{"event":"command","func":"' + 'pauseVideo' + '","args":""}',
        '*'
      );
    });
    document.querySelectorAll('.js-vimeo').forEach((video) => {
      video.contentWindow.postMessage('{"method":"pause"}', '*');
    });
    document.querySelectorAll('video').forEach((video) => video.pause());
    document.querySelectorAll('product-model').forEach((model) => {
      if (model.modelViewerUI) model.modelViewerUI.pause();
    });
  }

  // Export for global scope
  window.pauseAllMedia = pauseAllMedia;
}

// Fetch configuration utility following Dawn's pattern
// Only declare if not already declared
if (typeof fetchConfig === 'undefined') {
  function fetchConfig(type = 'json') {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: type === 'json' ? 'application/json' : 'text/html',
      },
    };
  }

  // Export for global scope
  window.fetchConfig = fetchConfig;
}

// Pub/Sub event system following Dawn's pattern
class PubSub {
  constructor() {
    this.events = {};
  }

  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  publish(event, data) {
    if (this.events[event]) {
      this.events[event].forEach((callback) => callback(data));
    }
  }

  unsubscribe(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    }
  }
}

// Export utilities for use in other modules
window.DawnUtilities = {
  SectionId,
  HTMLUpdateUtility,
  trapFocus,
  removeTrapFocus,
  onKeyUpEscape,
  pauseAllMedia,
  fetchConfig,
  PubSub,
};



// system-service-worker.js
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



// system-performance.js
/**
 * BloxMania Performance Monitor
 * Core Web Vitals tracking and performance optimization
 */

class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.observers = {};
    this.thresholds = {
      lcp: 2500, // 2.5 seconds
      fid: 100, // 100 milliseconds
      cls: 0.1, // 0.1
    };
    this.init();
  }

  init() {
    this.setupCoreWebVitals();
    this.setupPerformanceObserver();
    this.setupResourceTiming();
    this.setupUserTiming();
  }

  setupCoreWebVitals() {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.metrics.lcp = lastEntry.startTime;
          this.reportMetric('LCP', lastEntry.startTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.lcp = lcpObserver;
      } catch (e) {
        console.warn('LCP observer failed:', e);
      }

      // First Input Delay (FID)
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            this.metrics.fid = entry.processingStart - entry.startTime;
            this.reportMetric('FID', this.metrics.fid);
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.fid = fidObserver;
      } catch (e) {
        console.warn('FID observer failed:', e);
      }

      // Cumulative Layout Shift (CLS)
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              this.metrics.cls = clsValue;
              this.reportMetric('CLS', clsValue);
            }
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.cls = clsObserver;
      } catch (e) {
        console.warn('CLS observer failed:', e);
      }
    }
  }

  setupPerformanceObserver() {
    // Navigation timing
    if ('PerformanceObserver' in window) {
      try {
        const navigationObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            this.measureNavigationTiming(entry);
          });
        });
        navigationObserver.observe({ entryTypes: ['navigation'] });
        this.observers.navigation = navigationObserver;
      } catch (e) {
        console.warn('Navigation observer failed:', e);
      }

      // Resource timing
      try {
        const resourceObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            this.measureResourceTiming(entry);
          });
        });
        resourceObserver.observe({ entryTypes: ['resource'] });
        this.observers.resource = resourceObserver;
      } catch (e) {
        console.warn('Resource observer failed:', e);
      }
    }
  }

  setupResourceTiming() {
    // Monitor critical resources
    const criticalResources = [
      '/assets/style-base.css',
      '/assets/core-global.js',
      '/assets/core-init.js',
    ];

    criticalResources.forEach((resource) => {
      this.measureResourceLoad(resource);
    });
  }

  setupUserTiming() {
    // Custom performance marks
    this.mark('theme:init:start');

    // Measure theme initialization
    window.addEventListener('DOMContentLoaded', () => {
      this.mark('theme:dom:loaded');
      this.measure('theme:init', 'theme:init:start', 'theme:dom:loaded');
    });

    window.addEventListener('load', () => {
      this.mark('theme:load:complete');
      this.measure('theme:load', 'theme:init:start', 'theme:load:complete');
    });
  }

  mark(name) {
    if ('performance' in window && 'mark' in performance) {
      performance.mark(name);
    }
  }

  measure(name, startMark, endMark) {
    if ('performance' in window && 'measure' in performance) {
      try {
        const measure = performance.measure(name, startMark, endMark);
        this.reportMetric(name, measure.duration);
      } catch (e) {
        console.warn(`Failed to measure ${name}:`, e);
      }
    }
  }

  measureNavigationTiming(entry) {
    const metrics = {
      DNS: entry.domainLookupEnd - entry.domainLookupStart,
      TCP: entry.connectEnd - entry.connectStart,
      TTFB: entry.responseStart - entry.requestStart,
      DOMContentLoaded:
        entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
      Load: entry.loadEventEnd - entry.loadEventStart,
    };

    Object.entries(metrics).forEach(([name, value]) => {
      this.reportMetric(`Navigation:${name}`, value);
    });
  }

  measureResourceTiming(entry) {
    // Only track important resources
    const importantResources = ['.css', '.js', '.png', '.jpg', '.webp', '.svg'];

    const isImportant = importantResources.some((ext) =>
      entry.name.includes(ext)
    );

    if (isImportant) {
      const metrics = {
        DNS: entry.domainLookupEnd - entry.domainLookupStart,
        TCP: entry.connectEnd - entry.connectStart,
        TTFB: entry.responseStart - entry.requestStart,
        Download: entry.responseEnd - entry.responseStart,
        Total: entry.responseEnd - entry.startTime,
      };

      Object.entries(metrics).forEach(([name, value]) => {
        this.reportMetric(`Resource:${name}`, value, entry.name);
      });
    }
  }

  measureResourceLoad(resource) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = this.getResourceType(resource);
    link.href = resource;

    link.addEventListener('load', () => {
      this.reportMetric('Resource:Preload', performance.now(), resource);
    });

    document.head.appendChild(link);
  }

  getResourceType(resource) {
    if (resource.endsWith('.css')) return 'style';
    if (resource.endsWith('.js')) return 'script';
    if (
      resource.endsWith('.png') ||
      resource.endsWith('.jpg') ||
      resource.endsWith('.webp')
    )
      return 'image';
    return 'fetch';
  }

  reportMetric(name, value, context = '') {
    // Store metric
    this.metrics[name] = value;

    // Check against thresholds
    const threshold = this.thresholds[name.toLowerCase()];
    if (threshold) {
      const status =
        value <= threshold
          ? 'good'
          : value <= threshold * 1.5
          ? 'needs-improvement'
          : 'poor';
      this.metrics[`${name}_status`] = status;
    }

    // Send to analytics (if configured)
    this.sendToAnalytics(name, value, context);

    // Log for development
    if (
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1'
    ) {
      console.log(`Performance: ${name} = ${value}ms`, context);
    }
  }

  sendToAnalytics(name, value, context) {
    // Send to Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', 'performance_metric', {
        metric_name: name,
        metric_value: value,
        metric_context: context,
        page_location: window.location.href,
      });
    }

    // Send to custom analytics endpoint
    if (window.BloxManiaConfig?.analytics?.endpoint) {
      fetch(window.BloxManiaConfig.analytics.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metric: name,
          value: value,
          context: context,
          timestamp: Date.now(),
          url: window.location.href,
          userAgent: navigator.userAgent,
        }),
      }).catch((e) => console.warn('Analytics send failed:', e));
    }
  }

  getMetrics() {
    return { ...this.metrics };
  }

  getCoreWebVitals() {
    return {
      lcp: this.metrics.lcp,
      fid: this.metrics.fid,
      cls: this.metrics.cls,
      lcp_status: this.metrics.lcp_status,
      fid_status: this.metrics.fid_status,
      cls_status: this.metrics.cls_status,
    };
  }

  isPerformanceGood() {
    const cwv = this.getCoreWebVitals();
    return (
      (!cwv.lcp_status || cwv.lcp_status === 'good') &&
      (!cwv.fid_status || cwv.fid_status === 'good') &&
      (!cwv.cls_status || cwv.cls_status === 'good')
    );
  }

  generateReport() {
    const report = {
      timestamp: Date.now(),
      url: window.location.href,
      metrics: this.getMetrics(),
      coreWebVitals: this.getCoreWebVitals(),
      performanceGood: this.isPerformanceGood(),
      userAgent: navigator.userAgent,
    };

    return report;
  }

  cleanup() {
    // Disconnect all observers
    Object.values(this.observers).forEach((observer) => {
      if (observer && typeof observer.disconnect === 'function') {
        observer.disconnect();
      }
    });
  }
}

// Initialize performance monitor
const performanceMonitor = new PerformanceMonitor();

// Export for use in other modules
window.PerformanceMonitor = performanceMonitor;



// system-theme-editor.js
/**
 * BloxMania Theme Editor
 * Handles Shopify theme editor integration and customization
 */

class ThemeEditor {
  constructor() {
    this.isEditor = false;
    this.sections = new Map();
    this.blocks = new Map();
    this.init();
  }

  init() {
    this.detectEditor();
    this.setupEventListeners();
    this.initializeSections();
  }

  detectEditor() {
    // Check if we're in the Shopify theme editor
    this.isEditor =
      window.Shopify?.designMode === 'design' ||
      document.body.classList.contains('shopify-design-mode') ||
      window.location.search.includes('preview_theme_id');

    if (this.isEditor) {
      document.documentElement.classList.add('theme-editor');
      console.log('BloxMania theme editor mode detected');
    }
  }

  setupEventListeners() {
    if (!this.isEditor) return;

    // Listen for section events
    document.addEventListener('shopify:section:load', (event) => {
      this.handleSectionLoad(event);
    });

    document.addEventListener('shopify:section:unload', (event) => {
      this.handleSectionUnload(event);
    });

    document.addEventListener('shopify:section:select', (event) => {
      this.handleSectionSelect(event);
    });

    document.addEventListener('shopify:section:deselect', (event) => {
      this.handleSectionDeselect(event);
    });

    // Listen for block events
    document.addEventListener('shopify:block:select', (event) => {
      this.handleBlockSelect(event);
    });

    document.addEventListener('shopify:block:deselect', (event) => {
      this.handleBlockDeselect(event);
    });

    // Listen for theme editor events
    document.addEventListener('shopify:theme:load', (event) => {
      this.handleThemeLoad(event);
    });

    // Listen for settings changes
    if (window.Shopify?.on) {
      window.Shopify.on('shopify:section:reorder', (event) => {
        this.handleSectionReorder(event);
      });
    }
  }

  initializeSections() {
    if (!this.isEditor) return;

    // Find all sections and initialize them
    const sections = document.querySelectorAll('[data-section-id]');
    sections.forEach((section) => {
      this.registerSection(section);
    });
  }

  registerSection(sectionElement) {
    const sectionId = sectionElement.dataset.sectionId;
    if (!sectionId) return;

    const section = {
      element: sectionElement,
      id: sectionId,
      type: sectionElement.dataset.sectionType,
      blocks: new Map(),
      initialized: false,
    };

    this.sections.set(sectionId, section);
    this.initializeSectionBlocks(section);

    console.log(`Section registered: ${sectionId} (${section.type})`);
  }

  initializeSectionBlocks(section) {
    const blocks = section.element.querySelectorAll('[data-block-id]');
    blocks.forEach((blockElement) => {
      const blockId = blockElement.dataset.blockId;
      if (!blockId) return;

      const block = {
        element: blockElement,
        id: blockId,
        type: blockElement.dataset.blockType,
        sectionId: section.id,
      };

      section.blocks.set(blockId, block);
      this.blocks.set(blockId, block);
    });
  }

  handleSectionLoad(event) {
    const sectionId = event.detail.sectionId;
    const sectionElement = event.target;

    console.log(`Section loaded: ${sectionId}`);

    // Register the new section
    this.registerSection(sectionElement);

    // Initialize section-specific functionality
    this.initializeSectionFunctionality(sectionId);

    // Trigger custom event for section-specific handling
    sectionElement.dispatchEvent(
      new CustomEvent('section:loaded', {
        detail: { sectionId, section: this.sections.get(sectionId) },
      })
    );
  }

  handleSectionUnload(event) {
    const sectionId = event.detail.sectionId;

    console.log(`Section unloaded: ${sectionId}`);

    // Clean up section
    const section = this.sections.get(sectionId);
    if (section) {
      // Remove all blocks for this section
      section.blocks.forEach((block, blockId) => {
        this.blocks.delete(blockId);
      });

      this.sections.delete(sectionId);
    }
  }

  handleSectionSelect(event) {
    const sectionId = event.detail.sectionId;
    const section = this.sections.get(sectionId);

    if (section) {
      section.element.classList.add('section-selected');
      console.log(`Section selected: ${sectionId}`);

      // Trigger custom event
      section.element.dispatchEvent(
        new CustomEvent('section:selected', {
          detail: { sectionId, section },
        })
      );
    }
  }

  handleSectionDeselect(event) {
    const sectionId = event.detail.sectionId;
    const section = this.sections.get(sectionId);

    if (section) {
      section.element.classList.remove('section-selected');
      console.log(`Section deselected: ${sectionId}`);

      // Trigger custom event
      section.element.dispatchEvent(
        new CustomEvent('section:deselected', {
          detail: { sectionId, section },
        })
      );
    }
  }

  handleBlockSelect(event) {
    const blockId = event.detail.blockId;
    const block = this.blocks.get(blockId);

    if (block) {
      block.element.classList.add('block-selected');
      console.log(`Block selected: ${blockId}`);

      // Trigger custom event
      block.element.dispatchEvent(
        new CustomEvent('block:selected', {
          detail: { blockId, block },
        })
      );
    }
  }

  handleBlockDeselect(event) {
    const blockId = event.detail.blockId;
    const block = this.blocks.get(blockId);

    if (block) {
      block.element.classList.remove('block-selected');
      console.log(`Block deselected: ${blockId}`);

      // Trigger custom event
      block.element.dispatchEvent(
        new CustomEvent('block:deselected', {
          detail: { blockId, block },
        })
      );
    }
  }

  handleThemeLoad(event) {
    console.log('Theme loaded in editor');

    // Initialize all sections
    this.initializeSections();

    // Trigger custom event
    document.dispatchEvent(
      new CustomEvent('theme:editor:loaded', {
        detail: { sections: this.sections, blocks: this.blocks },
      })
    );
  }

  handleSectionReorder(event) {
    console.log('Sections reordered:', event.detail);

    // Trigger custom event
    document.dispatchEvent(
      new CustomEvent('sections:reordered', {
        detail: event.detail,
      })
    );
  }

  initializeSectionFunctionality(sectionId) {
    const section = this.sections.get(sectionId);
    if (!section || section.initialized) return;

    // Initialize based on section type
    switch (section.type) {
      case 'hero':
        this.initializeHeroSection(section);
        break;
      case 'featured-products':
        this.initializeFeaturedProductsSection(section);
        break;
      case 'main-product':
        this.initializeProductSection(section);
        break;
      case 'customer-reviews':
        this.initializeReviewsSection(section);
        break;
      case 'faq':
        this.initializeFaqSection(section);
        break;
      default:
        // Generic initialization
        this.initializeGenericSection(section);
    }

    section.initialized = true;
  }

  initializeHeroSection(section) {
    // Hero section specific initialization
    const heroElement = section.element.querySelector('.hero');
    if (heroElement) {
      // Add editor-specific classes
      heroElement.classList.add('editor-hero');

      // Make background images editable
      const backgroundImages = heroElement.querySelectorAll(
        '[data-background-image]'
      );
      backgroundImages.forEach((img) => {
        img.classList.add('editor-editable');
      });
    }
  }

  initializeFeaturedProductsSection(section) {
    // Featured products section specific initialization
    const productGrid = section.element.querySelector('.product-grid');
    if (productGrid) {
      productGrid.classList.add('editor-product-grid');
    }
  }

  initializeProductSection(section) {
    // Product section specific initialization
    const productForm = section.element.querySelector('product-form');
    if (productForm) {
      productForm.classList.add('editor-product-form');
    }
  }

  initializeReviewsSection(section) {
    // Reviews section specific initialization
    const reviewsContainer =
      section.element.querySelector('.reviews-container');
    if (reviewsContainer) {
      reviewsContainer.classList.add('editor-reviews');
    }
  }

  initializeFaqSection(section) {
    // FAQ section specific initialization
    const faqItems = section.element.querySelectorAll('.faq-item');
    faqItems.forEach((item) => {
      item.classList.add('editor-faq-item');
    });
  }

  initializeGenericSection(section) {
    // Generic section initialization
    section.element.classList.add('editor-section');
  }

  // Utility methods for theme editor
  getSection(sectionId) {
    return this.sections.get(sectionId);
  }

  getBlock(blockId) {
    return this.blocks.get(blockId);
  }

  getAllSections() {
    return Array.from(this.sections.values());
  }

  getAllBlocks() {
    return Array.from(this.blocks.values());
  }

  isInEditor() {
    return this.isEditor;
  }

  // Method to refresh a section
  refreshSection(sectionId) {
    const section = this.sections.get(sectionId);
    if (section) {
      // Trigger section refresh
      section.element.dispatchEvent(
        new CustomEvent('section:refresh', {
          detail: { sectionId, section },
        })
      );
    }
  }

  // Method to update section settings
  updateSectionSettings(sectionId, settings) {
    const section = this.sections.get(sectionId);
    if (section) {
      // Apply settings to section
      Object.entries(settings).forEach(([key, value]) => {
        section.element.style.setProperty(`--${key}`, value);
      });

      // Trigger settings update event
      section.element.dispatchEvent(
        new CustomEvent('section:settings:updated', {
          detail: { sectionId, section, settings },
        })
      );
    }
  }

  // Cleanup method
  cleanup() {
    this.sections.clear();
    this.blocks.clear();
  }
}

// Initialize theme editor
const themeEditor = new ThemeEditor();

// Export for use in other modules
window.ThemeEditor = themeEditor;

// Add editor-specific styles
if (themeEditor.isInEditor()) {
  const editorStyles = document.createElement('style');
  editorStyles.textContent = `
    .theme-editor .section-selected {
      outline: 2px solid #ffd800;
      outline-offset: 2px;
    }
    
    .theme-editor .block-selected {
      outline: 2px solid #4791f0;
      outline-offset: 1px;
    }
    
    .theme-editor .editor-editable {
      cursor: pointer;
    }
    
    .theme-editor .editor-editable:hover {
      opacity: 0.8;
    }
    
    .theme-editor .editor-section {
      position: relative;
    }
    
    .theme-editor .editor-section::before {
      content: attr(data-section-type);
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
      z-index: 1000;
      border-radius: 0 0 4px 0;
    }
  `;
  document.head.appendChild(editorStyles);
}



// system-web-components.js
/**
 * BloxMania Web Components
 * Modern Web Components for enhanced functionality and maintainability
 */

/**
 * Safe Custom Element Registration
 * Prevents duplicate registration errors
 */
function safeDefineCustomElement(name, constructor) {
  if (!customElements.get(name)) {
    customElements.define(name, constructor);
  } else {
    console.warn(
      `Custom element '${name}' is already defined, skipping registration.`
    );
  }
}

// Base component class for common functionality
class BloxManiaComponent extends HTMLElement {
  constructor() {
    super();
    this.initialized = false;
  }

  connectedCallback() {
    if (this.initialized) return;
    this.init();
    this.initialized = true;
  }

  disconnectedCallback() {
    this.cleanup();
  }

  init() {
    // Override in subclasses
  }

  cleanup() {
    // Override in subclasses
  }
}

// Modal Dialog Component
class ModalDialog extends BloxManiaComponent {
  constructor() {
    super();
    this.modal = null;
    this.closeButton = null;
    this.focusableElements = [];
    this.firstFocusableElement = null;
    this.lastFocusableElement = null;
  }

  init() {
    this.modal = this.querySelector('.modal__content');
    this.closeButton = this.querySelector('.modal__close-button');

    this.bindEvents();
    this.setupFocusTrap();
  }

  bindEvents() {
    this.closeButton?.addEventListener('click', () => this.hide());
    this.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.hide();
    });

    // Close on backdrop click
    this.addEventListener('click', (e) => {
      if (e.target === this) this.hide();
    });
  }

  setupFocusTrap() {
    this.focusableElements = Array.from(
      this.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    );

    if (this.focusableElements.length > 0) {
      this.firstFocusableElement = this.focusableElements[0];
      this.lastFocusableElement =
        this.focusableElements[this.focusableElements.length - 1];
    }
  }

  show() {
    this.setAttribute('open', '');
    document.body.classList.add('modal-open');
    this.firstFocusableElement?.focus();

    // Trap focus
    this.addEventListener('keydown', this.handleTabKey.bind(this));
  }

  hide() {
    this.removeAttribute('open');
    document.body.classList.remove('modal-open');
    this.removeEventListener('keydown', this.handleTabKey.bind(this));
  }

  handleTabKey(e) {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === this.firstFocusableElement) {
        e.preventDefault();
        this.lastFocusableElement?.focus();
      }
    } else {
      if (document.activeElement === this.lastFocusableElement) {
        e.preventDefault();
        this.firstFocusableElement?.focus();
      }
    }
  }

  cleanup() {
    this.removeEventListener('keydown', this.handleTabKey.bind(this));
  }
}

// Search Modal Component
class SearchModal extends ModalDialog {
  constructor() {
    super();
    this.searchInput = null;
    this.searchResults = null;
    this.searchForm = null;
  }

  init() {
    super.init();
    this.searchInput = this.querySelector('.search-modal__input');
    this.searchResults = this.querySelector('.search-modal__results');
    this.searchForm = this.querySelector('.search-modal__form');

    this.setupSearch();
  }

  setupSearch() {
    this.searchForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.performSearch();
    });

    this.searchInput?.addEventListener(
      'input',
      this.debounce(() => {
        this.performSearch();
      }, 300)
    );
  }

  performSearch() {
    const query = this.searchInput?.value.trim();
    if (!query || query.length < 2) {
      this.clearResults();
      return;
    }

    this.fetchSearchResults(query);
  }

  async fetchSearchResults(query) {
    try {
      const response = await fetch(
        `/search/suggest.json?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      this.displayResults(data.resources?.results || []);
    } catch (error) {
      console.error('Search error:', error);
    }
  }

  displayResults(results) {
    if (!this.searchResults) return;

    if (results.length === 0) {
      this.searchResults.innerHTML =
        '<p class="search-modal__no-results">No results found</p>';
      return;
    }

    const resultsHTML = results
      .map(
        (result) => `
      <a href="${result.url}" class="search-modal__result-item">
        <div class="search-modal__result-image">
          ${
            result.featured_image
              ? `<img src="${result.featured_image}" alt="${result.title}">`
              : ''
          }
        </div>
        <div class="search-modal__result-content">
          <h3 class="search-modal__result-title">${result.title}</h3>
          <p class="search-modal__result-price">${result.price || ''}</p>
        </div>
      </a>
    `
      )
      .join('');

    this.searchResults.innerHTML = resultsHTML;
  }

  clearResults() {
    if (this.searchResults) {
      this.searchResults.innerHTML = '';
    }
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Cart Notification Component
class CartNotification extends BloxManiaComponent {
  constructor() {
    super();
    this.notification = null;
    this.message = null;
    this.closeButton = null;
    this.timeout = null;
  }

  init() {
    this.notification = this.querySelector('.cart-notification');
    this.message = this.querySelector('.cart-notification__message');
    this.closeButton = this.querySelector('.cart-notification__close');

    this.bindEvents();
  }

  bindEvents() {
    this.closeButton?.addEventListener('click', () => this.hide());

    // Auto-hide after 5 seconds
    this.addEventListener('animationend', () => {
      if (this.classList.contains('animate-in')) {
        this.timeout = setTimeout(() => this.hide(), 5000);
      }
    });
  }

  show(message, type = 'success') {
    if (this.message) {
      this.message.textContent = message;
    }

    this.classList.remove('animate-out');
    this.classList.add('animate-in');
    this.setAttribute('aria-hidden', 'false');

    // Announce to screen readers
    this.announceToScreenReader(message);
  }

  hide() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }

    this.classList.remove('animate-in');
    this.classList.add('animate-out');
    this.setAttribute('aria-hidden', 'true');
  }

  announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.classList.add('sr-only');
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  cleanup() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }
}

// Product Form Component
class ProductForm extends BloxManiaComponent {
  constructor() {
    super();
    this.form = null;
    this.submitButton = null;
    this.variantSelects = null;
    this.quantityInput = null;
    this.productId = null;
  }

  init() {
    this.form = this.querySelector('form');
    this.submitButton = this.querySelector('[type="submit"]');
    this.variantSelects = this.querySelectorAll('.product-form__input');
    this.quantityInput = this.querySelector('.quantity__input');
    this.productId = this.dataset.productId;

    this.bindEvents();
  }

  bindEvents() {
    this.form?.addEventListener('submit', (e) => this.handleSubmit(e));

    this.variantSelects.forEach((select) => {
      select.addEventListener('change', () => this.handleVariantChange());
    });

    this.quantityInput?.addEventListener('change', () =>
      this.handleQuantityChange()
    );
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (!this.validateForm()) return;

    this.setLoadingState(true);

    try {
      const formData = new FormData(this.form);
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Add to cart failed');

      const result = await response.json();
      this.handleSuccess(result);
    } catch (error) {
      this.handleError(error);
    } finally {
      this.setLoadingState(false);
    }
  }

  validateForm() {
    // Basic validation
    const requiredFields = this.form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false;
        field.classList.add('error');
      } else {
        field.classList.remove('error');
      }
    });

    return isValid;
  }

  setLoadingState(loading) {
    if (this.submitButton) {
      this.submitButton.disabled = loading;
      this.submitButton.textContent = loading ? 'Adding...' : 'Add to Cart';
    }
  }

  handleSuccess(result) {
    // Trigger cart update event
    document.dispatchEvent(
      new CustomEvent('cart:updated', {
        detail: { cart: result },
      })
    );

    // Show success notification
    const notification = document.querySelector('cart-notification');
    if (notification) {
      notification.show('Item added to cart successfully');
    }
  }

  handleError(error) {
    console.error('Add to cart error:', error);

    const notification = document.querySelector('cart-notification');
    if (notification) {
      notification.show('Failed to add item to cart', 'error');
    }
  }

  handleVariantChange() {
    // Handle variant selection changes
    const selectedOptions = Array.from(this.variantSelects).map(
      (select) => select.value
    );
    // Emit variant change event
    this.dispatchEvent(
      new CustomEvent('variant:change', {
        detail: { selectedOptions },
      })
    );
  }

  handleQuantityChange() {
    // Handle quantity changes
    const quantity = this.quantityInput?.value;
    if (quantity) {
      this.dispatchEvent(
        new CustomEvent('quantity:change', {
          detail: { quantity: parseInt(quantity) },
        })
      );
    }
  }
}

// Register all components
safeDefineCustomElement('modal-dialog', ModalDialog);
safeDefineCustomElement('search-modal', SearchModal);
safeDefineCustomElement('cart-notification', CartNotification);
safeDefineCustomElement('product-form', ProductForm);

// Export for use in other modules
window.BloxManiaComponents = {
  ModalDialog,
  SearchModal,
  CartNotification,
  ProductForm,
};



  // Bundle completion
  if (window.BloxMania && window.BloxMania.bundles && window.BloxMania.bundles[BUNDLE_NAME]) {
    window.BloxMania.bundles[BUNDLE_NAME].initialized = true;
  }

  console.log(`✅ ${BUNDLE_NAME} bundle loaded`);
})();