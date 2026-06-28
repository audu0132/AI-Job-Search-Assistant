import { Router } from "express";
import { login, getProfile, register } from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";


const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getProfile);


export default router;