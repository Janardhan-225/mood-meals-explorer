import React, { useState } from 'react';
import { CUISINES } from '@/utils/helpers';
import { MapPin, Globe } from 'lucide-react';

/**
 * @interface CuisineMapProps
 * @description Props for the CuisineMap component.
 * @property {function(string): void} onCuisineSelect - Callback function to handle cuisine selection.
 * @property {string} [selectedCuisine] - The currently selected cuisine, used for highlighting.
 */
interface CuisineMapProps {
  onCuisineSelect: (cuisine: string) => void;
  selectedCuisine?: string;
}

/**
 * @component CuisineMap
 * @description Displays a grid of world cuisines, allowing users to select a cuisine.
 * It highlights the selected cuisine and provides a visual cue on hover.
 * @param {CuisineMapProps} props - The props for the component.
 * @returns {JSX.Element} A React functional component.
 */
export function CuisineMap({ onCuisineSelect, selectedCuisine }: CuisineMapProps) {
  // State to manage which cuisine is currently being hovered over, for dynamic UI feedback.
  const [hoveredCuisine, setHoveredCuisine] = useState<string | null>(null);

  return (
    <div className="glass-card animate-fade-in">
      {/* Section Header: Title and Icon */}
      <div className="flex items-center gap-3 mb-6">
        <Globe className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-playfair font-bold">Explore World Cuisines</h2>
      </div>

      {/* Cuisine Grid: Renders a list of cuisine buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {CUISINES.map((cuisine) => (
          <button
            key={cuisine.code} // Unique key for each cuisine button
            onClick={() => onCuisineSelect(cuisine.name)} // Handles selection of a cuisine
            onMouseEnter={() => setHoveredCuisine(cuisine.name)} // Sets hovered cuisine for visual feedback
            onMouseLeave={() => setHoveredCuisine(null)} // Clears hovered cuisine
            className={`
              glass-card p-4 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg
              ${selectedCuisine === cuisine.name 
                ? 'ring-2 ring-primary bg-primary/10' // Styling for selected cuisine
                : 'hover:bg-primary/5' // Styling for unselected cuisine on hover
              }
            `}
          >
            {/* Cuisine Flag and Name */}
            <div className="text-3xl mb-2">{cuisine.flag}</div>
            <div className="text-sm font-medium">{cuisine.name}</div>
            
            {/* Explore Hint: Shown only when hovering over a cuisine */}
            {hoveredCuisine === cuisine.name && (
              <div className="mt-2 flex items-center justify-center gap-1 text-primary">
                <MapPin className="w-3 h-3" />
                <span className="text-xs">Explore</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Informational Tip */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground text-center">
          <span className="font-medium">Tip:</span> Click on any country to discover authentic recipes from that region
        </p>
      </div>
    </div>
  );
}