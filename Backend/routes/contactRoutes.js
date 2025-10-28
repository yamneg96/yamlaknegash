// backend/routes/contactRoutes.js
import express from "express";
import { createContact, getContacts, deleteContact } from "../controllers/contactController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createContact);
router.get("/", protect, adminOnly, getContacts);
router.delete("/:id", protect, adminOnly, deleteContact);

export default router;
