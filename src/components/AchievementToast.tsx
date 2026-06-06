'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAchievementsStore, Badge } from '../store/achievementsStore';

const BADGE_INFO: Record<Badge, { title: string; description: string; icon: string }> = {
  HACKER_MAN: { title: 'Hacker Man', description: 'Attempted to escalate privileges.', icon: '🕵️‍♂️' },
  THE_ONE: { title: 'The One', description: 'Woke up from the Matrix.', icon: '💊' },
  KONAMI_CODE: { title: 'Konami Code', description: '+30 Lives Granted!', icon: '🎮' }
};

export const AchievementToast = () => {
  const { recentUnlock, clearRecentUnlock } = useAchievementsStore();

  useEffect(() => {
    if (recentUnlock) {
      const timer = setTimeout(() => {
        clearRecentUnlock();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [recentUnlock, clearRecentUnlock]);

  return (
    <AnimatePresence>
      {recentUnlock && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-10 right-10 z-[999999] bg-[#0f111a] border border-[#ff9e64]/50 shadow-[0_0_30px_rgba(255,158,100,0.15)] rounded-lg p-4 flex items-center gap-4 text-white pointer-events-none"
        >
          <div className="text-4xl drop-shadow-md">{BADGE_INFO[recentUnlock].icon}</div>
          <div>
            <div className="text-[#ff9e64] text-[10px] font-bold uppercase tracking-widest mb-0.5">
              Achievement Unlocked
            </div>
            <div className="text-white font-semibold text-sm">{BADGE_INFO[recentUnlock].title}</div>
            <div className="text-white/60 text-xs mt-0.5">{BADGE_INFO[recentUnlock].description}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
