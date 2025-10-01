export interface ISignInPayload {
  email: string;
  password: string;
  role: "AGENT" | "ADMIN";
}

export interface IAuthResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    role: "AGENT" | "ADMIN";
  };
}

export interface AuthModeProps {
  authMode: "sign-in" | "verify-otp" | "forgot-password" | "not-found";
  onClose: () => void;
}

export interface IAgent {
  _id: string;
  fullName: string;
  email: string;
  phone: number;
  password?: string;
  createdAt: Date;
  role: "ADMIN" | "AGENT";
  tasks: []
}

export interface CreateAgentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: { fullName: string; email: string; phone: string; password: string; }) => void;
}