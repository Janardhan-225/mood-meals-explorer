import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Recipe, SearchFilters } from '@/types/recipe';

interface RecipeState {
  recipes: Recipe[];
  favorites: Recipe[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  filters: SearchFilters;
  selectedRecipe: Recipe | null;
}

type RecipeAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_RECIPES'; payload: Recipe[] }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_FILTERS'; payload: SearchFilters }
  | { type: 'SET_SELECTED_RECIPE'; payload: Recipe | null }
  | { type: 'ADD_FAVORITE'; payload: Recipe }
  | { type: 'REMOVE_FAVORITE'; payload: string }
  | { type: 'LOAD_FAVORITES'; payload: Recipe[] };

const initialState: RecipeState = {
  recipes: [],
  favorites: [],
  loading: false,
  error: null,
  searchQuery: '',
  filters: {},
  selectedRecipe: null,
};

function recipeReducer(state: RecipeState, action: RecipeAction): RecipeState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_RECIPES':
      return { ...state, recipes: action.payload, loading: false, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    case 'SET_SELECTED_RECIPE':
      return { ...state, selectedRecipe: action.payload };
    case 'ADD_FAVORITE':
      const newFavorites = [...state.favorites, action.payload];
      localStorage.setItem('recipeFavorites', JSON.stringify(newFavorites));
      return { ...state, favorites: newFavorites };
    case 'REMOVE_FAVORITE':
      const filteredFavorites = state.favorites.filter(recipe => recipe.idMeal !== action.payload);
      localStorage.setItem('recipeFavorites', JSON.stringify(filteredFavorites));
      return { ...state, favorites: filteredFavorites };
    case 'LOAD_FAVORITES':
      return { ...state, favorites: action.payload };
    default:
      return state;
  }
}

interface RecipeContextType {
  state: RecipeState;
  dispatch: React.Dispatch<RecipeAction>;
  addToFavorites: (recipe: Recipe) => void;
  removeFromFavorites: (recipeId: string) => void;
  isFavorite: (recipeId: string) => boolean;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export function RecipeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(recipeReducer, initialState);

  // Load favorites from localStorage on mount
  React.useEffect(() => {
    const savedFavorites = localStorage.getItem('recipeFavorites');
    if (savedFavorites) {
      try {
        const favorites = JSON.parse(savedFavorites);
        dispatch({ type: 'LOAD_FAVORITES', payload: favorites });
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);

  const addToFavorites = (recipe: Recipe) => {
    if (!isFavorite(recipe.idMeal)) {
      dispatch({ type: 'ADD_FAVORITE', payload: recipe });
    }
  };

  const removeFromFavorites = (recipeId: string) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: recipeId });
  };

  const isFavorite = (recipeId: string) => {
    return state.favorites.some(recipe => recipe.idMeal === recipeId);
  };

  const value = {
    state,
    dispatch,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>;
}

export function useRecipe() {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipe must be used within a RecipeProvider');
  }
  return context;
}