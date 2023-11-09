import React from 'react';

const ColumnsLayout = ({ children }) => {
  return (
    <div className="columns-layout">
      <div className="container">
        <div className="columns-layout__inner">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ColumnsLayout;
