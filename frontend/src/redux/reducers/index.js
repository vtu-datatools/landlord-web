import { combineReducers } from "redux";
import auth from "./auth";
import users from "./users";
import userProfile from "./userprofile";
import register from "./register";
import modal from "./modal";

const rootReducer = combineReducers({
  auth,
  users,
  userProfile,
  register,
  modal,
});

export default rootReducer;
