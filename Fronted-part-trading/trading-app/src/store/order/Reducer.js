import {
  PAY_ORDER_REQUEST,
  PAY_ORDER_SUCCESS,
  PAY_ORDER_FAILURE,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILURE,
  GET_ALL_ORDER_REQUEST,
  GET_ALL_ORDER_SUCCESS,
  GET_ALL_ORDER_FAILURE,
} from "./ActionType"; // Adjust the path as needed

const initialState = {
  order: null,
  orders: [],
  loading: false, // Corrected from 'flase' to 'false'
  error: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAY_ORDER_REQUEST:
    case GET_ORDER_REQUEST:
    case GET_ALL_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PAY_ORDER_SUCCESS:
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
        error: null,
      };

    case GET_ALL_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
        error: null,
      };
    case PAY_ORDER_FAILURE:
    case GET_ORDER_FAILURE:
    case GET_ALL_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default orderReducer;
