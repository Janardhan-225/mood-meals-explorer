import { useState, useEffect, useMemo } from 'react';
import { Recipe } from '@/types/recipe';
import { recipeAPI } from '@/utils/api';

interface UseRelatedRecipesProps {
  recipe: Recipe;
  limit?: number;
}

export function useRelatedRecipes({ recipe, limit = 6 }: UseRelatedRecipesProps) {
  const [relatedRecipes, setRelatedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Memoize the search strategy to avoid unnecessary API calls
  const searchStrategy = useMemo(() => {
    if (!recipe) return null;

    return {
      category: recipe.strCategory,
      area: recipe.strArea,
      // Extract main ingredient from first ingredient
      mainIngredient: recipe.strIngredient1?.split(' ')[0].toLowerCase(),
    };
  }, [recipe.idMeal, recipe.strCategory, recipe.strArea, recipe.strIngredient1]);

  useEffect(() => {
    if (!recipe || !searchStrategy) return;

    const fetchRelatedRecipes = async () => {
      try {
        setLoading(true);
        setError(null);

        // Strategy 1: Same category recipes
        let recipes = await recipeAPI.getRecipesByCategory(searchStrategy.category);
        
        // Filter out the current recipe
        recipes = recipes.filter(r => r.idMeal !== recipe.idMeal);

        // If we don't have enough, try same cuisine
        if (recipes.length < limit) {
          const cuisineRecipes = await recipeAPI.getRecipesByArea(searchStrategy.area);
          const filteredCuisineRecipes = cuisineRecipes.filter(
            r => r.idMeal !== recipe.idMeal && 
            !recipes.some(existing => existing.idMeal === r.idMeal)
          );
          recipes = [...recipes, ...filteredCuisineRecipes];
        }

        // If still not enough, try main ingredient
        if (recipes.length < limit && searchStrategy.mainIngredient) {
          const ingredientRecipes = await recipeAPI.getRecipesByIngredient(searchStrategy.mainIngredient);
          const filteredIngredientRecipes = ingredientRecipes.filter(
            r => r.idMeal !== recipe.idMeal && 
            !recipes.some(existing => existing.idMeal === r.idMeal)
          );
          recipes = [...recipes, ...filteredIngredientRecipes];
        }

        // Shuffle and limit results
        const shuffled = recipes.sort(() => Math.random() - 0.5);
        setRelatedRecipes(shuffled.slice(0, limit));

      } catch (err) {
        console.error('Error fetching related recipes:', err);
        setError('Failed to load related recipes');
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedRecipes();
  }, [recipe.idMeal, searchStrategy, limit]);

  return { relatedRecipes, loading, error };
}