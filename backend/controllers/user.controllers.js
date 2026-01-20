import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "email is already exists" });
    }

    let hashPassword = await bcrypt.hash(password, 10);

    let user = await User.create({
      username,
      email,
      password: hashPassword,
    });
    const { password: _, ...userData } = user._doc;

    const token = jwt.sign({ id: userData._id }, ENV_VARS.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.json({ message: "User Created", User: userData, token });
  } catch (error) {
    console.log("Error Signup Endpoint", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "email not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "password do not match" });
    }

    const { password: _, ...userData } = user._doc;

    const token = jwt.sign({ id: user._id }, ENV_VARS.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.json({ message: "logged in", user: userData, token });
  } catch (error) {
    console.log("Error Login Endpoint", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const logout = (req, res) => {
  res.json("logout");
};
