import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <div className="loader border-t-4 border-white border-solid rounded-full w-16 h-16 mb-4"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
