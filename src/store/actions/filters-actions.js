import { PRICE_RANGE, SEARCH_QUERY } from '../../constants';
import { 
  FETCH_CATALOG_FILTERS_REQUEST,
  FETCH_CATALOG_FILTERS_SUCCESS,
  FETCH_CATALOG_FILTERS_FAILURE,
  UPDATE_CATALOG_FILTERS,
  RESET_ACTIVE_FILTERS,
} from '../../constants/action-types';
import { addToUrlQuery, resetUrlQuery } from '../../utils';

const updateFilter = (activeFilter, newFilter) => {
  if (activeFilter.type === SEARCH_QUERY || 
      activeFilter.type === PRICE_RANGE) 
  {
    return {
      type: activeFilter.type,
      data: [newFilter.value]
    };
  }

  if (activeFilter.data.includes(newFilter.value)) {
    return {
      type: activeFilter.type,
      data: [
        ...activeFilter.data.filter((v) => v !== newFilter.value),
      ]
    };
  }

  return {
    type: activeFilter.type,
    data: [
      ...activeFilter.data,
      newFilter.value
    ]
  };
};

const updateActiveFilters = (activeFilters, payload) => {
  const newFilter = payload;
  const idx = activeFilters.findIndex((f) => f.type === newFilter.type);

  if (idx === -1) {
    const newActiveFilter = {
      type: newFilter.type,
      data: [newFilter.value]
    };
    return [
      ...activeFilters,
      newActiveFilter
    ];
  } 

  const updatedFilter = updateFilter(activeFilters[idx], newFilter);
  if (updatedFilter.data.length) {
    return [
      ...activeFilters.slice(0, idx),
      updatedFilter,
      ...activeFilters.slice(idx + 1)
    ];
  } 
  
  return [
    ...activeFilters.slice(0, idx),
    ...activeFilters.slice(idx + 1)
  ];
}

const filtersRequested = () => ({
  type: FETCH_CATALOG_FILTERS_REQUEST
});

const filtersLoaded = (payload) => ({
  type: FETCH_CATALOG_FILTERS_SUCCESS,
  payload
});

const filtersError = () => ({
  type: FETCH_CATALOG_FILTERS_FAILURE
});

const resetActiveFilters = () => ({ 
  type: RESET_ACTIVE_FILTERS
});

const updateFiltersAction = (payload) => ({
  type: UPDATE_CATALOG_FILTERS,
  payload
});

const updateFilters = (payload) => (dispatch, getState) => {
  const { activeFilters } = getState().filters;
  const updatedFilters = updateActiveFilters(activeFilters, payload);
  dispatch(updateFiltersAction(updatedFilters));
  addToUrlQuery('activeFilters', updatedFilters);
};

const resetFilters = () => (dispatch) => {
  resetUrlQuery();
  dispatch(resetActiveFilters());
};

const getFilters = (options = {}) => async (dispatch, getState, extraArgument) => {
  const { databaseService } = extraArgument;
  let filters = null;
  
  dispatch(filtersRequested());
  try {
    filters = await databaseService.getFilters({ ...options });
    dispatch(filtersLoaded());
  } 
  catch(e) {
    dispatch(filtersError());
    console.error(e);
  }

  return filters;
};

export {
  updateFilters,
  resetFilters,
  getFilters
};
