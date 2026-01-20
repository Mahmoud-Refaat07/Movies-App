import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

import { ENV_VARS } from "../config/envVars.js";

export const protect = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - Token Not Found",
      });
    }

    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    next();
  } catch (error) {
    console.error("JWT Verifing Error:", error);
    return res.status(401).json({
      message: "Unauthorized - Expired Token",
    });
  }
};
