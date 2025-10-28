// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useProjectStore } from "../Store/useProjectStore";
import { useSkillStore } from "../Store/useSkillStore";
import { useAuthStore } from "../Store/useAuthStore";
import ProjectCard from "../components/ProjectCard";

/**
 * Admin dashboard supports:
 * - View projects & skills
 * - Add project
 * - Delete project
 * - Add skill
 * - Delete skill
 *
 * Uses stores which call Services/ API
 */

export default function AdminDashboard() {
  const { user, logout } = useAuthStore();
  const { projects, loadProjects, addProject, removeProject } = useProjectStore();
  const { skills, loadSkills, addSkill, removeSkill } = useSkillStore();

  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    techStack: "",
    imageUrl: "",
    liveUrl: "",
    githubUrl: "",
  });

  const [skillForm, setSkillForm] = useState({ name: "", level: 50 });

  useEffect(() => {
    loadProjects(1, 100); // admin loads many
    loadSkills();
  }, []);

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    await addProject({
      ...projectForm,
      techStack: projectForm.techStack.split(",").map((s) => s.trim()).filter(Boolean),
    });
    setProjectForm({ title: "", description: "", techStack: "", imageUrl: "", liveUrl: "", githubUrl: "" });
  };

  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    await addSkill(skillForm);
    setSkillForm({ name: "", level: 50 });
  };

  if (!user) {
    return (
      <div className="pt-24 px-4 min-h-screen">
        <p className="text-center">You must be logged in as admin to view this page.</p>
      </div>
    );
  }

  return (
    <div className="pt-24 px-4 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        <div className="flex gap-3">
          <button onClick={logout} className="px-3 py-1 bg-red-600 text-white rounded">Logout</button>
        </div>
      </div>

      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">Create Project</h3>
        <form onSubmit={handleProjectSubmit} className="grid gap-3 md:grid-cols-2">
          <input value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} placeholder="Title" className="p-2 border rounded" />
          <input value={projectForm.imageUrl} onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })} placeholder="Image URL" className="p-2 border rounded" />
          <textarea value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} placeholder="Description" className="p-2 border rounded md:col-span-2" />
          <input value={projectForm.techStack} onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })} placeholder="Tech Stack (comma-separated)" className="p-2 border rounded" />
          <input value={projectForm.liveUrl} onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })} placeholder="Live URL" className="p-2 border rounded" />
          <input value={projectForm.githubUrl} onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })} placeholder="GitHub URL" className="p-2 border rounded" />
          <div className="md:col-span-2">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Add Project</button>
          </div>
        </form>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">Projects</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <div key={p._id} className="p-3 border rounded">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold">{p.title}</h4>
                <button onClick={() => removeProject(p._id)} className="text-sm bg-red-600 text-white px-2 py-1 rounded">Delete</button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">Add Skill</h3>
        <form onSubmit={handleSkillSubmit} className="flex gap-3 items-center">
          <input value={skillForm.name} onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })} placeholder="Skill name" className="p-2 border rounded" />
          <input type="number" value={skillForm.level} onChange={(e) => setSkillForm({ ...skillForm, level: Number(e.target.value) })} placeholder="Level 0-100" className="p-2 border rounded w-24" />
          <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">Add Skill</button>
        </form>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-4">Skills</h3>
        <div className="grid gap-3 md:grid-cols-3">
          {skills.map((s) => (
            <div key={s._id} className="p-3 border rounded flex justify-between items-center">
              <span>{s.name} ({s.level}%)</span>
              <button onClick={() => removeSkill(s._id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
