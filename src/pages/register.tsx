import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import RegisterPageOne from "../components/pages/auth/register/RegisterPageOne";
import RegisterPageTwo from "../components/pages/auth/register/RegisterPageTwo";
import { RegisterPageOTP } from "../components/pages/auth/register/RegisterPageOTP";
import { useRegister } from "@/hooks/useRegister";
import { useNavigate, Link } from "react-router-dom";
import { getCurrentUser } from "@/store/useAuth";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { checkEmail, verifyOtp, register } = useRegister();

  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      fullName: "",
      phone: "",
      password: "",
      confirmPassword: "",
      otpToken: "",
      otpExpireIn: 300,
      otp: "",
      agreeTerms: false,
    },
  });

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const nextStep = () => {
    methods.clearErrors();
    setStep((s) => s + 1);
  };
  const prevStep = () => setStep((s) => s - 1);

  /* -----------------------------
      STEP 1 — EMAIL → checkEmail
  ------------------------------*/
  const handleStep1 = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const valid = await methods.trigger(["email"]);
      if (!valid) return;

      const data = await checkEmail({
        email: methods.getValues("email"),
      });

      if (!data || !data.otpDetails) {
        return;
      }

      methods.setValue("otpToken", data.otpDetails?.token || "");
      methods.setValue("otpExpireIn", data.otpDetails?.expireIn ?? 300);

      nextStep();
    } finally {
      setIsLoading(false);
    }
  };

  /* -----------------------------
      STEP 2 — OTP → verifyOtp
  ------------------------------*/
  const handleOtp = async (otpValue: string) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const email = methods.getValues("email");
      const token = methods.getValues("otpToken");

      const data = await verifyOtp({
        email,
        otp: otpValue,
        token,
      });

      if (!data || !data.valid) return;

      methods.setValue("otp", otpValue);
      nextStep();
    } finally {
      setIsLoading(false);
    }
  };

  /* -----------------------------
      STEP 3 — INFO + PASSWORD
      → validate → register
  ------------------------------*/
  const handleRegister = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const valid = await methods.trigger([
        "fullName",
        "phone",
        "password",
        "confirmPassword",
        "agreeTerms",
      ]);

      if (!valid) return;

      const payload = {
        fullname: methods.getValues("fullName"),
        email: methods.getValues("email"),
        password: methods.getValues("password"),
        phoneNumber: methods.getValues("phone"),
        otp: methods.getValues("otp"),
        token: methods.getValues("otpToken"),
      };

      const res = await register(payload);

      if (res?.accessToken || res?.data?.accessToken) {
        const accessToken = res?.accessToken || res?.data?.accessToken;
        const refreshToken = res?.refreshToken || res?.data?.refreshToken;

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
        }
        if (refreshToken) {
          localStorage.setItem("refreshToken", refreshToken);
        }

        await getCurrentUser();
        navigate("/admin");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    if (step === 1) return <RegisterPageOne />;
    if (step === 2) return <RegisterPageOTP onSubmitOtp={handleOtp} />;
    if (step === 3) return <RegisterPageTwo />;
    return <RegisterPageOne />;
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(
            () => {},
            (error) => console.log(">>> error", error)
          )}
          className="w-full max-w-md rounded-xl bg-white shadow-lg border border-gray-200 p-6 md:p-8"
        >
          {renderStep()}
          <div className="mt-6 flex flex-row space-x-3">
            {step > 1 && (
              <Button
                type="button"
                onClick={prevStep}
                variant="outline"
                className="w-full"
                disabled={isLoading}
              >
                ← Quay lại
              </Button>
            )}

            {step === 1 && (
              <Button
                type="button"
                onClick={handleStep1}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "Đang kiểm tra..." : "Tiếp tục →"}
              </Button>
            )}
            {step === 2 && null}
            {step === 3 && (
              <Button
                type="button"
                onClick={handleRegister}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "Đang đăng ký..." : "Hoàn tất đăng ký"}
              </Button>
            )}
          </div>
          
          <div className="text-center text-sm mt-4">
            <span className="text-gray-600">Đã có tài khoản? </span>
            <Link
              to="/auth/login"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Đăng nhập ngay
            </Link>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
