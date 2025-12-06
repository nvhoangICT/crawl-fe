import { Checkbox } from "@/components/ui/checkbox";
import { CheckIcon, EyeClosedIcon, EyeIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RegisterPageTwo = () => {
  const {
    register,
    watch,
    control,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const passwordRequirements = [
    { text: "Ít nhất 8 ký tự", isValid: password.length >= 8 },
    { text: "Có chữ cái", isValid: /[a-zA-Z]/.test(password) },
    { text: "Có chữ số", isValid: /\d/.test(password) },
  ];

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v6h8z"
            />
          </svg>
        </div>
        <h1 className="text-blue-800 font-semibold text-lg">
          Điền thông tin cá nhân và mật khẩu
        </h1>
      </div>

      <div>
        <Label className="block text-sm font-medium text-gray-700 mb-1">
          Họ và tên <span className="text-red-500">*</span>
        </Label>
        <Input
          type="text"
          {...register("fullName")}
          className={`h-10 ${errors.fullName ? "border-red-500" : ""}`}
          placeholder="Nhập họ và tên của bạn"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">
            {errors.fullName.message as string}
          </p>
        )}
      </div>

      <div>
        <Label className="block text-sm font-medium text-gray-700 mb-1">
          Số điện thoại <span className="text-red-500">*</span>
        </Label>
        <Input
          type="text"
          {...register("phone")}
          className={`h-10 ${errors.phone ? "border-red-500" : ""}`}
          placeholder="Nhập số điện thoại của bạn"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">
            {errors.phone.message as string}
          </p>
        )}
      </div>

      <div>
        <Label className="block text-sm font-medium text-gray-700 mb-1">
          Mật khẩu <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className={`h-10 pr-10 ${errors.password ? "border-red-500" : ""}`}
            placeholder="********"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeIcon className="h-5 w-5" />
            ) : (
              <EyeClosedIcon className="h-5 w-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password.message as string}
          </p>
        )}

        {/* PASSWORD REQUIREMENTS */}
        <div className="mt-2 text-sm">
          <p className="font-medium text-gray-700 mb-1">Yêu cầu mật khẩu:</p>
          <ul className="space-y-1">
            {passwordRequirements.map((req, i) => (
              <li
                key={i}
                className={`flex items-center gap-1 ${
                  req.isValid ? "text-green-600" : "text-red-600"
                }`}
              >
                {req.isValid ? (
                  <CheckIcon className="h-4 w-4" />
                ) : (
                  <XIcon className="h-4 w-4" />
                )}
                <span>{req.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <Label className="block text-sm font-medium text-gray-700 mb-1">
          Xác nhận mật khẩu <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
            className={`h-10 pr-10 ${
              errors.confirmPassword ? "border-red-500" : ""
            }`}
            placeholder="********"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? (
              <EyeIcon className="h-5 w-5" />
            ) : (
              <EyeClosedIcon className="h-5 w-5" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message as string}
          </p>
        )}
      </div>

      <div>
        <Controller
          name="agreeTerms"
          control={control}
          render={({ field }) => (
            <label className="flex items-start gap-2 text-sm text-gray-700">
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className="mt-1 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <span>
                Tôi xác nhận thông tin là chính xác và đồng ý với{" "}
                <a className="text-blue-600 underline cursor-pointer">
                  Điều khoản sử dụng & Chính sách bảo mật
                </a>
              </span>
            </label>
          )}
        />
        {errors.agreeTerms && (
          <p className="text-red-500 text-sm mt-1">
            {errors.agreeTerms.message as string}
          </p>
        )}
      </div>
    </div>
  );
};

export default RegisterPageTwo;

