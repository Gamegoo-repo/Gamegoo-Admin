import { STORAGE_KEY } from "@/constants/storage";

type StorageType = "local" | "session";

const getStorage = (): Storage => {
  if (typeof window === "undefined") {
    throw new Error("Storage is not available");
  }

  const type =
    (localStorage.getItem(STORAGE_KEY.storageType) as StorageType) ?? "session";

  return type === "local" ? localStorage : sessionStorage;
};

export const initAuthStorage = (autoLogin: boolean) => {
  localStorage.setItem(
    STORAGE_KEY.storageType,
    autoLogin ? "local" : "session"
  );
};

export const saveAuth = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  const storage = getStorage();

  storage.setItem(STORAGE_KEY.accessToken, accessToken);
  storage.setItem(STORAGE_KEY.refreshToken, refreshToken);
};

export const getAccessToken = () =>
  typeof window === "undefined"
    ? null
    : getStorage().getItem(STORAGE_KEY.accessToken);

export const getRefreshToken = () =>
  typeof window === "undefined"
    ? null
    : getStorage().getItem(STORAGE_KEY.refreshToken);

export const clearAuth = () => {
  if (typeof window === "undefined") return;

  const storage = getStorage();

  storage.removeItem(STORAGE_KEY.accessToken);
  storage.removeItem(STORAGE_KEY.refreshToken);
  localStorage.removeItem(STORAGE_KEY.storageType);
};