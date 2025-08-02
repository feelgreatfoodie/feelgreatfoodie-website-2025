// Performance monitoring service
class PerformanceService {
  constructor() {
    this.metrics = {
      loadTime: 0,
      firstPaint: 0,
      firstContentfulPaint: 0,
      largestContentfulPaint: 0,
      firstInputDelay: 0,
      cumulativeLayoutShift: 0,
    };

    this.observers = [];
    this.init();
  }

  init() {
    if (typeof window === "undefined") return;

    // Monitor page load performance
    window.addEventListener("load", () => {
      this.measureLoadTime();
      this.measurePaintMetrics();
      this.measureLCP();
      this.measureFID();
      this.measureCLS();

      // Report metrics after a delay to ensure all measurements are complete
      setTimeout(() => {
        this.reportMetrics();
        if (process.env.NODE_ENV === "development") {
          this.logMetrics();
        }
      }, 3000);
    });
  }

  measureLoadTime() {
    if (performance.timing) {
      this.metrics.loadTime =
        performance.timing.loadEventEnd - performance.timing.navigationStart;
    }
  }

  measurePaintMetrics() {
    if (performance.getEntriesByType) {
      const paintEntries = performance.getEntriesByType("paint");
      paintEntries.forEach((entry) => {
        if (entry.name === "first-paint") {
          this.metrics.firstPaint = entry.startTime;
        } else if (entry.name === "first-contentful-paint") {
          this.metrics.firstContentfulPaint = entry.startTime;
        }
      });
    }
  }

  measureLCP() {
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.largestContentfulPaint = lastEntry.startTime;
      });

      try {
        observer.observe({ entryTypes: ["largest-contentful-paint"] });
        this.observers.push(observer);
      } catch (e) {
        // LCP not supported
      }
    }
  }

  measureFID() {
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === "first-input") {
            this.metrics.firstInputDelay =
              entry.processingStart - entry.startTime;
            break;
          }
        }
      });

      try {
        observer.observe({ entryTypes: ["first-input"] });
        this.observers.push(observer);
      } catch (e) {
        // FID not supported
      }
    }
  }

  measureCLS() {
    if ("PerformanceObserver" in window) {
      let clsValue = 0;
      let clsEntries = [];

      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            const firstSessionEntry = clsEntries[0];
            const lastSessionEntry = clsEntries[clsEntries.length - 1];

            if (
              clsEntries.length === 0 ||
              (entry.startTime - lastSessionEntry.startTime < 1000 &&
                entry.startTime - firstSessionEntry.startTime < 5000)
            ) {
              clsEntries.push(entry);
              clsValue += entry.value;
            } else {
              clsEntries = [entry];
              clsValue = entry.value;
            }

            this.metrics.cumulativeLayoutShift = Math.max(
              this.metrics.cumulativeLayoutShift,
              clsValue
            );
          }
        }
      });

      try {
        observer.observe({ entryTypes: ["layout-shift"] });
        this.observers.push(observer);
      } catch (e) {
        // CLS not supported
      }
    }
  }

  getMetrics() {
    return { ...this.metrics };
  }

  logMetrics() {
    console.group("🚀 Performance Metrics");
    console.table(this.metrics);
    console.groupEnd();

    // Performance warnings
    if (this.metrics.largestContentfulPaint > 2500) {
      console.warn(
        "⚠️ LCP is above 2.5s - consider optimizing images and critical resources"
      );
    }
    if (this.metrics.firstInputDelay > 100) {
      console.warn(
        "⚠️ FID is above 100ms - consider optimizing JavaScript execution"
      );
    }
    if (this.metrics.cumulativeLayoutShift > 0.1) {
      console.warn(
        "⚠️ CLS is above 0.1 - consider setting dimensions for images and ads"
      );
    }
  }

  reportMetrics() {
    // Report to analytics service if gtag is available
    if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
      Object.entries(this.metrics).forEach(([key, value]) => {
        if (value > 0) {
          window.gtag("event", "timing_complete", {
            name: key,
            value: Math.round(value),
          });
        }
      });
    }
  }

  cleanup() {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
  }
}

// Create and export instance
const performanceService = new PerformanceService();

export default performanceService;

// Cleanup on page unload
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    performanceService.cleanup();
  });
}
