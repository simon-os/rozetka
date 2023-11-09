import React from 'react';
import Overlay from '../../overlay';
import { createPortal } from 'react-dom';

const Modal = ({ children, title, onModalClose: onClose }) => {
  return createPortal((
    <>
      <Overlay onClose={onClose} />

      <div className="modal">
        <div className="modal__head">
          { title && <h3 className="modal__title">{ title }</h3> }

          <button 
            className="modal__close-button"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path id="x" d="M18.717 6.697l-1.414-1.414-5.303 5.303-5.303-5.303-1.414 1.414 5.303 5.303-5.303 5.303 1.414 1.414 5.303-5.303 5.303 5.303 1.414-1.414-5.303-5.303z"/>
            </svg>
          </button>
        </div>

        <div className="modal__body">
          { children }
        </div>
      </div>
    </>
  ), document.body);
};

export default Modal;
