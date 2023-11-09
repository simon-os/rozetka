import React, { useEffect } from 'react';
import Select from '../select';
import { connect } from 'react-redux';
import { setItemsPerPage } from '../../store/actions/products-actions';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { addToUrlQuery } from '../../utils';

const ItemsPerPage = ({ classList, itemsPerPage, setItemsPerPage }) => {

  const { t } = useTranslation();
  const { category } = useParams();

  const perPageOptions = [
    { 
      label: t('interface.itemsPerPage.many', { quantity: 10 }), 
      value: 10 
    },
    { 
      label: t('interface.itemsPerPage.many', { quantity: 15 }), 
      value: 15 
    }, 
    { 
      label: t('interface.itemsPerPage.many', { quantity: 30 }), 
      value: 30 
    },
  ];

  useEffect(() => {
    addToUrlQuery('itemsPerPage', itemsPerPage);
  }, [category]);

  return (
    <Select 
      name="items-per-page"
      data={perPageOptions} 
      value={itemsPerPage}
      defaultValue={perPageOptions[0]}
      cleanable={false}
      classList={'items-per-page' + (classList ? ' '+classList : '')}
      onChange={(value) => {
        setItemsPerPage(+value)
      }} 
    />
  );
};

const mapStateToProps = ({ products: { itemsPerPage } }) => ({ 
  itemsPerPage
});

const mapDispatchToProps = {
  setItemsPerPage
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsPerPage);
