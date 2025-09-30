import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  mobile?: string;
  password: string;
  role: "ADMIN" | "AGENT";
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IAgent {
  _id: Types.ObjectId;
  name: string;
  email: string;
  mobile: string;
  password: string;
}

export interface ITokenPayload {
    userId: Types.ObjectId;
    email: string;
    role: 'ADMIN' | 'AGENT'
}
