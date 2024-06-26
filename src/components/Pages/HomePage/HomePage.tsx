/* eslint-disable react/no-unescaped-entities */ import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Correct import for jwtDecode
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { login, setPlaygroundsFavorite } from '../../../store/slice/userSlice';
import Pictures from '../../Pictures/3pictures';
import PlaygroundsResults from '../../SearchResults/SearchResults';
import Spinner from '../../Spinner/Spinner';
import Toast from '../../Toast/Toast';
import logoLanding from '../../../assets/logoLanding.svg';
import { PlaygroundData } from '../../../@types/playground';
import { User } from '../../../@types/user';

const HomePage: React.FC = () => {
  const nbPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isToastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [playgroundsData, setPlaygroundsData] = useState<PlaygroundData | null>(
    null
  );
  const searchValue = useAppSelector((state) => state.search.value);
  const dispatch = useAppDispatch();

  const refreshTokens = useCallback(async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return null;

    const response = await axios.post(
      'https://playground-explorer-back-api-2c0b9098656f.herokuapp.com/refresh',
      { refreshToken },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const tokens = {
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
    };
    dispatch(login(tokens));
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    return tokens.accessToken;
  }, [dispatch]);

  const fetchFavoritePlaygrounds = useCallback(
    async (accessToken: string) => {
      try {
        const decodedToken = jwtDecode<User>(accessToken);
        const { userId } = decodedToken;
        const getFavoritePlaygrounds = await axios.get(
          `https://playground-explorer-back-api-2c0b9098656f.herokuapp.com/api/users/${userId}/playgrounds`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        dispatch(setPlaygroundsFavorite(getFavoritePlaygrounds.data));
      } catch (error) {
        console.error('Error fetching favorite playgrounds:', error);
        setToastMessage('Failed to fetch favorite playgrounds');
        setToastOpen(true);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const fetchPlaygrounds = async () => {
      if (!searchValue.trim()) return;

      setLoading(true);

      try {
        const response = await axios.get(
          `https://playground-explorer-back-api-2c0b9098656f.herokuapp.com/api/search`,
          {
            params: {
              query: searchValue.trim(),
              page: currentPage,
              limit: nbPerPage,
            },
          }
        );

        setPlaygroundsData({
          total_count: response.data.total_count,
          playgrounds: response.data.playgrounds,
        });
        if (response.data.playgrounds.length === 0) {
          setToastMessage('No playgrounds found');
          setToastOpen(true);
        }

        const accessToken = await refreshTokens();
        // Fetch favorite playgrounds after updating search results
        if (accessToken) {
          fetchFavoritePlaygrounds(accessToken);
        }
      } catch (error) {
        console.error('Error fetching playgrounds:', error);
        setToastMessage('Failed to fetch playgrounds');
        setToastOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaygrounds();
  }, [searchValue, currentPage, refreshTokens, fetchFavoritePlaygrounds]);

  const lastPageNumber = Math.ceil(
    (playgroundsData?.total_count ?? 0) / nbPerPage
  );

  const handlePreviousPage = () => setCurrentPage(currentPage - 1);
  const handleNextPage = () => setCurrentPage(currentPage + 1);

  return (
    <main className="flex h-full flex-col gap-20 bg-background px-2 pb-12 pt-6 text-text md:px-8  lg:px-20">
      {/* Display the spinner if there is a loading */}
      {loading && <Spinner />}
      <section className="flex flex-col gap-1">
        {/* Display results */}
        <PlaygroundsResults
          total_count={playgroundsData?.total_count}
          items={playgroundsData?.playgrounds || []}
        />
        <div className="flex">
          {/* Display pagination buttons */}
          {currentPage > 1 && (
            <div className="flex items-center justify-center gap-4 py-4">
              <button
                type="button"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <div className="flex">
                  <p>Page précédente</p>
                  <Icon
                    className="size-7 text-accent"
                    icon="simple-line-icons:arrow-left"
                  />
                </div>
              </button>
            </div>
          )}
          {playgroundsData?.total_count && (
            <div className="flex items-center justify-center gap-4 py-4">
              <p>
                {currentPage} / {lastPageNumber}
              </p>
            </div>
          )}

          {lastPageNumber > currentPage && (
            <div className="flex items-center justify-center gap-4 py-4">
              <button
                type="button"
                onClick={handleNextPage}
                disabled={lastPageNumber === 1}
              >
                <div className="flex">
                  <Icon
                    className="size-7 text-accent"
                    icon="simple-line-icons:arrow-right"
                  />
                  <p>Page suivante</p>
                </div>
              </button>
            </div>
          )}
        </div>
      </section>
      <section className="flex flex-col gap-2 text-4xl">
        <img
          src={logoLanding}
          alt="logo"
          className="mx-auto size-2/3 md:size-1/4"
        />
        <h1 className="px-2 font-title text-3xl">
          La plateforme ultime pour les familles en quête d'aventures et de jeux
          !
        </h1>
      </section>
      <section className="flex flex-col md:flex-row md:gap-10">
        <div className="flex w-11/12 flex-col gap-y-8 px-2 md:w-3/5 md:gap-10">
          <p>
            Explorez un monde de divertissement sans limites pour vos enfants
            grâce à PlaygroundExplorer, votre guide ultime des aires de jeux !
          </p>
          <p>
            {
              " 🌟 Découvrez des joyaux cachés près de chez vous : Parcs ludiques, terrains de jeux innovants, et espaces verts sécurisés - nous répertorions les meilleures destinations pour des heures d'amusement en plein air."
            }
          </p>
          <p>
            {
              "🚀 Facile à utiliser, plus de tracas : Notre plateforme conviviale vous permet de trouver rapidement et facilement des aires de jeux adaptées à l'âge de vos enfants, à vos préférences et à votre localisation. "
            }
          </p>
          <p>
            🏰 Des informations essentielles à portée de clic : Consultez des
            avis authentiques, des photos et des descriptions détaillées pour
            planifier vos prochaines aventures ludiques en famille.
          </p>
          <p>
            🎉 Lancez-vous dans une aventure pleine de rires et de découvertes
            avec Playground Explorer ! Faites votre première recherche et
            rejoignez-nous dès maintenant!
          </p>
        </div>
        {/* Display the pictures */}
        <Pictures />
        {/* Display the toast when call */}
        <Toast
          isOpen={isToastOpen}
          message={toastMessage}
          onClose={() => setToastOpen(false)}
        />
      </section>
    </main>
  );
};

export default HomePage;
