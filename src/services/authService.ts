import {
  ForgotPasswordRequest,
  LoginRequest,
  ResetPasswordRequest,
} from "@/types/auth";
import api from "../config/axios";
import { ProfileType } from "@/types/profile";
import { getAuthBaseUrl } from "@/config/apiConfig";

class AuthService {
  async whoami() {
    const baseUrl = getAuthBaseUrl();
    // Thử các endpoint phổ biến, ưu tiên /auth/user/current-user
    // Nếu không được, có thể thử /auth/current-user hoặc /auth/user-info
    const response = await api.get(`${baseUrl}/users/user-info`);
    return response;
  }

  async refreshToken(refreshToken: string) {
    try {
      const baseUrl = getAuthBaseUrl();
      const response = await fetch(`${baseUrl}/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error;
    }
  }
  async login(data: LoginRequest) {
    const baseUrl = getAuthBaseUrl();
    const endpoint = `${baseUrl}/auth/login`;
    
    // Request body theo đúng format từ curl command
    const requestBody = {
      username: data.username,
      password: data.password,
      rememberMe: data.rememberMe ?? false,
    };
    
    const response = await api.post(endpoint, requestBody);
    return response;
  }
  async generateCaptcha() {
    const baseUrl = getAuthBaseUrl();
    const response = await api.post(`${baseUrl}/captcha/generate`);
    return response;
  }

  async checkEmail(data: { email: string }) {
    const baseUrl = getAuthBaseUrl();
    const endpoint = `${baseUrl}/auth/check-email`;
    
    const response = await api.post(endpoint, data);
    return response;
  }

  async verifyOtp(data: { email: string; otp: string; token: string }) {
    const baseUrl = getAuthBaseUrl();
    const endpoint = `${baseUrl}/auth/verify-otp`;
    
    const response = await api.post(endpoint, data);
    return response;
  }

  async partnerRegister(data: {
    fullname: string;
    email: string;
    password: string;
    phoneNumber: string;
    otp: string;
    token: string;
  }) {
    const baseUrl = getAuthBaseUrl();
    const endpoint = `${baseUrl}/auth/partner/register`;
    
    const response = await api.post(endpoint, data);
    return response;
  }

  async register(data: {
    email: string;
    fullname: string;
    phoneNumber: string;
    password: string;
  }) {
    // Legacy method - giữ lại để tương thích
    return this.partnerRegister({
      ...data,
      otp: "",
      token: "",
    });
  }

  async forgotPassword(data: ForgotPasswordRequest) {
    const baseUrl = getAuthBaseUrl();
    const response = await api.post(`${baseUrl}/auth/forgot-password`, data);
    return response;
  }

  async resetPasswordByEmail(data: ResetPasswordRequest) {
    const baseUrl = getAuthBaseUrl();
    const response = await api.post(`${baseUrl}/reset-password/email`, data);
    return response;
  }

  async resetPassword(data: unknown) {
    const baseUrl = getAuthBaseUrl();
    const response = await api.post(`${baseUrl}/auth/reset-password`, data);
    return response;
  }

  async checkExitPhoneOrEmail({
    phoneNumber,
    email,
    taxCode,
  }: {
    phoneNumber: string;
    email: string;
    taxCode: string;
  }) {
    const baseUrl = getAuthBaseUrl();
    const response = await api.post(
      `${baseUrl}/users/exist?phoneNumber=${phoneNumber}&email=${email}&taxCode=${taxCode}`
    );
    return response;
  }

  async updateInfoAccount(data: ProfileType) {
    const baseUrl = getAuthBaseUrl();
    const response = await api.put(`${baseUrl}/auth/update-profile`, data);
    return response;
  }

  async changePassword(data: unknown) {
    const baseUrl = getAuthBaseUrl();
    const response = await api.put(`${baseUrl}/change-password`, data);
    return response;
  }
  async logout() {
    try {
      const refreshToken = localStorage.getItem("refreshToken") || 
                          sessionStorage.getItem("refreshToken");
      
      // Gọi API logout nếu có refreshToken
      if (refreshToken) {
        const baseUrl = getAuthBaseUrl();
        const endpoint = `${baseUrl}/auth/logout`;
        
        try {
          await api.post(endpoint, { refreshToken });
        } catch (error) {
          console.error("Logout API error:", error);
          // Tiếp tục xóa token dù API fail
        }
      }
      
      // Xóa tất cả token và auth data
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      
      // Xóa cookie nếu có
      document.cookie = "refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      // Vẫn xóa token dù có lỗi
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      throw error;
    }
  }
}
export const authService = new AuthService();
