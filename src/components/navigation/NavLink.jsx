import React, { memo } from "react";
import { scrollToElement } from "../../utils";

const NavLink = memo(
  ({
    href,
    children,
    isActive = false,
    onClick,
    className = "",
    external = false,
    ...props
  }) => {
    const handleClick = (e) => {
      if (onClick) {
        onClick(e);
      }

      // Handle internal anchor links
      if (href?.startsWith("#") && !external) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          scrollToElement(targetElement, 80);

          // Update URL without page reload
          if (window.history.pushState) {
            window.history.pushState(null, null, href);
          }
        }
      }
    };

    return (
      <a
        href={href}
        className={`nav-link ${isActive ? "active" : ""} ${className}`}
        onClick={handleClick}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }
);

NavLink.displayName = "NavLink";

export default NavLink;
