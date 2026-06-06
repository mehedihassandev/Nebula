import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { menus } from '@constants/menu';
import { IMenu } from '@models/Menu';

export interface TabItem extends IMenu {
  isPinned: boolean;
}

interface TabState {
  openTabs: TabItem[];
  openTab: (tab: IMenu, isPinned?: boolean) => void;
  closeTab: (path: string) => void;
  pinTab: (path: string) => void;
}

const defaultTabs = menus
  .filter(m => !['package.json', '.gitignore', 'README.md'].includes(m.name))
  .map(m => ({ ...m, isPinned: true }));

export const useTabStore = create<TabState>()(
  persist(
    (set) => ({
  openTabs: defaultTabs,
  openTab: (tab, isPinned = false) => set((state) => {
    const existingIndex = state.openTabs.findIndex(t => t.path === tab.path);
    if (existingIndex !== -1) {
       // Already open, maybe pin it if requested
       if (isPinned && !state.openTabs[existingIndex].isPinned) {
         const newTabs = [...state.openTabs];
         newTabs[existingIndex] = { ...newTabs[existingIndex], isPinned: true };
         return { openTabs: newTabs };
       }
       return state;
    }
    // Check if there is an unpinned tab to replace
    const unpinnedIndex = state.openTabs.findIndex(t => !t.isPinned);
    if (unpinnedIndex !== -1 && !isPinned) {
      // Replace unpinned tab
      const newTabs = [...state.openTabs];
      newTabs[unpinnedIndex] = { ...tab, isPinned: false };
      return { openTabs: newTabs };
    }
    // Add new tab
    return { openTabs: [...state.openTabs, { ...tab, isPinned }] };
  }),
  closeTab: (path) => set((state) => ({
    openTabs: state.openTabs.filter(t => t.path !== path)
  })),
  pinTab: (path) => set((state) => ({
    openTabs: state.openTabs.map(t => t.path === path ? { ...t, isPinned: true } : t)
  }))
    }),
    {
      name: 'tab-storage',
    }
  )
);
