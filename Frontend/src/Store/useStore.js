import {create} from 'zustand';

const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  token: localStorage.getItem("token") || null,
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  }
}));

export default useStore;
