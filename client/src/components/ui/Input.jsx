import React from 'react';

export const Input = ({ ...props }) => {
  return (
    <input
      className="px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      {...props}
    />
  );
};
