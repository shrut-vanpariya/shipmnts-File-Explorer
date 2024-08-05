import { create } from 'zustand'


export const useStore = create((set) => ({
    currentFolder: null,
    setCurrentFolder: (currentFolder) => set((state) => ({ currentFolder: currentFolder })),
}))