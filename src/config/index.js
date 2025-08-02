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
    enabled: process.env.REACT_APP_ENABLE_ANALYTICS === "true",
    gaId: process.env.REACT_APP_GA_ID || "G-T1H56HWSF3",
  },
  design: {
    colors: {
      antiqueWhite: "#F4F1DE",
      terraCotta: "#E07A5F",
      deepSlateBlue: "#3D405B",
      mutedSageGreen: "#81B29A",
      textDark: "#2C2C2C",
      textLight: "#6B6B6B",
    },
    fonts: {
      heading: '"Playfair Display", serif',
      script: '"Dancing Script", cursive',
      body: '"Crimson Text", serif',
    },
    shadows: {
      vintage: "0 4px 8px rgba(61, 64, 91, 0.15)",
      card: "0 2px 12px rgba(0,0,0,0.1)",
    },
  },
};

export const NOTIFICATION_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};
