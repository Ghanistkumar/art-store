import { create } from "zustand";
import { Users } from "../../../type";
import { persist, createJSONStorage } from "zustand/middleware";

type Store = {
  username: string;
  setUser: (data: Users) => void;
};

const userStore = create(
  persist<Store>(
    (set) => ({
      username: "",
      setUser: (data) => {
        set({ username: data.username });
      },
      removeUser: () => set({ username: ''})
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export default userStore;
