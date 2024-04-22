import { create } from "zustand";
import { Users } from "../../../type";
import { persist, createJSONStorage } from "zustand/middleware";

type Store = {
  username: string;
  setUser: (username: string) => void;
  getUserName: () => void;
  removeUser: () => void;
};

const useUserStore = create(
  persist<Store>(
    (set, get) => ({
      username: "",
      setUser: (username) => {
        console.log(username)
        set({ username: username });
      },
      getUserName: () => get().username,
      removeUser: () => set({ username: ''})
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export default useUserStore;
