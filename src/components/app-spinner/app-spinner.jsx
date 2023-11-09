import React from 'react';
import Overlay from '../overlay';
import Spinner from '../spinner';

const AppSpinner = () => {
  return (
    <div className="app-spinner">
      <Overlay />
      <Spinner />
    </div>
  );
};

export default AppSpinner;
