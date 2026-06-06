import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Badge = 'HACKER_MAN' | 'THE_ONE' | 'KONAMI_CODE';

interface AchievementState {
  unlockedBadges: Badge[];
  recentUnlock: Badge | null;
  unlockBadge: (badge: Badge) => void;
  clearRecentUnlock: () => void;
}

export const useAchievementsStore = create<AchievementState>()(
  persist(
    (set) => ({
      unlockedBadges: [],
      recentUnlock: null,
      unlockBadge: (badge) => set((state) => {
        if (!state.unlockedBadges.includes(badge)) {
          return {
            unlockedBadges: [...state.unlockedBadges, badge],
            recentUnlock: badge
          };
        }
        return state;
      }),
      clearRecentUnlock: () => set({ recentUnlock: null })
    }),
    {
      name: 'nebula-achievements-storage',
    }
  )
);
