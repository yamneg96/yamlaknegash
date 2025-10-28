// backend/controllers/projectController.js
import Project from "../models/Project.js";

/**
 * GET /api/projects?page=&limit=
 * Public: returns paginated projects
 */
export const getProjects = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 6);

  try {
    const total = await Project.countDocuments();
    const projects = await Project.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    return res.json({ projects, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    console.error("getProjects error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * POST /api/projects
 * Protected: admin
 * Body: project fields
 */
export const createProject = async (req, res) => {
  try {
    const payload = req.body;
    // allow techStack as comma string or array
    if (typeof payload.techStack === "string") {
      payload.techStack = payload.techStack.split(",").map(s => s.trim()).filter(Boolean);
    }

    const project = new Project(payload);
    await project.save();
    return res.status(201).json(project);
  } catch (err) {
    console.error("createProject error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * PUT /api/projects/:id
 * Protected: admin
 */
export const updateProject = async (req, res) => {
  const { id } = req.params;
  try {
    const payload = req.body;
    if (typeof payload.techStack === "string") {
      payload.techStack = payload.techStack.split(",").map(s => s.trim()).filter(Boolean);
    }

    const updated = await Project.findByIdAndUpdate(id, payload, { new: true });
    if (!updated) return res.status(404).json({ message: "Project not found" });
    return res.json(updated);
  } catch (err) {
    console.error("updateProject error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * DELETE /api/projects/:id
 * Protected: admin
 */
export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await Project.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ message: "Project not found" });
    return res.json({ message: "Project deleted" });
  } catch (err) {
    console.error("deleteProject error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
