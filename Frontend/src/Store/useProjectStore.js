// src/Store/useProjectStore.js
import { create } from "zustand";
import * as projectService from "../Services/projectService";
import toast from "react-hot-toast";

export const useProjectStore = create((set, get) => ({
  projects: [],
  total: 0,
  page: 1,
  pages: 1,
  loading: false,

  loadProjects: async (page = 1, limit = 6) => {
    set({ loading: true });
    try {
      const data = await projectService.getProjects(page, limit);
      set({
        projects: data.projects,
        total: data.total,
        page: data.page,
        pages: data.pages,
        loading: false,
      });
    } catch (err) {
      toast.error("Failed to load projects");
      set({ loading: false });
    }
  },

  setPage: (p) => {
    set({ page: p });
    get().loadProjects(p);
  },

  addProject: async (payload) => {
    try {
      const newProject = await projectService.createProject(payload);
      set((state) => ({ projects: [newProject, ...state.projects] }));
      toast.success("Project added");
    } catch (err) {
      toast.error("Failed to add project");
    }
  },

  removeProject: async (id) => {
    try {
      await projectService.deleteProject(id);
      set((state) => ({ projects: state.projects.filter((p) => p._id !== id) }));
      toast.success("Project deleted");
    } catch (err) {
      toast.error("Delete failed");
    }
  },

  editProject: async (id, payload) => {
    try {
      const updated = await projectService.updateProject(id, payload);
      set((state) => ({ projects: state.projects.map((p) => (p._id === id ? updated : p)) }));
      toast.success("Project updated");
    } catch (err) {
      toast.error("Update failed");
    }
  },
}));
