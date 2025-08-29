import React from 'react';
import { ChefHat, Utensils } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingSpinner({ 
  message = "Cooking up something delicious...", 
  size = 'md' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative">
        <div className={`${sizeClasses[size]} animate-spin`}>
          <ChefHat className="w-full h-full text-primary" />
        </div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${sizeClasses[size]} animate-bounce-gentle`}>
          <Utensils className="w-1/2 h-1/2 text-secondary mx-auto" />
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <p className="text-lg font-medium text-foreground animate-pulse">
          {message}
        </p>
        <div className="flex justify-center space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function RecipeCardSkeleton() {
  return (
    <div className="recipe-card animate-pulse">
      <div className="bg-muted rounded-xl h-48 mb-4" />
      <div className="space-y-3">
        <div className="bg-muted h-6 rounded w-3/4" />
        <div className="flex justify-between">
          <div className="bg-muted h-4 rounded w-20" />
          <div className="bg-muted h-4 rounded w-16" />
        </div>
        <div className="flex gap-2">
          <div className="bg-muted h-6 rounded-full w-16" />
          <div className="bg-muted h-6 rounded-full w-20" />
        </div>
      </div>
    </div>
  );
}