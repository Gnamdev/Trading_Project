import axios from "axios";
import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";
import { API_BASE_URL } from "@/config/api";
import { toast } from "react-toastify";

export const register = (userData) => async (dispatchEvent) => {
  dispatchEvent({ type: REGISTER_REQUEST });

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);

    const user = response.data;
    console.log(user);
    console.log("userDATA -->", userData);

    dispatchEvent({ type: REGISTER_SUCCESS, payload: user.jwt });

    toast.success("Register successfully..");

    localStorage.setItem("jwt", user.jwt);

    userData.navigate("/signin");
  } catch (error) {
    dispatchEvent({ type: REGISTER_FAILURE, payload: error.message });

    toast.error("Somthing went wrong...");
  }
};

export const login = (userData) => async (dispatchEvent) => {
  dispatchEvent({ type: LOGIN_REQUEST });

  // const BASE_URL = "http://localhost:8080"

  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      userData.data
    );

    const user = response.data;
    console.log("from login method", user);

    dispatchEvent({ type: LOGIN_SUCCESS, payload: user.jwt });

    toast.success("Login successfully..");
    localStorage.setItem("jwt", user.jwt);
    userData.navigate("/");
  } catch (error) {
    toast.error("Invalid UserName and Password...");
    dispatchEvent({ type: LOGIN_FAILURE, payload: error.message });

    console.log("from login method ", error);
  }
};

export const getUser = (jwt) => async (dispatchEvent) => {
  dispatchEvent({ type: GET_USER_REQUEST });

  // const BASE_URL = "http://localhost:8080";

  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/users/profile`,

      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    console.log(response);
    const user = response.data;
    console.log("User data from getUser method:", user);

    dispatchEvent({ type: GET_USER_SUCCESS, payload: user });
  } catch (error) {
    dispatchEvent({ type: GET_USER_FAILURE, payload: error.message });
    console.error(
      "Error from getUser method:",
      error.response ? error.response.data : error.message
    );
  }
};

export const logout = () => (dispatchEvent) => {
  localStorage.clear();
  toast.success("Logout Successfully");
  dispatchEvent({ type: LOGOUT });
};
