import React, { memo, useCallback } from 'react';
import { Recipe } from '@/types/recipe';
import { Heart, Clock, MapPin, ChefHat } from 'lucide-react';
import { useRecipe } from '@/context/RecipeContext';
import { estimateCookingTime } from '@/utils/helpers';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
}

export const RecipeCard = memo(({ recipe, onClick }: RecipeCardProps) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useRecipe();
  const isLiked = isFavorite(recipe.idMeal);
  const cookingTime = estimateCookingTime(recipe.strInstructions);

  const handleFavoriteClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      removeFromFavorites(recipe.idMeal);
    } else {
      addToFavorites(recipe);
    }
  }, [isLiked, recipe, addToFavorites, removeFromFavorites]);

  const handleCardClick = useCallback(() => {
    onClick(recipe);
  }, [recipe, onClick]);

  return (
    <div 
      className="recipe-card cursor-pointer group"
      onClick={handleCardClick}
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
            isLiked 
              ? 'bg-red-500/90 text-white' 
              : 'bg-white/20 text-white hover:bg-red-500/90'
          }`}
        >
          <Heart 
            className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} 
          />
        </button>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full backdrop-blur-sm">
          {recipe.strCategory}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="font-playfair font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {recipe.strMeal}
        </h3>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{recipe.strArea}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{cookingTime}</span>
          </div>
        </div>

        {/* Tags */}
        {recipe.strTags && (
          <div className="flex flex-wrap gap-1">
            {recipe.strTags.split(',').slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-accent/20 text-accent-foreground text-xs rounded-full"
              >
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Action Hint */}
        <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ChefHat className="w-4 h-4" />
          <span className="text-sm font-medium">View Recipe</span>
        </div>
      </div>
    </div>
  );
});

RecipeCard.displayName = 'RecipeCard';