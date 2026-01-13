import { loginApi, logoutApi, refreshApi } from "./auth.api";
import {initAuthStorage, getRefreshToken, saveAuth, clearAuth } from "./auth.storage";

let isRefreshing = false;
let waitQueue: Array<(token: string) => void> = [];

const resolveQueue = (token: string) => {
  waitQueue.forEach((cb) => cb(token));
  waitQueue = [];
};

export const login = async(
    payload: {account: string, password: string},
    autoLogin:boolean
)=> {
    initAuthStorage(autoLogin)
    const res =await loginApi(payload)
    saveAuth({
    accessToken: res.data.data.accessToken,
    refreshToken: res.data.data.refreshToken,
  });

  return res;
}

export const logout = async () => {
  try {
    await logoutApi();
  } catch (error) {
    console.warn("Server logout failed", error);
  } finally {
    clearAuth();
  }
};

export const refreshAccessToken = async (): Promise<string> => {
  if (isRefreshing) {
    return new Promise((resolve) => {
      waitQueue.push(resolve);
    });
  }

  isRefreshing = true;

  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token");
    }

    const { data } = await refreshApi(refreshToken);
    
    saveAuth({
      accessToken: data.data.accessToken,
      refreshToken: data.data.refreshToken,
    });

    resolveQueue(data.data.accessToken);
    return data.data.accessToken;
  } catch (error) {
    clearAuth();
    throw error;
  } finally {
    isRefreshing = false;
  }
};