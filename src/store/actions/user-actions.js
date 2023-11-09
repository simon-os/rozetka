import { EMPTY_USER } from '../../constants';
import { 
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  USER_LOG_OUT,
  ADD_TO_WATCHED_LIST,
  UPDATE_FAVOURITES,
  USER_UPDATE,
  SHOPPING_CART_UPDATE,
  SHOPPING_CART_CLEAR,
} from '../../constants/action-types';
import { addToLocalStorage, updateWatched } from '../../utils';
import { MAX_CART_ITEMS } from '../../constants';

const updateCart = (shoppingCart, item) => {
  const { id, quantity } = item;
  
  const idx = shoppingCart.findIndex((item) => item.id === id);
  if (idx !== -1) {
    const currentItem = shoppingCart[idx];

    const newQuantity = Math.min(currentItem.quantity + quantity, MAX_CART_ITEMS);
    if (newQuantity <= 0) {
      return [
        ...shoppingCart.slice(0, idx),
        ...shoppingCart.slice(idx + 1)
      ];
    } 

    const newItem = {
      ...currentItem,
      quantity: newQuantity
    };
    return [
      ...shoppingCart.slice(0, idx),
      newItem, 
      ...shoppingCart.slice(idx + 1)
    ];
  }

  return [
    ...shoppingCart,
    item
  ];
};

const userRequested = () => ({
  type: FETCH_USER_REQUEST
});

const userLoaded = (payload) => {
  const newUser = { ...EMPTY_USER, ...payload };
  addToLocalStorage('user', newUser);

  return {
    type: FETCH_USER_SUCCESS,
    payload: newUser
  }
};

const userError = () => ({
  type: FETCH_USER_FAILURE,
});

const userLogOutAction = () => ({
  type: USER_LOG_OUT,
});

const updateFavourites = (payload) => ({
  type: UPDATE_FAVOURITES,
  payload
});

const addToWatchedList = (payload) => ({
  type: ADD_TO_WATCHED_LIST,
  payload
});

const updateUser = (payload) => ({
  type: USER_UPDATE,
  payload
});

const updateCartAction = (payload) => ({
  type: SHOPPING_CART_UPDATE,
  payload
});

const clearShoppingCart = () => ({
  type: SHOPPING_CART_CLEAR
});

const getCartItems = (getProducts) => async (dispatch, getState) => {
  const { user: { account: { shoppingCart } } } = getState();
  
  const cartItems = await Promise.all(
    shoppingCart.map(async ({ id, quantity }) => {
      const { image, price, category } = await getProducts({ id });
      return { id, category, image, price, quantity };
    }
  ));

  return cartItems;
};

const updateCartItem = (payload) => async (dispatch, getState, extraArgument) => {
  const { databaseService } = extraArgument;
  const { user: { account } } = getState();
  const { id, shoppingCart, isAuthed } = account;

  const updatedCart = updateCart(shoppingCart, payload);
  dispatch(updateCartAction(updatedCart));
  addToLocalStorage('user', {
    ...account,
    shoppingCart: updatedCart
  });

  if (isAuthed) {
    databaseService.setUserField(id, 'shoppingCart', updatedCart);
  }
};

const addToWatched = (payload) => (dispatch, getState, extraArgument) => {
  const state = getState();
  const { watched, isAuthed, id } = state.user.account;
  const { databaseService } = extraArgument;

  const newWatched = updateWatched(watched, +payload);

  const newUser = {
    ...state.user.account,
    watched: newWatched
  };

  addToLocalStorage('user', newUser);
  if (isAuthed) {
    databaseService.setUser(id, newUser);
  }
  dispatch(addToWatchedList(newWatched));
};

const toggleFavourite = (itemId) => (dispatch, getState, extraArgument) => {
  const state = getState();
  const { isAuthed, id, favourites } = state.user.account;
  const { databaseService } = extraArgument;

  const fav = favourites.findIndex((f) => f === +itemId);
  let newFavourites;

  if (fav !== -1) {
    newFavourites = [...favourites.filter((f) => f !== +itemId)]
  }
  else {
    newFavourites = [+itemId, ...favourites];
  }

  const newUser = {
    ...state.user.account,
    favourites: newFavourites
  };

  if (isAuthed) {
    databaseService.setUser(id, newUser);
    addToLocalStorage('user', newUser);
    dispatch(updateFavourites(newFavourites));
  }
};

const getUserInfo = (id) => (dispatch, getState, extraArgument) => {
  const { databaseService } = extraArgument;
  const { isAuthed } = getState().user.account;

  const handleFetchUser = async (id) => {
    dispatch(userRequested());
    try {
      const data = await databaseService.getUser({ id }); 
      dispatch(userLoaded(data));
    }
    catch(e) {
      dispatch(userError());
      console.error(e);
    }
  };

  if (isAuthed) { 
    handleFetchUser(id);
  }
};

const userLogOut = (remove) => (dispatch, getState, extraArgument) => {
  const state = getState();
  const { id } = state.user.account;
  const { databaseService } = extraArgument;

  if (!remove) {
    databaseService.setUser(id, {
      ...state.user.account,
      isAuthed: false
    });
  }
  addToLocalStorage('user', EMPTY_USER);
  dispatch(userLogOutAction());
};

export {
  userRequested,
  userLoaded,
  userError,
  getUserInfo,
  userLogOut,
  toggleFavourite,
  addToWatched,
  updateUser,
  updateCartItem,
  getCartItems,
  clearShoppingCart
};
