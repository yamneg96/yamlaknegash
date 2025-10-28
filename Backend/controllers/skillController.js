// backend/controllers/skillController.js
import Skill from "../models/Skill.js";

/**
 * GET /api/skills
 * Public: return all skills
 */
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ name: 1 });
    return res.json(skills);
  } catch (err) {
    console.error("getSkills error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * POST /api/skills
 * Protected: admin
 * Body: { name, level }
 */
export const createSkill = async (req, res) => {
  try {
    const { name, level = 0 } = req.body;
    const s = new Skill({ name, level });
    await s.save();
    return res.status(201).json(s);
  } catch (err) {
    console.error("createSkill error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * PUT /api/skills/:id
 * Protected: admin
 */
export const updateSkill = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await Skill.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Skill not found" });
    return res.json(updated);
  } catch (err) {
    console.error("updateSkill error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * DELETE /api/skills/:id
 * Protected: admin
 */
export const deleteSkill = async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await Skill.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ message: "Skill not found" });
    return res.json({ message: "Skill deleted" });
  } catch (err) {
    console.error("deleteSkill error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
