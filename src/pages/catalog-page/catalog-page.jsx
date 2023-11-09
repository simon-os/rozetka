import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { 
  updateFilters,
  getFilters,
  resetFilters
} from '../../store/actions/filters-actions';
import { getProducts } from '../../store/actions/products-actions';
import { useLocation, useParams } from 'react-router-dom';
import { useFirstRender } from '../../hooks';
import { sortProducts } from '../../utils/sort-products';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { PRICE_RANGE, SEARCH_QUERY } from '../../constants';
import Sidebar from '../../components/sidebar';
import Catalog from '../../components/catalog';
import Filters from '../../components/filters';
import ColumnsLayout from '../../layouts/columns-layout';
import ErrorIndicator from '../../components/error-indicator';
import removeSpecialChars from '../../utils/remove-special-chars';
import withDatabaseService from '../../components/hoc/with-database-service';

const getMaxPrice = (products) => {
  return products?.reduce((acc, current) => { 
    return current.price > acc ? current.price : acc 
  }, 0);
};

const filterProducts = (activeFilters, items) => {

  if (!activeFilters.length) {
    return items;
  }

  return items.filter((item) => {
    
    // check if all active filters are present in the current item
    return activeFilters.every((activeFilter) => {
      const { type, data } = activeFilter;

      if (type === PRICE_RANGE) {
        const priceRange = data[0];
        return item.price >= priceRange[0] && item.price <= priceRange[1];
      }

      if (type === SEARCH_QUERY) {
        const clearedStr = removeSpecialChars(data[0].toLowerCase().trim());
        const description = removeSpecialChars(item.description.toLowerCase());
        const title = removeSpecialChars(item.title.toLowerCase());

        return item.features.some(({ value }) => value.toString().includes(clearedStr))
              || description.includes(clearedStr) 
              || title.includes(clearedStr);
      }

      // check if one of active filter values is present in item features
      return data.some((value) => {
        const featureIdx = item.features.findIndex((f) => f.type === type);

        if (featureIdx < 0) return false;
        return value === item.features[featureIdx].value;
      });
    });
  });
};

const CatalogPage = ({
  activeFilters, loading, sorting, 
  resetFilters, updateFilters, error, 
  itemsPerPage, getProducts, getFilters
}) => {

  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const location = useLocation();
  const isFirstRender = useFirstRender();
  const priceMax = useRef(0);
  const { t } = useTranslation();

  useEffect(() => {
    priceMax.current = 0;
  }, [category]);

  useEffect(() => {
    if (!isFirstRender) {
      resetFilters();
    }

    return () => {
      resetFilters();
    }
  }, [location]);

  useEffect(() => {
    const handleGetProducts = async () => {
      let products = await getProducts({ category });
      if (!products) return;

      products = products.map((p) => ({
        ...p,
        title: t(`products.${p.category}.${p.id}.title`),
        description: t(`products.${p.category}.${p.id}.description`)
      }));

      priceMax.current = getMaxPrice(products, category);
      setProducts(
        sortProducts(
          sorting, 
          filterProducts(activeFilters, products)
        ),
      );
    };
    handleGetProducts();
  }, [activeFilters, category, sorting]);

  useEffect(() => {
    const handleGetFilters = async () => {
      const filters = await getFilters({ category });
      if (filters) {
        setFilters(filters);
      }
    };
    handleGetFilters();
  }, [category]);

  const handleSearchQueryRemove = () => updateFilters({ 
    type: SEARCH_QUERY, 
    value: ''
  });
  
  return (
    <div className="catalog-page">
      <ColumnsLayout>
        <ErrorBoundary 
          fallback={ 
            <ErrorIndicator text={ t('interface.messages.somethingWentWrong') } /> 
          }
        >
          <Sidebar>
            <Filters
              filters={filters}
              priceMax={priceMax.current}
             />
          </Sidebar>
        </ErrorBoundary>

        <ErrorBoundary 
          fallback={ 
            <ErrorIndicator text={ t('interface.messages.somethingWentWrong') } /> 
          }
        >
          <Catalog 
            items={products}
            category={category}
            loading={loading}
            error={error}
            itemsPerPage={itemsPerPage}
            onRemove={handleSearchQueryRemove}
          />
        </ErrorBoundary>
      </ColumnsLayout>
    </div>
  );
};

const mapStateToProps = ({ 
  filters: { activeFilters },
  products: { loading, error, sorting, itemsPerPage },
}) => ({
  sorting,
  loading, 
  error, 
  activeFilters,
  itemsPerPage
});

const mapDispatchToProps = {
  updateFilters,
  resetFilters,
  getProducts,
  getFilters,
};

export default compose(
  withDatabaseService(),
  connect(mapStateToProps, mapDispatchToProps)
)(CatalogPage);
