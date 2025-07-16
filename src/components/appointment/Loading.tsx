import React from 'react';

const Loading = () => {
  return (
    <div className="grid grid-cols-2 gap-6">
      {[...Array(2)].map((_, i) => (
        <div
          key={i}
          className="h-28 w-full bg-gray-300 border rounded-2xl animate-pulse"
        ></div>
      ))}
    </div>
  );
};

export default Loading;
