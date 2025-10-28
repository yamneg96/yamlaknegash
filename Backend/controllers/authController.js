// backend/controllers/authController.js
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

/**
 * POST /api/auth/login
 * Body: { email, password }
 * Response: { token, username }
 */
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) return res.status(400).json({ message: "Please provide email and password" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return res.json({ token, username: user.username, role: user.role });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/auth/me
 * Headers: Authorization: Bearer <token>
 * Response: user object (without password)
 */
export const getMe = async (req, res) => {
  try {
    // protect middleware should attach req.user
    if (!req.user) return res.status(401).json({ message: "Not authorized" });
    return res.json(req.user);
  } catch (err) {
    console.error("getMe error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Optional: Create an initial admin if none exists.
 * You can call this from a seed script instead of exposing it.
 */
export const registerAdminIfNone = async (req, res) => {
  try {
    const count = await User.countDocuments();
    if (count > 0) return res.status(400).json({ message: "Users already exist" });

    const { username = "admin", email = "admin@example.com", password = "password123" } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashed, role: "admin" });
    await user.save();

    return res.json({ message: "Admin created", username: user.username, email: user.email });
  } catch (err) {
    console.error("registerAdmin error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
