import React from 'react';
import NavMenu from '../../components/nav-menu';
import CenteredLayout from '../../layouts/centered-layout/centered-layout';
import { useTranslation } from 'react-i18next';

const CatalogNavPage = () => {

  const { t } = useTranslation();

  return (
    <div className="catalog-nav-page">
      <CenteredLayout>
        <h1 className="catalog-nav-page__heading">
          { t('interface.headings.chooseCategory') }
        </h1>

        <NavMenu 
          classList={'nav-menu--grey-bg'}
          items={[
            { label: t('interface.navigation.categories.notebooks'), path: '/catalog/notebooks' },
            { label: t('interface.navigation.categories.tshirts'), path: '/catalog/tshirts' }
          ]}
        />
      </CenteredLayout>
    </div>
  );
};

export default CatalogNavPage;
