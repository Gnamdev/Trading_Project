import {
  GET_ASSET_REQUEST,
  GET_ASSET_SUCCESS,
  GET_ASSET_FAILURE,
  GET_USER_ASSETS_REQUEST,
  GET_USER_ASSETS_SUCCESS,
  GET_USER_ASSETS_FAILURE,
  GET_ASSET_DETAILS_REQUEST,
  GET_ASSET_DETAILS_SUCCESS,
  GET_ASSET_DETAILS_FAILURE,
} from "./ActionType"; // Adjust the path as needed

const initialState = {
  asset: null,
  userAssets: [],
  loading: false,
  error: null,
  assetDetails: null,
};

const assetReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ASSET_REQUEST:
    case GET_USER_ASSETS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ASSET_SUCCESS:
      return {
        ...state,
        loading: false,
        asset: action.payload,
        error: null,
      };
    case GET_USER_ASSETS_SUCCESS:
      return {
        ...state,
        loading: false,
        userAssets: action.payload,
        error: null,
      };
    case GET_ASSET_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        assetDetails: action.payload,
        error: null,
      };
    case GET_ASSET_FAILURE:
    case GET_USER_ASSETS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.errors,
      };
    default:
      return state;
  }
};

export default assetReducer;
