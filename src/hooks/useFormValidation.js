import { useState, useCallback, useRef } from 'react';
import { isValidEmail, isValidPhone } from '../utils';

export const useFormValidation = (initialValues = {}, options = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);
  const validationRulesRef = useRef({});

  // Configuration options
  const config = {
    validateOnChange: options.validateOnChange ?? true,
    validateOnBlur: options.validateOnBlur ?? true,
    revalidateOnChange: options.revalidateOnChange ?? true,
    focusOnError: options.focusOnError ?? true,
    ...options
  };

  /**
   * Validate a single field
   */
  const validateField = useCallback((name, value, rules = {}) => {
    let error = '';

    // Get the actual value to validate
    const fieldValue = value !== undefined ? value : values[name];
    const fieldRules = rules || validationRulesRef.current[name] || {};

    // Skip validation if field is disabled
    if (fieldRules.disabled) {
      return '';
    }

    // Required validation
    if (fieldRules.required && (!fieldValue || (typeof fieldValue === 'string' && !fieldValue.trim()))) {
      error = fieldRules.requiredMessage || 'This field is required';
    }
    // Email validation
    else if (fieldRules.email && fieldValue && !isValidEmail(fieldValue)) {
      error = fieldRules.emailMessage || 'Please enter a valid email address';
    }
    // Phone validation
    else if (fieldRules.phone && fieldValue && !isValidPhone(fieldValue)) {
      error = fieldRules.phoneMessage || 'Please enter a valid phone number';
    }
    // Min length validation
    else if (fieldRules.minLength && fieldValue && fieldValue.length < fieldRules.minLength) {
      error = fieldRules.minLengthMessage || `Minimum ${fieldRules.minLength} characters required`;
    }
    // Max length validation
    else if (fieldRules.maxLength && fieldValue && fieldValue.length > fieldRules.maxLength) {
      error = fieldRules.maxLengthMessage || `Maximum ${fieldRules.maxLength} characters allowed`;
    }
    // Min value validation (for numbers)
    else if (fieldRules.min !== undefined && fieldValue !== undefined && Number(fieldValue) < fieldRules.min) {
      error = fieldRules.minMessage || `Value must be at least ${fieldRules.min}`;
    }
    // Max value validation (for numbers)
    else if (fieldRules.max !== undefined && fieldValue !== undefined && Number(fieldValue) > fieldRules.max) {
      error = fieldRules.maxMessage || `Value must be at most ${fieldRules.max}`;
    }
    // Pattern validation (regex)
    else if (fieldRules.pattern && fieldValue && !fieldRules.pattern.test(fieldValue)) {
      error = fieldRules.patternMessage || 'Invalid format';
    }
    // Custom validation function
    else if (fieldRules.validate && typeof fieldRules.validate === 'function') {
      const customError = fieldRules.validate(fieldValue, values);
      if (customError) {
        error = typeof customError === 'string' ? customError : 'Invalid value';
      }
    }
    // Custom async validation
    else if (fieldRules.asyncValidate && typeof fieldRules.asyncValidate === 'function') {
      // Note: This is a simplified async validation - in practice, you might want to debounce this
      fieldRules.asyncValidate(fieldValue, values)
        .then(asyncError => {
          if (asyncError) {
            setErrors(prev => ({ ...prev, [name]: asyncError }));
          }
        })
        .catch(err => {
          console.error('Async validation error:', err);
        });
    }

    return error;
  }, [values]);

  /**
   * Set a single field value
   */
  const setValue = useCallback((name, value) => {
    setValues(prev => {
      const newValues = { ...prev, [name]: value };
      
      // Validate on change if enabled and field has been touched or submitted
      if (config.validateOnChange && (touched[name] || submitCount > 0) && config.revalidateOnChange) {
        const error = validateField(name, value);
        setErrors(prevErrors => ({
          ...prevErrors,
          [name]: error
        }));
      }
      
      return newValues;
    });
  }, [validateField, touched, submitCount, config.validateOnChange, config.revalidateOnChange]);

  /**
   * Set multiple field values
   */
  const setValues = useCallback((newValues) => {
    if (typeof newValues === 'function') {
      setValues(prev => {
        const updatedValues = newValues(prev);
        return updatedValues;
      });
    } else {
      setValues(newValues);
    }
  }, []);

  /**
   * Set error for a specific field
   */
  const setError = useCallback((name, error) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  /**
   * Set multiple errors
   */
  const setErrors = useCallback((newErrors) => {
    if (typeof newErrors === 'function') {
      setErrors(prev => newErrors(prev));
    } else {
      setErrors(newErrors);
    }
  }, []);

  /**
   * Set touched state for a field
   */
  const setFieldTouched = useCallback((name, isTouched = true) => {
    setTouched(prev => ({ ...prev, [name]: isTouched }));
  }, []);

  /**
   * Set multiple touched states
   */
  const setTouched = useCallback((newTouched) => {
    if (typeof newTouched === 'function') {
      setTouched(prev => newTouched(prev));
    } else {
      setTouched(newTouched);
    }
  }, []);

  /**
   * Validate entire form
   */
  const validateForm = useCallback((validationRules) => {
    if (validationRules) {
      validationRulesRef.current = validationRules;
    }

    const rulesToUse = validationRules || validationRulesRef.current;
    const newErrors = {};
    let isValid = true;
    let firstErrorField = null;

    // Validate all fields that have rules
    Object.keys(rulesToUse).forEach(fieldName => {
      const fieldValue = values[fieldName];
      const fieldRules = rulesToUse[fieldName];
      const error = validateField(fieldName, fieldValue, fieldRules);
      
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
        
        // Track first error field for focus management
        if (!firstErrorField) {
          firstErrorField = fieldName;
        }
      }
    });

    // Also validate fields that have values but no explicit rules (basic validation)
    Object.keys(values).forEach(fieldName => {
      if (!rulesToUse[fieldName] && values[fieldName]) {
        // Apply basic validation for common field types
        if (fieldName.toLowerCase().includes('email')) {
          const error = validateField(fieldName, values[fieldName], { email: true });
          if (error) {
            newErrors[fieldName] = error;
            isValid = false;
            if (!firstErrorField) firstErrorField = fieldName;
          }
        }
      }
    });

    setErrors(newErrors);

    // Focus on first error field if enabled
    if (!isValid && config.focusOnError && firstErrorField) {
      setTimeout(() => {
        const element = document.querySelector(`[name="${firstErrorField}"]`) || 
                        document.getElementById(firstErrorField);
        if (element && element.focus) {
          element.focus();
        }
      }, 100);
    }

    return isValid;
  }, [values, validateField, config.focusOnError]);

  /**
   * Validate specific fields
   */
  const validateFields = useCallback((fieldNames, validationRules) => {
    const rulesToUse = validationRules || validationRulesRef.current;
    const newErrors = { ...errors };
    let isValid = true;

    fieldNames.forEach(fieldName => {
      const fieldValue = values[fieldName];
      const fieldRules = rulesToUse[fieldName];
      const error = validateField(fieldName, fieldValue, fieldRules);
      
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      } else {
        delete newErrors[fieldName];
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [errors, values, validateField]);

  /**
   * Reset form to initial state
   */
  const resetForm = useCallback((newInitialValues) => {
    const valuesToReset = newInitialValues || initialValues;
    setValues(valuesToReset);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setSubmitCount(0);
    validationRulesRef.current = {};
  }, [initialValues]);

  /**
   * Reset only validation state (keep values)
   */
  const resetValidation = useCallback(() => {
    setErrors({});
    setTouched({});
    setSubmitCount(0);
  }, []);

  /**
   * Clear specific field
   */
  const clearField = useCallback((name) => {
    setValues(prev => ({ ...prev, [name]: '' }));
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
    setTouched(prev => {
      const newTouched = { ...prev };
      delete newTouched[name];
      return newTouched;
    });
  }, []);

  /**
   * Handle input change events
   */
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setValue(name, fieldValue);
  }, [setValue]);

  /**
   * Handle input blur events
   */
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setFieldTouched(name, true);
    
    // Validate on blur if enabled
    if (config.validateOnBlur) {
      const error = validateField(name, values[name]);
      if (error !== errors[name]) {
        setError(name, error);
      }
    }
  }, [setFieldTouched, config.validateOnBlur, validateField, values, errors, setError]);

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback((onSubmit, validationRules) => {
    return (e) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }

      setSubmitCount(prev => prev + 1);
      
      // Mark all fields as touched
      const allFieldNames = Object.keys(validationRules || validationRulesRef.current);
      const touchedState = {};
      allFieldNames.forEach(name => {
        touchedState[name] = true;
      });
      setTouched(prev => ({ ...prev, ...touchedState }));

      // Validate form
      const isValid = validateForm(validationRules);
      
      if (isValid && onSubmit) {
        setIsSubmitting(true);
        
        try {
          // Handle both sync and async submit functions
          const result = onSubmit(values, { setError, setErrors, resetForm });
          
          if (result && typeof result.then === 'function') {
            // Async submission
            return result
              .finally(() => {
                setIsSubmitting(false);
              });
          } else {
            // Sync submission
            setIsSubmitting(false);
            return result;
          }
        } catch (error) {
          setIsSubmitting(false);
          console.error('Form submission error:', error);
          throw error;
        }
      }
      
      return Promise.resolve(false);
    };
  }, [validateForm, values, resetForm]);

  /**
   * Get field props for easy integration with form inputs
   */
  const getFieldProps = useCallback((name, validationRules) => {
    if (validationRules) {
      validationRulesRef.current[name] = validationRules;
    }

    return {
      name,
      value: values[name] || '',
      onChange: handleChange,
      onBlur: handleBlur,
      'aria-invalid': !!errors[name],
      'aria-describedby': errors[name] ? `${name}-error` : undefined
    };
  }, [values, handleChange, handleBlur, errors]);

  /**
   * Get field state information
   */
  const getFieldState = useCallback((name) => {
    return {
      value: values[name],
      error: errors[name],
      touched: touched[name],
      valid: !errors[name] && touched[name],
      invalid: !!errors[name] && touched[name]
    };
  }, [values, errors, touched]);

  /**
   * Check if form is valid
   */
  const isValid = Object.keys(errors).length === 0;

  /**
   * Check if form is pristine (unchanged from initial values)
   */
  const isPristine = useCallback(() => {
    return JSON.stringify(values) === JSON.stringify(initialValues);
  }, [values, initialValues]);

  /**
   * Check if form is dirty (changed from initial values)
   */
  const isDirty = !isPristine();

  /**
   * Get form state summary
   */
  const formState = {
    isValid,
    isDirty,
    isPristine: !isDirty,
    isSubmitting,
    submitCount,
    errorCount: Object.keys(errors).length,
    touchedCount: Object.keys(touched).length
  };

  return {
    // Form state
    values,
    errors,
    touched,
    isSubmitting,
    submitCount,
    formState,
    
    // Field state checkers
    isValid,
    isDirty,
    isPristine,
    
    // Setters
    setValue,
    setValues,
    setError,
    setErrors,
    setFieldTouched,
    setTouched,
    setIsSubmitting,
    
    // Validation
    validateField,
    validateForm,
    validateFields,
    
    // Form actions
    resetForm,
    resetValidation,
    clearField,
    
    // Event handlers
    handleChange,
    handleBlur,
    handleSubmit,
    
    // Helper functions
    getFieldProps,
    getFieldState
  };
};

export default useFormValidation;