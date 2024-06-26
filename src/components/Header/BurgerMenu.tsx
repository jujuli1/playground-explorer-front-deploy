/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../store/slice/userSlice';
import AnimatedUnderlineLink from '../Buttons/LinkBtn';
import Modal from '../Modals/LoginModal/LoginModal';
import Toast from '../Toast/Toast';

const BurgerMenu = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.user.logged);

  // states for the modal and toast
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isToastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Hover state for the links
  const [isHovered, setIsHovered] = useState(false);

  // Animation for the hover state of the links
  const underlineAnimation = useSpring({
    width: isHovered ? '100%' : '0%',
    config: { duration: 300 },
  });

  /* Animation states for burger menu lines */
  const firstLine = useSpring({
    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
    marginTop: isOpen ? '10px' : '0px',
  });
  const secondLine = useSpring({
    opacity: isOpen ? 0 : 1,
  });
  const thirdLine = useSpring({
    transform: isOpen ? 'rotate(-45deg)' : 'rotate(0deg)',
    marginBottom: isOpen ? '10px' : '0px',
  });

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    if (isLoggedIn) {
      setToastOpen(true);
      setToastMessage('Vous êtes connecté');
    }
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  const handleDeconnect = () => {
    dispatch(logout());

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    handleCloseMenu();
    setToastOpen(true);
    setToastMessage('Vous êtes déconnecté');

    window.location.reload();
  };

  return (
    // Burger menu component with links for desktop and mobile
    <div className="flex cursor-pointer items-center self-center">
      {/* Burger menu button for mobile */}
      <button
        className="flex h-6 w-8 flex-col items-center justify-between self-center xl:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Burger menu lines */}
        <animated.div
          style={firstLine}
          className="h-0.5 w-6 rounded-full bg-background transition-all duration-100 ease-in-out"
        />
        <animated.div
          style={secondLine}
          className="h-0.5 w-6 rounded-full bg-background transition-all duration-100 ease-in-out"
        />
        <animated.div
          style={thirdLine}
          className="h-0.5 w-6 rounded-full bg-background transition-all duration-100 ease-in-out"
        />
      </button>
      {/* Links for dektop version  */}
      <ul className="hidden flex-row gap-8 xl:flex">
        {!isLoggedIn ? (
          <li className="relative inline-block">
            <AnimatedUnderlineLink href="" onClick={openModal}>
              Se connecter
            </AnimatedUnderlineLink>
          </li>
        ) : (
          <>
            <li className="relative inline-block">
              <AnimatedUnderlineLink href="" onClick={handleDeconnect}>
                Déconnexion
              </AnimatedUnderlineLink>
            </li>
            <li className="relative inline-block">
              <AnimatedUnderlineLink href="">
                <Link to="/myAccount/">Mon compte</Link>
              </AnimatedUnderlineLink>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <li className="relative inline-block">
            <AnimatedUnderlineLink href="">
              <Link to="/signup">S&apos;inscrire</Link>
            </AnimatedUnderlineLink>
          </li>
        )}
        <li className="relative inline-block">
          <AnimatedUnderlineLink href="/contact">
            <Link to="/contact">Contact</Link>
          </AnimatedUnderlineLink>
        </li>
      </ul>

      {/* Mobile menu that appears below header */}
      {isOpen && (
        <nav className="fixed inset-0 top-14 z-30 mt-4 flex list-none flex-col items-center gap-y-6 bg-background p-4 md:top-16 lg:top-20 xl:hidden">
          {!isLoggedIn ? (
            <li className="w-full text-center text-2xl text-primary">
              <Link
                onClick={() => {
                  handleCloseMenu();
                  openModal();
                }}
                to="#"
              >
                Connexion
              </Link>
            </li>
          ) : (
            <button
              className="w-full text-center text-2xl text-primary"
              onClick={handleDeconnect}
            >
              Déconnexion
            </button>
          )}
          {!isLoggedIn && (
            <li className="w-full text-center text-2xl text-primary">
              <Link onClick={handleCloseMenu} to="/signup">
                S&apos;inscrire
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <button className="w-full text-center text-2xl text-primary">
              <Link onClick={handleCloseMenu} to="/myAccount">
                Mon compte
              </Link>
            </button>
          )}
          <li className="w-full text-center text-2xl text-primary">
            <Link onClick={handleCloseMenu} to="/contact">
              Contact
            </Link>
          </li>
        </nav>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal} />
      <Toast
        isOpen={isToastOpen}
        message={toastMessage}
        onClose={() => setToastOpen(false)}
      />
    </div>
  );
};

export default BurgerMenu;
