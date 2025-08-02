import React, { memo, useEffect } from "react";
import { createPortal } from "react-dom";

const MobileMenu = memo(({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const menuContent = (
    <div
      className="mobile-menu-overlay position-fixed top-0 start-0 w-100 h-100"
      style={{
        zIndex: 1055,
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      onClick={onClose}
    >
      <div
        className="mobile-menu-content position-fixed top-0 end-0 h-100 bg-white shadow-lg"
        style={{
          width: "280px",
          zIndex: 1056,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease-in-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          <h5 className="mb-0">Menu</h5>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={onClose}
            aria-label="Close menu"
          >
            <i className="fas fa-times" />
          </button>
        </div>
        <div className="p-3">{children}</div>
      </div>
    </div>
  );

  return createPortal(menuContent, document.body);
});

MobileMenu.displayName = "MobileMenu";

export default MobileMenu;
