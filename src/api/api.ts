import { ApiConfig } from "api";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

/**
 * Configuring the axios instance.
 */
const DEFAULT_API_CONFIG: ApiConfig = {
  url: process.env.EXPO_PUBLIC_API_URL || "",
  apiVersion: "",
  timeout: 10000,
};
/**
 * Initialise axio api instance
 */
export const api = axios.create({
  baseURL: `${DEFAULT_API_CONFIG.url}/`,
  timeout: DEFAULT_API_CONFIG.timeout,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

/*
 * Request interceptor
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/*
 * Response interceptor
 */
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response?.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
