import { publicAxios } from "../lib/axios.public";


export interface LoginResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export const loginApi = (payload: {
  email: string;
  password: string;
}) =>
  publicAxios.post<LoginResponse>("/auth/login", payload);

export const refreshApi = (refreshToken: string) =>
  publicAxios.post<LoginResponse>("/auth/refresh", {
    refreshToken,
  });