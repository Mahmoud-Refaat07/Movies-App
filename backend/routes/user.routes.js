import express from "express";
import {
  signup,
  login,
  logout,
  checkAuth,
} from "../controllers/user.controllers.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", protect, login);
router.post("/logout", logout);
router.get("/me", protect, checkAuth);

export default router;
