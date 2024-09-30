import { create } from 'zustand';

export interface CategoryState {
  activeId: number;
  setActiveId: (activeId: number) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  activeId: 1,
  setActiveId: (activeId) => set({ activeId }),
}));
