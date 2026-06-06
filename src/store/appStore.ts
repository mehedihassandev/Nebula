import { create } from 'zustand';

interface AppState {
  gitChanges: number;
  extensionUpdates: number;
  installedExtensions: number;
  setGitChanges: (count: number) => void;
  setExtensionUpdates: (count: number) => void;
  setInstalledExtensions: (count: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  gitChanges: 0, // Default to 0, no badge
  extensionUpdates: 4, // Show 4 installed extensions
  installedExtensions: 4,
  setGitChanges: (count) => set({ gitChanges: count }),
  setExtensionUpdates: (count) => set({ extensionUpdates: count }),
  setInstalledExtensions: (count) => set({ installedExtensions: count }),
}));
