import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Clock, MapPin, Users, Play, ChefHat, Utensils } from 'lucide-react';
import { Recipe } from '@/types/recipe';
import { recipeAPI } from '@/utils/api';
import { parseIngredients, getYouTubeEmbedUrl, estimateCookingTime } from '@/utils/helpers';
import { useRecipe } from '@/context/RecipeContext';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, addToFavorites, removeFromFavorites } = useRecipe();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await recipeAPI.getRecipeById(id);
        if (data) {
          setRecipe(data);
        } else {
          setError('Recipe not found');
        }
      } catch (err) {
        setError('Failed to load recipe');
        console.error('Error fetching recipe:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner message="Loading recipe details..." size="lg" />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-playfair font-bold text-muted-foreground">Recipe Not Found</h1>
          <p className="text-muted-foreground">The recipe you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')} className="btn-hero">
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  const ingredients = parseIngredients(recipe);
  const cookingTime = estimateCookingTime(recipe.strInstructions);
  const youtubeEmbedUrl = getYouTubeEmbedUrl(recipe.strYoutube);
  const isLiked = isFavorite(recipe.idMeal);

  const handleFavoriteClick = () => {
    if (isLiked) {
      removeFromFavorites(recipe.idMeal);
    } else {
      addToFavorites(recipe);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-background">
      {/* Header */}
      <div className="sticky top-0 z-50 glass backdrop-blur-xl border-b border-glass-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => navigate(-1)}
              variant="ghost"
              className="flex items-center gap-2 hover:bg-primary/10"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </Button>
            <Button
              onClick={handleFavoriteClick}
              variant="ghost"
              className={`flex items-center gap-2 ${
                isLiked ? 'text-red-500 hover:bg-red-50' : 'hover:bg-primary/10'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              {isLiked ? 'Saved' : 'Save'}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Image & Video */}
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-2xl shadow-strong">
              {showVideo && youtubeEmbedUrl ? (
                <div className="aspect-video">
                  <iframe
                    src={youtubeEmbedUrl}
                    title={`${recipe.strMeal} cooking video`}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="w-full aspect-video object-cover"
                  />
                  {youtubeEmbedUrl && (
                    <button
                      onClick={() => setShowVideo(true)}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors group"
                    >
                      <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-primary ml-1" />
                      </div>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Recipe Info Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="glass-card text-center">
                <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">{cookingTime}</p>
                <p className="text-xs text-muted-foreground">Cook Time</p>
              </div>
              <div className="glass-card text-center">
                <MapPin className="w-6 h-6 text-secondary mx-auto mb-2" />
                <p className="text-sm font-medium">{recipe.strArea}</p>
                <p className="text-xs text-muted-foreground">Cuisine</p>
              </div>
              <div className="glass-card text-center">
                <ChefHat className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="text-sm font-medium">{recipe.strCategory}</p>
                <p className="text-xs text-muted-foreground">Category</p>
              </div>
            </div>
          </div>

          {/* Right Column - Recipe Details */}
          <div className="space-y-8">
            {/* Title & Tags */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-playfair font-bold leading-tight">
                {recipe.strMeal}
              </h1>
              
              {recipe.strTags && (
                <div className="flex flex-wrap gap-2">
                  {recipe.strTags.split(',').map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Ingredients */}
            <div className="glass-card">
              <div className="flex items-center gap-3 mb-6">
                <Utensils className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-playfair font-bold">Ingredients</h2>
                <span className="text-sm text-muted-foreground">({ingredients.length} items)</span>
              </div>
              
              <div className="grid gap-3">
                {ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <span className="font-medium">{ingredient.name}</span>
                    {ingredient.measure && (
                      <span className="text-sm text-muted-foreground bg-background px-2 py-1 rounded">
                        {ingredient.measure}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="glass-card">
              <div className="flex items-center gap-3 mb-6">
                <ChefHat className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-playfair font-bold">Instructions</h2>
              </div>
              
              <div className="prose prose-lg max-w-none">
                {recipe.strInstructions.split('\r\n').filter(step => step.trim()).map((step, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <p className="text-foreground leading-relaxed pt-1">{step.trim()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Source Link */}
            {recipe.strSource && (
              <div className="glass-card">
                <h3 className="font-semibold mb-2">Original Source</h3>
                <a
                  href={recipe.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark underline"
                >
                  View Original Recipe
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}