// redux/reducers/chatBotReducer.js
import {
  CHAT_BOT_REQUEST,
  CHAT_BOT_SUCCESS,
  CHAT_BOT_FAILURE,
} from "./ActionType";

const initialState = {
  loading: false,
  responses: [],
  error: null,
};

const chatBotReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_BOT_REQUEST:
      return { ...state, loading: true, error: null };
    case CHAT_BOT_SUCCESS:
      return {
        ...state,
        loading: false,
        responses: [
          ...state.responses,
          { message: action.payload.message, role: "modal" },
        ],
      };
    case CHAT_BOT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default chatBotReducer;
