import React from 'react';
import { SearchFilters } from '@/types/recipe';
import { Clock, Utensils, Leaf, Users, Sparkles } from 'lucide-react';

interface FilterChipsProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
}

const MOOD_OPTIONS = [
  { key: 'comfort', label: 'Comfort Food', icon: Utensils },
  { key: 'quick', label: 'Quick & Easy', icon: Clock },
  { key: 'healthy', label: 'Healthy', icon: Leaf },
  { key: 'party', label: 'Party Food', icon: Users },
  { key: 'exotic', label: 'Exotic', icon: Sparkles },
] as const;

const COOKING_TIME_OPTIONS = [
  { key: '15m', label: '15 mins' },
  { key: '30m', label: '30 mins' },
  { key: '1h', label: '1 hour' },
  { key: '>1h', label: '1+ hours' },
] as const;

const DIET_OPTIONS = [
  { key: 'vegetarian', label: 'Vegetarian' },
  { key: 'vegan', label: 'Vegan' },
  { key: 'non-vegetarian', label: 'Non-Vegetarian' },
  { key: 'gluten-free', label: 'Gluten-Free' },
] as const;

export function FilterChips({ filters, onFilterChange }: FilterChipsProps) {
  const handleMoodChange = (mood: string) => {
    const newMood = filters.mood === mood ? undefined : mood as SearchFilters['mood'];
    onFilterChange({ ...filters, mood: newMood });
  };

  const handleCookingTimeChange = (time: string) => {
    const newTime = filters.cookingTime === time ? undefined : time as SearchFilters['cookingTime'];
    onFilterChange({ ...filters, cookingTime: newTime });
  };

  const handleDietChange = (diet: string) => {
    const newDiet = filters.diet === diet ? undefined : diet as SearchFilters['diet'];
    onFilterChange({ ...filters, diet: newDiet });
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Mood Filters */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Mood</h3>
        <div className="flex flex-wrap gap-3">
          {MOOD_OPTIONS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => handleMoodChange(key)}
              className={`filter-chip flex items-center gap-2 ${
                filters.mood === key ? 'active' : ''
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Cooking Time Filters */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Cooking Time</h3>
        <div className="flex flex-wrap gap-3">
          {COOKING_TIME_OPTIONS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleCookingTimeChange(key)}
              className={`filter-chip flex items-center gap-2 ${
                filters.cookingTime === key ? 'active' : ''
              }`}
            >
              <Clock className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Diet Filters */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Diet Type</h3>
        <div className="flex flex-wrap gap-3">
          {DIET_OPTIONS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleDietChange(key)}
              className={`filter-chip flex items-center gap-2 ${
                filters.diet === key ? 'active' : ''
              }`}
            >
              <Leaf className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}