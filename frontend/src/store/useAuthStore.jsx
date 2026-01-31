import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../utils/axiosInstance.jsx";

const useAuthStore = create((set) => ({
  user: null,
  loading: false,

  checkAuth: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/auth/me");
      set({ loading: false, user: response.data.user });
      return { success: true };
    } catch (error) {
      set({ loading: false, user: null });
      console.log("Error in checkAuth function", error.response.data.message);
      return { success: false };
    }
  },

  signup: async (userData) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/auth/signup", userData);
      set({ loading: false, user: response.data.user });
      toast.success(response.data.message);
      return { success: true };
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message);
      console.log("Error in signup function", response.data.message);
      return { success: false };
    }
  },

  login: async () => {},

  logout: async () => {
    set({ loading: true });
    try {
      await axiosInstance.post("/auth/logout");
      set({ loading: false, user: null });
      toast.success("Logged out");
      return { success: true };
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error in logout function", response.data.message);
      return { success: false };
    }
  },
}));

export default useAuthStore;
