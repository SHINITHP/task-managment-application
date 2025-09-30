import { Request, Response } from "express";
import { IUser } from "../types/index.js";
import { User } from "../models/User.js";
import { generateTokens } from "../utils/generateToken.js";

export const signIn = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // check user exist or not!
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    // compare hashed password!
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      console.error("Incorrect password!");
      res.status(401).json({ message: "Incorrect password" });
    }

    // generate token
    const { accessToken, refreshToken } = await generateTokens({
      userId: user._id,
      email: user.email,
      role: user.role
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
