import express from "express";
import { signup, login, logout } from "../controllers/user.controllers.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", protect, login);
router.post("/logout", logout);

export default router;
