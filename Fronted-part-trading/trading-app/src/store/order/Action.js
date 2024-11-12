import api from "@/config/api";
import {
  GET_ALL_ORDER_FAILURE,
  GET_ALL_ORDER_REQUEST,
  GET_ALL_ORDER_SUCCESS,
  PAY_ORDER_FAILURE,
  PAY_ORDER_REQUEST,
  PAY_ORDER_SUCCESS,
} from "./ActionType";

export const payOrder =
  ({ jwt, orderData }) =>
  async (dispatchEvent) => {
    dispatchEvent({ type: PAY_ORDER_REQUEST });

    console.log("orderdata : --> ", orderData);
    try {
      const response = await api.post(
        `/api/orders/pay`,
        orderData,

        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatchEvent({
        type: PAY_ORDER_SUCCESS,
        payload: response.data,
      });
      console.log("order success -->", response.data);
    } catch (error) {
      dispatchEvent({
        type: PAY_ORDER_FAILURE,
        payload: error.message,
      });
      console.log("order success fail -->", error);
    }
  };

export const getAllOrdersForUser =
  ({ jwt, orderType, assetSymbole }) =>
  async (dispatchEvent) => {
    dispatchEvent({ type: GET_ALL_ORDER_REQUEST });

    try {
      const response = await api.get(`/api/orders`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        params: {
          order_type: orderType,
          asset_symbol: assetSymbole,
        },
      });

      dispatchEvent({
        type: GET_ALL_ORDER_SUCCESS,
        payload: response.data,
      });
      console.log("get all order success -->", response.data);
    } catch (error) {
      dispatchEvent({
        type: GET_ALL_ORDER_FAILURE,
        payload: error.message,
      });
      console.log("get all order  fail -->", error);
    }
  };
