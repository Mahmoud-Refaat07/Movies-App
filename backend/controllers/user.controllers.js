import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";
import { generateTokenAndSetCookies } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be at least 6 characters" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "email is already exists" });
    }

    let hashPassword = await bcrypt.hash(password, 10);

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    let user = await User.create({
      username,
      email,
      password: hashPassword,
      image,
    });

    generateTokenAndSetCookies(user._id, res);

    res.json({
      message: "User Created",
      User: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error Signup Endpoint", error.message);
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

    generateTokenAndSetCookies(user._id, res);

    res.json({
      message: "logged in",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error Login Endpoint", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const logout = (req, res) => {
  res.json("logout");
};

// validation
// added image default when creating user
// some enhancment in hide password
// refactoring token and set cookies
