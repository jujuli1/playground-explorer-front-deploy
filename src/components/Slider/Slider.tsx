import React, { useState } from 'react';
import defaultImg from '../../assets/pictures/defaultImg.webp';

type Slide = {
  playground_id: number;
  url?: string;
  name?: string;
};

export default function Slider({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0); // Current slide index
  const [loaded, setLoaded] = useState(false); // Image loaded state

  const goToPrevious = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const goToNext = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center pt-4 text-text">
      <div className="relative flex h-full w-full items-center justify-center">
        <button
          type="button"
          aria-label="Previous slide"
          className="absolute left-0 z-10 m-2 flex h-12 w-12 cursor-pointer items-center justify-center"
          onClick={goToPrevious}
          tabIndex={0}
        >
          <svg
            width="800px"
            height="800px"
            viewBox="0 0 1024 1024"
            className="icon size-12 transition duration-300 ease-in-out hover:text-primary"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z"
              fill="currentColor"
            />
          </svg>
        </button>
        {slides.length > 0 && (
          <div className="mx-2 flex h-96 w-3/4 max-w-4xl items-center justify-center overflow-hidden rounded-xl bg-primary shadow-lg">
            <img
              src={slides[current].url || defaultImg}
              alt={slides[current].name || 'No name'}
              className={`h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setLoaded(true)}
            />
          </div>
        )}
        <button
          type="button"
          aria-label="Next slide"
          className="absolute right-0 z-10 m-2 flex h-12 w-12 cursor-pointer items-center justify-center"
          onClick={goToNext}
          tabIndex={0}
        >
          <svg
            width="800px"
            height="800px"
            viewBox="0 0 1024 1024"
            className="icon size-12 transition duration-300 ease-in-out hover:text-primary"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
      {slides.length > 0 && (
        <div>
          <p className="mt-2 text-2xl font-semibold">
            {slides[current].name || 'No name'}
          </p>
        </div>
      )}
    </div>
  );
}
