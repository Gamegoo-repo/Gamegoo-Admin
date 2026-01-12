import { authAxios } from "../lib/axios.auth";
import { publicAxios } from "../lib/axios.public";


export interface LoginResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export const loginApi = (payload: {
  account: string;
  password: string;
}) =>
  publicAxios.post<LoginResponse>("api/v2/auth/admin/login", payload);

export const logoutApi= ()=> {
    authAxios.post("api/v2/auth/logout")
}
export const refreshApi = (refreshToken: string) =>
  publicAxios.post<LoginResponse>("/auth/refresh", {
    refreshToken,
  });