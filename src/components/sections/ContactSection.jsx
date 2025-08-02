import React, { memo } from "react";
import ContactForm from "../forms/ContactForm";

const ContactSection = memo(
  ({
    title = "Get In Touch",
    subtitle = "We'd love to hear from you! Share your cooking stories, ask questions, or just say hello.",
    contactInfo = {
      email: "hello@feelgreatfoodie.com",
      phone: "+1 (555) 123-4567",
      address: "123 Culinary Street, Food City, FC 12345",
    },
    socialLinks = [
      { icon: "fab fa-facebook-f", href: "#", label: "Facebook" },
      { icon: "fab fa-instagram", href: "#", label: "Instagram" },
      { icon: "fab fa-twitter", href: "#", label: "Twitter" },
      { icon: "fab fa-youtube", href: "#", label: "YouTube" },
    ],
    className = "",
  }) => {
    return (
      <section id="contact" className={`py-5 bg-light ${className}`}>
        <div className="container">
          {/* Section Header */}
          <div className="row mb-5">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="display-4 fw-bold mb-3">{title}</h2>
              <p className="lead text-muted">{subtitle}</p>
            </div>
          </div>

          <div className="row g-5">
            {/* Contact Form */}
            <div className="col-lg-8">
              <div className="card shadow-sm border-0">
                <div className="card-body p-4 p-md-5">
                  <h4 className="card-title mb-4">
                    <i className="fas fa-envelope text-primary me-2" />
                    Send us a Message
                  </h4>
                  <ContactForm />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="col-lg-4">
              <div className="contact-info">
                {/* Contact Details */}
                <div className="card shadow-sm border-0 mb-4">
                  <div className="card-body p-4">
                    <h5 className="card-title mb-4">
                      <i className="fas fa-info-circle text-primary me-2" />
                      Contact Information
                    </h5>

                    <div className="contact-item mb-3">
                      <div className="d-flex align-items-center">
                        <div className="contact-icon me-3">
                          <i className="fas fa-envelope text-primary" />
                        </div>
                        <div>
                          <small className="text-muted d-block">Email</small>
                          <a
                            href={`mailto:${contactInfo.email}`}
                            className="text-decoration-none"
                          >
                            {contactInfo.email}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="contact-item mb-3">
                      <div className="d-flex align-items-center">
                        <div className="contact-icon me-3">
                          <i className="fas fa-phone text-primary" />
                        </div>
                        <div>
                          <small className="text-muted d-block">Phone</small>
                          <a
                            href={`tel:${contactInfo.phone}`}
                            className="text-decoration-none"
                          >
                            {contactInfo.phone}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="contact-item">
                      <div className="d-flex align-items-start">
                        <div className="contact-icon me-3 mt-1">
                          <i className="fas fa-map-marker-alt text-primary" />
                        </div>
                        <div>
                          <small className="text-muted d-block">Address</small>
                          <address className="mb-0">
                            {contactInfo.address}
                          </address>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="card shadow-sm border-0">
                  <div className="card-body p-4">
                    <h5 className="card-title mb-4">
                      <i className="fas fa-share-alt text-primary me-2" />
                      Follow Us
                    </h5>

                    <div className="social-links">
                      <div className="row g-2">
                        {socialLinks.map((social, index) => (
                          <div key={index} className="col-6">
                            <a
                              href={social.href}
                              className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={social.label}
                            >
                              <i className={`${social.icon} me-2`} />
                              {social.label}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <small className="text-muted">
                        Join our community for daily recipe inspiration!
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="card shadow-sm border-0">
                <div className="card-body p-4 p-md-5">
                  <h4 className="card-title mb-4 text-center">
                    <i className="fas fa-question-circle text-primary me-2" />
                    Frequently Asked Questions
                  </h4>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="faq-item mb-4">
                        <h6 className="fw-bold">
                          How often do you publish new recipes?
                        </h6>
                        <p className="text-muted mb-0">
                          We publish new recipes every Tuesday and Friday,
                          featuring seasonal ingredients and family favorites.
                        </p>
                      </div>

                      <div className="faq-item mb-4">
                        <h6 className="fw-bold">
                          Can I submit my family recipes?
                        </h6>
                        <p className="text-muted mb-0">
                          Absolutely! We love featuring recipes from our
                          community. Use the contact form above to share your
                          culinary treasures.
                        </p>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="faq-item mb-4">
                        <h6 className="fw-bold">
                          Do you offer cooking classes?
                        </h6>
                        <p className="text-muted mb-0">
                          Yes! We host virtual cooking classes monthly.
                          Subscribe to our newsletter to get notified about
                          upcoming sessions.
                        </p>
                      </div>

                      <div className="faq-item mb-4">
                        <h6 className="fw-bold">
                          How can I get cooking tips and tricks?
                        </h6>
                        <p className="text-muted mb-0">
                          Follow us on social media and subscribe to our
                          newsletter for weekly cooking tips, ingredient
                          spotlights, and technique tutorials.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

ContactSection.displayName = "ContactSection";

export default ContactSection;
