import React, { useEffect } from 'react';
import ColumnsLayout from '../../layouts/columns-layout';
import Sidebar from '../../components/sidebar';
import NavMenu from '../../components/nav-menu';
import { Outlet, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

const PersonalCabinet = ({ isAuthed }) => {

  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    !isAuthed && navigate('/');
  }, []);

  return (
    <ColumnsLayout>
      <Sidebar>
        <NavMenu 
          classList={'nav-menu--grey-bg'} 
          items={[
            { 
              label: t('interface.navigation.pages.cabinet.settings'), 
              path: '/personal-cabinet/' 
            },
            { 
              label: t('interface.navigation.pages.cabinet.favourites'), 
              path: '/personal-cabinet/favourites' 
            },
            { 
              label: t('interface.navigation.pages.cabinet.orders'),
              path: '/personal-cabinet/orders' 
            },
          ]}
        />
      </Sidebar>

      <div className="personal-cabinet main-content">
        <Outlet />
      </div>
    </ColumnsLayout>
  );
};

const mapStateToProps = ({ user: { account: { isAuthed } } }) => ({
  isAuthed
});

export default connect(mapStateToProps)(PersonalCabinet);
