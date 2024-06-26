import React from 'react';
import dadKidPlay from '../../assets/pictures/family/dad-kid-play.webp';
import mumKidPlaying from '../../assets/pictures/family/mum-kid-playing.webp';
import mumBabyPlay from '../../assets/pictures/family/mum-baby-play.webp';

const Pictures: React.FC = () => {
  return (
    <div>
      <div className="pictures absolute right-0 hidden w-1/3 items-center md:flex">
        <div
          className="bg-up absolute left-28 top-20 h-64 w-64 rounded-full bg-cover bg-no-repeat ring-8 ring-background"
          style={{ backgroundImage: `url(${mumBabyPlay})` }}
        />
        <div
          className="absolute -left-8 top-14 h-56 w-56 rounded-full bg-cover bg-bottom bg-no-repeat ring-8 ring-background"
          style={{ backgroundImage: `url(${mumKidPlaying})` }}
        />
        <div
          className="absolute left-6 top-56 h-48 w-48 rounded-full bg-cover bg-bottom bg-no-repeat ring-8 ring-background"
          style={{ backgroundImage: `url(${dadKidPlay})` }}
        />
      </div>
      <div className="mt-4 flex items-start justify-center py-60 md:hidden">
        <div className="relative flex flex-col items-center space-y-10">
          <div
            className="bg-up absolute -left-20 -top-32 h-64 w-64 rounded-full bg-cover bg-no-repeat ring-8 ring-background"
            style={{ backgroundImage: `url(${mumBabyPlay})` }}
          />
          <div
            className="absolute -left-44 -top-52 h-48 w-48 rounded-full bg-cover bg-bottom bg-no-repeat ring-8 ring-background"
            style={{ backgroundImage: `url(${mumKidPlaying})` }}
          />
          <div
            className="absolute -left-32 -top-10 h-40 w-40 rounded-full bg-cover bg-bottom bg-no-repeat ring-8 ring-background"
            style={{ backgroundImage: `url(${dadKidPlay})` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Pictures;
