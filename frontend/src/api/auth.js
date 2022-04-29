import axiosAPI, { setNewHeaders } from "./jwt";

export async function signUp(username, email, password, first_name, last_name) {
  const response = await axiosAPI.post("create/", {
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
  const response = await axiosAPI.post("token/obtain/", {
    username,
    password,
  });
  setNewHeaders(response);
  return response;
}

export async function refreshToken(refresh) {
  const response = await axiosAPI.post("token/refresh/", {
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
  const response = await axiosAPI.get("available/username/", {
    params: {
      username: username,
    },
  });
  return response;
}

export async function emailAvailable(email) {
  const response = await axiosAPI.get("available/email/", {
    params: {
      email: email,
    },
  });
  return response;
}
