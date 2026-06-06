import { create } from 'zustand';

export type BottomPanelTab = 'TERMINAL' | 'OUTPUT' | 'PROBLEMS' | 'DEBUG_CONSOLE';

interface UiState {
  isBottomPanelOpen: boolean;
  activeBottomTab: BottomPanelTab;
  commandPaletteOpen: boolean;
  commandPaletteQuery: string;
  toggleBottomPanel: () => void;
  setBottomPanelOpen: (isOpen: boolean) => void;
  setActiveBottomTab: (tab: BottomPanelTab) => void;
  setCommandPaletteOpen: (isOpen: boolean) => void;
  setCommandPaletteQuery: (query: string) => void;
}

export const useUiStore = create<UiState>((set) => ({
  isBottomPanelOpen: false,
  activeBottomTab: 'TERMINAL',
  commandPaletteOpen: false,
  commandPaletteQuery: '',
  toggleBottomPanel: () => set((state) => ({ isBottomPanelOpen: !state.isBottomPanelOpen })),
  setBottomPanelOpen: (isOpen) => set({ isBottomPanelOpen: isOpen }),
  setActiveBottomTab: (tab) => set({ activeBottomTab: tab }),
  setCommandPaletteOpen: (isOpen) => set({ commandPaletteOpen: isOpen }),
  setCommandPaletteQuery: (query) => set({ commandPaletteQuery: query }),
}));
