import { create } from "zustand";
import { persist } from "zustand/middleware";

import { IUserInfo } from "@/types/user";

type State = {
  user: IUserInfo | null;
};

interface Action {
  setUser: (user: IUserInfo | null) => void;
}

export const useUserStore = create<State & Action>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: IUserInfo | null) => set(() => ({ user })),
    }),
    {
      name: "user-store",
      getStorage: () => localStorage,
    }
  )
);
