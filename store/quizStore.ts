import { create } from 'zustand';

interface QuizState {
  currentStep: number;
  selections: {
    room: string | null;
    color: string | null;
    texture: string | null;
  };
  setRoom: (roomId: string) => void;
  setColor: (colorId: string) => void;
  setTexture: (textureId: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  currentStep: 0,
  selections: {
    room: null,
    color: null,
    texture: null,
  },
  setRoom: (roomId) => set((state) => ({ selections: { ...state.selections, room: roomId } })),
  setColor: (colorId) => set((state) => ({ selections: { ...state.selections, color: colorId } })),
  setTexture: (textureId) => set((state) => ({ selections: { ...state.selections, texture: textureId } })),
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 3) })), // 3 is the result step
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 0) })),
  resetQuiz: () => set({ currentStep: 0, selections: { room: null, color: null, texture: null } }),
}));
