import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../utils/axiosInstance";

interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
}

interface AuthCredentials {
  email: string;
  password: string;
  name?: string;
}

interface AuthStore {
  user: User | null;
  loading: boolean;

  checkAuth: () => Promise<{ success: boolean }>;
  signup: (userData: AuthCredentials) => Promise<void>;
  login: (userData: AuthCredentials) => Promise<void>;
  logout: () => Promise<boolean>;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: false,

  checkAuth: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/auth/me");
      set({ loading: false, user: response.data?.user });
      return { success: true };
    } catch (error: any) {
      set({ loading: false, user: null });
      console.log("Error in checkAuth function", error.response?.data?.message);
      return { success: false };
    }
  },

  signup: async (userData) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/auth/signup", userData);
      set({ loading: false, user: response.data?.user });
      toast.success("User created successfully");
    } catch (error: any) {
      set({ loading: false, user: null });
      toast.error(error.response.data.message);
      console.log("Error in signup function", error.response?.data?.message);
    }
  },

  login: async (userData) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/auth/login", userData);
      set({ loading: false, user: response.data.user });
      toast.success("Logged in successfully");
    } catch (error: any) {
      set({ loading: false, user: null });
      toast.error(error.response.data.message);
      console.log("Error in login function", error.response?.data?.message);
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await axiosInstance.post("/auth/logout");
      set({ loading: false, user: null });
      toast.success("Logged out");
      return true;
    } catch (error: any) {
      set({ loading: false, user: null });
      toast.error(error.response.data.message);
      console.log("Error in logout function", error.response?.data?.message);
      return false;
    }
  },
}));

export default useAuthStore;
