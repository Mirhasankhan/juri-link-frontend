import React from 'react';

const CategoryLoading = () => {
  return (
    <div className="grid grid-cols-2 gap-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="h-32 w-full bg-gray-300 border rounded-2xl animate-pulse"
        ></div>
      ))}
    </div>
  );
};

export default CategoryLoading;
