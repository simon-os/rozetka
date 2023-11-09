import React from 'react';

const CenteredLayout = ({ children }) => {
  return (
    <div className="centered-layout">
      <div className="container">
        <div className="centered-layout__inner">
          { children }
        </div>
      </div>
    </div>
  );
};

export default CenteredLayout;
