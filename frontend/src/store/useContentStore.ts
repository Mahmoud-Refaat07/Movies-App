import { create } from "zustand";

const useContentStore = create((set) => ({
  contentType: "movie",
  setContentType: (type: string | null) => set({ contentType: type }),
}));

export default useContentStore;
