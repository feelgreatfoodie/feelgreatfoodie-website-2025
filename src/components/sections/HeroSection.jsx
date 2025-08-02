import React, { memo } from "react";
import NewsletterForm from "../forms/NewsletterForm";

const HeroSection = memo(
  ({
    title = "FeelGreatFoodie",
    subtitle = "Where Heritage Meets Flavor",
    description = "Discover authentic recipes passed down through generations, bringing families together one meal at a time.",
    backgroundImage,
    className = "",
    showNewsletter = true,
  }) => {
    return (
      <section
        id="home"
        className={`hero-section min-vh-100 d-flex align-items-center position-relative ${className}`}
        style={{
          backgroundImage: backgroundImage
            ? `url(${backgroundImage})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay for better text readability */}
        {backgroundImage && (
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              backgroundColor: "rgba(0,0,0,0.4)",
              zIndex: 1,
            }}
          />
        )}

        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center min-vh-100">
            <div className="col-lg-8 mx-auto text-center text-white">
              {/* Main Heading */}
              <h1 className="display-2 fw-bold mb-4 animate-fade-in-up">
                {title}
              </h1>

              {/* Subtitle */}
              <h2 className="display-6 mb-4 text-warning animate-fade-in-up animation-delay-200">
                {subtitle}
              </h2>

              {/* Description */}
              <p className="lead mb-5 animate-fade-in-up animation-delay-400">
                {description}
              </p>

              {/* CTA Buttons */}
              <div className="hero-buttons mb-5 animate-fade-in-up animation-delay-600">
                <a href="#recipes" className="btn btn-primary btn-lg me-3 mb-3">
                  <i className="fas fa-utensils me-2" />
                  Explore Recipes
                </a>
                <a href="#story" className="btn btn-outline-light btn-lg mb-3">
                  <i className="fas fa-heart me-2" />
                  Our Story
                </a>
              </div>

              {/* Newsletter Signup */}
              {showNewsletter && (
                <div className="hero-newsletter animate-fade-in-up animation-delay-800">
                  <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                      <h5 className="mb-3">Join Our Culinary Family</h5>
                      <NewsletterForm className="hero-newsletter-form" />
                      <small className="text-light opacity-75 mt-2 d-block">
                        Get weekly recipe updates and cooking tips
                      </small>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4">
            <a
              href="#story"
              className="text-white text-decoration-none animate-bounce"
              aria-label="Scroll down to story section"
            >
              <i className="fas fa-chevron-down fa-2x" />
            </a>
          </div>
        </div>
      </section>
    );
  }
);

HeroSection.displayName = "HeroSection";

export default HeroSection;
