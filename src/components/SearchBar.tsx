import React, { useState, useEffect, memo, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { debounce } from '@/utils/helpers';

/**
 * @interface SearchBarProps
 * @description Props for the SearchBar component.
 * @property {string} value - The current value of the search input.
 * @property {(value: string) => void} onChange - Callback function triggered when the input value changes.
 * @property {(value: string) => void} onSearch - Callback function triggered when a search is initiated (debounced).
 * @property {string} [placeholder="Search recipes..."] - The placeholder text for the search input.
 * @property {string} [className=""] - Additional CSS classes for styling the search bar container.
 * @property {boolean} [compact=false] - If true, renders a more compact version of the search bar.
 */
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  placeholder?: string;
  className?: string;
  compact?: boolean;
}

/**
 * @component SearchBar
 * @description A memoized search input component with debouncing functionality.
 * It allows users to type a query, which is then debounced before triggering a search.
 * Includes a clear button and handles form submission.
 * @param {SearchBarProps} props - The props for the component.
 * @returns {JSX.Element} A React functional component.
 */
export const SearchBar = memo(({
  value,
  onChange,
  onSearch,
  placeholder = "Search recipes...",
  className = "",
  compact = false
}: SearchBarProps) => {
  // State to manage the local input value, allowing immediate UI updates.
  const [localValue, setLocalValue] = useState(value);

  // Using useRef to create a stable debounced function that persists across renders.
  // This prevents the debounce timer from being reset on every re-render.
  const debouncedSearchRef = useRef(debounce((searchValue: string) => {
    // Both onChange and onSearch should ideally be stable (wrapped in useCallback in parent components)
    onChange(searchValue); // Updates the parent component's state with the latest input value
    if (searchValue.trim()) {
      onSearch(searchValue.trim()); // Triggers the actual search after debounce period, if query is not empty
    }
  }, 300)); // Debounce delay of 300 milliseconds

  // Effect to call the debounced search function whenever the local input value changes.
  useEffect(() => {
    debouncedSearchRef.current(localValue);
  }, [localValue]); // Dependency array ensures effect runs only when localValue changes

  // Effect to update localValue when the prop `value` changes from the parent component.
  useEffect(() => {
    setLocalValue(value);
  }, [value]); // Dependency array ensures effect runs only when parent's value prop changes

  /**
   * Handles clearing the search input field.
   * Resets both local and parent component's search values to an empty string.
   */
  const handleClear = () => {
    setLocalValue(''); // Clears local input state
    onChange(''); // Notifies parent to clear its search value
  };

  /**
   * Handles the form submission event.
   * Prevents default form submission behavior and initiates a search if the query is not empty.
   * @param {React.FormEvent} e - The form event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents page reload on form submission
    if (localValue.trim()) {
      onSearch(localValue.trim()); // Initiates an immediate search with the current trimmed value
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`search-bar relative ${className}`}> {/* Search form with submit handler and dynamic classes */}
      <div className="relative flex items-center">
        {/* Search Icon */}
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground ${compact ? 'w-4 h-4' : 'w-5 h-5'}`} />
        <input
          type="text"
          value={localValue} // Controlled input value
          onChange={(e) => setLocalValue(e.target.value)} // Updates local state on input change
          placeholder={placeholder} // Placeholder text
          className={`
            w-full bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-xl text-foreground placeholder:text-muted-foreground transition-all duration-200
            ${compact 
              ? 'pl-10 pr-10 py-2 text-sm' // Compact styling for input padding and text size
              : 'pl-12 pr-12 py-4 text-lg' // Default styling for input padding and text size
            }
          `} // Dynamic styling for input field
        />
        {/* Clear Button (only visible when there's text in the input) */}
        {localValue && (
          <button
            type="button"
            onClick={handleClear} // Attaches clear handler
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted/20 ${compact ? 'w-4 h-4' : 'w-5 h-5'}`}
          > {/* Dynamic styling for clear button */}
            <X className="w-full h-full" /> {/* Close icon for clear button */}
          </button>
        )}
      </div>
    </form>
  );
});

SearchBar.displayName = 'SearchBar'; // Sets display name for React DevTools