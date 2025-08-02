import React, { useState } from "react";
import { useFormValidation } from "../../hooks/useFormValidation";
import { useNotifications } from "../../hooks/useNotifications";
import apiService from "../../services/api";
import localStorageService from "../../services/localStorage";
import analyticsService from "../../services/analytics";

const NewsletterForm = ({ className = "" }) => {
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
    email: "",
  });

  const validationRules = {
    email: {
      required: true,
      email: true,
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
      const response = await apiService.submitNewsletter(values.email);

      if (response.success) {
        showSuccess("Welcome to our culinary family! 🍴");
        localStorageService.setNewsletterStatus("subscribed");
        resetForm();
        analyticsService.trackFormSubmission("newsletter");
      } else {
        throw new Error(response.message || "Subscription failed");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      showError("Subscription failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className={`newsletter-form ${className}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="row g-2">
        <div className="col-md-8">
          <div className="form-floating">
            <input
              type="email"
              className={`form-control ${
                errors.email && touched.email ? "is-invalid" : ""
              } ${
                values.email && !errors.email && touched.email ? "is-valid" : ""
              }`}
              id="newsletter-email"
              name="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              required
              aria-describedby={
                errors.email ? "newsletter-email-error" : undefined
              }
            />
            <label htmlFor="newsletter-email">Your Email Address</label>
            {errors.email && touched.email && (
              <div id="newsletter-email-error" className="invalid-feedback">
                {errors.email}
              </div>
            )}
          </div>
        </div>
        <div className="col-md-4">
          <button
            type="submit"
            className="btn btn-primary h-100 w-100"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                />
                Subscribing...
              </>
            ) : (
              <>
                <i className="fas fa-envelope me-2" />
                Subscribe
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewsletterForm;
