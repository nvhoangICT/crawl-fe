export interface LoginRequest {
  username: string;
  password: string;
  rememberMe?: boolean;
  captcha?: string | null;
  sessionId?: string | null;
}

export interface ForgotPasswordRequest {
  email: string;
  CCCD: string;
}
export interface ResetPasswordRequest {
  password: string;
  confirmPassword: string;
  token: string;
}
