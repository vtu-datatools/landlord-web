import axiosAPI, { setNewHeaders } from "./jwt";
import {
  USER_REGISTER_URL,
  USER_TOKEN_OBTAIN_URL,
  USER_TOKEN_REFRESH_URL,
  USER_EDIT_URL,
  USER_URL,
  USER_AVAILABLE_USERNAME_URL,
  USER_AVAILABLE_EMAIL_URL,
} from "./constants";

export async function signUp(username, email, password, first_name, last_name) {
  const response = await axiosAPI.post(USER_REGISTER_URL, {
    username,
    email,
    password,
    first_name,
    last_name,
  });
  localStorage.setItem("user", response.data);
  return response;
}

export async function obtainToken(username, password) {
  const response = await axiosAPI.post(USER_TOKEN_OBTAIN_URL, {
    username,
    password,
  });
  setNewHeaders(response);
  return response;
}

export async function refreshToken(refresh) {
  const response = await axiosAPI.post(USER_TOKEN_REFRESH_URL, {
    refresh,
  });
  setNewHeaders(response);
  return response;
}

export async function logout(accessToken) {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  // TODO: invalidate token on backend
  console.log(accessToken);
}

export const isAuthenticated = () => {
  const token = localStorage.getItem("access_token");
  return !!token;
};

export async function usernameAvailable(username) {
  const response = await axiosAPI.get(USER_AVAILABLE_USERNAME_URL, {
    params: {
      username: username,
    },
  });
  return response;
}

export async function emailAvailable(email) {
  const response = await axiosAPI.get(USER_AVAILABLE_EMAIL_URL, {
    params: {
      email: email,
    },
  });
  return response;
}

export async function fetchUserProfile(username) {
  const response = await axiosAPI.get(USER_URL + username);
  return response;
}

export async function editProfile(username, newProfile) {
  const response = await axiosAPI.put(
    USER_URL + username + USER_EDIT_URL,
    newProfile
  );
  return response;
}

export async function fetchUsers() {
  const response = await axiosAPI.get(USER_URL);
  return response;
}
