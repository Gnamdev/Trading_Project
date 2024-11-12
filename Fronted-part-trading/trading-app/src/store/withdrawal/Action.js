import api from "@/config/api";
import {
  ADD_PAYMENT_DETAILS_FAILURE,
  ADD_PAYMENT_DETAILS_REQUEST,
  ADD_PAYMENT_DETAILS_SUCCESS,
  GET_PAYMENT_DETAILS_FAILURE,
  GET_PAYMENT_DETAILS_REQUEST,
  GET_PAYMENT_DETAILS_SUCCESS,
  GET_WITHDRAWAL_FAILURE_FAILURE,
  GET_WITHDRAWAL_HISTORY_FAILURE,
  GET_WITHDRAWAL_HISTORY_REQUEST,
  GET_WITHDRAWAL_HISTORY_SUCCESS,
  GET_WITHDRAWAL_REQUEST_REQUEST,
  GET_WITHDRAWAL_SUCCESS_SUCCESS,
  WITHDRAWAL_FAILURE,
  WITHDRAWAL_PROCEED_FAILURE,
  WITHDRAWAL_PROCEED_REQUEST,
  WITHDRAWAL_PROCEED_SUCCESS,
  WITHDRAWAL_REQUEST,
  WITHDRAWAL_SUCCESS,
} from "./ActionType";

export const withdrawalRequest =
  ({ jwt, amount }) =>
  async (dispatchEvent) => {
    dispatchEvent({ type: WITHDRAWAL_REQUEST });

    try {
      const response = await api.post(`/api/withdrawal/${amount}`, null, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      dispatchEvent({
        type: WITHDRAWAL_SUCCESS,
        payload: response.data,
      });
      console.log("withdrawal amount -->", response.data);
    } catch (error) {
      dispatchEvent({
        type: WITHDRAWAL_FAILURE,
        payload: error.message,
      });
      console.log(error);
    }
  };

export const proceedWithdrwal =
  ({ id, jwt, accept }) =>
  async (dispatchEvent) => {
    dispatchEvent({ type: WITHDRAWAL_PROCEED_REQUEST });

    try {
      const response = await api.patch(
        `/api/admin/withdrawal/${id}/proceed/${accept}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatchEvent({
        type: WITHDRAWAL_PROCEED_SUCCESS,
        payload: response.data,
      });
      console.log("proceed withdrawal  -->", response.data);
    } catch (error) {
      dispatchEvent({
        type: WITHDRAWAL_PROCEED_FAILURE,
        payload: error.message,
      });
      console.log(error);
    }
  };

export const getWidrawalHistory = (jwt) => async (dispatchEvent) => {
  dispatchEvent({ type: GET_WITHDRAWAL_HISTORY_REQUEST });

  try {
    const response = await api.get(
      `/api/withdrawal`,

      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    dispatchEvent({
      type: GET_WITHDRAWAL_HISTORY_SUCCESS,
      payload: response.data,
    });
    console.log("Get  withdrawal history -->", response.data);
  } catch (error) {
    dispatchEvent({
      type: GET_WITHDRAWAL_HISTORY_FAILURE,
      payload: error.message,
    });
    console.log(error);
  }
};

export const getAllWithdrawalRequset = (jwt) => async (dispatchEvent) => {
  dispatchEvent({ type: GET_WITHDRAWAL_REQUEST_REQUEST });

  try {
    const response = await api.get(
      `/api/admin/withdrawal`,

      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    dispatchEvent({
      type: GET_WITHDRAWAL_SUCCESS_SUCCESS,
      payload: response.data,
    });
    console.log("Get  withdrawal req -->", response.data);
  } catch (error) {
    dispatchEvent({
      type: GET_WITHDRAWAL_FAILURE_FAILURE,
      payload: error.message,
    });
    console.log(error);
  }
};

export const addPaymentDetails =
  ({ paymentDetails, jwt }) =>
  async (dispatchEvent) => {
    dispatchEvent({ type: ADD_PAYMENT_DETAILS_REQUEST });

    try {
      const response = await api.post(
        `/api/payment-details`,
        paymentDetails,

        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatchEvent({
        type: ADD_PAYMENT_DETAILS_SUCCESS,
        payload: response.data,
      });
      console.log("add payment req -->", response.data);
    } catch (error) {
      dispatchEvent({
        type: ADD_PAYMENT_DETAILS_FAILURE,
        payload: error.message,
      });
      console.log(error);
    }
  };

export const getPaymentDetails =
  ({ jwt }) =>
  async (dispatchEvent) => {
    dispatchEvent({ type: GET_PAYMENT_DETAILS_REQUEST });

    try {
      const response = await api.get(
        `/api/payment-details`,

        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatchEvent({
        type: GET_PAYMENT_DETAILS_SUCCESS,
        payload: response.data,
      });
      console.log("get payment details -->", response.data);
    } catch (error) {
      dispatchEvent({
        type: GET_PAYMENT_DETAILS_FAILURE,
        payload: error.message,
      });
      console.log("get payment detailsd", error);
    }
  };
