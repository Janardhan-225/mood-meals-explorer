import React, { useState, useEffect, memo } from 'react';
import { Search, X } from 'lucide-react';
import { debounce } from '@/utils/helpers';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  placeholder?: string;
  className?: string;
  compact?: boolean;
}

export const SearchBar = memo(({ 
  value, 
  onChange, 
  onSearch, 
  placeholder = "Search recipes...",
  className = "",
  compact = false
}: SearchBarProps) => {
  const [localValue, setLocalValue] = useState(value);
  
  const debouncedSearch = debounce((searchValue: string) => {
    onChange(searchValue);
    if (searchValue.trim()) {
      onSearch(searchValue.trim());
    }
  }, 300);

  useEffect(() => {
    debouncedSearch(localValue);
  }, [localValue]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localValue.trim()) {
      onSearch(localValue.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`search-bar relative ${className}`}>
      <div className="relative flex items-center">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground ${compact ? 'w-4 h-4' : 'w-5 h-5'}`} />
        <input
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          placeholder={placeholder}
          className={`
            w-full bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-xl text-foreground placeholder:text-muted-foreground transition-all duration-200
            ${compact 
              ? 'pl-10 pr-10 py-2 text-sm' 
              : 'pl-12 pr-12 py-4 text-lg'
            }
          `}
        />
        {localValue && (
          <button
            type="button"
            onClick={handleClear}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted/20 ${compact ? 'w-4 h-4' : 'w-5 h-5'}`}
          >
            <X className="w-full h-full" />
          </button>
        )}
      </div>
    </form>
  );
});

SearchBar.displayName = 'SearchBar';