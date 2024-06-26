import React, { useEffect } from 'react';

interface ToastProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ isOpen, message, onClose }) => {
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    // Close the toast message after 3 seconds
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);
  // If the toast message is not open, return null
  if (!isOpen) return null;

  return (
    <div>
      {/* Display the toast message in desktop */}
      <div
        className="fixed bottom-5 right-5 z-[9999] mb-4 hidden items-center justify-center rounded-lg bg-primary p-4 text-sm text-background shadow-xl md:flex dark:bg-gray-800"
        role="alert"
      >
        <div className="max-w-xs text-background ">{message}</div>
      </div>
      {/* Display the toast message in mobile */}
      <div
        className="fixed left-1/2 top-5 z-[9999] mb-4 flex w-96 -translate-x-1/2 items-center justify-center rounded-lg bg-primary p-4 text-lg text-background shadow-xl md:hidden dark:bg-gray-800"
        role="alert"
      >
        <div className="max-w-xs text-background ">{message}</div>
      </div>
    </div>
  );
};

export default Toast;
