import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChefHat, Sparkles, TrendingUp, Shuffle } from 'lucide-react';
import { Recipe, SearchFilters } from '@/types/recipe';
import { recipeAPI } from '@/utils/api';
import { useRecipe } from '@/context/RecipeContext';
import { SearchBar } from '@/components/SearchBar';
import { FilterChips } from '@/components/FilterChips';
import { RecipeCard } from '@/components/RecipeCard';
import { CuisineMap } from '@/components/CuisineMap';
import { LoadingSpinner, RecipeCardSkeleton } from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-image.jpg';

const Index = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useRecipe();
  const [trendingRecipes, setTrendingRecipes] = useState<Recipe[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Load trending recipes on mount
    const loadTrendingRecipes = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const recipes = await recipeAPI.getRandomRecipes(6);
        setTrendingRecipes(recipes);
      } catch (error) {
        console.error('Error loading trending recipes:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadTrendingRecipes();
  }, [dispatch]);

  const handleSearch = async (query: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
      
      const recipes = await recipeAPI.searchWithFilters(query, {
        category: state.filters.category,
        area: state.filters.area,
        ingredient: state.filters.ingredient,
      });
      
      dispatch({ type: 'SET_RECIPES', payload: recipes });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to search recipes' });
      console.error('Search error:', error);
    }
  };

  const handleFilterChange = (newFilters: SearchFilters) => {
    dispatch({ type: 'SET_FILTERS', payload: newFilters });
    if (state.searchQuery) {
      handleSearch(state.searchQuery);
    }
  };

  const handleCuisineSelect = async (cuisine: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const recipes = await recipeAPI.getRecipesByArea(cuisine);
      dispatch({ type: 'SET_RECIPES', payload: recipes });
      dispatch({ type: 'SET_FILTERS', payload: { ...state.filters, area: cuisine } });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load cuisine recipes' });
      console.error('Cuisine search error:', error);
    }
  };

  const handleRandomRecipe = async () => {
    try {
      const randomRecipe = await recipeAPI.getRandomRecipe();
      if (randomRecipe) {
        navigate(`/recipe/${randomRecipe.idMeal}`);
      }
    } catch (error) {
      console.error('Error getting random recipe:', error);
    }
  };

  const handleRecipeClick = (recipe: Recipe) => {
    dispatch({ type: 'SET_SELECTED_RECIPE', payload: recipe });
    navigate(`/recipe/${recipe.idMeal}`);
  };

  const hasResults = state.recipes.length > 0;
  const hasSearch = state.searchQuery.trim().length > 0;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Delicious cooking ingredients" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-6">
              <ChefHat className="w-12 h-12 text-primary animate-bounce-gentle" />
              <Sparkles className="w-8 h-8 text-secondary animate-float" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 leading-tight">
              Find the Perfect Recipe
              <span className="block text-primary">for Every Moment</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
              Discover delicious recipes from around the world, filter by mood and dietary preferences, 
              and create unforgettable culinary experiences.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <SearchBar
                value={state.searchQuery}
                onChange={(value) => dispatch({ type: 'SET_SEARCH_QUERY', payload: value })}
                onSearch={handleSearch}
                placeholder="Search recipes, ingredients, or cuisines..."
                className="text-lg"
              />
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                onClick={handleRandomRecipe}
                className="btn-hero flex items-center gap-2"
              >
                <Shuffle className="w-5 h-5" />
                Surprise Me
              </Button>
              <Button 
                onClick={() => setShowFilters(!showFilters)}
                className="btn-secondary flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Advanced Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 space-y-16">
        {/* Advanced Filters */}
        {showFilters && (
          <section className="animate-slide-up">
            <div className="glass-card">
              <h2 className="text-2xl font-playfair font-bold mb-6 flex items-center gap-3">
                <Search className="w-6 h-6 text-primary" />
                Refine Your Search
              </h2>
              <FilterChips filters={state.filters} onFilterChange={handleFilterChange} />
            </div>
          </section>
        )}

        {/* Search Results */}
        {hasSearch && (
          <section className="animate-fade-in">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-3xl font-playfair font-bold">
                {hasResults ? `Found ${state.recipes.length} recipes` : 'No recipes found'}
              </h2>
              {state.loading && <LoadingSpinner size="sm" />}
            </div>

            {state.loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array(6).fill(null).map((_, index) => (
                  <RecipeCardSkeleton key={index} />
                ))}
              </div>
            ) : hasResults ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {state.recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.idMeal}
                    recipe={recipe}
                    onClick={handleRecipeClick}
                  />
                ))}
              </div>
            ) : state.searchQuery && (
              <div className="text-center py-12">
                <ChefHat className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No recipes found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search terms or browse our trending recipes below
                </p>
                <Button onClick={() => dispatch({ type: 'SET_SEARCH_QUERY', payload: '' })}>
                  Clear Search
                </Button>
              </div>
            )}
          </section>
        )}

        {/* World Cuisine Map */}
        {!hasSearch && (
          <section className="animate-fade-in">
            <CuisineMap 
              onCuisineSelect={handleCuisineSelect} 
              selectedCuisine={state.filters.area}
            />
          </section>
        )}

        {/* Trending Recipes */}
        {!hasSearch && (
          <section className="animate-fade-in">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-playfair font-bold">Trending Recipes</h2>
            </div>

            {state.loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array(6).fill(null).map((_, index) => (
                  <RecipeCardSkeleton key={index} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {trendingRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.idMeal}
                    recipe={recipe}
                    onClick={handleRecipeClick}
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default Index;
