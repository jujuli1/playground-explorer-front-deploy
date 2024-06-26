/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  display: boolean;
  onSearch: (inputValue: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ display, onSearch }) => {
  // state for the search value, default value is an empty string
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  //  function to handle the search bar submission
  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    // prevent the default form submission
    e.preventDefault();
    // call the onSearch function with the search value as an argument
    onSearch(searchValue.trim());

    // redirect to the search page
    navigate('/');
  };

  // if the display prop is false, return null
  if (!display) {
    return null;
  }

  return (
    // Search bar component with input and button elements
    <form
      className="search-bar relative flex w-64 md:w-96"
      onSubmit={handleSearch}
    >
      {/* Input for search bar */}
      <input
        type="text"
        value={searchValue}
        placeholder="Votre emplacement..."
        className="search-input w-full rounded-full bg-background p-3 text-text transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-secondary active:border-secondary"
        id="search-input"
        onChange={(e) => setSearchValue(e.target.value)}
        aria-label="Rechercher une aire de jeux"
      />
      {/* Search button */}
      <label htmlFor="search-input" className="search-label">
        <button
          type="submit"
          className="search-button absolute right-0 flex size-12 items-center justify-center rounded-full border-4 border-background bg-primary text-background transition-all duration-200 ease-in-out hover:-rotate-12 hover:bg-secondary sm:right-0 md:right-0"
          id="search-button"
          aria-label="Rechercher une aire de jeux"
        >
          {/* Search icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="size-7"
            fill="currentColor"
          >
            <path d="M456.69 421.39L362.6 327.3a173.81 173.81 0 0 0 34.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 0 0 327.3 362.6l94.09 94.09a25 25 0 0 0 35.3-35.3M97.92 222.72a124.8 124.8 0 1 1 124.8 124.8a124.95 124.95 0 0 1-124.8-124.8" />
          </svg>
          {/* Search button text for screenreaders */}
          <div className="sr-only">Search</div>
        </button>
      </label>
    </form>
  );
};

export default SearchBar;
