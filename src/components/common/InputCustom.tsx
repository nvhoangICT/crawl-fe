import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon, LockIcon } from "lucide-react";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputCustomProps {
  label?: string;
  type?: string;
  name: string;
  placeholder?: string;
  errorMessage?: string;
  isReadOnly?: boolean;
  className?: string;
  required?: boolean;
  register?: UseFormRegisterReturn;
  maxLength?: number;
  [key: string]: any;
}

export const InputCustom: React.FC<InputCustomProps> = ({
  label,
  type = "text",
  name,
  placeholder,
  errorMessage,
  isReadOnly = false,
  className,
  required = false,
  register,
  maxLength,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Kết hợp onChange từ register với custom onChange

  // Kết hợp onBlur từ register với custom onBlur
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // Cập nhật số ký tự
    props?.onChange?.(e); // Gọi onChange từ props (nếu có)
    register?.onChange(e);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <Label htmlFor={`input-custom-${name}`} className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <div className="flex flex-col gap-1">
        <div
          className={cn(
            "relative h-[45px] rounded-lg",
            errorMessage ? "border-red-500" : "border-gray-300",
            className
          )}
        >
          <Input
            {...register}
            type={showPassword ? "text" : type}
            id={`input-custom-${name}`}
            name={name}
            placeholder={placeholder}
            maxLength={maxLength}
            {...props}
            onChange={handleChange}
            readOnly={isReadOnly}
            className={cn(
              "h-full w-full px-3 disabled:opacity-1 disabled:bg-[#E6E6E6]",
              type === "password" && "pr-10"
            )}
          />

          {type === "password" && !isReadOnly && (
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />}
            </div>
          )}

          {isReadOnly && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden">
              <LockIcon size={16} />
            </div>
          )}
          {!isReadOnly && maxLength && (
            <p className=" absolute right-2 bottom-0 text-[10px] text-gray-500 text-right">
              {props?.value?.length || inputValue.length}/{maxLength}
            </p>
          )}
        </div>

        {errorMessage && (
          <p className="text-xs text-red-500" id={`error-input-custom-${name}`}>
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default InputCustom;
