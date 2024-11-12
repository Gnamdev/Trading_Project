import axios from "axios";
import {
  CHAT_BOT_FAILURE,
  CHAT_BOT_REQUEST,
  CHAT_BOT_SUCCESS,
} from "./ActionType";
import { API_BASE_URL } from "@/config/api";

export const getChatRealChat =
  ({ jwt, prompt }) =>
  async (dispatchEvent) => {
    dispatchEvent({ type: CHAT_BOT_REQUEST });

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/ai/real-chat`,
        {
          prompt,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log("data->", response.data); // Ensure you log response.data

      // Update payload to use response.data instead of response.message
      dispatchEvent({ type: CHAT_BOT_SUCCESS, payload: response.data }); // Adjust this line
    } catch (error) {
      dispatchEvent({ type: CHAT_BOT_FAILURE, payload: error.message });
      console.log("eroor in chat res", error);
    }
  };
