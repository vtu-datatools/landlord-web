import { combineReducers } from "redux";
import auth from "./auth";
import users from "./users";
import userProfile from "./userprofile";
import register from "./register";
import modal from "./modal";
import forum from "./forum";
import forumlist from "./forumlist";
import thread from "./thread";

const rootReducer = combineReducers({
  auth,
  users,
  userProfile,
  register,
  modal,
  forum,
  forumlist,
  thread,
});

export default rootReducer;
