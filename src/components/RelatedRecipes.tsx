import React, { memo } from 'react';
import { Recipe } from '@/types/recipe';
import { useRelatedRecipes } from '@/hooks/useRelatedRecipes';
import { RecipeCard } from './RecipeCard';
import { LoadingSpinner, RecipeCardSkeleton } from './LoadingSpinner';
import { Sparkles } from 'lucide-react';

interface RelatedRecipesProps {
  recipe: Recipe;
  onRecipeClick: (recipe: Recipe) => void;
  limit?: number;
}

export const RelatedRecipes = memo(({ recipe, onRecipeClick, limit = 6 }: RelatedRecipesProps) => {
  const { relatedRecipes, loading, error } = useRelatedRecipes({ recipe, limit });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-playfair font-bold">You Might Also Like</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(limit).fill(null).map((_, index) => (
            <RecipeCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error || relatedRecipes.length === 0) {
    return null; // Don't show anything if there's an error or no related recipes
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Sparkles className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-playfair font-bold">You Might Also Like</h2>
        <span className="text-sm text-muted-foreground">
          Based on {recipe.strCategory} • {recipe.strArea}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedRecipes.map((relatedRecipe) => (
          <RecipeCard
            key={relatedRecipe.idMeal}
            recipe={relatedRecipe}
            onClick={onRecipeClick}
          />
        ))}
      </div>
    </div>
  );
});

RelatedRecipes.displayName = 'RelatedRecipes';