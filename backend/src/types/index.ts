import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  phone: number;
  password: string;
  createdAt: Date;
  role: "ADMIN" | "AGENT";
  comparePassword(candidatePassword: string): Promise<boolean>;
}


export interface ITokenPayload {
    userId: Types.ObjectId;
    email: string;
    role: 'ADMIN' | 'AGENT'
}

export interface IDecodedToken extends ITokenPayload {
  iat: number; // issued at (timestamp in seconds)
  exp: number; // expiration timestamp in seconds
}