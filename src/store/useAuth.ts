import { authService } from "@/services/authService";
import { toast } from "react-toastify";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

// Định nghĩa kiểu dữ liệu

interface User {
  id: string;
  [key: string]: any;
}

interface AuthState {
  currentUser: User | null;
  isAuth: boolean;
  isRefreshUser: boolean;
  setCurrentUser: (user: User) => void;
  logout: () => void;
  setIsRefreshUser: (value: boolean) => void;
}

// Lấy accessToken từ localStorage
const storedUser = localStorage.getItem("accessToken");

// Tạo store với Zustand
const useAuth = create<AuthState>()(
  devtools(
    (set) => ({
      currentUser: null,
      isAuth: !!storedUser,
      adminRoles: [],
      phoneOrEmailVerify: null,
      taxCode: null,
      isAccessChat: false,
      userRequestCount: 0,
      isRefreshUser: false,
      setCurrentUser: (user) =>
        set(
          {
            currentUser: user,
            isAuth: true,
          },
          false,
          "auth/user"
        ),
      setIsRefreshUser: (value: boolean) =>
        set({ isRefreshUser: value }, false, "auth/user"),
      logout: () =>
        set(
          {
            currentUser: null,
            isAuth: false,
          },
          false,
          "auth/logout"
        ),
    }),
    {
      enabled: true,
      name: "auth",
    }
  )
);

// Hàm lấy thông tin người dùng hiện tại
export const getCurrentUser = async (): Promise<any> => {
  const { setCurrentUser } = useAuth.getState();

  if (!navigator.onLine) {
    console.warn("You are offline. Cannot fetch user data.");
    return null;
  }

  try {
    // Axios interceptor đã trả về response.data, nên response chính là data rồi
    const response = await authService.whoami();
    
    // Response có thể là object trực tiếp hoặc có cấu trúc { data: {...} }
    // Xử lý cả 2 trường hợp để đảm bảo tương thích
    const userData = response?.data || response || null;

    // Kiểm tra nếu userData là null, empty object, hoặc không có dữ liệu hợp lệ
    if (!userData || (typeof userData === 'object' && Object.keys(userData).length === 0)) {
      console.error("User info is null or empty");
      toast.error("Không thể lấy thông tin người dùng. Vui lòng đăng nhập lại.");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      window.location.replace("/auth/login");
      throw new Error("User info is null or empty");
    }

    // Set user vào store
    setCurrentUser(userData);
    return response;
  } catch (error: any) {
    console.log("Error fetching user info:", error);
    
    // Chỉ hiển thị toast và redirect nếu chưa được xử lý
    if (!error?.message?.includes("User info is null or empty")) {
      toast.error("Tài khoản không có quyền truy cập");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      window.location.replace("/auth/login");
    }
    throw error;
  }
};

export default useAuth;
