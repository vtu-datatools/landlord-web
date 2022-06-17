import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGOUT,
  LOGIN_FAILURE,
  LOGIN_RESET,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE,
  EDIT_PROFILE_RESET,
} from "./types";
import { obtainToken, logout, editProfileApi } from "../../api/user";
import { apiErrorHandler } from "../../utils/errorhandler";

export function loginUserSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    username: data.username,
    isStaff: data.is_staff,
    avatar: data.avatar,
    name: data.name,
  };
}

export function loginUser(username, password) {
  return async function (dispatch) {
    dispatch(loginRequest());
    try {
      const response = await obtainToken(username, password);
      dispatch(loginUserSuccess(response.data));
    } catch (error) {
      dispatch(loginFailure(error));
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

export function editProfileAction(username, newProfile) {
  return async function (dispatch) {
    dispatch(editProfileRequest());
    try {
      await editProfileApi(username, newProfile);

      dispatch(editProfileSuccess(newProfile));
    } catch (error) {
      const errorMessage = apiErrorHandler(error);
      dispatch(editProfileFailure(errorMessage));
    }
  };
}

export const editProfileRequest = () => {
  return {
    type: EDIT_PROFILE_REQUEST,
  };
};

export const editProfileSuccess = (newProfile) => {
  return {
    type: EDIT_PROFILE_SUCCESS,
    avatar: newProfile.avatar,
    name: newProfile.name,
  };
};

export const editProfileFailure = (error) => {
  return {
    type: EDIT_PROFILE_FAILURE,
    error,
  };
};

export const editProfileReset = () => {
  return {
    type: EDIT_PROFILE_RESET,
  };
};
