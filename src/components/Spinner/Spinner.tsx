import React from 'react';
// Spinner for loading state
const Spinner: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-500 bg-opacity-30">
      <div
        className="inline-block h-10 w-10 animate-spin rounded-full border-[5px] border-current border-t-transparent text-primary dark:text-white"
        role="status"
        aria-label="loading"
      />
    </div>
  );
};

export default Spinner;
