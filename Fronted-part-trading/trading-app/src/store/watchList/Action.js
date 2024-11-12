// import axios from "axios";
// import {
//   GET_USER_WALLET_FAILURE,
//   GET_USER_WALLET_REQUEST,
//   GET_USER_WALLET_SUCCESS,
// } from "../wallet/ActionType";
// import {
//   ADD_COIN_TO_WATCHLIST_FAILURE,
//   ADD_COIN_TO_WATCHLIST_REQUEST,
//   ADD_COIN_TO_WATCHLIST_SUCCESS,
// } from "./ActionType";
// import { API_BASE_URL } from "@/config/api";

// export const getUserWatchList = (jwt) => async (dispatchEvent) => {
//   dispatchEvent({ type: GET_USER_WALLET_REQUEST });

//   // const BASE_URL = "http://localhost:8080";

//   try {
//     const response = await axios.get(`${API_BASE_URL}/api/watchlist/user`, {
//       headers: {
//         Authorization: `Bearer ${jwt}`,
//       },
//     });
//     console.log(response);
//     const user = response.data;
//     console.log("watchlist data : ", user);

//     dispatchEvent({ type: GET_USER_WALLET_SUCCESS, payload: user });
//   } catch (error) {
//     dispatchEvent({ type: GET_USER_WALLET_FAILURE, payload: error.message });
//     console.error(
//       "error in user watchlist get:",
//       error.response ? error.response.data : error.message
//     );
//   }
// };

// export const addItemToWatchlist =
//   ({ jwt, coinId }) =>
//   async (dispatchEvent) => {
//     dispatchEvent({ type: ADD_COIN_TO_WATCHLIST_REQUEST });

//     // const BASE_URL = "http://localhost:8080";

//     try {
//       const response = await axios.patch(
//         `${API_BASE_URL}/api/watchlist/add/coin/${coinId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${jwt}`,
//           },
//         }
//       );
//       console.log(response);
//       const user = response.data;
//       console.log("coin add successfully into watchlist data : ", user);

//       dispatchEvent({ type: ADD_COIN_TO_WATCHLIST_SUCCESS, payload: user });
//     } catch (error) {
//       dispatchEvent({
//         type: ADD_COIN_TO_WATCHLIST_FAILURE,
//         payload: error.message,
//       });
//       console.error(
//         "error in adding coin into  watchlist:",
//         error.message,
//         error.response
//       );
//     }
//   };

import axios from "axios";
import {
  GET_USER_WATCHLIST_FAILURE,
  GET_USER_WATCHLIST_REQUEST,
  GET_USER_WATCHLIST_SUCCESS,
  ADD_COIN_TO_WATCHLIST_FAILURE,
  ADD_COIN_TO_WATCHLIST_REQUEST,
  ADD_COIN_TO_WATCHLIST_SUCCESS,
} from "./ActionType";
import { API_BASE_URL } from "@/config/api";

export const getUserWatchList = (jwt) => async (dispatchEvent) => {
  dispatchEvent({ type: GET_USER_WATCHLIST_REQUEST });

  try {
    const response = await axios.get(`${API_BASE_URL}/api/watchlist/user`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const user = response.data;
    dispatchEvent({ type: GET_USER_WATCHLIST_SUCCESS, payload: user });
  } catch (error) {
    dispatchEvent({ type: GET_USER_WATCHLIST_FAILURE, payload: error.message });
    console.error("error in user watchlist get:", error.message);
  }
};

export const addItemToWatchlist =
  ({ jwt, coinId }) =>
  async (dispatchEvent) => {
    dispatchEvent({ type: ADD_COIN_TO_WATCHLIST_REQUEST });

    try {
      const response = await axios.patch(
        `${API_BASE_URL}/api/watchlist/add/coin/${coinId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const coin = response.data;
      dispatchEvent({ type: ADD_COIN_TO_WATCHLIST_SUCCESS, payload: coin });
    } catch (error) {
      dispatchEvent({
        type: ADD_COIN_TO_WATCHLIST_FAILURE,
        payload: error.message,
      });
      console.error("error in adding coin into watchlist:", error.message);
    }
  };
