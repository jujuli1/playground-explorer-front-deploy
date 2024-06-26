import React from 'react';
import { useAppDispatch } from '../../hooks/redux';
import SearchBar from './SearchBar';
import BurgerMenu from './BurgerMenu';
import LogoHeader from '../Pictures/Logo';
import { setSearchValue } from '../../store/slice/searchSlice';

const Header: React.FC = () => {
  // Dispatch function to update the search value in the store
  const dispatch = useAppDispatch();
  // Function to handle the search bar submission
  const handleSearchSubmitted = (search: string) => {
    // Dispatch the search value to the store
    dispatch(setSearchValue(search));
  };

  return (
    // Header component with logo, search bar, connect button, and burger menu
    <header className="fixed z-50 flex w-full justify-between bg-primary px-2 py-3 text-background shadow-lg md:gap-10 md:p-4 md:px-8 xl:px-10">
      <LogoHeader />
      {/* Search bar with display prop set to true can be false to hide */}
      <SearchBar display onSearch={handleSearchSubmitted} />
      <div className="flex sm:gap-4">
        <BurgerMenu />
      </div>
    </header>
  );
};

export default Header;
