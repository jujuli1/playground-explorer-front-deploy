import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import BtnPrimary from '../../Buttons/PrimaryBtn';
import smiley3 from '../../../assets/pictures/smiley/3.svg';
import smiley5 from '../../../assets/pictures/smiley/5.svg';
import smiley4 from '../../../assets/pictures/smiley/4.svg';
import smiley6 from '../../../assets/pictures/smiley/6.svg';
import smiley7 from '../../../assets/pictures/smiley/7.svg';
import Toast from '../../Toast/Toast';
import { User } from '../../../@types/user';

type ModalAvisProps = {
  closeModal: () => void;
};

const ModalAvis: React.FC<ModalAvisProps> = ({ closeModal }) => {
  const [avis, setAvis] = useState<string>('');
  const [value, setValue] = useState<number>(0);
  const [selectedNote, setSelectedNote] = useState<number>(0);
  const [isToastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleSubmit = async () => {
    try {
      if (value === 0) {
        setToastOpen(true);
        setToastMessage('Veuillez sélectionner une note');
        return;
      }

      if (avis === '') {
        setToastOpen(true);
        setToastMessage('Veuillez saisir un avis');
        return;
      }

      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        navigate('/login');
        throw new Error('Vous devez être connecté pour ajouter un avis');
      }
      const responseRefresh = await axios.post(
        'https://playground-explorer-back-api-2c0b9098656f.herokuapp.com/refresh',
        {
          refreshToken,
        }
      );
      localStorage.setItem('accessToken', responseRefresh.data.accessToken);
      localStorage.setItem('refreshToken', responseRefresh.data.refreshToken);

      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        navigate('/login');
        throw new Error('Vous devez être connecté pour ajouter un avis');
      }
      const decodedToken = jwtDecode<User>(accessToken);
      const { userId } = decodedToken;
      if (!userId || !id) {
        throw new Error("Une erreur s'est produite");
      }

      console.log('id', id);
      console.log('userId', userId);
      console.log('value', value);
      console.log('avis', avis);

      const response = await axios.post(
        'https://playground-explorer-back-api-2c0b9098656f.herokuapp.com/api/notices',
        {
          comment: avis,
          rating: value,
          playground_id: `${id}`,
          user_id: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        setToastOpen(true);
        setToastMessage('Votre avis a bien été ajouté. Merci ! 🎉');

        setTimeout(() => {
          closeModal();
          window.location.reload();
        }, 1200);
      } else {
        throw new Error("Une erreur s'est produite");
      }
    } catch (error) {
      throw new Error("Une erreur s'est produite");
    }
  };

  const selectNote = (note: number) => {
    setSelectedNote(note);
    setValue(note);
  };

  const smileyImages = [smiley3, smiley4, smiley5, smiley6, smiley7];

  return (
    <div className="fixed inset-0 z-50 h-full w-full bg-gray-600 bg-opacity-50 text-text">
      <div className="relative left-1/2 top-1/2 w-5/6 -translate-x-1/2 -translate-y-1/2 transform rounded-3xl border bg-background p-1 text-text shadow-xl md:w-2/3 lg:w-96">
        <div className="absolute right-4 top-4">
          <button
            onClick={closeModal}
            type="button"
            className="right-1 top-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-primary text-white transition-all duration-300 ease-in-out hover:bg-text hover:shadow-xl"
          >
            ✖
          </button>
        </div>
        <form className="flex flex-col justify-evenly gap-y-6 px-6 pt-10">
          <h1 className="text-lg font-bold text-black">
            Qu&apos;avez vous pensé de cette aire de jeux ?
          </h1>
          <ul className="flex flex-row justify-evenly">
            {smileyImages.map((imageSrc, index) => (
              <li key={index} className="flex w-40 flex-col px-2">
                <input
                  type="radio"
                  id={`note${index + 1}`}
                  className="hidden"
                  name="note"
                  value={index + 1}
                  onClick={() => selectNote(index + 1)}
                />
                <label
                  htmlFor={`note${index + 1}`}
                  className={`cursor-pointer transition-all duration-300 ease-in-out ${selectedNote === index + 1 ? 'scale-125 border-b-2 border-primary' : 'hover:scale-125'}`}
                >
                  <img src={imageSrc} alt={`smiley ${index + 1}`} />
                </label>
              </li>
            ))}
          </ul>
          <textarea
            placeholder="Donnez-nous votre avis ..."
            className="h-40 w-full rounded-lg border-2 border-gray-200 px-2 py-1 text-text shadow-xl"
            value={avis}
            onChange={(e) => setAvis(e.target.value)}
          />
          <BtnPrimary
            onClick={handleSubmit}
            text="Envoyer"
            color="primary"
            hoverColor="bg-secondary hover:bg-secondary-600"
            type="button"
          />
        </form>
      </div>
      <Toast
        isOpen={isToastOpen}
        message={toastMessage}
        onClose={() => setToastOpen(false)}
      />
    </div>
  );
};

export default ModalAvis;
