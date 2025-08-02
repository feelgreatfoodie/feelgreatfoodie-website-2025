/**
 * FeelGreatFoodie - Advanced Animations Controller
 * Handles all custom animations, scroll effects, and interactive elements
 */

class FeelGreatFoodieAnimations {
  constructor() {
    this.isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    this.scrollPosition = 0;
    this.isScrolling = false;
    this.intersectionObserver = null;
    this.parallaxElements = [];
    this.particleElements = [];

    this.init();
  }

  init() {
    this.setupScrollAnimations();
    this.initializeParallax();
    this.setupHoverEffects();
    this.initializeCounters();
    this.setupFormAnimations();
    this.initializeParticles();
    this.setupMagneticElements();
    this.initializeTypewriter();
    this.setupScrollProgress();
    this.handleReducedMotion();

    // Initialize after DOM is ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.finalizeInit());
    } else {
      this.finalizeInit();
    }
  }

  finalizeInit() {
    this.setupIntersectionObserver();
    this.animateHeroSequence();
    this.initializeFloatingElements();
    this.setupRecipeCardFlips();
  }

  /**
   * Scroll-based Animations
   */
  setupScrollAnimations() {
    let ticking = false;

    const updateScrollPosition = () => {
      this.scrollPosition = window.pageYOffset;
      this.updateParallax();
      this.updateScrollProgress();
      this.updateNavbar();
      ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking && !this.isReducedMotion) {
          requestAnimationFrame(updateScrollPosition);
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  updateScrollProgress() {
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight - winHeight;
    const scrollPercent = (this.scrollPosition / docHeight) * 100;

    const progressBar = document.querySelector(".scroll-progress");
    if (progressBar) {
      progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
    }
  }

  updateNavbar() {
    const navbar = document.getElementById("mainNav");
    if (navbar) {
      if (this.scrollPosition > 100) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  }

  /**
   * Intersection Observer for Scroll Animations
   */
  setupIntersectionObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
        }
      });
    }, options);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll(
      ".fade-in-on-scroll, .scale-in-on-scroll, .reveal-on-scroll, .stagger-children"
    );

    elementsToAnimate.forEach((el) => {
      this.intersectionObserver.observe(el);
    });
  }

  animateElement(element) {
    if (element.classList.contains("stagger-children")) {
      this.animateStaggerChildren(element);
    } else {
      element.classList.add("in-view", "revealed", "animate");
    }

    // Unobserve after animation
    if (this.intersectionObserver) {
      this.intersectionObserver.unobserve(element);
    }
  }

  animateStaggerChildren(parent) {
    const children = parent.children;
    parent.classList.add("animate");

    Array.from(children).forEach((child, index) => {
      setTimeout(() => {
        child.style.opacity = "1";
        child.style.transform = "translateY(0)";
      }, index * 100);
    });
  }

  /**
   * Parallax Effects
   */
  initializeParallax() {
    this.parallaxElements = document.querySelectorAll(
      ".parallax-element, .floating-element"
    );
  }

  updateParallax() {
    if (this.isReducedMotion) return;

    this.parallaxElements.forEach((element, index) => {
      const speed = parseFloat(element.dataset.speed) || 0.5;
      const yPos = -(this.scrollPosition * speed);

      element.style.transform = `translateY(${yPos}px)`;
    });
  }

  /**
   * Hero Sequence Animation
   */
  animateHeroSequence() {
    if (this.isReducedMotion) return;

    const hero = document.querySelector(".hero-section");
    if (!hero) return;

    hero.classList.add("hero-sequence");

    // Animate elements in sequence
    const elements = [
      { selector: ".hero-title", delay: 200 },
      { selector: ".hero-subtitle", delay: 400 },
      { selector: ".hero-buttons", delay: 600 },
      { selector: ".scroll-indicator", delay: 800 },
    ];

    elements.forEach(({ selector, delay }) => {
      setTimeout(() => {
        const element = hero.querySelector(selector);
        if (element) {
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
          element.classList.add("animate__animated", "animate__fadeInUp");
        }
      }, delay);
    });
  }

  /**
   * Floating Elements Animation
   */
  initializeFloatingElements() {
    if (this.isReducedMotion) return;

    const floatingElements = document.querySelectorAll(".floating-element");

    floatingElements.forEach((element, index) => {
      const delay = index * 500;
      const duration = 3000 + index * 500;

      element.style.animationDelay = `${delay}ms`;
      element.style.animationDuration = `${duration}ms`;
      element.classList.add("float-animation");
    });
  }

  /**
   * Hover Effects
   */
  setupHoverEffects() {
    // Blog cards hover effect
    const blogCards = document.querySelectorAll(".blog-card");
    blogCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        if (!this.isReducedMotion) {
          card.classList.add("hover-lift");
        }
      });

      card.addEventListener("mouseleave", () => {
        card.classList.remove("hover-lift");
      });
    });

    // Recipe cards hover effect
    const recipeCards = document.querySelectorAll(".recipe-card");
    recipeCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        if (!this.isReducedMotion) {
          card.classList.add("hover-grow");
        }
      });

      card.addEventListener("mouseleave", () => {
        card.classList.remove("hover-grow");
      });
    });

    // Button shimmer effect
    const buttons = document.querySelectorAll(".btn-hero, .btn-primary");
    buttons.forEach((btn) => {
      btn.classList.add("btn-animated");
    });
  }

  /**
   * Recipe Card Flip Animation
   */
  setupRecipeCardFlips() {
    if (this.isReducedMotion) return;

    const recipeCards = document.querySelectorAll(".recipe-card");

    recipeCards.forEach((card) => {
      // Create flip structure
      const content = card.innerHTML;
      card.innerHTML = `
                <div class="recipe-card-inner">
                    <div class="recipe-card-front">${content}</div>
                    <div class="recipe-card-back">
                        <div class="text-center">
                            <i class="fas fa-utensils fa-3x mb-3"></i>
                            <h4>View Recipe</h4>
                            <p>Click to see full details</p>
                        </div>
                    </div>
                </div>
            `;

      card.classList.add("recipe-card-flip");
    });
  }

  /**
   * Counter Animations
   */
  initializeCounters() {
    const counters = document.querySelectorAll(".stat-number");

    counters.forEach((counter) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateCounter(counter);
            observer.unobserve(counter);
          }
        });
      });

      observer.observe(counter);
    });
  }

  animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^\d]/g, "")) || 0;
    const suffix = element.textContent.replace(/[\d]/g, "");
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    element.classList.add("counting");

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
        element.classList.remove("counting");
      }

      element.textContent = Math.floor(current) + suffix;
    }, 16);
  }

  /**
   * Form Animations
   */
  setupFormAnimations() {
    const formGroups = document.querySelectorAll(".form-group");

    formGroups.forEach((group) => {
      const input = group.querySelector(".form-control");
      const label = group.querySelector("label");

      if (input && label && !group.querySelector(".form-floating-label")) {
        // Convert to floating label
        label.classList.add("form-floating-label");
        input.setAttribute("placeholder", " ");
      }
    });

    // Form submission animation
    const forms = document.querySelectorAll("form");
    forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn && !this.isReducedMotion) {
          submitBtn.innerHTML =
            '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
          submitBtn.disabled = true;

          // Simulate form processing
          setTimeout(() => {
            this.showSuccessAnimation(submitBtn);
          }, 2000);
        }
      });
    });
  }

  showSuccessAnimation(button) {
    button.innerHTML = '<div class="success-checkmark"></div>Sent!';
    button.classList.add("btn-success");

    setTimeout(() => {
      button.innerHTML = '<i class="fas fa-heart me-2"></i>Send Message';
      button.classList.remove("btn-success");
      button.disabled = false;
    }, 3000);
  }

  /**
   * Particle System
   */
  initializeParticles() {
    if (this.isReducedMotion) return;

    const heroSection = document.querySelector(".hero-section");
    if (!heroSection) return;

    const particleContainer = document.createElement("div");
    particleContainer.className = "particles";
    heroSection.appendChild(particleContainer);

    this.createParticles(particleContainer, 15);
  }

  createParticles(container, count) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const particle = document.createElement("div");
        particle.className = "particle";

        // Random properties
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 3 + 5;

        particle.style.cssText = `
                    width: ${size}px;
                    height: ${size}px;
                    left: ${left}%;
                    animation-duration: ${duration}s;
                    animation-delay: ${Math.random() * 2}s;
                `;

        container.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
          if (particle.parentNode) {
            particle.remove();
          }
        }, duration * 1000);
      }, i * 200);
    }

    // Continuously create new particles
    setTimeout(() => {
      if (!this.isReducedMotion) {
        this.createParticles(container, 5);
      }
    }, 8000);
  }

  /**
   * Magnetic Elements
   */
  setupMagneticElements() {
    if (this.isReducedMotion) return;

    const magneticElements = document.querySelectorAll(
      ".btn-hero, .social-link"
    );

    magneticElements.forEach((element) => {
      element.classList.add("magnetic-element");

      element.addEventListener("mousemove", (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const distance = Math.sqrt(x * x + y * y);
        const maxDistance = 50;

        if (distance < maxDistance) {
          const strength = (maxDistance - distance) / maxDistance;
          const moveX = (x / distance) * strength * 10;
          const moveY = (y / distance) * strength * 10;

          element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
      });

      element.addEventListener("mouseleave", () => {
        element.style.transform = "translate(0, 0)";
      });
    });
  }

  /**
   * Typewriter Effect
   */
  initializeTypewriter() {
    if (this.isReducedMotion) return;

    const typewriterElements = document.querySelectorAll(".typewriter");

    typewriterElements.forEach((element) => {
      const text = element.textContent;
      element.textContent = "";
      element.style.borderRight = "3px solid var(--terra-cotta)";

      let i = 0;
      const speed = 100;

      const typeTimer = setInterval(() => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(typeTimer);

          // Remove cursor after completion
          setTimeout(() => {
            element.style.borderRight = "none";
          }, 1000);
        }
      }, speed);
    });
  }

  /**
   * Scroll Progress Indicator
   */
  setupScrollProgress() {
    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    document.body.appendChild(progressBar);
  }

  /**
   * Image Reveal Animation
   */
  initializeImageReveal() {
    const images = document.querySelectorAll(
      ".evidence-img, .story-image, .recipe-image"
    );

    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.parentElement.classList.add("revealed");
            imageObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    images.forEach((img) => {
      const container = img.parentElement;
      container.classList.add("image-reveal");
      imageObserver.observe(img);
    });
  }

  /**
   * Text Reveal Animation
   */
  initializeTextReveal() {
    const textElements = document.querySelectorAll(".text-reveal");

    textElements.forEach((element) => {
      const text = element.textContent;
      const letters = text
        .split("")
        .map((letter) =>
          letter === " " ? "&nbsp;" : `<span class="letter">${letter}</span>`
        )
        .join("");

      element.innerHTML = letters;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateTextLetters(entry.target);
            observer.unobserve(entry.target);
          }
        });
      });

      observer.observe(element);
    });
  }

  animateTextLetters(element) {
    const letters = element.querySelectorAll(".letter");
    element.classList.add("animate");

    letters.forEach((letter, index) => {
      setTimeout(() => {
        letter.style.opacity = "1";
        letter.style.transform = "translateY(0)";
      }, index * 50);
    });
  }

  /**
   * Recipe Card Interactions
   */
  setupRecipeInteractions() {
    const recipeCards = document.querySelectorAll(".recipe-card");

    recipeCards.forEach((card) => {
      // Add click handler for recipe details
      card.addEventListener("click", () => {
        this.showRecipeModal(card);
      });

      // Add favorite functionality
      const favoriteBtn = card.querySelector(".btn-favorite");
      if (favoriteBtn) {
        favoriteBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.toggleFavorite(favoriteBtn, card);
        });
      }
    });
  }

  showRecipeModal(card) {
    const recipeTitle = card.querySelector(".recipe-title").textContent;

    // Create modal content dynamically
    const modalHTML = `
            <div class="modal fade" id="recipeModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${recipeTitle}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <img src="${
                                      card.querySelector(".recipe-image").src
                                    }" class="img-fluid rounded" alt="${recipeTitle}">
                                </div>
                                <div class="col-md-6">
                                    <h6>Ingredients:</h6>
                                    <ul>
                                        <li>Fresh ingredients</li>
                                        <li>Love and care</li>
                                        <li>Traditional techniques</li>
                                    </ul>
                                    <h6>Instructions:</h6>
                                    <p>Detailed recipe coming soon! This is a preview of the recipe modal functionality.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

    // Remove existing modal if any
    const existingModal = document.getElementById("recipeModal");
    if (existingModal) {
      existingModal.remove();
    }

    // Add new modal
    document.body.insertAdjacentHTML("beforeend", modalHTML);
    const modal = new bootstrap.Modal(document.getElementById("recipeModal"));
    modal.show();

    // Clean up after modal is hidden
    document
      .getElementById("recipeModal")
      .addEventListener("hidden.bs.modal", function () {
        this.remove();
      });
  }

  toggleFavorite(button, card) {
    const icon = button.querySelector("i");
    const isFavorited = icon.classList.contains("fas");

    if (isFavorited) {
      icon.classList.remove("fas");
      icon.classList.add("far");
      this.showToast("Removed from favorites", "info");
    } else {
      icon.classList.remove("far");
      icon.classList.add("fas");
      this.showToast("Added to favorites!", "success");

      // Add wiggle animation
      if (!this.isReducedMotion) {
        button.classList.add("wiggle-animation");
        setTimeout(() => {
          button.classList.remove("wiggle-animation");
        }, 600);
      }
    }
  }

  /**
   * Newsletter Signup Animation
   */
  setupNewsletterAnimation() {
    const newsletterForm = document.querySelector(".newsletter-form");
    if (!newsletterForm) return;

    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const submitBtn = newsletterForm.querySelector(".newsletter-btn");
      const emailInput = newsletterForm.querySelector(".newsletter-input");

      // Validation
      if (!emailInput.value || !this.isValidEmail(emailInput.value)) {
        this.showToast("Please enter a valid email address", "error");
        emailInput.classList.add("is-invalid");
        return;
      }

      // Success animation
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin me-2"></i>Subscribing...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Subscribed!';
        submitBtn.classList.add("btn-success");
        emailInput.value = "";

        this.showToast("Welcome to our culinary family! 🍴", "success");

        setTimeout(() => {
          submitBtn.innerHTML =
            '<i class="fas fa-paper-plane me-2"></i>Subscribe';
          submitBtn.classList.remove("btn-success");
          submitBtn.disabled = false;
        }, 3000);
      }, 2000);
    });
  }

  /**
   * Toast Notifications
   */
  showToast(message, type = "info") {
    const toastContainer = this.getToastContainer();

    const toastHTML = `
            <div class="toast align-items-center text-bg-${type} border-0" role="alert">
                <div class="d-flex">
                    <div class="toast-body">
                        <i class="fas fa-${this.getToastIcon(type)} me-2"></i>
                        ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            </div>
        `;

    toastContainer.insertAdjacentHTML("beforeend", toastHTML);
    const toastElement = toastContainer.lastElementChild;
    const toast = new bootstrap.Toast(toastElement);
    toast.show();

    // Remove toast element after it's hidden
    toastElement.addEventListener("hidden.bs.toast", () => {
      toastElement.remove();
    });
  }

  getToastContainer() {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container position-fixed top-0 end-0 p-3";
      document.body.appendChild(container);
    }
    return container;
  }

  getToastIcon(type) {
    const icons = {
      success: "check-circle",
      error: "exclamation-triangle",
      warning: "exclamation-circle",
      info: "info-circle",
    };
    return icons[type] || "info-circle";
  }

  /**
   * Back to Top Button
   */
  setupBackToTop() {
    const backToTopBtn = document.getElementById("backToTop");
    if (!backToTopBtn) return;

    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /**
   * Easter Eggs & Fun Interactions
   */
  setupEasterEggs() {
    // Konami code easter egg
    let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;

    document.addEventListener("keydown", (e) => {
      if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          this.activatePartyMode();
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    });

    // Logo click counter
    const logo = document.querySelector(".navbar-brand");
    let clickCount = 0;

    if (logo) {
      logo.addEventListener("click", (e) => {
        clickCount++;
        if (clickCount === 5) {
          e.preventDefault();
          this.showSecretMessage();
          clickCount = 0;
        }
      });
    }
  }

  activatePartyMode() {
    if (this.isReducedMotion) return;

    document.body.style.animation = "rainbow 2s infinite";
    this.showToast("🎉 Party Mode Activated! 🎉", "success");

    // Add party CSS
    const style = document.createElement("style");
    style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
    document.head.appendChild(style);

    setTimeout(() => {
      document.body.style.animation = "";
      style.remove();
    }, 10000);
  }

  showSecretMessage() {
    this.showToast(
      "🍴 You found the secret! Thanks for being curious! 🍴",
      "success"
    );
  }

  /**
   * Utility Functions
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  /**
   * Reduced Motion Handling
   */
  handleReducedMotion() {
    if (this.isReducedMotion) {
      // Disable complex animations
      document.body.classList.add("reduced-motion");

      // Remove animation classes
      const animatedElements = document.querySelectorAll('[class*="animate"]');
      animatedElements.forEach((el) => {
        el.style.animation = "none";
        el.style.transition = "none";
      });
    }
  }

  /**
   * Performance Monitoring
   */
  monitorPerformance() {
    // Monitor animation frame drops
    let lastTime = performance.now();
    let frameCount = 0;

    const checkFrameRate = (currentTime) => {
      frameCount++;

      if (currentTime - lastTime >= 1000) {
        const fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;

        // If FPS drops below 30, reduce animations
        if (fps < 30 && !this.isReducedMotion) {
          console.log("Low FPS detected, reducing animations");
          this.reduceAnimations();
        }
      }

      requestAnimationFrame(checkFrameRate);
    };

    requestAnimationFrame(checkFrameRate);
  }

  reduceAnimations() {
    // Disable heavy animations on low-performance devices
    const heavyAnimations = document.querySelectorAll(
      ".particles, .gradient-animation"
    );
    heavyAnimations.forEach((el) => {
      el.style.display = "none";
    });
  }

  /**
   * Initialize all functionality
   */
  start() {
    this.setupNewsletterAnimation();
    this.setupBackToTop();
    this.setupEasterEggs();
    this.initializeImageReveal();
    this.initializeTextReveal();
    this.setupRecipeInteractions();
    this.monitorPerformance();

    console.log("🍴 FeelGreatFoodie animations initialized successfully!");
  }
}

// Initialize animations when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const animations = new FeelGreatFoodieAnimations();
  animations.start();
});

// Export for external use
window.FeelGreatFoodieAnimations = FeelGreatFoodieAnimations;
