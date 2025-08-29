import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { debounce } from '@/utils/helpers';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ 
  value, 
  onChange, 
  onSearch, 
  placeholder = "Search recipes or ingredients...",
  className = ""
}: SearchBarProps) {
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
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <input
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-2xl text-foreground placeholder:text-muted-foreground text-lg"
        />
        {localValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </form>
  );
}