// export default watchlistReducer;
import {
  GET_USER_WATCHLIST_REQUEST,
  GET_USER_WATCHLIST_SUCCESS,
  GET_USER_WATCHLIST_FAILURE,
  ADD_COIN_TO_WATCHLIST_REQUEST,
  ADD_COIN_TO_WATCHLIST_SUCCESS,
  ADD_COIN_TO_WATCHLIST_FAILURE,
} from "./ActionType";

const initialState = {
  watchlist: null,
  loading: false,
  error: null,
  items: [],
};

const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_WATCHLIST_REQUEST:
    case ADD_COIN_TO_WATCHLIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_USER_WATCHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        watchlist: action.payload,
        error: null,
        items: action.payload.coinsList,
      };
    case GET_USER_WATCHLIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ADD_COIN_TO_WATCHLIST_SUCCESS:
      const coinExists = state.items.some(
        (item) => item.id === action.payload.id
      );
      const updatedItems = coinExists
        ? state.items.filter((item) => item.id !== action.payload.id)
        : [...state.items, action.payload];

      return {
        ...state,
        loading: false,
        error: null,
        items: updatedItems,
      };
    case ADD_COIN_TO_WATCHLIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default watchlistReducer;
