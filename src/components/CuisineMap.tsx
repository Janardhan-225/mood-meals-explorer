import React, { useState } from 'react';
import { CUISINES } from '@/utils/helpers';
import { MapPin, Globe } from 'lucide-react';

interface CuisineMapProps {
  onCuisineSelect: (cuisine: string) => void;
  selectedCuisine?: string;
}

export function CuisineMap({ onCuisineSelect, selectedCuisine }: CuisineMapProps) {
  const [hoveredCuisine, setHoveredCuisine] = useState<string | null>(null);

  return (
    <div className="glass-card animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <Globe className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-playfair font-bold">Explore World Cuisines</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {CUISINES.map((cuisine) => (
          <button
            key={cuisine.code}
            onClick={() => onCuisineSelect(cuisine.name)}
            onMouseEnter={() => setHoveredCuisine(cuisine.name)}
            onMouseLeave={() => setHoveredCuisine(null)}
            className={`
              glass-card p-4 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg
              ${selectedCuisine === cuisine.name 
                ? 'ring-2 ring-primary bg-primary/10' 
                : 'hover:bg-primary/5'
              }
            `}
          >
            <div className="text-3xl mb-2">{cuisine.flag}</div>
            <div className="text-sm font-medium">{cuisine.name}</div>
            
            {hoveredCuisine === cuisine.name && (
              <div className="mt-2 flex items-center justify-center gap-1 text-primary">
                <MapPin className="w-3 h-3" />
                <span className="text-xs">Explore</span>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground text-center">
          <span className="font-medium">Tip:</span> Click on any country to discover authentic recipes from that region
        </p>
      </div>
    </div>
  );
}