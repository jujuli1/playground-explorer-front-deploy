import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import LoginModal from '../../Modals/LoginModal/LoginModal';
import Pictures from '../../Pictures/3pictures';
import Toast from '../../Toast/Toast';
import Spinner from '../../Spinner/Spinner';
import BtnPrimary from '../../Buttons/PrimaryBtn';

const Register = () => {
  //Redirection apres inscription réussite
  const navigate = useNavigate();

  // Create a user object with the user's information
  const [user, setUser] = useState({
    email: '',
    username: '',
    firstname: '',
    lastname: '',
    city: '',
    password: '',
    confirm: '',
  });

  // states for the toast and the modal, default values are false
  const [isToastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // states for the loading spinner, default value is false
  const [isModalOpen, setIsModalOpen] = useState(false);

  // states for the loading spinner, default value is false
  const [loading, setLoading] = useState(false);

  // Handle the change of the input fields
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    // Get the name and value of the input field
    const { name, value } = e.target as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;
    // Update the user object with the new value
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle the submission of the form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // Prevent the default behavior of the form
    e.preventDefault();

    const { email, username, firstname, lastname, city, password, confirm } =
      user;

    if (
      !email ||
      !username ||
      !firstname ||
      !lastname ||
      !city ||
      !password ||
      !confirm
    ) {
      setToastMessage('Pensez à bien remplir tout les champs');
      setToastOpen(true);
      return;
    }

    if (password !== confirm) {
      setToastMessage('les mots de passe est différent de la confirmation');
      setToastOpen(true);
    }
    // Set the loading spinner to true
    setLoading(true);
    try {
      // Send a post request to the server with the user object
      const response = await axios.post(
        'https://playground-explorer-back-api-2c0b9098656f.herokuapp.com/register',
        user
      );
      // if the status is 201, the user is registered, display a toast message and redirect to the home page after 1.2 seconds
      if (response.status === 201) {
        setToastMessage('Inscription réussie !');
        setToastOpen(true);
        setTimeout(() => {
          navigate('/');
        }, 1200);
      }
    } catch (error) {
      // if the error is an object and has a response key with a status of 400, display a toast message
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const { response } = error as { response?: { status: number } };
        if (response && response.status === 400) {
          setToastMessage(
            "Erreur lors de l'inscription. Veuillez vérifier vos informations."
          );
          setToastOpen(true);
          setLoading(false);
        }
      }
    }
  };
  // Open and close the modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section>
      {/* Display the spinner if there is a loading */}
      {loading && <Spinner />}
      <div className="absolute right-1/3 top-2/3 hidden h-96 w-96 lg:flex">
        {/* Display the pictures */}
        <Pictures />
      </div>
      <h1 className="px-2 py-2 pt-12 font-title text-4xl font-semibold text-text md:px-8 lg:px-20">
        S&apos;inscrire sur PlaygroundExplorer
      </h1>
      <div className="marketing px-2 py-10 text-lg text-text md:px-8 lg:px-20">
        <p>
          Créez votre compte pour accéder à tous nos services et pouvoir
          profiter des fonctionnalités de notre site tel que la possibilité
          d&apos;ajouter des aires de jeux, de les commenter, de les noter et de
          les mettre en favoris.
        </p>
        <ul className="mt-8 flex list-none flex-col items-center justify-evenly gap-4 lg:flex-row lg:items-start">
          <li className="text-md w-fit rounded-full bg-primary bg-opacity-30 px-4 py-1 text-center shadow-md">
            <span className="flex flex-row items-center gap-x-3 stroke-gray-600 text-text">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className="h-6 w-6"
              >
                <path
                  fill="currentColor"
                  d="M11.5 12.5H6v-1h5.5V6h1v5.5H18v1h-5.5V18h-1z"
                />
              </svg>
              Ajouter des aires de jeux
            </span>
            <span className="sr-only">Ajouter des aires de jeux</span>
          </li>
          <li className="w-fit rounded-full bg-accent bg-opacity-60 px-4 py-1 text-center text-base shadow-md">
            <span className="flex flex-row items-center gap-x-3 stroke-gray-600 text-text">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className="h-6 w-6"
              >
                <path
                  fill="currentColor"
                  d="m8.85 16.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425zm3.15-.723l-3.63 2.192q-.16.08-.297.064q-.136-.016-.265-.095q-.13-.078-.196-.226q-.068-.147-.012-.318l.965-4.11l-3.194-2.77q-.134-.11-.178-.263q-.043-.153.019-.293q.061-.14.165-.23q.104-.088.28-.118l4.216-.368l1.644-3.892q.068-.165.196-.238T12 5.363q.16 0 .288.074t.195.238l1.644 3.892l4.215.368q.177.03.281.119q.104.088.165.229q.062.14.019.293q-.044.153-.178.262l-3.194 2.772l.965 4.11q.056.17-.012.318q-.067.147-.196.225q-.129.08-.265.095q-.137.015-.296-.064zm0-3.852"
                />
              </svg>
              Commenter
            </span>
            <span className="sr-only">Commenter des aires de jeux</span>
          </li>
          <li className="w-fit rounded-full bg-secondary bg-opacity-50 px-4 py-1 text-center text-base shadow-md">
            <span className="flex flex-row items-center gap-x-3 stroke-gray-600 text-text">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 256 256"
                className="h-6 w-6"
              >
                <path
                  fill="currentColor"
                  d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88M80 108a12 12 0 1 1 12 12a12 12 0 0 1-12-12m96 0a12 12 0 1 1-12-12a12 12 0 0 1 12 12m-1.07 48c-10.29 17.79-27.4 28-46.93 28s-36.63-10.2-46.92-28a8 8 0 1 1 13.84-8c7.47 12.91 19.21 20 33.08 20s25.61-7.1 33.07-20a8 8 0 0 1 13.86 8"
                />
              </svg>
              Noter
            </span>
            <span className="sr-only">Noter des aires de jeux</span>
          </li>
          <li className="w-fit rounded-full bg-rose-500 bg-opacity-15 px-4 py-1 text-center text-base shadow-md">
            <span className="flex flex-row items-center gap-x-3 stroke-gray-600 text-text">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className="h-6 w-6"
              >
                <path
                  fill="currentColor"
                  d="M11.98 19.094q-.292 0-.577-.106t-.503-.323L9.752 17.63q-2.67-2.425-4.71-4.717Q3 10.622 3 8.15q0-1.908 1.296-3.204Q5.592 3.65 7.5 3.65q1.094 0 2.279.553q1.184.553 2.221 2.085q1.037-1.532 2.221-2.085q1.185-.553 2.279-.553q1.908 0 3.204 1.296Q21 6.242 21 8.15q0 2.529-2.125 4.862q-2.125 2.332-4.652 4.623l-1.142 1.03q-.218.218-.513.323t-.587.106m-.47-11.767q-.898-1.448-1.867-2.063Q8.675 4.65 7.5 4.65q-1.5 0-2.5 1t-1 2.5q0 1.108.627 2.272q.627 1.165 1.684 2.386q1.056 1.22 2.428 2.498q1.373 1.277 2.857 2.629q.173.153.404.153t.404-.153q1.484-1.352 2.857-2.63q1.372-1.276 2.428-2.497q1.057-1.221 1.684-2.386Q20 9.258 20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2.144.614q-.97.615-1.868 2.063q-.078.135-.213.202T12 7.596t-.275-.067q-.135-.067-.213-.202M12 11.398"
                />
              </svg>
              Mettre en favoris
            </span>
            <span className="sr-only">Mettre en favoris des aires de jeux</span>
          </li>
        </ul>
      </div>
      <form method="POST" onSubmit={handleSubmit} action="/register">
        <p className="marketing text-lg text-text">
          <button
            type="button"
            className="align-items flex cursor-pointer flex-row items-center gap-x-2 px-2 py-2 text-lg text-primary transition-all duration-300 ease-in-out hover:translate-x-1 hover:text-text md:px-8 lg:px-20"
            onClick={openModal}
          >
            <span>Déjà un compte ? Connectez-vous ici!</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14m-6 6l6-6m-6-6l6 6"
              />
            </svg>
          </button>
        </p>
        <div className="relative flex w-full flex-col px-2 py-4 text-text md:px-8 lg:w-1/2 lg:px-20">
          <h2 className="py-2 font-title text-2xl font-bold text-text">
            Formulaire d&apos;inscription
          </h2>
          <p className="text-md mb-2 text-text">
            Créez votre compte pour accéder à tous nos services.
          </p>
          <label htmlFor="username" className="mt-6 pl-1 text-lg">
            Nom d&apos;utilisateur
          </label>{' '}
          <input
            placeholder="John Doe"
            id="username"
            name="username"
            minLength={2}
            maxLength={30}
            value={user.username}
            onChange={handleChange}
            onBlur={handleChange}
            className={`input-none mb-4 rounded-md border-2 border-gray-300 py-0.5 pl-2 shadow focus:border-slate-500 focus:text-text focus:outline-none ${user.username ? 'border-gray-400 text-gray-600' : 'border-gray-200 text-gray-200'}`}
            required
          />
          <label htmlFor="firstname" className="pl-1 text-lg">
            Prénom
          </label>
          <input
            placeholder="John"
            id="firstname"
            name="firstname"
            minLength={2}
            maxLength={30}
            value={user.firstname}
            onChange={handleChange}
            onBlur={handleChange}
            className={`input-none mb-4 rounded-md border-2 border-gray-300 py-0.5 pl-2 shadow focus:border-slate-500 focus:text-text focus:outline-none ${user.firstname ? 'border-gray-400 text-gray-600' : 'border-gray-200 text-gray-200'}`}
            required
          />
          <label htmlFor="lastname" className="pl-1 text-lg">
            Nom
          </label>
          <input
            placeholder="Doe"
            id="lastname"
            name="lastname"
            minLength={2}
            maxLength={30}
            value={user.lastname}
            onChange={handleChange}
            onBlur={handleChange}
            className={`input-none mb-4 rounded-md border-2 border-gray-300 py-0.5 pl-2 shadow focus:border-slate-500 focus:text-text focus:outline-none ${user.lastname ? 'border-gray-400 text-gray-600' : 'border-gray-200 text-gray-200'}`}
            required
          />
          <label htmlFor="city" className="pl-1 text-lg">
            Ville
          </label>
          <input
            placeholder="Paris"
            id="city"
            name="city"
            minLength={2}
            maxLength={50}
            value={user.city}
            onChange={handleChange}
            onBlur={handleChange}
            className={`input-none mb-4 rounded-md border-2 border-gray-300 py-0.5 pl-2 shadow focus:border-slate-500 focus:text-text focus:outline-none ${user.city ? 'border-gray-400 text-gray-600' : 'border-gray-200 text-gray-200'}`}
            required
          />
          <label htmlFor="email" className="pl-1 text-lg">
            Votre email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            minLength={2}
            maxLength={50}
            value={user.email}
            onChange={handleChange}
            onBlur={handleChange}
            placeholder="johndoe@email.es"
            className={`input-none mb-4 rounded-md border-2 border-gray-300 py-0.5 pl-2 shadow focus:border-slate-500 focus:text-text focus:outline-none ${user.email ? 'border-gray-400 text-gray-600' : 'border-gray-200 text-gray-200'}`}
            required
          />
          <div className="flex flex-col">
            <label htmlFor="password" className="pl-1 text-lg">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              minLength={8}
              maxLength={30}
              value={user.password}
              onChange={handleChange}
              onBlur={handleChange}
              placeholder="************"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Minimum 8 caractères sont requis, dont une majuscule, une minuscule, et un chiffre."
              className={`input-none mb-1 rounded-md border-2 border-gray-300 py-0.5 pl-2 shadow focus:border-slate-500 focus:text-text focus:outline-none ${user.password ? 'border-gray-400 text-gray-600' : 'border-gray-200 text-gray-200'}`}
              required
            />
            <input
              id="confirm"
              name="confirm"
              type="password"
              minLength={8}
              maxLength={30}
              value={user.confirm}
              onChange={handleChange}
              onBlur={handleChange}
              placeholder="************"
              className={`input-none mb-4 rounded-md border-2 border-gray-300 py-0.5 pl-2 shadow focus:border-slate-500 focus:text-text focus:outline-none ${user.confirm ? 'border-gray-400 text-gray-600' : 'border-gray-200 text-gray-200'}`}
              required
            />
          </div>
          <div className="mb-1 flex items-center">
            <div className=" relative inline-block h-7 w-12 rounded-full bg-secondary p-1">
              <input
                type="checkbox"
                className="absolute block h-5 w-5 cursor-pointer appearance-none rounded-full bg-white outline-none transition-all duration-300 ease-in-out checked:translate-x-5 checked:bg-blue-500"
              />
            </div>
            <p className="ml-4">
              J&apos;accepte que mes données soient vendues au Diable
            </p>
          </div>
          <div className="flex items-center">
            <div className="relative inline-block h-7 w-12 rounded-full bg-secondary p-1">
              <input
                type="checkbox"
                className="absolute block h-5 w-5 cursor-pointer appearance-none rounded-full bg-white outline-none transition-all duration-300 ease-in-out checked:translate-x-5 checked:bg-blue-500"
              />
            </div>
            <p className="ml-4">
              J&apos;accepte les{' '}
              <Link className="underline " to="/cgu">
                Conditions Générales d&apos;Utilisation
              </Link>
            </p>
          </div>
          <BtnPrimary
            text="Créer son compte"
            color="primary"
            hoverColor="bg-secondary hover:bg-secondary-600"
            type="submit"
            onClick={() => {}}
          />
          <div className="btn-google">
            <button
              className="mx-auto mb-8 mt-8 flex h-12 w-fit items-center justify-between border border-text bg-background px-2 py-1 text-text shadow-md transition-all duration-300 ease-in-out  hover:bg-text hover:text-primary hover:shadow-xl"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 256 262"
                className="h-8 w-8 pr-1"
              >
                <path
                  fill="#4285f4"
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                />
                <path
                  fill="#34a853"
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                />
                <path
                  fill="#fbbc05"
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                />
                <path
                  fill="#eb4335"
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                />
              </svg>
              <p>Créer son compte avec google</p>
            </button>
          </div>
        </div>
      </form>
      {/* Display toast if necessary */}
      <Toast
        isOpen={isToastOpen}
        message={toastMessage}
        onClose={() => setToastOpen(false)}
      />
      {/* Display the LoginModal */}
      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
};

export default Register;
