import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Auth, LogOutButton } from '../auth';
import { connect } from 'react-redux';
import { PersonalCabinetButton } from '../../pages/personal-cabinet';
import { useTranslation } from 'react-i18next';
import NavMenuDropdown from '../nav-menu-dropdown';
import SearchBar from '../search-bar';
import Modal from '../hoc/modal';
import SideMenu from '../side-menu/';
import LanguageSwitch from '../language-switch';
import ShoppingCartButton from '../shopping-cart-button/shopping-cart-button';

const Header = ({ isAuthed }) => {

  const { t } = useTranslation();
  const [openedAuthModal, setOpenedAuthModal] = useState(false);

  const onModalClose = () => {
    setOpenedAuthModal(false);
  };

  const onModalOpen = (ev) => {
    if (isAuthed) return;
    ev.preventDefault();
    setOpenedAuthModal(true);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__layout">
          <SideMenu 
            closeOnClick
            customBurgerIcon={ <img src="/assets/images/menu-icon.svg" alt="menu-icon" /> }
          >
            <NavLink className="link" to="catalog">
              { t('interface.buttons.catalog') }
            </NavLink>

            <NavLink className="link" to="shopping-cart">
              { t('interface.buttons.shoppingCart') }
            </NavLink>

            <NavLink 
              className="link"
              onClick={onModalOpen} 
              to="personal-cabinet" 
            >
              { t('interface.buttons.personalCabinet') }
            </NavLink>

            { isAuthed && <LogOutButton /> }
          </SideMenu>

          <Link className="header-logo" to="/">
            <picture className="header-logo__image header-logo__image--desktop">
              <img src="/assets/images/logo.svg" alt="Logo" />
            </picture>

            <picture className="header-logo__image header-logo__image--mobile">
              <img src="/assets/images/logo-small.svg" alt="Logo" />
            </picture>

            <span className="header-logo__text">(almost)</span>
          </Link>

          <NavMenuDropdown 
            items={[
              { label: t('interface.navigation.categories.notebooks'), path: '/catalog/notebooks' },
              { label: t('interface.navigation.categories.tshirts'), path: '/catalog/tshirts' }
            ]} 
          />

          <SearchBar classList="header__search-bar" />

          <div className="header__right-col">
            <LanguageSwitch />

            <div className="header__buttons">
              <ShoppingCartButton
                classList="header__button"
              />

              <PersonalCabinetButton 
                handleClick={onModalOpen} 
                classList="header__button"
                path="personal-cabinet" 
              />

              { 
                isAuthed && 
                <LogOutButton
                  classList="header__button"
                  template="button" 
                /> 
              }
            </div>
          </div>

          {
            openedAuthModal
              ? <Modal onModalClose={onModalClose} >
                  <Auth onFormSubmit={onModalClose} />
                </Modal>
              : null
          }
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = ({ user: { account: { isAuthed } } }) => ({
  isAuthed 
});

export default connect(mapStateToProps)(Header);
