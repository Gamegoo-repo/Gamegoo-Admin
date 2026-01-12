import axios from "axios";
export const BASE_URL = import.meta.env.VITE_PUBLIC_BASE_URL as string;
export const publicAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});