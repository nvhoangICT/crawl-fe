import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import { useCountdown } from "@/hooks/useCountdown";
import { formatTime } from "@/lib/utils/time";
import { authService } from "@/services/authService";

interface IRegisterPageOTPProps {
  onSubmitOtp: (otp: string) => void;
}

export const RegisterPageOTP = ({ onSubmitOtp }: IRegisterPageOTPProps) => {
  const { watch, setValue } = useFormContext();
  const [otpValue, setOtpValue] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const { timeLeft: resendCountdown, reset: resetResendCountdown } = useCountdown(60);

  const email = watch("email");
  const token = watch("otpToken");
  const expireIn = watch("otpExpireIn");

  const expireTime = useCountdown(expireIn || 300);

  useEffect(() => {
    if (resendCountdown === 0) {
      setCanResend(true);
    }
  }, [resendCountdown]);

  useEffect(() => {
    if (expireIn) {
      expireTime.reset(expireIn);
    }
  }, [expireIn]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otpValue];
    newOtp[index] = value;
    setOtpValue(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleConfirmOtp = () => {
    const otp = otpValue.join("");
    if (otp.length < 6) {
      toast.error("Vui lòng nhập đủ 6 số OTP.");
      return;
    }

    setValue("otp", otp);
    onSubmitOtp(otp);
  };

  const handleResendOtp = async () => {
    if (isResending) return;
    setIsResending(true);
    
    try {
      const res = await authService.checkEmail({ email });

      if (!res || !res.otpDetails) {
        toast.error(res?.message || "Không thể gửi lại OTP");
        return;
      }

      const { token: newToken, expireIn: newExpireIn } = res.otpDetails;

      setValue("otpToken", newToken || "");
      setValue("otpExpireIn", newExpireIn || 300);

      setCanResend(false);
      resetResendCountdown();
      expireTime.reset(newExpireIn || 300);
      setOtpValue(Array(6).fill(""));
      toast.success("Đã gửi lại mã OTP");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Gửi lại OTP thất bại");
    } finally {
      setIsResending(false);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otpValue[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div>
      <Card className="w-full border-none">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="w-[63px] h-[63px] bg-blue-600 rounded-md flex items-center justify-center">
              <ShieldCheck className="w-12 h-12 text-white" />
            </div>

            <h2 className="text-blue-800 text-base text-center font-semibold">
              Nhập mã OTP
            </h2>

            <div className="flex flex-col items-center gap-3">
              <p className="text-gray-600 text-base text-center">
                Nhập mã 6 số đã được gửi đến
              </p>

              <label className="hover:bg-blue-50 rounded-[10px] px-3 py-2 h-auto">
                <span className="text-blue-800 text-base">{email}</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 w-full">
            <div className="flex gap-2 justify-center">
              {otpValue.map((val, index) => (
                <Input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={val}
                  ref={(el) => {
                    if (el) inputRefs.current[index] = el;
                  }}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center text-lg font-semibold border-2 focus:border-blue-600 focus-visible:ring-blue-600"
                />
              ))}
            </div>

            <div className="flex items-center gap-3 justify-center">
              <span className="text-gray-600 text-base">Mã OTP có hiệu lực trong</span>
              <span className="text-blue-600 text-base font-semibold">
                {formatTime(expireTime.timeLeft)}
              </span>
            </div>

            <Alert className="bg-yellow-50 border-yellow-200 rounded-[10px]">
              <AlertDescription className="text-yellow-800 text-sm">
                <strong className="font-bold">Lưu ý:</strong> Không chia sẻ mã OTP với bất kỳ ai. Nhân viên hỗ trợ sẽ không bao giờ yêu cầu mã này.
              </AlertDescription>
            </Alert>

            {canResend ? (
              <button
                onClick={handleResendOtp}
                disabled={isResending}
                className="text-blue-600 text-sm hover:underline disabled:opacity-50"
              >
                {isResending ? "Đang gửi..." : "Gửi lại mã"}
              </button>
            ) : (
              <span className="text-blue-600 text-sm">
                Gửi lại mã ({resendCountdown}s)
              </span>
            )}

            <button
              onClick={handleConfirmOtp}
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 transition-colors"
            >
              Xác thực
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

