import jwt from "jsonwebtoken";
import { ITokenPayload } from "../types/index.js";

// accessToken creation
export const generateAccessToken = (user: ITokenPayload): string => {
  return jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: "15m" }); // 15 minutes
};

// refreshToken creation
export const generateRefreshToken = (user: ITokenPayload): string => {
  return jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: "7d" }); // 7 days
};

export const generateTokens = async (
  user: ITokenPayload
): Promise<{ accessToken: string; refreshToken: string }> => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  return { accessToken, refreshToken };
};
