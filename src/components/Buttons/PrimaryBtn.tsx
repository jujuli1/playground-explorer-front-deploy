// props for the button
import React from 'react';

type BtnPrimaryProps = {
  text: string;
  color: string;
  hoverColor: string;
  type: 'button' | 'submit' | 'reset';
  onClick: () => void;
};

function BtnPrimary({ text, color, hoverColor, type, onClick }: BtnPrimaryProps) {
  return (
    <div className="flex justify-center">
      {/* Button with dynamic styles based on props  */}
      <button
        className={`bg-${color} font-bold mw-auto w-60 transform rounded-full px-4 py-3 text-white transition duration-300 ease-in-out hover:${hoverColor} hover:shadow-md`}
        type={type} // use type="button" for evit the form submit
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}

export default BtnPrimary;
