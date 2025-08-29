import React, { memo, useCallback } from 'react';
import { Recipe } from '@/types/recipe';
import { Heart, Clock, MapPin, ChefHat } from 'lucide-react';
import { useRecipe } from '@/context/RecipeContext';
import { estimateCookingTime } from '@/utils/helpers';

/**
 * @interface RecipeCardProps
 * @description Props for the RecipeCard component.
 * @property {Recipe} recipe - The recipe object to display in the card.
 * @property {(recipe: Recipe) => void} onClick - Callback function when the card is clicked.
 */
interface RecipeCardProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
}

/**
 * @component RecipeCard
 * @description A memoized component that displays a single recipe as a card.
 * It includes the recipe's image, title, category, area, estimated cooking time,
 * and a favorite button. Clicking the card triggers the `onClick` handler.
 * @param {RecipeCardProps} props - The props for the component.
 * @returns {JSX.Element} A React functional component.
 */
export const RecipeCard = memo(({ recipe, onClick }: RecipeCardProps) => {
  // Access favorite management functions from the RecipeContext.
  const { isFavorite, addToFavorites, removeFromFavorites } = useRecipe();
  // Check if the current recipe is marked as a favorite.
  const isLiked = isFavorite(recipe.idMeal);
  // Estimate cooking time based on recipe instructions using a helper function.
  const cookingTime = estimateCookingTime(recipe.strInstructions);

  /**
   * Handles the click event for the favorite button.
   * Prevents event propagation to avoid triggering the card's onClick.
   * Toggles the favorite status of the recipe.
   * @param {React.MouseEvent} e - The mouse event.
   */
  const handleFavoriteClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Stop event from bubbling up to the card click handler
    if (isLiked) {
      removeFromFavorites(recipe.idMeal);
    } else {
      addToFavorites(recipe);
    }
  }, [isLiked, recipe, addToFavorites, removeFromFavorites]); // Dependencies for useCallback

  /**
   * Handles the click event for the entire recipe card.
   * Calls the `onClick` prop with the current recipe.
   */
  const handleCardClick = useCallback(() => {
    onClick(recipe);
  }, [recipe, onClick]); // Dependencies for useCallback

  return (
    <div 
      className="recipe-card cursor-pointer group" // Base styling for the recipe card
      onClick={handleCardClick} // Attaches click handler for the entire card
    >
      {/* Recipe Image Section */}
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img
          src={recipe.strMealThumb} // Recipe thumbnail image source
          alt={recipe.strMeal} // Alt text for accessibility
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" // Image styling with hover effect
          loading="lazy" // Lazy loading for performance
        />
        {/* Overlay for hover effect on the image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick} // Attaches favorite click handler
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
            isLiked 
              ? 'bg-red-500/90 text-white' // Styling when liked
              : 'bg-white/20 text-white hover:bg-red-500/90' // Styling when not liked, with hover effect
          }`}
        >
          <Heart 
            className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} // Heart icon, filled if liked
          />
        </button>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full backdrop-blur-sm">
          {recipe.strCategory} {/* Displays the recipe category */}
        </div>
      </div>

      {/* Recipe Content Section (Title, Area, Cooking Time, Tags) */}
      <div className="space-y-3">
        {/* Recipe Title */}
        <h3 className="font-playfair font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {recipe.strMeal} {/* Displays the recipe name */}
        </h3>

        {/* Area and Cooking Time Information */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" /> {/* Map pin icon */}
            <span>{recipe.strArea}</span> {/* Displays the recipe's origin area */}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> {/* Clock icon */}
            <span>{cookingTime}</span> {/* Displays the estimated cooking time */}
          </div>
        </div>

        {/* Tags Section (only renders if tags exist) */}
        {recipe.strTags && (
          <div className="flex flex-wrap gap-1">
            {/* Splits tags by comma, takes the first two, and maps them to display as chips */}
            {recipe.strTags.split(',').slice(0, 2).map((tag, index) => (
              <span
                key={index} // Unique key for each tag chip
                className="px-2 py-1 bg-accent/20 text-accent-foreground text-xs rounded-full" // Tag chip styling
              >
                #{tag.trim()} {/* Displays tag with a '#' prefix */}
              </span>
            ))}
          </div>
        )}

        {/* Action Hint (visible on hover) */}
        <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ChefHat className="w-4 h-4" /> {/* Chef hat icon */}
          <span className="text-sm font-medium">View Recipe</span> {/* Text hint to view recipe */}
        </div>
      </div>
    </div>
  );
});

RecipeCard.displayName = 'RecipeCard'; // Sets display name for React DevTools