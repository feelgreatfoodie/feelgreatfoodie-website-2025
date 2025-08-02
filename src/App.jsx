import React, { Suspense, lazy } from "react";
import { AppProvider } from "./context";
import { Layout } from "./components/layout";
import { LoadingSpinner } from "./components/ui";
import { useAppState } from "./context";

// Lazy load sections for better performance
const HeroSection = lazy(() => import("./components/sections/HeroSection"));
const RecipeSection = lazy(() => import("./components/sections/RecipeSection"));
const ContactSection = lazy(() =>
  import("./components/sections/ContactSection")
);

// Story section component (could be extracted to its own file)
const StorySection = () => (
  <section id="story" className="py-5">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <h2 className="display-4 fw-bold mb-4">Our Story</h2>
          <p className="lead mb-4">
            FeelGreatFoodie was born from a simple belief: that food has the
            power to bring people together, preserve memories, and create
            lasting connections across generations.
          </p>
          <p className="mb-4">
            Our journey began in grandmother's kitchen, where recipes were
            passed down not through cookbooks, but through stories, laughter,
            and the gentle guidance of loving hands. Each dish carried with it
            the essence of our heritage, the warmth of family traditions, and
            the joy of sharing meals with those we love.
          </p>
          <p className="mb-0">
            Today, we continue this tradition by sharing these treasured recipes
            with you, our extended culinary family. Every recipe on our site has
            been tested in real kitchens, perfected through generations, and
            shared with love.
          </p>
        </div>
        <div className="col-lg-6">
          <div className="row g-3">
            <div className="col-6">
              <img
                src="/api/placeholder/300/200"
                alt="Family cooking together"
                className="img-fluid rounded shadow"
                loading="lazy"
              />
            </div>
            <div className="col-6">
              <img
                src="/api/placeholder/300/200"
                alt="Traditional kitchen tools"
                className="img-fluid rounded shadow"
                loading="lazy"
              />
            </div>
            <div className="col-12">
              <img
                src="/api/placeholder/600/300"
                alt="Family dinner table"
                className="img-fluid rounded shadow"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="card border-0 h-100">
                <div className="card-body">
                  <div className="display-4 text-primary mb-3">
                    <i className="fas fa-heart" />
                  </div>
                  <h5 className="card-title">Made with Love</h5>
                  <p className="card-text text-muted">
                    Every recipe is crafted with care and tested in real family
                    kitchens.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 h-100">
                <div className="card-body">
                  <div className="display-4 text-primary mb-3">
                    <i className="fas fa-users" />
                  </div>
                  <h5 className="card-title">Community Driven</h5>
                  <p className="card-text text-muted">
                    Our recipes come from families around the world, sharing
                    their traditions.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 h-100">
                <div className="card-body">
                  <div className="display-4 text-primary mb-3">
                    <i className="fas fa-leaf" />
                  </div>
                  <h5 className="card-title">Fresh & Authentic</h5>
                  <p className="card-text text-muted">
                    We focus on fresh ingredients and time-honored cooking
                    techniques.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// App content component
const AppContent = () => {
  const { app } = useAppState();

  if (!app.isInitialized) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <LoadingSpinner
          size="lg"
          text="Preparing your culinary experience..."
        />
      </div>
    );
  }

  return (
    <Layout>
      <Suspense
        fallback={<LoadingSpinner size="lg" text="Loading section..." />}
      >
        <HeroSection
          backgroundImage="/api/placeholder/1920/1080"
          title="FeelGreatFoodie"
          subtitle="Where Heritage Meets Flavor"
          description="Discover authentic recipes passed down through generations, bringing families together one meal at a time."
        />
      </Suspense>

      <Suspense
        fallback={<LoadingSpinner size="lg" text="Loading our story..." />}
      >
        <StorySection />
      </Suspense>

      <Suspense
        fallback={
          <LoadingSpinner size="lg" text="Loading delicious recipes..." />
        }
      >
        <RecipeSection />
      </Suspense>

      <Suspense
        fallback={
          <LoadingSpinner size="lg" text="Loading contact information..." />
        }
      >
        <ContactSection />
      </Suspense>
    </Layout>
  );
};

// Main App component
const App = () => {
  return (
    <AppProvider>
      <div className="App">
        <AppContent />
      </div>
    </AppProvider>
  );
};

export default App;
