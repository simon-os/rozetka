import React from 'react';
import { Dropdown } from 'rsuite';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NavMenuDropdown = ({ items }) => {

  const { t } = useTranslation();

  return (
    <nav className="nav-menu-dropdown">
      <Dropdown title={ t('interface.buttons.catalog') } noCaret>
        {
          items.map(({ label, path }) => (
            <Link 
              to={path} 
              key={label}
            >
              <Dropdown.Item>
                {label}
              </Dropdown.Item>
            </Link>
          ))
        }
      </Dropdown>
    </nav>
  );
};

export default NavMenuDropdown;
