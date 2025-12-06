import { useState } from "react";
import { authService } from "@/services/authService";
import useAuth, { getCurrentUser } from "@/store/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LoginRequest } from "@/types/auth";

export const useLogin = () => {
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async (data: LoginRequest, rememberMe: boolean = false) => {
    setIsLoading(true);
    try {
      // Gửi rememberMe trong request body
      const loginData: LoginRequest = {
        ...data,
        rememberMe: rememberMe,
      };
      
      const response = await authService.login(loginData);
      
      // Lưu token vào storage
      const storage = rememberMe ? localStorage : sessionStorage;
      
      // Response từ axios interceptor đã được transform thành response.data
      // Nên response chính là data
      if (response?.accessToken || response?.data?.accessToken) {
        const accessToken = response?.accessToken || response?.data?.accessToken;
        storage.setItem("accessToken", accessToken);
      }
      
      // Lưu refresh token từ response hoặc từ cookie
      if (response?.refreshToken || response?.data?.refreshToken) {
        const refreshToken = response?.refreshToken || response?.data?.refreshToken;
        storage.setItem("refreshToken", refreshToken);
      } else {
        // Nếu không có trong response, lấy từ cookie
        const cookies = document.cookie.split(";");
        const refreshTokenCookie = cookies.find((cookie) =>
          cookie.trim().startsWith("refresh_token=")
        );
        if (refreshTokenCookie) {
          const refreshToken = refreshTokenCookie.split("=")[1];
          storage.setItem("refreshToken", refreshToken);
        }
      }

      // Lấy thông tin user hiện tại
      // getCurrentUser() đã tự động set user vào store rồi
      try {
        await getCurrentUser();
      } catch (userError) {
        console.error("Error fetching user info:", userError);
        // Vẫn cho phép đăng nhập nếu lấy user info thất bại
      }

      toast.success("Đăng nhập thành công!");
      navigate("/admin");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Đăng nhập thất bại. Vui lòng thử lại!";
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mutate,
    isLoading,
  };
};

