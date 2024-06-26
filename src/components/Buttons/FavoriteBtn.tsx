import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import Toast from '../Toast/Toast';
import { User } from '../../@types/user';
import { login, setPlaygroundsFavorite } from '../../store/slice/userSlice';

interface FavoriteBtnProps {
  playgroundId: number;
}

const FavoriteBtn: React.FC<FavoriteBtnProps> = ({ playgroundId }) => {
  const dispatch = useAppDispatch();

  const favoritePlaygrounds = useAppSelector(
    (state) => state.user.favoritePlaygrounds
  );
  const [favoriteIcon, setFavoriteIcon] = useState(
    favoritePlaygrounds.some((p: any) => p.id === playgroundId)
  );

  const accessToken = useAppSelector((state) => state.user.accessToken);
  const refreshToken = useAppSelector((state) => state.user.refreshToken);
  const logged = useAppSelector((state) => state.user.logged);

  const [isToastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    setFavoriteIcon(
      favoritePlaygrounds.some((p: any) => p.id === playgroundId)
    );
  }, [playgroundId, favoritePlaygrounds]);

  const modifyFavorites = async (method: 'POST' | 'DELETE') => {
    const userData = jwtDecode<User>(accessToken as string);

    const url = `https://playground-explorer-back-api-2c0b9098656f.herokuapp.com/api/users/${userData.userId}/playgrounds/${playgroundId}`;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await axios(url, options);
      if (response.status === 200) {
        const refreshResponse = await axios.post(
          'https://playground-explorer-back-api-2c0b9098656f.herokuapp.com/refresh',
          { refreshToken },
          { headers: { 'Content-Type': 'application/json' } }
        );

        dispatch(
          login({
            accessToken: refreshResponse.data.accessToken,
            refreshToken: refreshResponse.data.refreshToken,
          })
        );

        localStorage.setItem('accessToken', refreshResponse.data.accessToken);
        localStorage.setItem('refreshToken', refreshResponse.data.refreshToken);

        setFavoriteIcon(method === 'POST');
        setToastMessage(
          method === 'POST'
            ? 'Aire ajoutée aux favoris'
            : 'Aire retirée des favoris'
        );
        setToastOpen(true);
        // query favorite playgrounds to update the store
        const favoritePlaygroundsResponse = await axios.get(
          `https://playground-explorer-back-api-2c0b9098656f.herokuapp.com/api/users/${userData.userId}/playgrounds`,
          {
            headers: {
              Authorization: `Bearer ${refreshResponse.data.accessToken}`,
            },
          }
        );
        console.log(favoritePlaygroundsResponse.data);
        dispatch(setPlaygroundsFavorite(favoritePlaygroundsResponse.data));
      }
    } catch (error) {
      console.error('Error modifying favorites:', error);
      setToastMessage('Une erreur est survenue');
      setToastOpen(true);
    }
  };

  const handleFavoriteClick = () => {
    if (!logged) {
      setToastMessage(
        'Vous devez vous connecter pour ajouter une aire aux favoris'
      );
      setToastOpen(true);
      return;
    }
    if (favoriteIcon) {
      modifyFavorites('DELETE');
    } else {
      modifyFavorites('POST');
    }
  };

  return (
    <div className="flex flex-row-reverse p-4 ">
      <Toast
        isOpen={isToastOpen}
        message={toastMessage}
        onClose={() => setToastOpen(false)}
      />
      <button
        type="button"
        onClick={handleFavoriteClick}
        aria-label="ajouter ou retirer des favoris"
      >
        <Icon
          className={`text-${favoriteIcon ? 'accent' : 'bg'} size-12 border-accent hover:text-accent`}
          icon="ph:star-fill"
        />
      </button>
    </div>
  );
};

export default FavoriteBtn;
