import React, { useState } from 'react';
import BtnPrimary from '../Buttons/PrimaryBtn';
import PlaygroundModal from '../Modals/AddPlaygroundModal/PlaygroundModal';

type MessageProps = {
  total_count: number | undefined | null;
};

function Message({ total_count }: MessageProps) {
  //  State for the modal, default value is false
  const [modalOpen, setModalOpen] = useState(false);

  // Function for opening the modal
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  // Function for closing the modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:gap-32">
      <h2 className="text-center text-2xl text-primary md:text-left">
        {/* I display the number of playgrounds found  and add 's' if there are more than 1 result, for grammatical reason. if there is no result, I display a message */}
        {total_count !== null ? (
          <p>
            La recherche a donné {total_count} aire{total_count !== 1 && 's'} de
            jeux.
          </p>
        ) : (
          <p>Aucune aire de jeux trouvée</p>
        )}
      </h2>
      {/* I add a button to allow the user to add a playground */}
      <div className="absolute inset-0 -top-12 md:inset-0 md:-top-12 lg:right-32 xl:-top-16">
        <BtnPrimary
          text="Ajouter une aire"
          color="primary"
          hoverColor="bg-secondary hover:bg-secondary-600"
          type="button"
          onClick={handleOpenModal}
        />
      </div>
      {/* Modal PlaygroundModal */}
      <PlaygroundModal isOpen={modalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default Message;
