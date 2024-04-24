import { create } from "zustand";
import { Users } from "../../../type";
import { persist, createJSONStorage } from "zustand/middleware";

type Store = {
  username: string;
  user_id: string;
  setUser: (username: string, user_id: string) => void;
  getUserName: () => void;
  removeUser: () => void;
};

const useUserStore = create(
  persist<Store>(
    (set, get) => ({
      username: "",
      user_id: '',
      setUser: (username, user_id) => {
        console.log(username)
        set({ username: username, user_id: user_id });
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
