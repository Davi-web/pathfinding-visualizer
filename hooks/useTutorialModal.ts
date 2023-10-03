import { create } from "zustand";
interface TutorialModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
const useTutorialModal = create<TutorialModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
export default useTutorialModal;
