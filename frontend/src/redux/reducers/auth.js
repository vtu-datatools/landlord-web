import * as types from "../actions/types";
import initial from "./initial";

export default function authReducer(state = initial.accessToken, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return action.token;
    case types.LOGOUT:
      return "";
    default:
      return state;
  }
}
