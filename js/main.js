/**
 * FeelGreatFoodie - Main JavaScript Controller
 * Handles core functionality, navigation, forms, and user interactions
 */

class FeelGreatFoodie {
    constructor() {
        this.config = {
            breakpoints: {
                xs: 576,
                sm: 768,
                md: 992,
                lg: 1200,
                xl: 1400
            },
            apiEndpoints: {
                newsletter: '/api/newsletter',
                contact: '/api/contact',
                recipes: '/api/recipes'
            },
            storage: {
                favorites: 'fgf_favorites',
                newsletter: 'fgf_newsletter_status',
                theme: 'fgf_theme_preference'
            }
        };

        this.state = {
            currentSection: 'home',
            favorites: this.loadFavorites(),
            isMenuOpen: false,
            scrollDirection: 'down',
            lastScrollTop: 0,
            isLoading: false
        };

        this.init();
    }

    /**
     * Initialize Application
     */
    init() {
        this.setupEventListeners();
        this.initializeNavigation();
        this.setupSmoothScrolling();
        this.initializeForms();
        this.setupSearchFunctionality();
        this.initializeLocalStorage();
        this.setupResponsiveHandling();
        this.initializeServiceWorker();
        this.setupAnalytics();
        this.handleUrlParameters();
        
        // Mark as initialized
        document.body.classList.add('fgf-initialized');
        this.logWelcomeMessage();
    }

    /**
     * Event Listeners Setup
     */
    setupEventListeners() {
        // Window events
        window.addEventListener('load', () => this.handlePageLoad());
        window.addEventListener('resize', this.debounce(() => this.handleResize(), 250));
        window.addEventListener('scroll', this.throttle(() => this.handleScroll(), 16));
        window.addEventListener('beforeunload', () => this.handlePageUnload());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Click delegation
        document.addEventListener('click', (e) => this.handleGlobalClick(e));

        // Form events##
        document.addEventListener('submit', (e) => this.handleFormSubmission(e)); js/main.js

```javascript
/**
 * 

        // Custom events
        document.addEventListener('recFeelGreatFoodie - Maindocument.body.style.overflow = 'hidden';
        } else {Connectivity();
        this.initializeAnalytics();
        
            navCollapse.classList.remove('show');
            togglerIcon.classList.replace('fa-times', 'fa-bars');
            document.body.style.overflow = '';
        // Initialize after DOM is fully loaded
        ifremove('active');
            }
        });
    }

    /**
     * Smooth Scrolling
     */
    setupSmoothScrolling() {
        // {
                this.handleFormSubmission(e);
            }
         Enhanced smooth scrolling with easing
        this.smooth});

        // Click events delegation
        document.addEventListener('click', (e) => {
            thisScrollLinks = document.querySelectorAll('.handleGlobalClicks(e);
        });
    }

    /**
     * Navigation SystemcurrentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime mobileMenu) {
            mobileToggle.addEventListener('click',;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutCub () => {
                this.toggleMobileMenu();
            }); {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        d);
                }
            });
        }, {
            threshold: [ (!contactForm) return;

        const inputs.setupNewsletterForm();
        this. = contactForm.querySelectorAll('input:not([type="submit"]), textarea');
        setupFormValidation();
    }

    setupContactForm() {
        const contactForm = document.querySelector('#
        inputs.forEach(input => {
            input.addEventListener('input',';
        setTimeout(() => {
            indicator.style.display = 'none';
        }, 2000);
    }

    /**
     * Form Submission submitBtn = form.querySelector('button[type="submit"]');
                const Handling
     */
    handleFormSubmission(e) {
        const email = emailInput.value.trim();
                
                if (!this.isValidEmail(email)) { form = e.target;
        if (!form.matches
                    this.showNotification('Please enter a valid email address',('form')) return;

        e.preventDefault();

        // Validate 'error');
                    emailInput.classList entire form
        const isValid = this.validateForm(form.add('is-invalid');
                    return;
                }
                
                try {
                    this.setButton);
        if (!isValid) {
            thisLoading(submitBtn, 'Subscribing...');
                    
                    const response = await this.subsc.showNotification('Please fix the errors above', 'error');
            return;
        }

        // Handle different form types
        if (form.ribeNewsletter(email);
                    
                    if (response.success) {
                        this.showNotification('WelcomeclassList.contains('newsletter-form')) {
            this.handleNewsletter to our culinary family! 🍴', 'Submission(form);
        } else if (form.classList.contains('contactsuccess');
                        this.saveNewsletterSubscription(email);
                        form-form')) {
            this.handleContactSubmission(form);.reset();
                        emailInput.classList.remove('is
        } else if (form.classList.contains('recipe-search-form')) {
            this.handle-invalid');
                        
                        // TrackRecipeSearch(form);
        }
    }

    validateForm(form) {
        const conversion
                        this.trackEvent('newsletter_subscribe', { email_domain: email.split('@')[1] }); fields = form.querySelectorAll('input[required], textarea
                        
                    } else {
                        throw new Error(response.message || '[required], select[required]');
        let isValid = true;Subscription failed');
                    }
                    
                } catch (error

        fields.forEach(field => {
            if (!this) {
                    console.error('Newsletter subscription.validateField(field)) {
                isValid = false;
             error:', error);
                    this.showNotification('}
        });

        return isValid;
    }

    asyncSubscription failed. Please try again.', 'error');
                } finally handleNewsletterSubmission(form) {
        const {
                    this.setButtonLoading(submitBtn, 'Subscribe', false);
                }
            });
        });
    } submitBtn = form.querySelector('button[

    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        
        formstype="submit"]');
        const.forEach(form => {
             emailInput = form.querySelector('input[type="email"]');
        
        thisconst inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                input.setLoadingState(submitBtn, .addEventListener('blur', () => {
                    this.validateField(input);
                });
                
                input.addEventListener('input', () => {
                'Subscribing...');

        try {
            const response = await this.submitNewsletter(email    if (input.classList.contains('is-invalid')) {
                        this.validateField(Input.value);
            
            if (response.success) {input);
                    }
                });
            });
        });
    }

    validateField(field) {
        const value
                this.showNotification('Welcome to our culinary family = field.value.trim();
        const fiel! 🍴', 'success');
                form.reset();
                localStoragedType = field.type;
        const is.setItem(this.config.storage.newsletter, 'subscribed');
                Required = field.hasAttribute('required');
        
        letd.classList.add('is-invali
        } finally {
            this.clearLoadingState(submitBtn, 'Send Message');
        }
    }

    /**d');
            
            if (!existingError) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'invalid-feedback';
                
     * API Communication
     */
    async submitNewerrorDiv.textContent = errorMessage;
                fielsletter(email) {
        // Simulate
        const recipeCards = document.querySelectorAll('.recipe-card');
        
        if (!query) {
            recipeCards.forEach