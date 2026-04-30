import { create } from "zustand";

interface UIState {
  introStage: number; // 0: Curtain, 1: Image Sequence, 2: Brand Animation, 3: Tagline, 4: Fully Loaded (Navbar)
  setIntroStage: (stage: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
  introStage: 0,
  setIntroStage: (stage) => set({ introStage: stage }),
}));
