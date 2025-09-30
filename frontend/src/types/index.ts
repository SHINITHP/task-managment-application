export interface ISignInPayload {
  email: string;
  password: string;
}

export interface IAuthResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
  };
}

export interface AuthModeProps {
  authMode: "sign-in" | "verify-otp" | "forgot-password" | "not-found";
  onClose: () => void;
}