import api from "@/config/api";
import {
  GET_ASSET_DETAILS_FAILURE,
  GET_ASSET_DETAILS_REQUEST,
  GET_ASSET_DETAILS_SUCCESS,
  GET_ASSET_FAILURE,
  GET_ASSET_REQUEST,
  GET_ASSET_SUCCESS,
  GET_USER_ASSETS_FAILURE,
  GET_USER_ASSETS_REQUEST,
  GET_USER_ASSETS_SUCCESS,
} from "./ActionType";

export const getUserAssetById =
  ({ jwt, assetId }) =>
  async (dispatchEvent) => {
    dispatchEvent({ type: GET_ASSET_REQUEST });

    try {
      const response = await api.get(`/api/asset/${assetId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      dispatchEvent({
        type: GET_ASSET_SUCCESS,
        payload: response.data,
      });
      console.log("get user asset success -->", response.data);
    } catch (error) {
      dispatchEvent({
        type: GET_ASSET_FAILURE,
        payload: error.message,
      });
      console.log("get asset fail -->", error);
    }
  };

export const getAssetDetails =
  ({ jwt, coinId }) =>
  async (dispatchEvent) => {
    dispatchEvent({ type: GET_ASSET_DETAILS_REQUEST });

    try {
      const response = await api.get(`/api/asset/coin/${coinId}/user`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      dispatchEvent({
        type: GET_ASSET_DETAILS_SUCCESS,
        payload: response.data,
      });
      console.log("get user asset details success -->", response.data);
    } catch (error) {
      dispatchEvent({
        type: GET_ASSET_DETAILS_FAILURE,
        payload: error.message,
      });
      console.log("get asset details fail -->", error);
    }
  };

export const getUserAsset = (jwt) => async (dispatchEvent) => {
  dispatchEvent({ type: GET_USER_ASSETS_REQUEST });

  try {
    const response = await api.get(`/api/asset`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatchEvent({
      type: GET_USER_ASSETS_SUCCESS,
      payload: response.data,
    });
    console.log("get user asset success -->", response.data);
  } catch (error) {
    dispatchEvent({
      type: GET_USER_ASSETS_FAILURE,
      payload: error.message,
    });
    console.log("get asset  fail -->", error);
  }
};
