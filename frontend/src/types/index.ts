export interface ISignInPayload {
  email: string;
  password: string;
}

export interface IAuthResponse {
  accessToken: string;
  message: string;
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

export interface ITask {
  _id: string;
  firstName: string;
  phone: string;
  notes: string;
  agentId?: string;
  createdAt?: string;
  updatedAt?: string;
}


export interface IAgent {
    _id: string;
    fullName: string;
    email: string;
    phone: number;
    password?: string;
    createdAt: Date;
    role: "ADMIN" | "AGENT";
    taskIds: ITask[];
}

export interface CreateAgentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
  }) => void;
}
export interface AddTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (file: File) => void;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: 'ADMIN' | 'AGENT';
}