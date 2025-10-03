import { Request } from "express";
import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  createdAt: Date;
  role: "ADMIN" | "AGENT";
  taskIds: [];
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

export interface ITask extends Document {
  firstName: string;
  phone: number;
  notes: string;
  agentId: Types.ObjectId;
}

export interface TaskData {
  firstName: string;
  phone: number;
  notes: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  AGENT = 'AGENT',
}

export interface JwtPayload {
  id: string;
  email: string;
  role: UserRole;
}


export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export interface CsvRow {
  firstName: string; 
  phone: string; 
  notes: string; 
}
