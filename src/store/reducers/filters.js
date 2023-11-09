import { 
  UPDATE_CATALOG_FILTERS,
  FETCH_CATALOG_FILTERS_FAILURE,
  FETCH_CATALOG_FILTERS_REQUEST,
  FETCH_CATALOG_FILTERS_SUCCESS,
  RESET_ACTIVE_FILTERS
} from '../../constants/action-types';
import { getFromUrlQuery } from '../../utils';

const updateFilters = (state, action) => {
  
  if (state === undefined) {
    return {
      activeFilters: getFromUrlQuery('activeFilters') || [],
      loading: null,
      error: null,
    }
  }

  switch (action.type) {
    case FETCH_CATALOG_FILTERS_REQUEST:
      return {
        ...state.filters,
        loading: true
      }

    case FETCH_CATALOG_FILTERS_SUCCESS:
      return {
        ...state.filters,
        allFilters: action.payload,
        loading: false,
        error: null
      }

    case FETCH_CATALOG_FILTERS_FAILURE:
      return {
        ...state.filters,
        loading: false,
        error: true
      }

    case RESET_ACTIVE_FILTERS: 
      return {
        ...state.filters,
        activeFilters: [
          { type: 'priceRange', data: [[0, 0]]
        }],
      }
    
    case UPDATE_CATALOG_FILTERS:
      return {
        ...state.filters,
        activeFilters: action.payload
      }
      
    default:
      return state.filters;
  }
};

export default updateFilters;
