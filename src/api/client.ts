import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "@/features/auth/store";
import { getEnvConfig } from "@/shared/config/env";

const envConfig = getEnvConfig();
const AUTH_URL = envConfig.authApiUrl;
const ADMIN_URL = envConfig.adminApiUrl;

const createAxiosClient = (baseURL: string): AxiosInstance => {
  const client = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  interface FailedRequest {
    resolve: (token: string | null) => void;
    reject: (error: unknown) => void;
  }

  let isRefreshing = false;
  let failedQueue: FailedRequest[] = [];

  const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    failedQueue = [];
  };

  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return client(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const {
          refreshToken: storedRefreshToken,
          login,
          logout,
        } = useAuthStore.getState();

        try {
          if (!storedRefreshToken) throw new Error("No refresh token");

          const response = await axios.post(`${AUTH_URL}/auth/refresh`, {
            refreshToken: storedRefreshToken,
          });

          const { accessToken, refreshToken: newRefreshToken } = response.data;

          // Get current user to preserve it
          const user = useAuthStore.getState().user;
          if (user) {
            login(user, accessToken, newRefreshToken);
          }

          processQueue(null, accessToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return client(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          logout();

          // Redirect to login on unauthorized
          window.location.href = "/login";

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );

  return client;
};

export const authApi = createAxiosClient(AUTH_URL);
export const adminApi = createAxiosClient(ADMIN_URL);
