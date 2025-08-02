import React, { memo } from "react";

const LoadingSpinner = memo(
  ({
    size = "md",
    color = "primary",
    text = "Loading...",
    showText = true,
    className = "",
  }) => {
    const sizeClasses = {
      sm: "spinner-border-sm",
      md: "",
      lg: "spinner-border-lg",
    };

    return (
      <div
        className={`d-flex align-items-center justify-content-center ${className}`}
      >
        <div
          className={`spinner-border text-${color} ${sizeClasses[size]}`}
          role="status"
          aria-hidden={!showText}
        >
          <span className="visually-hidden">{text}</span>
        </div>
        {showText && <span className="ms-2">{text}</span>}
      </div>
    );
  }
);

LoadingSpinner.displayName = "LoadingSpinner";

export default LoadingSpinner;
