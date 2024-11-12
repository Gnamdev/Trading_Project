import {
  GET_USER_WALLET_REQUEST,
  GET_USER_WALLET_SUCCESS,
  GET_USER_WALLET_FAILURE,
  GET_WALLET_TRANSACTION_REQUEST,
  GET_WALLET_TRANSACTION_SUCCESS,
  DEPOSIT_MONEY_REQUEST,
  DEPOSIT_MONEY_SUCCESS,
  DEPOSIT_MONEY_FAILURE,
  TRANSFER_MONEY_REQUEST,
  TRANSFER_MONEY_SUCCESS,
  TRANSFER_MONEY_FAILURE,
} from "./ActionType";

const initialState = {
  userWallet: {},
  loading: false,
  error: null,
  transaction: [],
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    // Request Actions for wallet and transactions
    case GET_USER_WALLET_REQUEST:
    case GET_WALLET_TRANSACTION_REQUEST:
    case DEPOSIT_MONEY_REQUEST:
    case TRANSFER_MONEY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Success Actions
    case GET_USER_WALLET_SUCCESS:
    case TRANSFER_MONEY_SUCCESS:
      return {
        ...state,
        userWallet: action.payload,
        loading: false,
        error: null,
      };
    case GET_WALLET_TRANSACTION_SUCCESS:
      return {
        ...state,
        transaction: action.payload,
        loading: false,
        error: null,
      };
    case DEPOSIT_MONEY_SUCCESS:
      return {
        ...state,
        userWallet: action.payload,

        loading: false,
        error: null,
      };

    // Failure Actions
    case GET_USER_WALLET_FAILURE:

    case DEPOSIT_MONEY_FAILURE:
    case TRANSFER_MONEY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default walletReducer;
