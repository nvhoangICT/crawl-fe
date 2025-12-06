import { useState } from "react";
import { authService } from "@/services/authService";
import { toast } from "react-toastify";

export interface CheckEmailResponse {
  exists?: boolean;
  message?: string;
  otpDetails?: {
    token: string;
    expireIn: number;
  };
}

export interface VerifyOtpResponse {
  valid: boolean;
  message?: string;
}

export interface RegisterResponse {
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: string;
}

export interface RegisterRequest {
  fullname: string;
  email: string;
  password: string;
  phoneNumber: string;
  otp: string;
  token: string;
}

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);

  const checkEmail = async (data: { email: string }): Promise<CheckEmailResponse> => {
    setIsLoading(true);
    try {
      const response = await authService.checkEmail(data);
      
      // Response từ axios interceptor đã được transform thành response.data
      const result = response || response?.data || response;
      
      if (!result.exists) {
        toast.success(result.message || "Email hợp lệ, mã OTP đã được gửi");
        return result;
      } else {
        toast.error(result.message || "Email đã tồn tại");
        return result;
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Không thể kiểm tra email";
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (data: {
    email: string;
    otp: string;
    token: string;
  }): Promise<VerifyOtpResponse> => {
    setIsLoading(true);
    try {
      const response = await authService.verifyOtp(data);
      
      const result = response || response?.data || response;
      
      if (result.valid) {
        toast.success(result.message || "Xác thực OTP thành công");
        return result;
      } else {
        toast.error("OTP không đúng");
        return result;
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Lỗi xác thực OTP";
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
    setIsLoading(true);
    try {
      const response = await authService.partnerRegister(data);
      
      const result = response || response?.data || response;
      
      if (result?.accessToken) {
        toast.success("Đăng ký thành công!");
        return result;
      } else {
        toast.error("Đăng ký thất bại");
        return result;
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Đăng ký thất bại. Vui lòng thử lại!";
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    checkEmail,
    verifyOtp,
    register,
    isLoading,
  };
};
