// src/Store/useSkillStore.js
import { create } from "zustand";
import * as skillService from "../Services/skillService";
import toast from "react-hot-toast";

export const useSkillStore = create((set) => ({
  skills: [],
  loading: false,

  loadSkills: async () => {
    set({ loading: true });
    try {
      const data = await skillService.getSkills();
      // API returns array
      set({ skills: data, loading: false });
    } catch (err) {
      set({ loading: false });
      toast.error("Failed to load skills");
    }
  },

  addSkill: async (payload) => {
    try {
      const created = await skillService.createSkill(payload);
      set((state) => ({ skills: [created, ...state.skills] }));
      toast.success("Skill added");
    } catch (err) {
      toast.error("Failed to add skill");
    }
  },

  removeSkill: async (id) => {
    try {
      await skillService.deleteSkill(id);
      set((state) => ({ skills: state.skills.filter((s) => s._id !== id) }));
      toast.success("Skill deleted");
    } catch (err) {
      toast.error("Delete failed");
    }
  },
}));
