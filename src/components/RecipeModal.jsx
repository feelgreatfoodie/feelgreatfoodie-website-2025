import React, { memo, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRecipes } from "../hooks/useRecipes";
import { useNotifications } from "../hooks/useNotifications";
import analyticsService from "../services/analytics";

const RecipeModal = memo(({ recipe, isOpen, onClose }) => {
  const { toggleFavorite, isFavorited } = useRecipes();
  const { showSuccess } = useNotifications();

  // Handle escape key and focus management
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (e.target.classList.contains("modal")) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("click", handleClickOutside);
    document.body.style.overflow = "hidden";

    // Focus management
    const modal = document.getElementById(`recipeModal-${recipe.id}`);
    if (modal) {
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, recipe.id]);

  const handleFavoriteClick = () => {
    toggleFavorite(recipe.id);
  };

  const handlePrint = () => {
    window.print();
    analyticsService.trackRecipeInteraction("print", recipe.id);
  };

  const handleShare = async () => {
    const shareData = {
      title: `${recipe.title} - FeelGreatFoodie`,
      text: `Check out this amazing recipe: ${recipe.title}`,
      url: `${window.location.origin}${window.location.pathname}#recipe-${recipe.id}`,
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        analyticsService.trackRecipeInteraction("share_native", recipe.id);
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareData.url);
        showSuccess("Recipe link copied to clipboard!");
        analyticsService.trackRecipeInteraction("share_clipboard", recipe.id);
      }
    } catch (error) {
      console.error("Error sharing recipe:", error);
    }
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: "success",
      medium: "warning",
      hard: "danger",
    };
    return colors[difficulty] || "secondary";
  };

  if (!isOpen || !recipe) return null;

  const modalContent = (
    <div
      className="modal fade show d-block"
      id={`recipeModal-${recipe.id}`}
      tabIndex="-1"
      role="dialog"
      aria-labelledby={`recipeModalLabel-${recipe.id}`}
      aria-modal="true"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`recipeModalLabel-${recipe.id}`}>
              {recipe.title}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close modal"
            />
          </div>

          <div className="modal-body">
            <div className="row">
              {/* Recipe Image and Meta */}
              <div className="col-md-6">
                {recipe.image && (
                  <img
                    src={recipe.image}
                    className="img-fluid rounded mb-3"
                    alt={recipe.title}
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                )}

                <div className="recipe-meta-modal">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="badge bg-primary">
                      <i className="fas fa-clock me-2" />
                      {recipe.time} mins
                    </span>
                    <span className="badge bg-info">
                      <i className="fas fa-users me-2" />
                      {recipe.servings} servings
                    </span>
                    <span className="badge bg-warning text-dark">
                      <i className="fas fa-star me-2" />
                      {recipe.rating}
                    </span>
                    <span
                      className={`badge bg-${getDifficultyColor(
                        recipe.difficulty
                      )}`}
                    >
                      {recipe.difficulty}
                    </span>
                  </div>

                  <button
                    type="button"
                    className={`btn btn-outline-danger btn-sm w-100 ${
                      isFavorited(recipe.id) ? "active" : ""
                    }`}
                    onClick={handleFavoriteClick}
                  >
                    <i
                      className={`${
                        isFavorited(recipe.id) ? "fas" : "far"
                      } fa-heart me-2`}
                    />
                    {isFavorited(recipe.id)
                      ? "Remove from Favorites"
                      : "Add to Favorites"}
                  </button>
                </div>
              </div>

              {/* Recipe Details */}
              <div className="col-md-6">
                <h6 className="fw-bold">
                  <i className="fas fa-list-ul me-2 text-primary" />
                  Ingredients:
                </h6>
                <ul className="ingredients-list mb-4">
                  {recipe.ingredients?.length > 0 ? (
                    recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="mb-1">
                        {ingredient}
                      </li>
                    ))
                  ) : (
                    <>
                      <li>2 cups fresh ingredients</li>
                      <li>1 tbsp love and care</li>
                      <li>Traditional family techniques</li>
                      <li>A pinch of heritage</li>
                    </>
                  )}
                </ul>

                <h6 className="fw-bold">
                  <i className="fas fa-clipboard-list me-2 text-primary" />
                  Instructions:
                </h6>
                <ol className="instructions-list">
                  {recipe.instructions?.length > 0 ? (
                    recipe.instructions.map((instruction, index) => (
                      <li key={index} className="mb-2">
                        {instruction}
                      </li>
                    ))
                  ) : (
                    <>
                      <li>Gather your ingredients with intention</li>
                      <li>Prepare with love and tradition</li>
                      <li>Cook with patience and care</li>
                      <li>Share with family and friends</li>
                    </>
                  )}
                </ol>
              </div>
            </div>

            {/* Recipe Story */}
            {recipe.description && (
              <div className="row mt-4">
                <div className="col-12">
                  <div className="recipe-story p-3 bg-light rounded">
                    <h6 className="fw-bold text-primary">
                      <i className="fas fa-book me-2" />
                      Recipe Story
                    </h6>
                    <p className="mb-0">
                      {recipe.description ||
                        "This beloved recipe has been passed down through generations, carrying with it the warmth of family kitchens and the joy of shared meals."}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onClose}
            >
              <i className="fas fa-times me-2" />
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handlePrint}
            >
              <i className="fas fa-print me-2" />
              Print Recipe
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleShare}
            >
              <i className="fas fa-share me-2" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
});

RecipeModal.displayName = "RecipeModal";

export default RecipeModal;
