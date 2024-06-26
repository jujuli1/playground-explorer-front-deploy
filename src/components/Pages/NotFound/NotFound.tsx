import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type TeamMember = {
  name: string;
  image1: string;
  image2: string;
  image3: string;
  hovered?: boolean;
};

function Page404() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      name: 'Fred',
      image1: 'public/image_dev.png',
      image2: 'public/image_dev.png',
      image3: 'public/image_dev.png',
      hovered: false,
    },
    {
      name: 'Hélène',
      image1: 'src/assets/pictures/TeamMembers/Helene/ln1.jpg',
      image2: 'src/assets/pictures/TeamMembers/Helene/ln2.jpg',
      image3: 'src/assets/pictures/TeamMembers/Helene/ln3.jpg',
      hovered: false,
    },
    {
      name: 'Karim',
      image1: 'public/image_dev.png',
      image2: 'public/image_dev.png',
      image3: 'public/image_dev.png',
      hovered: false,
    },
    {
      name: 'Julien',
      image1: 'public/image_dev.png',
      image2: 'public/image_dev.png',
      image3: 'public/image_dev.png',
      hovered: false,
    },
    {
      name: 'Maïssane',
      image1: 'public/image_dev.png',
      image2: 'public/image_dev.png',
      image3: 'public/image_dev.png',
      hovered: false,
    },
  ]);

  // useState that stores the name of the selected member. default value is an empty string.
  const [selectedMember, setSelectedMember] = useState<string>('');

  // function that manages the hover on the card
  const handleHover = (index: number) => {
    // updatedMembers is a copy of the teamMembers array
    const updatedMembers = [...teamMembers];
    // update the hovered property of the hovered member to true
    updatedMembers[index].hovered = true;
    // update the useState teamMembers with the updatedMembers array
    setTeamMembers(updatedMembers);
  };

  // function that manages the click on the card
  const handleClicked = (index: number) => {
    // updatedMembers is a copy of the teamMembers array
    const updatedMembers = [...teamMembers];
    // update the image1 and image2 of the clicked member. they will be replaced by the image3.
    updatedMembers[index].image1 = updatedMembers[index].image3;
    updatedMembers[index].image2 = updatedMembers[index].image3;
    // update the useState teamMembers with the updatedMembers array
    setTeamMembers(updatedMembers);
    // update the useState selectedMember with the name of the clicked member
    setSelectedMember(updatedMembers[index].name);
  };

  return (
    <div>
      <div className="flex flex-col items-center gap-20 bg-background px-5 py-10 text-text">
        <div className="flex flex-col gap-10 text-center">
          <h1 className="font-title text-4xl font-semibold">Oops !</h1>
          <h2 className="text-xl font-bold">
            404 - La page recherchée n’existe pas
          </h2>
        </div>
        <div className="flex flex-col gap-8 text-center">
          <p className="">
            Sans vouloir balancer, voilà notre équipe de dev, c’est forcément
            l’un d’entre nous qui a fait une boulette...
          </p>
          <p className=" ">Tu veux virer qui ?</p>
          <div className="flex flex-wrap justify-center gap-20">
            {teamMembers.map((member, index) => (
              <div className="flex max-w-60 flex-col" key={member.name}>
                <button type="button" onClick={() => handleClicked(index)}>
                  <p>{member.name}</p>
                  <img
                    className="max-w-40 rounded-3xl"
                    // if the hovered property is true, the image2 is displayed, otherwise the image1 is displayed
                    src={member.hovered ? member.image2 : member.image1}
                    alt={member.name}
                    // functions that manage the hover on the card with the movement of the mouse
                    onMouseEnter={() => handleHover(index)}
                    onMouseLeave={() => {
                      const updatedMembers = [...teamMembers];
                      updatedMembers[index].hovered = false;
                      setTeamMembers(updatedMembers);
                    }}
                  />
                </button>
              </div>
            ))}
          </div>
          <p className="">
            {/* if a member is selected, a message is displayed with the name of the selected member */}
            {selectedMember
              ? `Bon ok, dommage pour ${selectedMember}, mais c’est le jeu !`
              : ''}
          </p>
        </div>
        <div>
          <p className="text-center">
            Sinon, pour nous faire pardonner, voici quelques liens utiles pour
            t’aider :
          </p>
          <ul className="flex flex-col items-center gap-2">
            <li className=" border-b-2 border-background p-1 font-bold text-secondary hover:border-b-2 hover:border-secondary">
              <Link to="/">Accueil</Link>
            </li>
            <li className="border-b-2 border-background p-1 font-bold text-secondary hover:border-b-2 hover:border-secondary">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="border-b-2 border-background p-1 font-bold text-secondary hover:border-b-2 hover:border-secondary ">
              <Link to="/mon-compte">Mon compte</Link>
            </li>
            <li className="border-b-2 border-background p-1 font-bold text-secondary hover:border-b-2 hover:border-secondary">
              <Link to="/plan-du-site">Plan du site</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Page404;
