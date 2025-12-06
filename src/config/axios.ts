import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosHeaders,
  AxiosRequestConfig,
} from "axios";
import { authService } from "@/services/authService";

// Tạo instance Axios mà không cần baseURL
const api = axios.create({
  withCredentials: true, // Bật gửi cookie để xử lý refresh_token
  timeout: 60000,
});

// Interceptor cho request
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken") ?? sessionStorage.getItem("accessToken");

    // Bỏ qua header Authorization cho /auth/login và /captcha/generate
    const skipAuthEndpoints = ["/auth/login", "/captcha/generate", "/auth/check-email", "/auth/verify-otp", "/auth/register"];
    const shouldSkipAuth = skipAuthEndpoints.some((endpoint) =>
      config.url?.includes(endpoint)
    );

    // Chỉ set các header cần thiết, không set Origin/Referer 
    // vì browser sẽ tự động set và không cho phép override
    config.headers = new AxiosHeaders({
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
      ...(shouldSkipAuth
        ? {}
        : { Authorization: token ? `Bearer ${token}` : null }),
      ...config.headers,
    });

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor cho response (xử lý lỗi)
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized: Token hết hạn hoặc không hợp lệ");
      // Xử lý logout hoặc refresh token nếu cần
    }
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  async (error: AxiosError) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      const originalRequest = error.config as AxiosRequestConfig & {
        _retry?: boolean;
      };
      const refreshToken = localStorage.getItem("refreshToken") ?? sessionStorage.getItem("refreshToken");

      if (refreshToken && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const { data } = await authService.refreshToken(refreshToken);
          const storage = localStorage.getItem("refreshToken") ? localStorage : sessionStorage;
          
          if (data.accessToken) {
            storage.setItem("accessToken", data.accessToken);
          }
          if (data.refreshToken) {
            storage.setItem("refreshToken", data.refreshToken);
          }

          return api(originalRequest);
        } catch (refreshError) {
          console.error("Refresh token failed:", refreshError);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("refreshToken");
          return Promise.reject(refreshError);
        }
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
      }
    }

    return Promise.reject(error || "Error");
  }
);

export default api;
