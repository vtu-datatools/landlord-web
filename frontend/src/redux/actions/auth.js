import { LOGIN_SUCCESS, LOGOUT } from "./types";
import { obtainToken, logout } from "../../api/auth";

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

export function logoutUserSuccess() {
  return { type: LOGOUT };
}
export function logoutUser() {
  return async function (dispatch) {
    await logout();
    dispatch(logoutUserSuccess());
  };
}
