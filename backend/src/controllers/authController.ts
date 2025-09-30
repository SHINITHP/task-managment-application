import { Request, Response } from "express";
import { IUser } from "../types/index.js";
import { User } from "../models/User.js";
import {
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
  verifyJWTToken,
} from "../utils/generateToken.js";

export const signIn = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    // check user exist or not!
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    // compare hashed password!
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      res.status(401).json({ message: "Incorrect password" });
    }

    // generate token
    const { accessToken, refreshToken } = await generateTokens({
      userId: user._id,
      email: user.email,
      role: user.role,
    });

    // refresh token
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "Logged Successful",
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const refreshToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = req.cookies.refreshToken;
    console.log("f4ef4ef ce");
    if (!token) {
      res.status(401).json({ message: "No refresh token provided" });
      return;
    }

    // Verify refresh token
    const decoded = verifyJWTToken(token);
    if (!decoded) {
      res.status(403).json({ message: "Invalid or expired refresh token" });
      return;
    }

    // verify user exist or not
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Generate new access token
    const accessToken = generateAccessToken({
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    });

    // compare how much time left to expire, works less 24 hours
    const timeLeft = decoded.exp * 1000 - Date.now();
    if (timeLeft < 24 * 60 * 60 * 1000) {
      const newRefreshToken = generateRefreshToken({
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role,
      });

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
    }

    // Send new access token
    res.status(200).json({
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      message: "token updated",
    });
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};
