import React, { useState, memo } from "react";
import { useRecipes } from "../../hooks/useRecipes";
import RecipeCard from "../RecipeCard";
import RecipeFilter from "../RecipeFilter";
import RecipeModal from "../RecipeModal";
import LoadingSpinner from "../ui/LoadingSpinner";
import analyticsService from "../../services/analytics";

const RecipeSection = memo(
  ({
    title = "Our Recipes",
    subtitle = "Discover culinary treasures passed down through generations",
    className = "",
  }) => {
    const { recipes, loading, filteredCount } = useRecipes();
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleViewDetails = (recipe) => {
      setSelectedRecipe(recipe);
      setIsModalOpen(true);
      analyticsService.trackRecipeInteraction("view_modal", recipe.id);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
      setSelectedRecipe(null);
    };

    if (loading) {
      return (
        <section id="recipes" className={`py-5 ${className}`}>
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <LoadingSpinner size="lg" text="Loading delicious recipes..." />
              </div>
            </div>
          </div>
        </section>
      );
    }

    return (
      <>
        <section id="recipes" className={`py-5 ${className}`}>
          <div className="container">
            {/* Section Header */}
            <div className="row mb-5">
              <div className="col-lg-8 mx-auto text-center">
                <h2 className="display-4 fw-bold mb-3">{title}</h2>
                <p className="lead text-muted">{subtitle}</p>
              </div>
            </div>

            {/* Recipe Filter */}
            <RecipeFilter />

            {/* Recipe Grid */}
            <div className="row g-4 recipe-grid">
              {recipes.length > 0 ? (
                recipes.map((recipe) => (
                  <div key={recipe.id} className="col-lg-4 col-md-6">
                    <RecipeCard
                      recipe={recipe}
                      onViewDetails={handleViewDetails}
                    />
                  </div>
                ))
              ) : (
                <div className="col-12">
                  <div className="text-center py-5">
                    <i className="fas fa-search fa-3x text-muted mb-3" />
                    <h4 className="text-muted">No recipes found</h4>
                    <p className="text-muted">
                      Try adjusting your search criteria or browse all recipes.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Results Summary */}
            {recipes.length > 0 && (
              <div className="row mt-4">
                <div className="col-12 text-center">
                  <p className="text-muted">
                    Showing {recipes.length} of {filteredCount} recipes
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Recipe Modal */}
        {selectedRecipe && (
          <RecipeModal
            recipe={selectedRecipe}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}
      </>
    );
  }
);

RecipeSection.displayName = "RecipeSection";

export default RecipeSection;
