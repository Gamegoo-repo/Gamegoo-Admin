import { LoginResponse } from "@/types/api/login";
import { authAxios } from "../lib/axios.auth";
import { publicAxios } from "../lib/axios.public";
import { ReissueResponse } from "@/types/api/reissue";




export const loginApi = (payload: {
  account: string;
  password: string;
}) =>
  publicAxios.post<LoginResponse>("api/v2/auth/admin/login", payload);

export const logoutApi= ()=> {
    authAxios.post("api/v2/auth/logout")
}
export const refreshApi = (refreshToken: string) =>
  publicAxios.post<ReissueResponse>("api/v2/auth/refresh", {
    refreshToken,
  });