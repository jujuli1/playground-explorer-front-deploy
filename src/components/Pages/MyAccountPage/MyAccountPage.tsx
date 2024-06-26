import React, { useState, useEffect, FormEvent, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BtnPrimary from '../../Buttons/PrimaryBtn';
import Slider from '../../Slider/Slider';
import Toast from '../../Toast/Toast';
import Spinner from '../../Spinner/Spinner';
import { login, setPlaygroundsFavorite } from '../../../store/slice/userSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { User } from '../../../@types/user';
import DeleteAccountModal from '../../Modals/DeleteModal/DeleteModal';

interface UpdatedData {
  username?: string;
  city?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
}

function MyProfile() {
  // dispatch function
  const dispatch = useAppDispatch();
  // get the tokens from the local storage
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  // states for the user data, loading status, toast message, and toast status
  const [userData, setUserData] = useState<User | null>();
  const [loading, setLoading] = useState(false);
  const [isToastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchFavoritePlaygrounds = useCallback(async () => {
    if (refreshToken) {
      try {
        const responseUpdated = await axios.post(
          'https://playground-explorer-back-api-2c0b9098656f.herokuapp.com/refresh',
          { refreshToken },
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );

        dispatch(
          login({
            accessToken: responseUpdated.data.accessToken,
            refreshToken: responseUpdated.data.refreshToken,
          })
        );

        localStorage.setItem('accessToken', responseUpdated.data.accessToken);
        localStorage.setItem('refreshToken', responseUpdated.data.refreshToken);

        const decodedToken = jwtDecode<User>(responseUpdated.data.accessToken);
        const userId = parseInt(decodedToken.userId, 10);

        const { data } = await axios.get(
          `https://playground-explorer-back-api-2c0b9098656f.herokuapp.com/api/users/${userId}/playgrounds`,
          {
            headers: {
              Authorization: `Bearer ${responseUpdated.data.accessToken}`,
            },
          }
        );

        const favoritePlaygroundsSlides = data.map((playground: any) => ({
          playground_id: playground.id,
          url:
            playground.pictures.length > 0 ? playground.pictures[0] : undefined,
          name: playground.name,
        }));

        dispatch(setPlaygroundsFavorite(favoritePlaygroundsSlides));
      } catch (error) {
        throw new Error(`Error fetching favorite playgrounds`);
        // Handle errors appropriately here
      }
    }
  }, [dispatch, refreshToken]);

  const favoritePlaygrounds = useAppSelector(
    (state) => state.user.favoritePlaygrounds
  );
  // function for the slider of favorite playgrounds
  const favIds = favoritePlaygrounds.map((playground: any) => ({
    playground_id: playground.playground_id,
    url: playground.url,
    name: playground.name,
  }));

  useEffect(() => {
    fetchFavoritePlaygrounds();
  }, [fetchFavoritePlaygrounds]);
  // decode the token and set the user data with the decoded Token
  useEffect(() => {
    if (accessToken) {
      const decodedToken = jwtDecode<User>(accessToken);
      setUserData(decodedToken);
    }
  }, [accessToken]);

  // Handle the delete account
  const handleDeleteAccount = async () => {
    // Set the loading to true
    setLoading(true);
    // Try to delete the account
    try {
      // Send a delete request to the API with the user id and the token
      await axios.delete(
        `https://playground-explorer-back-api-2c0b9098656f.herokuapp.com/api/users/${userData?.userId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
      setUserData(null);

      window.location.href = '/';
    } catch (error) {
      throw new Error(`Error deleting account`);
    }
  };

  const handleDeleteAccountClick = () => {
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    handleCloseModal(); // Fermer le modal
    handleDeleteAccount(); // Appeler la fonction existante pour supprimer le compte
  };

  // Handle the update account
  const handleUpdateAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // List of fields to update
      const fields = ['username', 'firstname', 'lastname', 'city', 'email'];
      // Object to store updated data
      const updatedData: UpdatedData = {};

      // Loop through fields and update data
      fields.forEach((field) => {
        // Get input element by id for each field
        const inputElement = document.getElementById(field) as HTMLInputElement;
        // If input element exists and has a value
        if (inputElement && inputElement.value) {
          // Add field and value to updatedData object
          updatedData[field as keyof UpdatedData] = inputElement.value;
        }
      });

      // Send updated data to API with user id and token
      const response = await axios.patch(
        `https://playground-explorer-back-api-2c0b9098656f.herokuapp.com/api/users/${userData?.userId}`,
        updatedData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // If response is successful, update user data
      if (response.status === 200) {
        const responseUpdated = await axios.post(
          'https://playground-explorer-back-api-2c0b9098656f.herokuapp.com/refresh',
          {
            refreshToken,
          },
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );
        dispatch(
          login({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          })
        );
        localStorage.setItem('accessToken', responseUpdated.data.accessToken);
        localStorage.setItem('refreshToken', responseUpdated.data.refreshToken);
        // Update user data with response data
        setUserData(jwtDecode<User>(responseUpdated.data.accessToken) as User);

        // Display toast message
        setToastMessage('Votre compte a bien été modifié !');
        setToastOpen(true);
      }
    } catch (error) {
      // Display toast message
      setToastMessage('Une erreur est survenue!');
      setToastOpen(true);
      throw new Error(`Error updating account`);
    }
  };

  // Handle the click on the update account button
  const handleUpdateAccountClick = () => {
    // Call the handleUpdateAccount function
    handleUpdateAccount({
      // Create a fake event to prevent the default behavior
      preventDefault: () => {},
      // Create a fake target to get the form element
    } as React.FormEvent<HTMLFormElement>);
  };

  return (
    <div className="container mx-auto ml-0 space-y-8 p-4 md:ml-16">
      {/* Display the spinner if there is a loading */}
      {loading && <Spinner />}
      <header>
        <h1 className="mb-4 mt-10 text-left font-title text-4xl font-bold">
          Bienvenue à toi,{' '}
          <span
            className="
            font-semibold text-primary first-letter:uppercase
          "
          >
            {userData?.firstname}
          </span>{' '}
          ceci est ton aire de jeu personnelle ! 🎉
        </h1>
        <p className="mb-2 mt-10 text-left lg:w-10/12">
          Dans la section dédiée, explore facilement tes aires de jeux préférées
          en faisant défiler de gauche à droite grâce au slider. Tu as la
          possibilité de mettre à jour tes informations personnelles ainsi que
          ton mot de passe dans la section suivante.
        </p>
        <p className="mb-2 mt-4 text-left lg:w-10/12">
          Tu peux également supprimer ton compte si tu le souhaites. Attention,
          cette action est irréversible et tu perdras toutes tes données.
        </p>
        <p className="mb-16 mt-4 text-left lg:w-10/12">
          Si tu as des questions ou des suggestions, n&apos;hésite pas à nous
          contacter via{' '}
          <Link
            to="/contact"
            className="text-primary transition duration-300
            ease-in-out hover:text-text
          "
          >
            le formulaire de contact.
          </Link>
        </p>
      </header>

      <section>
        <h2 className="mb-4 text-center font-title text-3xl font-semibold md:text-left">
          Mes aires préférées
        </h2>
        <p className="mb-6 text-sm font-light">
          Voici les aires de jeux que tu as ajoutées à vos favoris. Tu peux les
          retrouver ici pour les consulter rapidement.
        </p>
        {/* Display the slider with the favorites playgrounds user */}
        <Slider slides={favIds} />
      </section>

      <section>
        <h2 className="mb-4 mt-40 text-left font-title text-2xl font-semibold">
          Mes infos
        </h2>
        <p className="mb-4">
          Dans ce formulaire, tu peux modifier ou voir tes informations
          personnelles. Modifies les champs ci-dessous pour actualiser les
          détails de ton compte.
        </p>
        <p>
          Pour changer ton mot de passe, saisis ton nouveau mot de passe dans
          les champs ci-dessous.
        </p>
        <form className="mt-6 w-full md:w-1/2" onSubmit={handleUpdateAccount}>
          <div className="mb-4">
            <label htmlFor="username" className="mb-1 block text-lg">
              Nom d&apos;utilisateur<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="username"
              minLength={2}
              maxLength={30}
              className="input-none w-full rounded-md border-2 border-gray-300 py-0.5 pl-2 shadow-md focus:border-slate-500 focus:outline-none"
              placeholder={userData?.username}
              required
            />
          </div>
          <div className="flex w-full gap-x-6">
            <div className="w-full">
              <label htmlFor="firstname" className="mb-1 block text-lg">
                Prénom<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstname"
                minLength={2}
                maxLength={30}
                className="input-none w-full rounded-md border-2 border-gray-300 py-0.5 pl-2 shadow-md focus:border-slate-500 focus:outline-none"
                placeholder={userData?.firstname}
                required
              />
            </div>
            <div className="w-full">
              <label htmlFor="lastname" className="mb-1 block text-lg">
                Nom<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastname"
                minLength={2}
                maxLength={30}
                className="input-none w-full rounded-md border-2 border-gray-300 py-0.5 pl-2 shadow-md focus:border-slate-500 focus:outline-none"
                placeholder={userData?.lastname}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="city" className="mb-1 block text-lg">
              Ville favorite<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="city"
              className="input-none w-full rounded-md border-2 border-gray-300 py-0.5 pl-2 shadow-md focus:border-slate-500 focus:outline-none"
              placeholder={userData?.city}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="mb-1 block text-lg">
              E-mail<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              minLength={2}
              maxLength={50}
              placeholder={userData?.email}
              className="input-none w-full rounded-md border-2 border-gray-300 py-0.5 pl-2 shadow-md focus:border-slate-500 focus:outline-none"
              required
            />
          </div>

          <div className="border-b-2 border-dashed border-primary border-opacity-30">
            <label htmlFor="password" className="mb-1 block text-lg">
              Mot de passe<span className="text-red-500">*</span>
            </label>
            <p className="mb-1 ml-1 text-xs font-light antialiased">
              Ton mot de passe doit contenir au moins 8 caractères, dont une
              majuscule, une minuscule, et un chiffre.
            </p>
            <input
              type="password"
              id="password"
              placeholder="********"
              className="input-none mb-3 w-full rounded-md border-2 border-gray-300 py-0.5 pl-2 shadow-md focus:border-slate-500 focus:outline-none"
              // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Doit contenir au moins 8 caractères, dont une majuscule, une minuscule, et un chiffre."
              required
            />
            <p className="mb-1 ml-1 text-xs font-light antialiased">
              Merci de saisir le même mot de passe pour confirmer les
              modifications.
            </p>
            <input
              type="password"
              id="confirm-password"
              placeholder="********"
              className="input-none mb-8 w-full rounded-md border-2 border-gray-300 py-0.5 pl-2 shadow-md focus:border-slate-500 focus:outline-none"
              // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Doit correspondre au mot de passe entré ci-dessus."
              required
            />
          </div>

          <div className="flex flex-col justify-center gap-6 px-4 py-8 lg:flex-row lg:gap-6 lg:px-20">
            <BtnPrimary
              color="primary"
              text="Valider les modifications"
              hoverColor="bg-secondary hover:bg-secondary-600"
              type="submit"
              onClick={handleUpdateAccountClick}
            />
            <BtnPrimary
              color="accent"
              hoverColor="bg-red-500 hover:bg-red-600"
              text="Supprimer le compte"
              type="button"
              onClick={handleDeleteAccountClick}
            />
            <DeleteAccountModal
              isOpen={showDeleteModal}
              onClose={handleCloseModal}
              onConfirmDelete={handleConfirmDelete}
            />
          </div>
        </form>
      </section>
      {/* Display the toast if necessary */}
      <Toast
        isOpen={isToastOpen}
        message={toastMessage}
        onClose={() => setToastOpen(false)}
      />
    </div>
  );
}

export default MyProfile;
