import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';

const SideMenu = ({ children, classList, closeOnClick, customBurgerIcon }) => {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleIsOpen = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeSideBar = () => {
    setIsMenuOpen(false)
  }

  return (
    <Menu 
      className={'side-menu' + (classList ? ' '+classList : '')}
      isOpen={isMenuOpen} 
      onOpen={handleIsOpen}
      onClose={handleIsOpen}
      customBurgerIcon={customBurgerIcon}
    >
      { 
        closeOnClick 
          ? children.map((c, idx) => 
              <div onClick={closeSideBar} key={idx}>{c}</div>
            )
          : children
      }
    </Menu>
  );
};

export default SideMenu;
