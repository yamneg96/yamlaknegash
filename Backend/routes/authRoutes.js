// backend/routes/authRoutes.js
import express from "express";
import { login, getMe, registerAdminIfNone } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.get("/me", protect, getMe);

// optional route to create initial admin (use carefully)
router.post("/register-admin", registerAdminIfNone);

export default router;
