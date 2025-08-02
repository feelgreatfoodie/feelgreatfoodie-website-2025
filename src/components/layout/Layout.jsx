import React, { memo } from "react";
import { Navigation } from "../navigation";
import { BackToTop } from "../ui";
import NotificationContainer from "../NotificationContainer";

const Layout = memo(({ children, navigationProps = {} }) => {
  const defaultNavItems = [
    { href: "#home", label: "Home", icon: "fas fa-home" },
    { href: "#story", label: "Our Story", icon: "fas fa-heart" },
    { href: "#recipes", label: "Recipes", icon: "fas fa-utensils" },
    { href: "#contact", label: "Contact", icon: "fas fa-envelope" },
  ];

  return (
    <div className="app-layout">
      {/* Navigation */}
      <Navigation
        brand="FeelGreatFoodie"
        navItems={defaultNavItems}
        {...navigationProps}
      />

      {/* Main Content */}
      <main id="main-content" className="main-content">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-dark text-light py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <h5 className="fw-bold mb-3">FeelGreatFoodie</h5>
              <p className="text-light opacity-75">
                Celebrating food, heritage, and community through authentic
                recipes passed down through generations.
              </p>
              <div className="social-links">
                <a
                  href="https://facebook.com/feelgreatfoodie"
                  className="text-light me-3"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook-f fa-lg" />
                </a>
                <a
                  href="https://instagram.com/feelgreatfoodie"
                  className="text-light me-3"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram fa-lg" />
                </a>
                <a
                  href="https://twitter.com/feelgreatfoodie"
                  className="text-light me-3"
                  aria-label="Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-twitter fa-lg" />
                </a>
                <a
                  href="https://youtube.com/feelgreatfoodie"
                  className="text-light me-3"
                  aria-label="YouTube"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-youtube fa-lg" />
                </a>
              </div>
            </div>

            <div className="col-lg-2 col-md-6">
              <h6 className="fw-bold mb-3">Quick Links</h6>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a
                    href="#home"
                    className="text-light opacity-75 text-decoration-none"
                  >
                    Home
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#recipes"
                    className="text-light opacity-75 text-decoration-none"
                  >
                    Recipes
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#story"
                    className="text-light opacity-75 text-decoration-none"
                  >
                    Our Story
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#contact"
                    className="text-light opacity-75 text-decoration-none"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6">
              <h6 className="fw-bold mb-3">Categories</h6>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a
                    href="#recipes"
                    className="text-light opacity-75 text-decoration-none"
                  >
                    Appetizers
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#recipes"
                    className="text-light opacity-75 text-decoration-none"
                  >
                    Main Courses
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#recipes"
                    className="text-light opacity-75 text-decoration-none"
                  >
                    Desserts
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#recipes"
                    className="text-light opacity-75 text-decoration-none"
                  >
                    Beverages
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-3">
              <h6 className="fw-bold mb-3">Newsletter</h6>
              <p className="text-light opacity-75 small mb-3">
                Subscribe to get weekly recipe updates and cooking tips.
              </p>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your email"
                  aria-label="Email for newsletter"
                />
                <button className="btn btn-primary" type="button">
                  <i className="fas fa-arrow-right" />
                </button>
              </div>
            </div>
          </div>

          <hr className="my-4 opacity-25" />

          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="text-light opacity-75 mb-0">
                © {new Date().getFullYear()} FeelGreatFoodie. All rights
                reserved.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <small className="text-light opacity-50">
                Made with <i className="fas fa-heart text-danger" /> for food
                lovers everywhere
              </small>
            </div>
          </div>
        </div>
      </footer>

      {/* UI Components */}
      <BackToTop />
      <NotificationContainer />
    </div>
  );
});

Layout.displayName = "Layout";

export default Layout;
