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
    } catch (error) {
      set({ loading: false, user: null });
      console.log("Error in checkAuth function", error.response.data.message);
    }
  },

  signup: async (userData) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/auth/signup", userData);
      set({ loading: false, user: response.data.user });
      console.log(response.data.message);
      toast.success(response.data.message);
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message);
      console.log("Error in signup function", response.data.message);
    }
  },
  login: async () => {},
  logout: async () => {},
}));

export default useAuthStore;
