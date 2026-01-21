import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookies = async (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });

  res.cookie("token-movie", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true, // prevent xss attacks
    secure: ENV_VARS.NODE_ENV === "production",
    sameSite: "strict",
  });

  return token;
};
