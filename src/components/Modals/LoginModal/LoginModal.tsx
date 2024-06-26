import React, { useState } from 'react';
import axios from 'axios';
import { useAppDispatch } from '../../../hooks/redux';
import { login } from '../../../store/slice/userSlice';
import Toast from '../../Toast/Toast';
import Spinner from '../../Spinner/Spinner';
import BtnPrimary from '../../Buttons/PrimaryBtn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  // dispatch function to update the user state
  const dispatch = useAppDispatch();

  // state for the toast message
  const [isToastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  // state for the loading spinner, default value is false
  const [loading, setLoading] = useState(false);

  // state for the credentials, default value is an empty string
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  // function to handle the input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // get the name and value from the input
    const { name, value } = e.target;
    // update the credentials state with the new value
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // function to handle the form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // set loading to true
    setLoading(true);
    // prevent the default form submission
    e.preventDefault();
    try {
      // send a post request to the login endpoint with the credentials
      const response = await axios.post(
        'https://playground-explorer-back-api-2c0b9098656f.herokuapp.com/login',
        credentials
      );
      dispatch(
        login({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        })
      );

      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);

      onClose();
    } catch (error) {
      // if there is an error, set loading to false and display a toast message
      setLoading(false);
      setToastOpen(true);
      setToastMessage("Nom d'utilisateur ou mot de passe incorrect.");
    }
  };
  // if the modal is not open, return null
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 h-full w-full bg-gray-600 bg-opacity-50">
      {/* display the spinner if there is a loading */}
      {loading && <Spinner />}
      <div className="relative left-1/2 top-1/2 w-80 -translate-x-1/2 -translate-y-1/2 transform rounded-3xl border bg-background p-1 text-text shadow-xl">
        <div className="modal-content">
          <div className="absolute right-4 top-4">
            <button
              onClick={onClose}
              type="button"
              className="right-1 top-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-primary text-white transition-all duration-300 ease-in-out hover:bg-text hover:shadow-xl"
            >
              ✖
            </button>
          </div>
          <h2 className="mb-2 mt-10 px-6 text-2xl font-bold">Se connecter</h2>
          <p className="mb-6 px-6 text-sm">
            {' '}
            Connectez-vous pour accéder à votre compte.
          </p>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <fieldset className="flex flex-col px-6">
              <label htmlFor="username" className="mb-1">
                Nom d&apos;utilisateur
              </label>
              <input
                id="username"
                name="username"
                className="input-none mb-3 rounded-md border-2 border-gray-300 py-0.5 pl-2 shadow-md focus:border-slate-500 focus:text-text focus:outline-none"
                value={credentials.username}
                onChange={handleChange}
                required
              />
            </fieldset>
            <fieldset className="flex flex-col px-6">
              <label htmlFor="password" className="mb-1">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="input-none mb-3 rounded-md border-2 border-gray-300 py-0.5 pl-2 shadow-md focus:border-slate-500 focus:text-text focus:outline-none"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </fieldset>
            <BtnPrimary
              text="Se connecter"
              color="primary"
              hoverColor="bg-secondary hover:bg-secondary-600"
              type="submit"
              onClick={() => {}}
            />
          </form>
          <div className="btn-google">
            <button
              className="mx-auto mb-8 mt-5 flex h-12 w-fit items-center justify-between border border-text bg-background px-2 py-1 text-text shadow-md transition-all duration-300 ease-in-out  hover:bg-text hover:text-primary hover:shadow-xl"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.98em"
                height="2em"
                viewBox="0 0 256 262"
                className="pr-1"
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
              <p>Se connecter avec google</p>
            </button>
          </div>
        </div>
      </div>
      {/* Display toast if necessary */}
      <Toast
        isOpen={isToastOpen}
        message={toastMessage}
        onClose={() => setToastOpen(false)}
      />
      ;
    </div>
  );
};

export default LoginModal;
