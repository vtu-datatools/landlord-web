import axiosAPI from "./jwt";
import { FORUM_URL } from "./constants";

export const fetchForumsApi = () => {
  return axiosAPI.get(FORUM_URL);
};

export const fetchForumApi = (forum) => {
  return axiosAPI.get(FORUM_URL + forum);
};
