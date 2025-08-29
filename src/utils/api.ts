import { MealResponse, CategoriesResponse, IngredientsResponse, Recipe } from '@/types/recipe';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

class RecipeAPI {
  private async fetchData<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API fetch error:', error);
      throw error;
    }
  }

  // Search recipes by name
  async searchByName(name: string): Promise<Recipe[]> {
    const data = await this.fetchData<MealResponse>(`/search.php?s=${encodeURIComponent(name)}`);
    return data.meals || [];
  }

  // Search recipes by first letter
  async searchByFirstLetter(letter: string): Promise<Recipe[]> {
    const data = await this.fetchData<MealResponse>(`/search.php?f=${letter}`);
    return data.meals || [];
  }

  // Get recipe details by ID
  async getRecipeById(id: string): Promise<Recipe | null> {
    const data = await this.fetchData<MealResponse>(`/lookup.php?i=${id}`);
    return data.meals?.[0] || null;
  }

  // Get random recipe
  async getRandomRecipe(): Promise<Recipe | null> {
    const data = await this.fetchData<MealResponse>('/random.php');
    return data.meals?.[0] || null;
  }

  // Get multiple random recipes
  async getRandomRecipes(count: number = 6): Promise<Recipe[]> {
    const promises = Array(count).fill(null).map(() => this.getRandomRecipe());
    const results = await Promise.all(promises);
    return results.filter((recipe): recipe is Recipe => recipe !== null);
  }

  // Filter by category
  async getRecipesByCategory(category: string): Promise<Recipe[]> {
    const data = await this.fetchData<MealResponse>(`/filter.php?c=${encodeURIComponent(category)}`);
    return data.meals || [];
  }

  // Filter by area/cuisine
  async getRecipesByArea(area: string): Promise<Recipe[]> {
    const data = await this.fetchData<MealResponse>(`/filter.php?a=${encodeURIComponent(area)}`);
    return data.meals || [];
  }

  // Filter by main ingredient
  async getRecipesByIngredient(ingredient: string): Promise<Recipe[]> {
    const data = await this.fetchData<MealResponse>(`/filter.php?i=${encodeURIComponent(ingredient)}`);
    return data.meals || [];
  }

  // Get all categories
  async getCategories(): Promise<CategoriesResponse> {
    return await this.fetchData<CategoriesResponse>('/categories.php');
  }

  // Get all areas/cuisines
  async getAreas(): Promise<{meals: {strArea: string}[]}> {
    return await this.fetchData<{meals: {strArea: string}[]}>('/list.php?a=list');
  }

  // Get all ingredients
  async getIngredients(): Promise<IngredientsResponse> {
    return await this.fetchData<IngredientsResponse>('/list.php?i=list');
  }

  // Advanced search with multiple filters
  async searchWithFilters(query: string, filters: {
    category?: string;
    area?: string;
    ingredient?: string;
  }): Promise<Recipe[]> {
    let recipes: Recipe[] = [];

    // Priority search logic
    if (filters.ingredient) {
      recipes = await this.getRecipesByIngredient(filters.ingredient);
    } else if (filters.category) {
      recipes = await this.getRecipesByCategory(filters.category);
    } else if (filters.area) {
      recipes = await this.getRecipesByArea(filters.area);
    } else if (query) {
      recipes = await this.searchByName(query);
    } else {
      recipes = await this.getRandomRecipes(12);
    }

    // Filter results further if multiple criteria
    if (query && recipes.length > 0) {
      const queryLower = query.toLowerCase();
      recipes = recipes.filter(recipe =>
        recipe.strMeal.toLowerCase().includes(queryLower) ||
        recipe.strInstructions.toLowerCase().includes(queryLower) ||
        recipe.strTags?.toLowerCase().includes(queryLower)
      );
    }

    return recipes;
  }
}

export const recipeAPI = new RecipeAPI();