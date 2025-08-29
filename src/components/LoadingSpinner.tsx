import React from 'react';
import { ChefHat, Utensils } from 'lucide-react';

/**
 * @interface LoadingSpinnerProps
 * @description Props for the LoadingSpinner component.
 * @property {string} [message] - The message to display below the spinner. Defaults to "Cooking up something delicious...".
 * @property {'sm' | 'md' | 'lg'} [size] - The size of the spinner. Defaults to 'md'.
 */
interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * @component LoadingSpinner
 * @description Displays an animated loading spinner with an optional message and dots animation.
 * Features a rotating chef hat and bouncing utensils icons.
 * @param {LoadingSpinnerProps} props - The props for the component.
 * @returns {JSX.Element} A React functional component.
 */
export function LoadingSpinner({
  message = "Cooking up something delicious...",
  size = 'md'
}: LoadingSpinnerProps) {
  // Defines CSS classes for different spinner sizes.
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      {/* Spinner Animation Container */}
      <div className="relative">
        {/* Chef Hat Icon: Rotates to indicate loading */}
        <div className={`${sizeClasses[size]} animate-spin`}>
          <ChefHat className="w-full h-full text-primary" />
        </div>
        {/* Utensils Icon: Bounces gently within the chef hat */}
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${sizeClasses[size]} animate-bounce-gentle`}>
          <Utensils className="w-1/2 h-1/2 text-secondary mx-auto" />
        </div>
      </div>
      
      {/* Loading Message and Dots Animation */}
      <div className="text-center space-y-2">
        <p className="text-lg font-medium text-foreground animate-pulse">
          {message} {/* Display dynamic loading message */}
        </p>
        {/* Animated dots for visual loading feedback */}
        <div className="flex justify-center space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i} // Unique key for each dot
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }} // Staggered animation delay for dots
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * @component RecipeCardSkeleton
 * @description Provides a skeleton loader for a RecipeCard component.
 * It simulates the layout of a recipe card to improve perceived loading performance.
 * @returns {JSX.Element} A React functional component representing the skeleton.
 */
export function RecipeCardSkeleton() {
  return (
    <div className="recipe-card animate-pulse"> {/* Main container for the skeleton card, with pulse animation */}
      {/* Image placeholder */}
      <div className="bg-muted rounded-xl h-48 mb-4" />
      {/* Content placeholders */}
      <div className="space-y-3">
        <div className="bg-muted h-6 rounded w-3/4" /> {/* Title placeholder */}
        <div className="flex justify-between">
          <div className="bg-muted h-4 rounded w-20" /> {/* Area placeholder */}
          <div className="bg-muted h-4 rounded w-16" /> {/* Cooking time placeholder */}
        </div>
        <div className="flex gap-2">
          <div className="bg-muted h-6 rounded-full w-16" /> {/* Tag placeholder 1 */}
          <div className="bg-muted h-6 rounded-full w-20" /> {/* Tag placeholder 2 */}
        </div>
      </div>
    </div>
  );
}