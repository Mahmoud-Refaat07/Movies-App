import axios from "axios";
import type { AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "production"
      ? "/api"
      : "http://localhost:5000/api",
  withCredentials: true,
});
