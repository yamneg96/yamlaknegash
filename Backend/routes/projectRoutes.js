// backend/routes/projectRoutes.js
import express from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject
} from "../controllers/projectController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getProjects);

// Admin-protected
router.post("/", protect, adminOnly, createProject);
router.put("/:id", protect, adminOnly, updateProject);
router.delete("/:id", protect, adminOnly, deleteProject);

export default router;
