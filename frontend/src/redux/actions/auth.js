import { LOGIN, LOGOUT } from "./types";
import { obtainToken, logout } from "../../components/api/authenticationApi";

export function loginUserSuccess(token) {
  return { type: LOGIN, token };
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
