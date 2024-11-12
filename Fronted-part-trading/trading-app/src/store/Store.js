import { thunk } from "redux-thunk";

import { combineReducers, legacy_createStore, applyMiddleware } from "redux";
import authReducer from "./Auth/Reducers";
import coinReducer from "./coin/Reducer";
import walletReducer from "./wallet/Reducer";
import withdrawalReducer from "./withdrawal/Reducer";
import orderReducer from "./order/Reducer";
import assetReducer from "./Asset/Reducer";
import watchlistReducer from "./watchList/Reducer";
import chatBotReducer from "./ChatBot/Reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  coin: coinReducer,
  wallet: walletReducer,
  withdrawal: withdrawalReducer,
  order: orderReducer,
  asset: assetReducer,
  watchlist: watchlistReducer,
  chatbot: chatBotReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
