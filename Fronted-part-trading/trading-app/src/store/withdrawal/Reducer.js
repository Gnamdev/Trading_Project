const initialState = {
  withdrawal: null,
  history: [],
  loading: false,
  error: null,
  paymentDetails: null,
  requests: [],
};

const withdrawalReducer = (state = initialState, action) => {
  switch (action.type) {
    // Handle withdrawal request
    case "WITHDRAWAL_REQUEST":
    case "WITHDRAWAL_PROCEED_REQUEST":
    case "GET_WITHDRAWAL_HISTORY_REQUEST":
    case "GET_WITHDRAWAL_REQUEST_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Handle successful withdrawal actions
    case "WITHDRAWAL_SUCCESS":
      return {
        ...state,
        loading: false,
        withdrawal: action.payload,
        error: null,
      };

    case "WITHDRAWAL_PROCEED_SUCCESS":
      return {
        ...state,
        loading: false,
        requests: state.requests.map((item) =>
          item.id == action.payload.id ? action.payload : item
        ),
        error: null,
      };

    case "GET_WITHDRAWAL_HISTORY_SUCCESS":
      return {
        ...state,
        loading: false,
        history: action.payload,
        error: null,
      };

    case "GET_WITHDRAWAL_REQUEST_SUCCESS":
      return {
        ...state,
        loading: false,
        requests: action.payload,
        error: null,
      };

    case "ADD_PAYMENT_DETAILS_SUCCESS":
      return {
        ...state,
        loading: false,
        paymentDetails: action.payload,
        error: null,
      };

    case "GET_PAYMENT_DETAILS_SUCCESS":
      return {
        ...state,
        loading: false,
        paymentDetails: action.payload,
        error: null,
      };

    // Handle failed actions
    case "WITHDRAWAL_FAILURE":
    case "WITHDRAWAL_PROCEED_FAILURE":
    case "GET_WITHDRAWAL_HISTORY_FAILURE":
    case "GET_WITHDRAWAL_REQUEST_FAILURE":
    case "ADD_PAYMENT_DETAILS_FAILURE":
    case "GET_PAYMENT_DETAILS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default withdrawalReducer;
