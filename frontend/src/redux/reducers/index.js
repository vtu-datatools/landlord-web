import { combineReducers } from "redux";
import auth from "./auth";
import users from "./users";
import userProfile from "./userprofile";

const rootReducer = combineReducers({
  auth,
  users,
  userProfile,
});

export default rootReducer;
