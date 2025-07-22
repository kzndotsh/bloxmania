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
    // Monitor critical resources - use proper Shopify CDN paths
    const criticalResources = [
      '/cdn/shop/t/17/assets/style-base.css',
      '/cdn/shop/t/17/assets/core.bundle.js',
      '/cdn/shop/t/17/assets/core-init.js',
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
