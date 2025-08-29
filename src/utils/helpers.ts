import { Recipe, ParsedIngredient } from '@/types/recipe';

export function parseIngredients(recipe: Recipe): ParsedIngredient[] {
  const ingredients: ParsedIngredient[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}` as keyof Recipe] as string;
    const measure = recipe[`strMeasure${i}` as keyof Recipe] as string;

    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure?.trim() || ''
      });
    }
  }

  return ingredients;
}

export function getYouTubeEmbedUrl(youtubeUrl?: string): string | null {
  if (!youtubeUrl) return null;

  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = youtubeUrl.match(regex);

  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }

  return null;
}

export function estimateCookingTime(instructions: string | null | undefined): string {
  const instructionsLower = (instructions || '').toLowerCase();
  
  // Look for time indicators
  const timePatterns = [
    /(\d+)\s*hours?/g,
    /(\d+)\s*hrs?/g,
    /(\d+)\s*minutes?/g,
    /(\d+)\s*mins?/g
  ];

  let totalMinutes = 0;

  timePatterns.forEach(pattern => {
    const matches = instructionsLower.matchAll(pattern);
    for (const match of matches) {
      const num = parseInt(match[1]);
      if (pattern.source.includes('hour') || pattern.source.includes('hr')) {
        totalMinutes += num * 60;
      } else {
        totalMinutes += num;
      }
    }
  });

  if (totalMinutes === 0) {
    // Estimate based on complexity
    // Removed incorrect usage of parseIngredients as it requires a full Recipe object
    const instructionLength = (instructions || '').length;
    
    if (instructionLength < 300) {
      return '15-30 mins';
    } else if (instructionLength < 600) {
      return '30-45 mins';
    } else {
      return '45-60 mins';
    }
  }

  if (totalMinutes <= 15) return '15 mins';
  if (totalMinutes <= 30) return '30 mins';
  if (totalMinutes <= 60) return '1 hour';
  return `${Math.ceil(totalMinutes / 60)} hours`;
}

export function categorizeByMood(recipe: Recipe): string[] {
  const categories: string[] = [];
  const name = recipe.strMeal ? recipe.strMeal.toLowerCase() : '';
  const instructions = recipe.strInstructions ? recipe.strInstructions.toLowerCase() : '';
  const tags = recipe.strTags ? recipe.strTags.toLowerCase() : '';
  const category = recipe.strCategory ? recipe.strCategory.toLowerCase() : '';

  // Comfort food indicators
  if (
    name.includes('soup') ||
    name.includes('stew') ||
    name.includes('pasta') ||
    name.includes('mac') ||
    name.includes('cheese') ||
    name.includes('casserole') ||
    category.includes('comfort')
  ) {
    categories.push('comfort');
  }

  // Quick meal indicators
  if (
    name.includes('quick') ||
    name.includes('easy') ||
    name.includes('simple') ||
    tags.includes('quick') ||
    instructions.length < 300
  ) {
    categories.push('quick');
  }

  // Healthy indicators
  if (
    name.includes('salad') ||
    name.includes('grilled') ||
    name.includes('steamed') ||
    tags.includes('healthy') ||
    tags.includes('light') ||
    category.includes('seafood')
  ) {
    categories.push('healthy');
  }

  // Party food indicators
  if (
    name.includes('party') ||
    name.includes('dip') ||
    name.includes('appetizer') ||
    name.includes('wings') ||
    name.includes('nachos') ||
    category.includes('starter')
  ) {
    categories.push('party');
  }

  // Exotic indicators
  if (
    recipe.strArea && 
    recipe.strArea !== 'British' &&
    recipe.strArea !== 'American' &&
    !['beef', 'chicken', 'pork'].includes(category)
  ) {
    categories.push('exotic');
  }

  return categories.length > 0 ? categories : ['comfort'];
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const CUISINES = [
  { name: 'Italian', code: 'IT', flag: '🇮🇹' },
  { name: 'Mexican', code: 'MX', flag: '🇲🇽' },
  { name: 'Indian', code: 'IN', flag: '🇮🇳' },
  { name: 'Chinese', code: 'CN', flag: '🇨🇳' },
  { name: 'Japanese', code: 'JP', flag: '🇯🇵' },
  { name: 'French', code: 'FR', flag: '🇫🇷' },
  { name: 'Thai', code: 'TH', flag: '🇹🇭' },
  { name: 'Greek', code: 'GR', flag: '🇬🇷' },
  { name: 'Spanish', code: 'ES', flag: '🇪🇸' },
  { name: 'Turkish', code: 'TR', flag: '🇹🇷' },
  { name: 'American', code: 'US', flag: '🇺🇸' },
  { name: 'British', code: 'GB', flag: '🇬🇧' }
];