import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Import custom CSS
import "./styles/index.css";

// Import Bootstrap JS (for interactive components)
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Performance monitoring
import "./services/performance";

// Error boundary for production
import ErrorBoundary from "./components/ErrorBoundary";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// Service worker registration
if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

// Web vitals reporting
if (process.env.NODE_ENV === "production") {
  import("./services/reportWebVitals").then(({ default: reportWebVitals }) => {
    reportWebVitals(console.log);
  });
}
