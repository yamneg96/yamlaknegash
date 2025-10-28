// src/Store/useAuthStore.js
import { create } from "zustand";
import * as authService from "../Services/authService";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,

  login: async (email, password) => {
    set({ loading: true });
    try {
      const data = await authService.loginUser(email, password);
      localStorage.setItem("token", data.token);
      set({ user: { username: data.username, role: data.role }, token: data.token, loading: false });
      toast.success("Logged in");
    } catch (err) {
      set({ loading: false });
      toast.error(err.response?.data?.message || "Login failed");
    }
  },

  fetchUser: async () => {
    try {
      const data = await authService.getCurrentUser();
      set({ user: data });
    } catch {
      set({ user: null });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
    toast("Logged out");
  },
}));
