import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  fontSize: number;
  animationsEnabled: boolean;
  wordWrap: boolean;
  setFontSize: (size: number) => void;
  setAnimationsEnabled: (enabled: boolean) => void;
  setWordWrap: (enabled: boolean) => void;
  updateSettingsFromJson: (jsonStr: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      fontSize: 16,
      animationsEnabled: true,
      wordWrap: true,
      setFontSize: (size) => set({ fontSize: size }),
      setAnimationsEnabled: (enabled) => set({ animationsEnabled: enabled }),
      setWordWrap: (enabled) => set({ wordWrap: enabled }),
      updateSettingsFromJson: (jsonStr) => {
        try {
          const obj = JSON.parse(jsonStr);
          set((state) => ({
            fontSize: typeof obj['editor.fontSize'] === 'number' ? obj['editor.fontSize'] : state.fontSize,
            animationsEnabled: typeof obj['workbench.animations'] === 'boolean' ? obj['workbench.animations'] : state.animationsEnabled,
            wordWrap: typeof obj['editor.wordWrap'] === 'boolean' ? obj['editor.wordWrap'] : state.wordWrap,
          }));
        } catch (e) {
          // ignore parsing errors as they type
        }
      }
    }),
    {
      name: 'nebula-settings-storage',
    }
  )
);
