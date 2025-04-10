import React from 'react';

export const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      {...props}
      className={`bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-medium px-5 py-2 rounded-lg shadow-md hover:shadow-blue-400/40 transition duration-300 ease-in-out transform hover:scale-105 ${className}`}
    >
      {children}
    </button>
  );
};
