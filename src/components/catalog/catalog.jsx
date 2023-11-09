import React from 'react';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import Message from '../message';
import Sorting from '../sorting';
import Product from '../product/product';
import withPagination from '../hoc/with-pagination';
import ItemsPerPage from '../items-per-page';
import { useTranslation } from 'react-i18next';
import { useGetSearchQuery } from '../../hooks/';
import { connect } from 'react-redux';
import { compose } from 'redux';

const SearchQuery = ({ text, onRemove }) => {
  return (
    <div className="search-query">
      «{ text }» 

      <div 
        className="search-query__remove"
        onClick={onRemove}
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path id="x" d="M18.717 6.697l-1.414-1.414-5.303 
            5.303-5.303-5.303-1.414 1.414 5.303 5.303-5.303 5.303 
            1.414 1.414 5.303-5.303 5.303 5.303 1.414-1.414-5.303-5.303z"/>
        </svg>
      </div>
    </div>
  );
};

const Catalog = ({ items, error, activeFilters, loading, onRemove }) => {

  const { t } = useTranslation();
  const searchQuery = useGetSearchQuery(activeFilters);

  if (error) {
    return <ErrorIndicator text={ t('interface.messages.catalogLoadingError') } />
  }

  const products = (
    (items && items.length) 
      ? (<div className="products-layout">
            {
              items.map((item) => (
                <Product 
                  classList={'product--catalog'} 
                  key={item.id} 
                  {...item} 
                />
              )) 
            }
        </div>)
      : <Message text={ t('interface.messages.itemsNotFound') } />
  )

  return (
    <div className="catalog">
      <div className="catalog__top-row">
        { 
          searchQuery 
            ? <SearchQuery text={searchQuery} onRemove={onRemove} /> 
            : null 
        }

        {
          items && items.length 
            ? <Sorting classList="catalog__sorting" />
            : null
        }

        {
          items && items.length 
            ? <ItemsPerPage classList="catalog__items-per-page" />
            : null
        }
      </div>

        {
          loading ? <Spinner /> : products
        }
    </div>
  );
};

const mapStateToProps = ({ filters: { activeFilters } }) => ({
  activeFilters
});

export default compose(
  withPagination(),
  connect(mapStateToProps),
)(Catalog);
