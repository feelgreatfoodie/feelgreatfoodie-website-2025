import React, { useState, useEffect, memo } from "react";
import NavLink from "./NavLink";
import MobileMenu from "./MobileMenu";
import { throttle } from "../../utils";

const Navigation = memo(({ brand, navItems = [], className = "" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.pageYOffset > 50);
    }, 16);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for active section detection
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-20% 0px -70% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = (e) => {
    closeMenu();
  };

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg fixed-top ${
          isScrolled ? "navbar-scrolled shadow-sm" : ""
        } ${className}`}
        id="mainNav"
      >
        <div className="container">
          {/* Brand */}
          <NavLink
            href="#home"
            className="navbar-brand fw-bold text-decoration-none"
            onClick={closeMenu}
          >
            {brand || "FeelGreatFoodie"}
          </NavLink>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={toggleMenu}
            aria-controls="navbarNav"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`} />
          </button>

          {/* Desktop Navigation */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {navItems.map((item, index) => (
                <li key={index} className="nav-item">
                  <NavLink
                    href={item.href}
                    isActive={activeSection === item.href?.substring(1)}
                    onClick={handleNavClick}
                    external={item.external}
                    className={item.className}
                  >
                    {item.icon && <i className={`${item.icon} me-2`} />}
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu}>
        <ul className="list-unstyled">
          {navItems.map((item, index) => (
            <li key={index} className="mb-3">
              <NavLink
                href={item.href}
                isActive={activeSection === item.href?.substring(1)}
                onClick={handleNavClick}
                external={item.external}
                className="d-block py-2 text-decoration-none"
              >
                {item.icon && <i className={`${item.icon} me-3`} />}
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </MobileMenu>
    </>
  );
});

Navigation.displayName = "Navigation";

export default Navigation;
