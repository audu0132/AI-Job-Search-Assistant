import { Router } from "express";
import {
  register,
  login,
  getProfile,
  updateProfile,
} from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

// Public Routes
router.post("/register", register);
router.post("/login", login);

// Private/Protected Routes (Require JWT)
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

export default router;
