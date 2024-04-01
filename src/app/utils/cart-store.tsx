import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-hot-toast";

interface Product {
  id: number;
  img: string;
  tag: string;
  title: string;
  price: number;
  desc: string;
}

interface Category {
  img: string;
  title: string;
  desc: string;
}

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: number) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItem = get().items;
        const existingItem = currentItem.find((item) => item.id === data.id);

        if (existingItem) {
          return toast("Item Already Exists");
        }

        set({ items: [...get().items, data] });
        toast.success("Item Added to Cart");
      },
      removeItem: (id: number) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success("Item Removed from Cart");
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
