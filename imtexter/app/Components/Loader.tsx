import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="columns-3 top-1/2 pl-[36rem] pt-28">
      <img className="w-1/4 h-1/4" src="/loader.gif" alt="Loading..." />
    </div>
  );
};

export default Loader;
