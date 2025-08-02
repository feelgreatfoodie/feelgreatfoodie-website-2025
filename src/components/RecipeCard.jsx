import React, { memo } from "react";
import { useRecipes } from "../hooks/useRecipes";

const RecipeCard = memo(({ recipe, onViewDetails }) => {
  const { toggleFavorite, isFavorited } = useRecipes();

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(recipe.id);
  };

  const handleCardClick = () => {
    onViewDetails?.(recipe);
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: "success",
      medium: "warning",
      hard: "danger",
    };
    return colors[difficulty] || "secondary";
  };

  return (
    <div
      className="recipe-card card h-100 shadow-sm"
      data-recipe-id={recipe.id}
      data-category={recipe.category}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleCardClick()}
    >
      <div className="position-relative">
        <img
          src={recipe.image}
          className="card-img-top recipe-image"
          alt={recipe.title}
          loading="lazy"
          style={{ height: "200px", objectFit: "cover" }}
        />
        <button
          className={`btn btn-outline-light btn-favorite position-absolute top-0 end-0 m-2 ${
            isFavorited(recipe.id) ? "favorited" : ""
          }`}
          onClick={handleFavoriteClick}
          aria-label={`${
            isFavorited(recipe.id) ? "Remove from" : "Add to"
          } favorites`}
        >
          <i className={`${isFavorited(recipe.id) ? "fas" : "far"} fa-heart`} />
        </button>
        <span
          className={`badge bg-${getDifficultyColor(
            recipe.difficulty
          )} position-absolute bottom-0 start-0 m-2 difficulty`}
        >
          {recipe.difficulty}
        </span>
      </div>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title recipe-title">{recipe.title}</h5>
        <p className="card-text recipe-description text-muted small flex-grow-1">
          {recipe.description}
        </p>

        <div className="recipe-meta d-flex justify-content-between align-items-center mt-auto pt-2">
          <small className="text-muted">
            <i className="fas fa-clock me-1" />
            {recipe.time} mins
          </small>
          <small className="text-muted">
            <i className="fas fa-users me-1" />
            {recipe.servings} servings
          </small>
          <small className="text-warning">
            <i className="fas fa-star me-1" />
            {recipe.rating}
          </small>
        </div>
      </div>
    </div>
  );
});

RecipeCard.displayName = "RecipeCard";

export default RecipeCard;
