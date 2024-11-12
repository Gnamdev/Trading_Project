import api from "@/config/api";
import {
  DEPOSIT_MONEY_FAILURE,
  DEPOSIT_MONEY_REQUEST,
  DEPOSIT_MONEY_SUCCESS,
  GET_USER_WALLET_FAILURE,
  GET_USER_WALLET_REQUEST,
  GET_USER_WALLET_SUCCESS,
  GET_WALLET_TRANSACTION_FAILURE,
  GET_WALLET_TRANSACTION_REQUEST,
  GET_WALLET_TRANSACTION_SUCCESS,
  TRANSFER_MONEY_FAILURE,
  TRANSFER_MONEY_REQUEST,
  TRANSFER_MONEY_SUCCESS,
} from "./ActionType";

export const getUserWallet = (jwt) => async (dispatchEvent) => {
  dispatchEvent({ type: GET_USER_WALLET_REQUEST });

  try {
    const response = await api.get(`/api/wallet`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatchEvent({
      type: GET_USER_WALLET_SUCCESS,
      payload: response.data,
    });
    console.log("user wallet ", response.data);
  } catch (error) {
    dispatchEvent({
      type: GET_USER_WALLET_FAILURE,
      payload: error.message,
    });
    console.log("getUserWallet:", error);
  }
};

export const getWalletTransection =
  ({ jwt }) =>
  async (dispatchEvent) => {
    dispatchEvent({ type: GET_WALLET_TRANSACTION_REQUEST });

    try {
      const response = await api.get(`/api/wallet/transactions`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      dispatchEvent({
        type: GET_WALLET_TRANSACTION_SUCCESS,
        payload: response.data,
      });
      console.log(response.data);
    } catch (error) {
      dispatchEvent({
        type: GET_WALLET_TRANSACTION_FAILURE,
        payload: error.message,
      });
      console.log(error);
    }
  };

export const depositMoney =
  ({ jwt, orderId, paymentId, navigate }) =>
  async (dispatchEvent) => {
    dispatchEvent({ type: DEPOSIT_MONEY_REQUEST });
    console.log("deposit  parameter --->>>", orderId, paymentId);
    try {
      const response = await api.put(`/api/wallet/deposit`, null, {
        params: {
          order_id: orderId,
          payment_id: paymentId,
        },
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      dispatchEvent({
        type: DEPOSIT_MONEY_SUCCESS,
        payload: response.data,
      });

      navigate("/wallet");
      console.log("Deposit paisa", response.data);
    } catch (error) {
      dispatchEvent({
        type: DEPOSIT_MONEY_FAILURE,
        payload: error.message,
      });
      console.log(error);
    }
  };

export const paymentHandler =
  ({ jwt, amount, paymentMethod }) =>
  async (dispatchEvent) => {
    dispatchEvent({ type: DEPOSIT_MONEY_REQUEST });

    try {
      const response = await api.post(
        `/api/payment/${paymentMethod}/amount/${amount}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      window.location.href = response.data.paymentUrl;

      dispatchEvent({
        type: DEPOSIT_MONEY_SUCCESS,
        payload: response.data,
      });
      console.log(response.data);
    } catch (error) {
      dispatchEvent({
        type: DEPOSIT_MONEY_FAILURE,
        payload: error.message,
      });
      console.log(error);
    }
  };

export const transferMoney =
  ({ jwt, walletId, reqData }) =>
  async (dispatchEvent) => {
    dispatchEvent({ type: TRANSFER_MONEY_REQUEST });

    try {
      const response = await api.put(
        `/api/wallet/${walletId}/transfer`,
        reqData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      // window.location.href = response.data.payment_url;

      dispatchEvent({
        type: TRANSFER_MONEY_SUCCESS,
        payload: response.data,
      });
      console.log("Transefer sucees --> ", response.data);
    } catch (error) {
      dispatchEvent({
        type: TRANSFER_MONEY_FAILURE,
        payload: error.message,
      });
      console.log(error);
    }
  };
