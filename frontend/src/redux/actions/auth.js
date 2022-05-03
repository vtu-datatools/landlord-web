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
import { useSelector } from "react-redux";
import { obtainToken, logout, editProfileApi } from "../../api/user";
import { apiErrorHandler } from "../../utils/errorhandler";

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

export const editProfileAction = (newProfile) => (dispatch) => {
  dispatch(editProfileRequest());
  const { username } = useSelector((state) => ({
    name: state.auth.username,
  }));
  if (!username) {
    dispatch(editProfileFailure("Not authenticated"));
  } else {
    editProfileApi(username, newProfile)
      .then(() => {
        dispatch(editProfileSuccess(newProfile));
      })
      .catch((error) => {
        const errorMessage = apiErrorHandler(error);
        dispatch(editProfileFailure(errorMessage));
      });
  }
};

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
