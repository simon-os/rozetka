import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { sortProducts } from '../../store/actions/products-actions';
import { useTranslation } from 'react-i18next';
import { addToUrlQuery } from '../../utils';
import { useParams } from 'react-router-dom';
import Select from '../select';

const Sorting = ({ sortProducts, sorting, classList }) => {
  
  const { t } = useTranslation();
  const { category } = useParams();

  const sortingOptions = [
    { 
      label: t('interface.sorting.priceAscending'),
      value: 'price-ascending' 
    }, 
    { 
      label: t('interface.sorting.priceDescending'),
      value: 'price-descending' 
    },
  ];

  useEffect(() => {
    sorting && addToUrlQuery('sorting', sorting);
  }, [category]);

  return (
    <Select 
      name="sorting"
      data={sortingOptions} 
      value={sorting}
      placeholder={ t('interface.sorting.placeholder') }
      classList={'sorting' + (classList ? ' '+classList : '')}
      onChange={(value) => {
        sortProducts(value)
      }} 
    />
  );
};

const mapStateToProps = ({ products: { sorting } }) => ({ 
  sorting
});

const mapDispatchToProps = {
  sortProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(Sorting);
