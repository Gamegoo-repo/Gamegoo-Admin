import axios from "axios";
import { getAccessToken } from "../auth/auth.storage";
import { refreshAccessToken } from "../auth/auth.service";

export const BASE_URL = import.meta.env.VITE_PUBLIC_BASE_URL as string;

export const authAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

// 요청 시 accessToken 주입
authAxios.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 401 처리
authAxios.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const newAccessToken = await refreshAccessToken();
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return authAxios(originalRequest);
    }

    return Promise.reject(error);
  }
);