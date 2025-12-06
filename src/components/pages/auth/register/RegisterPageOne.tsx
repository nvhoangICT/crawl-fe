import { useFormContext } from "react-hook-form";
import { UserRoundPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPageOne() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
          <UserRoundPlus className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-blue-800 font-semibold text-lg">
          Đăng ký tài khoản Admin
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Bước đầu tiên để đăng ký, hãy nhập email của bạn
        </p>
      </div>

      <div className="flex justify-center mb-6">
        <div className="flex space-x-2">
          <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
          <div className="w-12 h-1 bg-gray-200 rounded-full"></div>
          <div className="w-12 h-1 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="mb-6">
          <Label
            htmlFor="email"
            className="block text-1 text-sm font-medium text-gray-700 mb-5"
          >
            Email
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            {...register("email")}
            type="email"
            placeholder="Nhập email của bạn"
            className="h-10"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>
          )} 
        </div>
      </div>
    </div>
  );
}

