import React from 'react';
import { Link } from 'react-router-dom';

const NavMenuItem = ({ path, label }) => {
  return (
    <li className="nav-menu__item">
      <Link to={path}>{ label }</Link>
    </li>
  );
};

const NavMenu = ({ items, classList }) => {
  return (
    <nav className={'nav-menu' + (classList ? ' '+classList : '')}>
      <ul className="nav-menu__list">
        { 
          items.map((item) => (
            <NavMenuItem 
              {...item}
              key={item.label}
            />
          ))
        }
      </ul>
    </nav>
  );
};

export default NavMenu;
