import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useTranslation } from 'react-i18next';
import { updateFilters, resetFilters } from '../../store/actions/filters-actions';
import ErrorIndicator from '../error-indicator';
import withDatabaseService from '../hoc/with-database-service';
import Message from '../message';
import Spinner from '../spinner';
import SideMenu from '../side-menu';
import PriceFilter from '../price-filter/';

const FilterOption = ({ 
  type, label, value, layout,
  updateFilters, activeFilters 
}) => {

  const { t } = useTranslation();

  const isChecked = () => {
    const idx = activeFilters.findIndex((f) => f.type === type);
    return !!activeFilters[idx]?.data.includes(value);
  }

  return (
    <label className="filter__item">
        <input 
          type="checkbox" 
          onChange={() => updateFilters({ type, value })} 
          checked={isChecked()}
        />
        <span className={`filter__${layout}`}>
          { 
            type === 'ramSize' 
              ? `${label} ${t('interface.filters.gigabytes')}` 
              : t(`interface.filters.options.${label}`, label)  
          }
        </span>
    </label>
  );
};

const Filter = ({ type, options, layout, id, ...restProps }) => {

  const { t } = useTranslation();

  return (
    <div className="filter filters__item">
      <p className="filter__header">
        { t(`interface.filters.${type}`) }
      </p>

      <div className={`filter__layout filter__layout--${layout}`}>
        {
          options?.map((option) => (
            <FilterOption 
              type={type}
              {...option} 
              {...restProps} 
              layout={layout}
              key={id + option.value} 
            />
          ))
        }
      </div>
    </div>
  );
};

const Filters = ({ 
  filters, loading, error, resetFilters,
  updateFilters, activeFilters, priceMax,
}) => {

  const { t } = useTranslation();
  
  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorIndicator text={ t('interface.messages.filtersLoadingError') } />
  }

  const categoryFilters = filters.map((filter) => (
    <Filter 
      {...filter}
      key={filter.id} 
      activeFilters={activeFilters}
      updateFilters={updateFilters}
    />
  ));
  
  return (
    <div className="filters">
      <SideMenu 
        classList="filters-mobile"
        customBurgerIcon={ <button className="button">
                            { t('interface.buttons.filters') }
                          </button> }
      >
        {
          filters.length 
            ? <button className="filters__reset" onClick={resetFilters}>
                { t('interface.buttons.resetFilters') }
              </button>
            : null
        }

        {
          filters.length 
            ? categoryFilters 
            : <Message text={ t('interface.messages.noFilters') } />
        }
        
        {
          filters.length 
            ? <PriceFilter priceMax={priceMax} classList="filter" /> 
            : null
        }
      </SideMenu>

      <div className="filters-desktop">
        {
          filters.length 
            ? <button className="filters__reset" onClick={resetFilters}>
                { t('interface.buttons.resetFilters') }
              </button>
            : null
        }

        {
          filters.length 
            ? categoryFilters 
            : <Message text={ t('interface.messages.noFilters') } />
        }
        
        {
          filters.length 
            ? <PriceFilter priceMax={priceMax} classList="filter" /> 
            : null
        }
      </div>
    </div>
  );
};

const mapStateToProps = ({ 
  filters: { loading, error, activeFilters } 
}) => ({
  loading, error, activeFilters 
});

const mapDispatchToProps = {
  updateFilters,
  resetFilters
};

export default compose(
  withDatabaseService(),
  connect(mapStateToProps, mapDispatchToProps)
)(Filters);
