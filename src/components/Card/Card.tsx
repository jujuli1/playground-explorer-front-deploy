import React from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import defaultImg from '../../assets/pictures/defaultImg.webp';
import FavoriteBtn from '../Buttons/FavoriteBtn';
import { Playground } from '../../@types/playground';

type CardProps = {
  item: Playground;
};

const Card: React.FC<CardProps> = ({ item }: CardProps) => {
  return (
    <div
      className="flex h-60 w-60 transform flex-col justify-between
        rounded-xl
       bg-cover
       bg-center shadow-2xl transition duration-500 ease-in-out hover:scale-105"
      style={{ backgroundImage: `url(${defaultImg})` }}
    >
      <FavoriteBtn playgroundId={item.id} />
      <div className="flex items-center justify-between rounded-b-xl bg-white px-4 py-2 opacity-90">
        <Link className="flex flex-col" to={`/playgrounds/${item.id}`}>
          <h3 className="font-bold">{item.name}</h3>
          <p className="font-light">{item.city.toLowerCase()}</p>
        </Link>
        <div className="flex flex-col gap-1">
          <Icon
            className="size-7 text-accent drop-shadow-lg"
            aria-hidden="true"
            icon="ph:smiley"
          />
          <Link
            type="button"
            className="text-accent"
            to={`https://www.google.com/maps/place/${item.lattitude},${item.longitude}`}
            target="_blank"
            aria-label="itineraire"
          >
            <Icon
              className="size-7 text-accent drop-shadow-lg"
              aria-hidden="true"
              icon="icon-park-outline:local"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
