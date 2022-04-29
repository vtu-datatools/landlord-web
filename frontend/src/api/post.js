import axiosAPI from "./base";
import {
  POST_URL,
  POST_DELETE_URL,
  POST_CREATE_URL,
  POST_EDIT_URL,
} from "./constants";

export const createPostApi = (newPost) => {
  return axiosAPI.post(POST_CREATE_URL, newPost);
};

export const deletePostApi = (id) => {
  return axiosAPI.delete(POST_URL + id + POST_DELETE_URL);
};

export const editPostApi = (id, content) => {
  return axiosAPI.put(POST_URL + id + POST_EDIT_URL, { content: content });
};
