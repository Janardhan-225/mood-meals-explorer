import React from 'react';
import { SearchFilters } from '@/types/recipe';
import { Clock, Utensils, Leaf, Users, Sparkles } from 'lucide-react';

/**
 * @interface FilterChipsProps
 * @description Props for the FilterChips component.
 * @property {SearchFilters} filters - The current active search filters.
 * @property {function(SearchFilters): void} onFilterChange - Callback function to update filters.
 */
interface FilterChipsProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
}

// Options for mood-based filtering, including a key, display label, and associated Lucide icon.
const MOOD_OPTIONS = [
  { key: 'comfort', label: 'Comfort Food', icon: Utensils },
  { key: 'quick', label: 'Quick & Easy', icon: Clock },
  { key: 'healthy', label: 'Healthy', icon: Leaf },
  { key: 'party', label: 'Party Food', icon: Users },
  { key: 'exotic', label: 'Exotic', icon: Sparkles },
] as const;

// Options for cooking time filtering.
const COOKING_TIME_OPTIONS = [
  { key: '15m', label: '15 mins' },
  { key: '30m', label: '30 mins' },
  { key: '1h', label: '1 hour' },
  { key: '>1h', label: '1+ hours' },
] as const;

// Options for diet type filtering.
const DIET_OPTIONS = [
  { key: 'vegetarian', label: 'Vegetarian' },
  { key: 'vegan', label: 'Vegan' },
  { key: 'non-vegetarian', label: 'Non-Vegetarian' },
  { key: 'gluten-free', label: 'Gluten-Free' },
] as const;

/**
 * @component FilterChips
 * @description Renders a collection of filter chips for mood, cooking time, and diet type.
 * Users can select or deselect filters to refine their recipe search.
 * @param {FilterChipsProps} props - The props for the component.
 * @returns {JSX.Element} A React functional component.
 */
export function FilterChips({ filters, onFilterChange }: FilterChipsProps) {
  /**
   * Handles changes to the mood filter.
   * If the selected mood is already active, it unselects it; otherwise, it selects it.
   * @param {string} mood - The mood key to toggle.
   */
  const handleMoodChange = (mood: string) => {
    const newMood = filters.mood === mood ? undefined : mood as SearchFilters['mood'];
    onFilterChange({ ...filters, mood: newMood });
  };

  /**
   * Handles changes to the cooking time filter.
   * If the selected time is already active, it unselects it; otherwise, it selects it.
   * @param {string} time - The cooking time key to toggle.
   */
  const handleCookingTimeChange = (time: string) => {
    const newTime = filters.cookingTime === time ? undefined : time as SearchFilters['cookingTime'];
    onFilterChange({ ...filters, cookingTime: newTime });
  };

  /**
   * Handles changes to the diet type filter.
   * If the selected diet is already active, it unselects it; otherwise, it selects it.
   * @param {string} diet - The diet type key to toggle.
   */
  const handleDietChange = (diet: string) => {
    const newDiet = filters.diet === diet ? undefined : diet as SearchFilters['diet'];
    onFilterChange({ ...filters, diet: newDiet });
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Mood Filters Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Mood</h3>
        <div className="flex flex-wrap gap-3">
          {MOOD_OPTIONS.map(({ key, label, icon: Icon }) => (
            <button
              key={key} // Unique key for each mood filter chip
              onClick={() => handleMoodChange(key)} // Toggles the mood filter
              className={`filter-chip flex items-center gap-2 ${
                filters.mood === key ? 'active' : '' // Applies 'active' class if this mood filter is selected
              }`}
            >
              <Icon className="w-4 h-4" /> {/* Icon associated with the mood */}
              {label} {/* Display label for the mood */}
            </button>
          ))}
        </div>
      </div>

      {/* Cooking Time Filters Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Cooking Time</h3>
        <div className="flex flex-wrap gap-3">
          {COOKING_TIME_OPTIONS.map(({ key, label }) => (
            <button
              key={key} // Unique key for each cooking time filter chip
              onClick={() => handleCookingTimeChange(key)} // Toggles the cooking time filter
              className={`filter-chip flex items-center gap-2 ${
                filters.cookingTime === key ? 'active' : '' // Applies 'active' class if this cooking time filter is selected
              }`}
            >
              <Clock className="w-4 h-4" /> {/* Clock icon for cooking time */}
              {label} {/* Display label for the cooking time */}
            </button>
          ))}
        </div>
      </div>

      {/* Diet Filters Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Diet Type</h3>
        <div className="flex flex-wrap gap-3">
          {DIET_OPTIONS.map(({ key, label }) => (
            <button
              key={key} // Unique key for each diet filter chip
              onClick={() => handleDietChange(key)} // Toggles the diet filter
              className={`filter-chip flex items-center gap-2 ${
                filters.diet === key ? 'active' : '' // Applies 'active' class if this diet filter is selected
              }`}
            >
              <Leaf className="w-4 h-4" /> {/* Leaf icon for diet type */}
              {label} {/* Display label for the diet type */}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}