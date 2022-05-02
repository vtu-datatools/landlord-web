import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGOUT,
  LOGIN_FAILURE,
  LOGIN_RESET,
} from "./types";
import { obtainToken, logout } from "../../api/user";

export function loginUserSuccess(token) {
  return { type: LOGIN_SUCCESS, token };
}

export function loginUser(username, password) {
  return async function (dispatch) {
    try {
      const response = await obtainToken(username, password);
      dispatch(loginUserSuccess(response.data.access));
    } catch (error) {
      console.log("Error obtaining token. " + error);
    }
  };
}
export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    error,
  };
};

export const loginReset = () => {
  return {
    type: LOGIN_RESET,
  };
};

export function logoutUserSuccess() {
  return { type: LOGOUT };
}
export function logoutUser() {
  return async function (dispatch) {
    await logout();
    dispatch(logoutUserSuccess());
  };
}
