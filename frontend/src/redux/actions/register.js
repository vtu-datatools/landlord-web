import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_RESET,
} from "./types";
import { registerApi } from "../../api";
import { apiErrorHandler } from "../../utils/errorhandler";
import { loginUser } from "./auth";

export const register = (data) => (dispatch) => {
  dispatch(registerRequest());

  registerApi(data)
    .then(() => {
      dispatch(registerSuccess());
      dispatch(loginUser(data.username, data.password));
    })
    .catch((error) => {
      const errorMessage = apiErrorHandler(error);
      dispatch(registerFailure(errorMessage));
    });
};

export const registerRequest = () => {
  return {
    type: REGISTER_REQUEST,
  };
};

export const registerSuccess = () => {
  return {
    type: REGISTER_SUCCESS,
  };
};

export const registerFailure = (error) => {
  return {
    type: REGISTER_FAILURE,
    error,
  };
};

export const registerReset = () => {
  return {
    type: REGISTER_RESET,
  };
};
