import React, { memo } from 'react';
import { Recipe } from '@/types/recipe';
import { useRelatedRecipes } from '@/hooks/useRelatedRecipes';
import { RecipeCard } from './RecipeCard';
import { LoadingSpinner, RecipeCardSkeleton } from './LoadingSpinner';
import { Sparkles } from 'lucide-react';

/**
 * @interface RelatedRecipesProps
 * @description Props for the RelatedRecipes component.
 * @property {Recipe} recipe - The main recipe for which related recipes are to be fetched.
 * @property {(recipe: Recipe) => void} onRecipeClick - Callback function when a related recipe card is clicked.
 * @property {number} [limit=6] - The maximum number of related recipes to display.
 */
interface RelatedRecipesProps {
  recipe: Recipe;
  onRecipeClick: (recipe: Recipe) => void;
  limit?: number;
}

/**
 * @component RelatedRecipes
 * @description Displays a section of recipes related to a given main recipe.
 * It fetches related recipes using the `useRelatedRecipes` hook and renders them as `RecipeCard`s.
 * Includes loading and error states with a skeleton loader.
 * @param {RelatedRecipesProps} props - The props for the component.
 * @returns {JSX.Element | null} A React functional component or null if no related recipes or an error occurs.
 */
export const RelatedRecipes = memo(({ recipe, onRecipeClick, limit = 6 }: RelatedRecipesProps) => {
  // Custom hook to fetch related recipes based on the provided recipe and limit.
  const { relatedRecipes, loading, error } = useRelatedRecipes({ recipe, limit });

  // Displays a loading state with skeleton cards while recipes are being fetched.
  if (loading) {
    return (
      <div className="space-y-6">
        {/* Section Header for Loading State */}
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-playfair font-bold">You Might Also Like</h2>
        </div>
        {/* Grid of skeleton loaders to indicate recipes are loading */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(limit).fill(null).map((_, index) => (
            <RecipeCardSkeleton key={index} /> // Renders a skeleton card for each potential related recipe
          ))}
        </div>
      </div>
    );
  }

  // If there's an error or no related recipes are found, render nothing (null).
  if (error || relatedRecipes.length === 0) {
    return null; 
  }

  return (
    <div className="space-y-6 animate-fade-in"> {/* Main container for related recipes, with fade-in animation */}
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <Sparkles className="w-6 h-6 text-primary" /> {/* Sparkles icon */}
        <h2 className="text-2xl font-playfair font-bold">You Might Also Like</h2>
        {/* Subtitle indicating the basis for related recipes */}
        <span className="text-sm text-muted-foreground">
          Based on {recipe.strCategory} • {recipe.strArea} 
        </span>
      </div>
      
      {/* Grid of Related Recipe Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedRecipes.map((relatedRecipe) => (
          <RecipeCard
            key={relatedRecipe.idMeal} // Unique key for each related recipe card
            recipe={relatedRecipe} // Passes the related recipe data to the RecipeCard component
            onClick={onRecipeClick} // Passes the click handler for related recipes
          />
        ))}
      </div>
    </div>
  );
});

RelatedRecipes.displayName = 'RelatedRecipes'; // Sets display name for React DevTools