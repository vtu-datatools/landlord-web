import axiosAPI from "./base";
import {
  THREAD_URL,
  THREAD_CREATE_URL,
  THREAD_EDIT_URL,
  THREAD_DELETE_URL,
} from "./constants";

export const fetchThreadApi = (thread) => {
  return axiosAPI.get(THREAD_URL + thread);
};

export const createThreadApi = (newThread) => {
  return axiosAPI.post(THREAD_CREATE_URL, newThread);
};

export const deleteThreadApi = (id) => {
  return axiosAPI.delete(THREAD_URL + id + THREAD_DELETE_URL);
};

export const editThreadApi = (id, data) => {
  return axiosAPI.put(THREAD_URL + id + THREAD_EDIT_URL, data);
};
