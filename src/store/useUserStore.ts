import { create } from "zustand";
import { persist } from "zustand/middleware";

import { UserInfo } from "@/types/user";

type State = {
  user: UserInfo | null;
};

interface Action {
  setUser: (user: UserInfo | null) => void;
}

export const useUserStore = create<State & Action>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: UserInfo | null) => set(() => ({ user })),
    }),
    {
      name: "user-store",
      getStorage: () => localStorage,
    }
  )
);
