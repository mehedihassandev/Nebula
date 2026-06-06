import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeId = 'flate' | 'everforest-pro' | 'dracula' | 'shades-of-purple';

interface ThemeState {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'flate',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'nebula-theme-storage',
    }
  )
);
