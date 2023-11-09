import { 
  FETCH_CATALOG_PRODUCTS_REQUEST, 
  FETCH_CATALOG_PRODUCTS_SUCCESS ,
  FETCH_CATALOG_PRODUCTS_FAILURE,
  UPDATE_CATALOG_SORTING,
  UPDATE_ITEMS_PER_PAGE,
} from '../../constants/action-types';
import { addToUrlQuery } from '../../utils';

const productsRequested = () => ({
  type: FETCH_CATALOG_PRODUCTS_REQUEST
});

const productsLoaded = (payload) => ({
  type: FETCH_CATALOG_PRODUCTS_SUCCESS,
  payload
});

const productsError = () => ({
  type: FETCH_CATALOG_PRODUCTS_FAILURE
});

const catalogSortingUpdate = (payload) => ({
  type: UPDATE_CATALOG_SORTING,
  payload
});

const itemsPerPageUpdate = (payload) => ({
  type: UPDATE_ITEMS_PER_PAGE,
  payload
});

const setItemsPerPage = (payload) => (dispatch) => {
  addToUrlQuery('itemsPerPage', payload);
  dispatch(itemsPerPageUpdate(payload));
};

const sortProducts = (payload) => (dispatch) => {
  addToUrlQuery('sorting', payload);
  dispatch(catalogSortingUpdate(payload));
};

const getProducts = (options = {}) => async (dispatch, getState, extraArgument) => {
  const { databaseService } = extraArgument;
  let products = null;
  
  dispatch(productsRequested());
  try {
    products = await databaseService.getProducts({ ...options });
    dispatch(productsLoaded());
  } 
  catch(e) {
    dispatch(productsError());
    console.error(e);
  }

  return products;
};

export {
  productsRequested,
  productsLoaded,
  productsError,
  sortProducts,
  setItemsPerPage,
  getProducts
};
