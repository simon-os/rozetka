import React from 'react';

const Overlay = ({ onClose }) => {
  return (
    <div className="overlay" onClick={onClose}></div>
  );
};

export default Overlay;
