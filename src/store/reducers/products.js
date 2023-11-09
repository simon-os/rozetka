import { ITEMS_PER_PAGE_DEFAULT } from '../../constants';
import { 
  FETCH_CATALOG_PRODUCTS_FAILURE,
  FETCH_CATALOG_PRODUCTS_REQUEST, 
  FETCH_CATALOG_PRODUCTS_SUCCESS,
  UPDATE_CATALOG_SORTING,
  UPDATE_ITEMS_PER_PAGE
} from '../../constants/action-types';
import { getFromUrlQuery } from '../../utils';

const updateProducts = (state, action) => {
  
  if (state === undefined) {
    return {
      loading: null,
      error: null,
      sorting: getFromUrlQuery('sorting') || null,
      itemsPerPage: getFromUrlQuery('itemsPerPage') || ITEMS_PER_PAGE_DEFAULT
    }
  }

  switch (action.type) {
    case FETCH_CATALOG_PRODUCTS_REQUEST:
      return {
        ...state.products,
        loading: true
      }

    case FETCH_CATALOG_PRODUCTS_SUCCESS: 
      return {
        ...state.products,
        loading: false,
        error: null
      }

    case FETCH_CATALOG_PRODUCTS_FAILURE:
      return {
        ...state.products,
        loading: false,
        error: true
      }

    case UPDATE_CATALOG_SORTING:
      return {
        ...state.products,
        sorting: action.payload
      }

    case UPDATE_ITEMS_PER_PAGE:
      return {
        ...state.products,
        itemsPerPage: action.payload
      }

    default:
      return state.products;
  }
}

export default updateProducts;
