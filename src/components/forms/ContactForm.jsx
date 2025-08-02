import React, { useState } from "react";
import { useFormValidation } from "../../hooks/useFormValidation";
import { useNotifications } from "../../hooks/useNotifications";
import apiService from "../../services/api";
import analyticsService from "../../services/analytics";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showSuccess, showError } = useNotifications();

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
  } = useFormValidation({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const validationRules = {
    name: {
      required: true,
      minLength: 2,
    },
    email: {
      required: true,
      email: true,
    },
    subject: {
      required: true,
      minLength: 5,
    },
    message: {
      required: true,
      minLength: 10,
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm(validationRules)) {
      showError("Please fix the errors above");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await apiService.submitContactForm(formData);

      if (response.success) {
        showSuccess("Message sent successfully! We'll get back to you soon.");
        resetForm();
        analyticsService.trackFormSubmission("contact");
      } else {
        throw new Error(response.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      showError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="form-floating">
            <input
              type="text"
              className={`form-control ${
                errors.name && touched.name ? "is-invalid" : ""
              } ${
                values.name && !errors.name && touched.name ? "is-valid" : ""
              }`}
              id="contact-name"
              name="name"
              placeholder="Your Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              required
              aria-describedby={errors.name ? "contact-name-error" : undefined}
            />
            <label htmlFor="contact-name">Your Name</label>
            {errors.name && touched.name && (
              <div id="contact-name-error" className="invalid-feedback">
                {errors.name}
              </div>
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-floating">
            <input
              type="email"
              className={`form-control ${
                errors.email && touched.email ? "is-invalid" : ""
              } ${
                values.email && !errors.email && touched.email ? "is-valid" : ""
              }`}
              id="contact-email"
              name="email"
              placeholder="Your Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              required
              aria-describedby={
                errors.email ? "contact-email-error" : undefined
              }
            />
            <label htmlFor="contact-email">Your Email</label>
            {errors.email && touched.email && (
              <div id="contact-email-error" className="invalid-feedback">
                {errors.email}
              </div>
            )}
          </div>
        </div>

        <div className="col-12">
          <div className="form-floating">
            <input
              type="text"
              className={`form-control ${
                errors.subject && touched.subject ? "is-invalid" : ""
              } ${
                values.subject && !errors.subject && touched.subject
                  ? "is-valid"
                  : ""
              }`}
              id="contact-subject"
              name="subject"
              placeholder="Subject"
              value={values.subject}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              required
              aria-describedby={
                errors.subject ? "contact-subject-error" : undefined
              }
            />
            <label htmlFor="contact-subject">Subject</label>
            {errors.subject && touched.subject && (
              <div id="contact-subject-error" className="invalid-feedback">
                {errors.subject}
              </div>
            )}
          </div>
        </div>

        <div className="col-12">
          <div className="form-floating">
            <textarea
              className={`form-control ${
                errors.message && touched.message ? "is-invalid" : ""
              } ${
                values.message && !errors.message && touched.message
                  ? "is-valid"
                  : ""
              }`}
              id="contact-message"
              name="message"
              placeholder="Your Message"
              style={{ height: "120px" }}
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              required
              aria-describedby={
                errors.message ? "contact-message-error" : undefined
              }
            />
            <label htmlFor="contact-message">Your Message</label>
            {errors.message && touched.message && (
              <div id="contact-message-error" className="invalid-feedback">
                {errors.message}
              </div>
            )}
          </div>
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary btn-lg w-100"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                />
                Sending Message...
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane me-2" />
                Send Message
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
