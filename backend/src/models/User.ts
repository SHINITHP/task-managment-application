import mongoose, { Schema } from "mongoose";
import argon2 from "argon2";
import { IUser } from "../types/index.js";

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["ADMIN", "AGENT"],
      default: "AGENT",
    },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function name(
  candidatePassword: string
): Promise<boolean> {
  try {
    console.log(this.password, candidatePassword);
    return await argon2.verify(this.password, candidatePassword);
  } catch (error) {
    console.error("Error while comparing password:", error);
    return false;
  }
};

export const User = mongoose.model<IUser>("User", userSchema);
