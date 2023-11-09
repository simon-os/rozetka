import React, { useEffect, useState } from 'react';
import { Link, useHref } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import capitalize from '../../utils/capitalize';
import i18next from 'i18next';

const Breadcrumbs = () => {
  
  const links = useHref().split('/');
  const [routerLinks, setRouterLinks] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    links.pop();

    const routerLinks = links.map((link, idx) => {
      let prev = '/';
      for(let i = 0; i < idx; i++) {
        prev += links[i] ? `${links[i]}/` : '';
      }

      return {
        label: capitalize( t(`interface.navigation.pages.${link || 'home'}`) ),
        dest: `${prev}${link}`
      }
    });

    setRouterLinks(routerLinks);
  }, [i18next.language]);

  return (
    <div className="breadcrumbs">
      { 
        routerLinks.map(({ label, dest }) => (
          <Link 
            to={dest}
            className="breadcrumbs__item" 
            key={dest}
          >
            {label}
          </Link>
        )) 
      }
    </div>
  );
};

export default Breadcrumbs;
