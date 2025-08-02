export const CONFIG = {
  breakpoints: {
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1400,
  },
  apiEndpoints: {
    newsletter: "/api/newsletter",
    contact: "/api/contact",
    recipes: "/api/recipes",
  },
  storage: {
    favorites: "fgf_favorites",
    newsletter: "fgf_newsletter_status",
    theme: "fgf_theme_preference",
  },
  analytics: {
    enabled: process.env.NODE_ENV === "production",
    gaId: process.env.REACT_APP_GA_ID,
  },
};

export const NOTIFICATION_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};
