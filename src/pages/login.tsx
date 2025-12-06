import { Controller, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { LogIn } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import InputCustom from "@/components/common/InputCustom";
import { useLogin } from "@/hooks/useLogin";
import { LoginRequest } from "@/types/auth";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginRequest & { rememberMe: boolean }>({
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  const loginMutation = useLogin();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginRequest & { rememberMe: boolean }) => {
    // Gửi cả rememberMe trong loginData
    await loginMutation.mutate(data, data.rememberMe);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:w-[447px] rounded-xl bg-white shadow-lg border border-gray-200 p-4 sm:p-6 md:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="text-center mb-2">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <LogIn className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-blue-800 font-semibold text-lg">
              Đăng nhập tài khoản Admin
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Quản lý dữ liệu du lịch một cách dễ dàng
            </p>
          </div>

          <div>
            <Label className="mb-2 block" htmlFor="username">
              Tên đăng nhập
            </Label>
            <InputCustom
              id="username"
              type="text"
              name="username"
              placeholder="Nhập tên đăng nhập"
              register={register("username", {
                required: "Vui lòng nhập tên đăng nhập",
              })}
              errorMessage={errors.username?.message}
              required
            />
          </div>

          <div>
            <Label className="mb-2 block" htmlFor="password">
              Mật khẩu
            </Label>
            <InputCustom
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              register={register("password", {
                required: "Vui lòng nhập mật khẩu",
                minLength: {
                  value: 6,
                  message: "Mật khẩu phải có ít nhất 6 ký tự",
                },
              })}
              errorMessage={errors.password?.message}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Controller
                name="rememberMe"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="rememberMe"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 data-[state=checked]:text-white"
                  />
                )}
              />
              <Label htmlFor="rememberMe" className="text-sm text-gray-700">
                Ghi nhớ đăng nhập
              </Label>
            </div>
            <a
              onClick={() => navigate("/auth/forgot-password")}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
            >
              Quên mật khẩu?
            </a>
          </div>

          <Button
            type="submit"
            disabled={loginMutation.isLoading}
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loginMutation.isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>

          <div className="text-center text-sm">
            <span className="text-gray-600">Chưa có tài khoản? </span>
            <Link
              to="/auth/register"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Đăng ký ngay
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

