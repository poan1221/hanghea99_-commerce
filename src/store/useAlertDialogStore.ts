import { create } from "zustand";

type State = {
  isOpen: boolean;
  title: string;
  description: string;
  type: "navigate" | "alert";
};

interface Action {
  openAlert: (
    title: string,
    description: string,
    type?: "navigate" | "alert"
  ) => void;
  closeAlert: () => void;
}

export const useAlertDialogStore = create<State & Action>((set) => ({
  isOpen: false,
  title: "",
  description: "",
  type: "alert",
  openAlert: (title, description, type) =>
    set({ isOpen: true, title, description, type }),
  closeAlert: () => set({ isOpen: false }),
}));
