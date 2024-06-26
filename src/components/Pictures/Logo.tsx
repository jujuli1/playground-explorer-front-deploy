import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import logo from '../../assets/logo.svg';
import { setSearchValue } from '../../store/slice/searchSlice';

const Logo: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const resetSearchValue = () => {
    dispatch(setSearchValue(''));
    navigate('/');
    if (window.location.pathname === '/') {
      window.location.reload();
    }
  };

  return (
    <button type="button" onClick={resetSearchValue} className="cursor-pointer">
      <img
        src={logo}
        alt="PlaygroundExplorer logo"
        className="h-12 w-12 rounded-full bg-background p-1 transition-all duration-300 ease-in-out hover:scale-105"
      />
    </button>
  );
};

export default Logo;
