import { useState, useEffect, useCallback, useMemo } from "react";
import { useNotifications } from "./useNotifications";
import localStorageService from "../services/localStorage";
import analyticsService from "../services/analytics";

export const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const { showSuccess } = useNotifications();

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorageService.getFavorites();
    setFavorites(storedFavorites);
  }, []);

  // Extract recipes from DOM on mount (for legacy compatibility)
  useEffect(() => {
    const extractRecipesFromDOM = () => {
      const existingCards = document.querySelectorAll(".recipe-card");
      const extractedRecipes = [];

      existingCards.forEach((card, index) => {
        try {
          const title =
            card.querySelector(".recipe-title")?.textContent.trim() ||
            `Recipe ${index + 1}`;
          const image = card.querySelector(".recipe-image")?.src || "";
          const description =
            card.querySelector(".recipe-description")?.textContent.trim() || "";
          const category = card.dataset.category || "general";

          // Extract metadata
          const metaSpans = card.querySelectorAll(".recipe-meta span");
          let time = 30,
            servings = 4,
            rating = 4.5;

          metaSpans.forEach((span) => {
            const text = span.textContent.toLowerCase();
            if (text.includes("min")) {
              time = parseInt(text.match(/\d+/)?.[0]) || 30;
            } else if (text.includes("serving")) {
              servings = parseInt(text.match(/\d+/)?.[0]) || 4;
            } else if (text.includes("★") || span.querySelector(".fa-star")) {
              rating = parseFloat(text.match(/[\d.]+/)?.[0]) || 4.5;
            }
          });

          const difficultyBadge = card.querySelector(".badge.difficulty");
          const difficulty =
            difficultyBadge?.textContent.toLowerCase() || "easy";

          extractedRecipes.push({
            id: card.dataset.recipeId || `recipe-${index + 1}`,
            title,
            category,
            difficulty,
            time,
            servings,
            rating,
            image,
            description,
            ingredients: [], // Would be populated from API
            instructions: [], // Would be populated from API
            domElement: card,
          });
        } catch (error) {
          console.error("Error extracting recipe data:", error);
        }
      });

      setRecipes(extractedRecipes);
      setLoading(false);
    };

    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", extractRecipesFromDOM);
    } else {
      extractRecipesFromDOM();
    }

    return () => {
      document.removeEventListener("DOMContentLoaded", extractRecipesFromDOM);
    };
  }, []);

  // Filtered and sorted recipes
  const filteredRecipes = useMemo(() => {
    let filtered = recipes;

    // Apply category filter
    if (currentFilter !== "all") {
      filtered = filtered.filter((recipe) => recipe.category === currentFilter);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(query) ||
          recipe.description.toLowerCase().includes(query) ||
          recipe.category.toLowerCase().includes(query) ||
          recipe.difficulty.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.title.localeCompare(b.title);
        case "rating":
          return b.rating - a.rating;
        case "time":
          return a.time - b.time;
        case "difficulty":
          const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
          return (
            (difficultyOrder[a.difficulty] || 2) -
            (difficultyOrder[b.difficulty] || 2)
          );
        default:
          return 0;
      }
    });

    return filtered;
  }, [recipes, currentFilter, searchQuery, sortBy]);

  // Get available categories
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(recipes.map((recipe) => recipe.category)),
    ];
    return ["all", ...uniqueCategories];
  }, [recipes]);

  // Toggle favorite
  const toggleFavorite = useCallback(
    (recipeId) => {
      const recipe = recipes.find((r) => r.id === recipeId);
      if (!recipe) return;

      const isFavorited = favorites.includes(recipeId);
      let newFavorites;

      if (isFavorited) {
        newFavorites = favorites.filter((id) => id !== recipeId);
        showSuccess("Removed from favorites");
      } else {
        newFavorites = [...favorites, recipeId];
        showSuccess("Added to favorites! ❤️");
      }

      setFavorites(newFavorites);
      localStorageService.setFavorites(newFavorites);

      // Update DOM element if it exists
      if (recipe.domElement) {
        const favoriteBtn = recipe.domElement.querySelector(".btn-favorite");
        const icon = favoriteBtn?.querySelector("i");

        if (favoriteBtn && icon) {
          if (isFavorited) {
            favoriteBtn.classList.remove("favorited");
            icon.classList.replace("fas", "far");
          } else {
            favoriteBtn.classList.add("favorited");
            icon.classList.replace("far", "fas");
          }
        }
      }

      analyticsService.trackRecipeInteraction(
        isFavorited ? "unfavorite" : "favorite",
        recipeId
      );
    },
    [recipes, favorites, showSuccess]
  );

  // Search recipes
  const searchRecipes = useCallback(
    (query) => {
      setSearchQuery(query);
      analyticsService.trackSearch(query, filteredRecipes.length);
    },
    [filteredRecipes.length]
  );

  // Filter by category
  const filterByCategory = useCallback((category) => {
    setCurrentFilter(category);
    analyticsService.trackEvent("recipe_filter", { category });
  }, []);

  // Get recipe by ID
  const getRecipe = useCallback(
    (id) => {
      return recipes.find((recipe) => recipe.id === id);
    },
    [recipes]
  );

  // Check if recipe is favorited
  const isFavorited = useCallback(
    (recipeId) => {
      return favorites.includes(recipeId);
    },
    [favorites]
  );

  return {
    recipes: filteredRecipes,
    allRecipes: recipes,
    loading,
    favorites,
    categories,
    currentFilter,
    searchQuery,
    sortBy,
    toggleFavorite,
    searchRecipes,
    filterByCategory,
    setSortBy,
    getRecipe,
    isFavorited,
    totalCount: recipes.length,
    filteredCount: filteredRecipes.length,
  };
};
