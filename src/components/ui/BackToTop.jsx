import React, { useState, useEffect, memo } from "react";
import { throttle } from "../../utils";
import analyticsService from "../../services/analytics";

const BackToTop = memo(({ threshold = 300, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsVisible(window.pageYOffset > threshold);
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    analyticsService.trackEvent("back_to_top_click");
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      className={`btn btn-primary back-to-top position-fixed ${className}`}
      onClick={scrollToTop}
      aria-label="Back to top"
      style={{
        bottom: "2rem",
        right: "2rem",
        zIndex: 1050,
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        transition: "all 0.3s ease",
      }}
    >
      <i className="fas fa-arrow-up" />
    </button>
  );
});

BackToTop.displayName = "BackToTop";

export default BackToTop;
