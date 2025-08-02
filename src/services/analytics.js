import { CONFIG } from "../config";

class AnalyticsService {
  constructor() {
    this.enabled =
      CONFIG.analytics.enabled &&
      typeof window !== "undefined" &&
      typeof window.gtag !== "undefined";
    this.sessionStartTime = Date.now();
  }

  init() {
    if (!this.enabled) return;

    // Initialize analytics
    if (typeof window.gtag !== "undefined" && CONFIG.analytics.gaId) {
      window.gtag("config", CONFIG.analytics.gaId, {
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }

  trackEvent(eventName, parameters = {}) {
    if (!this.enabled) {
      // Log in development
      if (process.env.NODE_ENV === "development") {
        console.log(`Analytics Event: ${eventName}`, parameters);
      }
      return;
    }

    try {
      if (typeof window.gtag !== "undefined") {
        window.gtag("event", eventName, {
          custom_map: { dimension1: "feelgreatfoodie" },
          ...parameters,
        });
      }
    } catch (error) {
      console.error("Analytics tracking error:", error);
    }
  }

  trackPageView(path) {
    this.trackEvent("page_view", { page_path: path });
  }

  trackFormSubmission(formType) {
    this.trackEvent("form_submit", { form_type: formType });
  }

  trackRecipeInteraction(action, recipeId) {
    this.trackEvent("recipe_interaction", {
      action,
      recipe_id: recipeId,
    });
  }

  trackSearch(query, resultCount) {
    this.trackEvent("search", {
      search_term: query,
      result_count: resultCount,
    });
  }

  getSessionDuration() {
    return Date.now() - this.sessionStartTime;
  }
}

// Create and export instance
const analyticsService = new AnalyticsService();
export default analyticsService;
