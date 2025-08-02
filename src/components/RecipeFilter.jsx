import React, { memo } from "react";
import { useRecipes } from "../hooks/useRecipes";

const RecipeFilter = memo(() => {
  const {
    categories,
    currentFilter,
    sortBy,
    searchQuery,
    filterByCategory,
    setSortBy,
    searchRecipes,
    filteredCount,
    totalCount,
  } = useRecipes();

  const handleSearchChange = (e) => {
    searchRecipes(e.target.value);
  };

  const handleClearSearch = () => {
    searchRecipes("");
  };

  return (
    <div className="recipe-filter-section mb-4">
      <div className="row g-3 align-items-center">
        {/* Search Input */}
        <div className="col-md-6">
          <div className="position-relative">
            <input
              type="search"
              className="form-control search-input"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="Search recipes"
            />
            <div className="position-absolute top-50 end-0 translate-middle-y pe-3">
              {searchQuery ? (
                <button
                  type="button"
                  className="btn btn-sm btn-link p-0"
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                >
                  <i className="fas fa-times text-muted" />
                </button>
              ) : (
                <i className="fas fa-search text-muted" />
              )}
            </div>
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="col-md-3">
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort recipes"
          >
            <option value="name">Sort by Name</option>
            <option value="rating">Sort by Rating</option>
            <option value="time">Sort by Time</option>
            <option value="difficulty">Sort by Difficulty</option>
          </select>
        </div>

        {/* Results Count */}
        <div className="col-md-3">
          <div className="recipe-count text-muted small">
            <i className="fas fa-utensils me-2" />
            {filteredCount} of {totalCount} recipes
          </div>
        </div>
      </div>

      {/* Category Filter Buttons */}
      <div className="category-filters mt-3">
        <div
          className="btn-group flex-wrap"
          role="group"
          aria-label="Recipe categories"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`btn recipe-filter-btn ${
                currentFilter === category
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => filterByCategory(category)}
              data-category={category}
            >
              {category === "all"
                ? "All Recipes"
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results Info */}
      {searchQuery && (
        <div className="search-results alert alert-info mt-3" role="status">
          <i className="fas fa-search me-2" />
          {filteredCount === 0 ? (
            <>
              No recipes found for "<strong>{searchQuery}</strong>". Try
              different keywords.
            </>
          ) : (
            <>
              Found <strong>{filteredCount}</strong> recipe
              {filteredCount !== 1 ? "s" : ""}
              matching "<strong>{searchQuery}</strong>"
            </>
          )}
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary ms-3"
            onClick={handleClearSearch}
          >
            <i className="fas fa-times me-1" />
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
});

RecipeFilter.displayName = "RecipeFilter";

export default RecipeFilter;
