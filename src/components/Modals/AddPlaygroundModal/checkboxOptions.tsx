import React from 'react';

interface CheckboxOptionProps {
  options: { id: number; name: string; checked: boolean }[];
  onOptionChange: (id: number, checked: boolean) => void;
}

const CheckboxOptions: React.FC<CheckboxOptionProps> = ({
  options,
  onOptionChange,
}) => {
  const handleOptionChange = (id: number, checked: boolean) => {
    onOptionChange(id, checked);
  };

  return (
    <div className="mt-2 grid grid-cols-3 gap-4">
      {options.map((option) => (
        <label key={option.id} className="flex items-center">
          <input
            type="checkbox"
            onChange={(e) => handleOptionChange(option.id, e.target.checked)}
            checked={option.checked}
            className="mr-2"
          />
          <span>{option.name}</span>
        </label>
      ))}
    </div>
  );
};

export default CheckboxOptions;
