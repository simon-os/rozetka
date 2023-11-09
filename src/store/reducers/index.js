import updateUser from './user';
import updateFilters from './filters';
import updateProducts from './products';

const reducer = (state, action) => {
  return {
    user: updateUser(state, action),
    filters: updateFilters(state, action),
    products: updateProducts(state, action),
  }
};

export default reducer;
