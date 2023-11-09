import { 
  ADD_TO_WATCHED_LIST,
  FETCH_USER_FAILURE, 
  FETCH_USER_REQUEST, 
  FETCH_USER_SUCCESS, 
  SHOPPING_CART_CLEAR, 
  SHOPPING_CART_UPDATE, 
  UPDATE_FAVOURITES,
  USER_LOG_OUT,
  USER_UPDATE
} from '../../constants/action-types';
import { EMPTY_USER } from '../../constants';
import { getFromLocalStorage } from '../../utils';

const updateUser = (state, action) => {

  if (state === undefined) {
    return {
      loading: null,
      error: null,
      account: getFromLocalStorage('user') || EMPTY_USER,
    }
  }

  switch (action.type) {

    case USER_LOG_OUT: 
      return {
        ...state.user,
        account: EMPTY_USER,
      }

    case FETCH_USER_REQUEST:
      return {
        ...state.user,
        loading: true
      }
      
    case FETCH_USER_SUCCESS: 
      return {
        ...state.user,
        account: action.payload,
        loading: false
      }

    case FETCH_USER_FAILURE:
      return {
        ...state.user,
        error: true,
        loading: false
      }

    case USER_UPDATE: 
      return {
        ...state.user,
        account: {
          ...state.user.account,
          ...action.payload
        }
      }

    case UPDATE_FAVOURITES: 
      return {
        ...state.user,
        account: {
          ...state.user.account,
          favourites: action.payload
        }
      }

    case ADD_TO_WATCHED_LIST: 
      return {
        ...state.user,
        account: {
          ...state.user.account,
          watched: action.payload
        }
      }

    case SHOPPING_CART_UPDATE: 
      return {
        ...state.user,
        account: {
          ...state.user.account,
          shoppingCart: action.payload
        }
      }

    case SHOPPING_CART_CLEAR: 
      return {
        ...state.user,
        account: {
          ...state.user.account,
          shoppingCart: []
        }
      }

    default:
      return state.user;
  }
}

export default updateUser;
