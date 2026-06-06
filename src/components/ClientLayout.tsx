'use client';

import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { ActivityBar, TabType, PopupType } from './ActivityBar';
import { SidebarPanel } from './panels/SidebarPanel';
import { AccountPanel } from './panels/AccountPanel';
import { SettingsPanel } from './panels/SettingsPanel';
import { StatusBar } from './StatusBar';
import { useNotification } from '@hooks/notification-hook';
import { Analytics } from '@vercel/analytics/react';
import { EditorTabs } from './EditorTabs';
import { CommandPalette } from './CommandPalette';
import { CodeWindow } from './CodeWindow';
import { useThemeStore } from '../store/themeStore';
import { GhostTerminal } from './GhostTerminal';
import { SHORTCUTS, checkShortcut } from '@constants/shortcuts';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState<TabType>('explorer');
  const [activePopup, setActivePopup] = useState<PopupType>(null);
  const notify = useNotification();
  const popupRef = useRef<HTMLDivElement>(null);
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const isActivityBarBtn = (event.target as Element).closest(
        '.activity-bar-btn'
      );
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        !isActivityBarBtn
      ) {
        setActivePopup(null);
      }
    };

    if (activePopup) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [activePopup]);

  useEffect(() => {
    const handleOffline = () => {
      notify('You are offline.', false);
    };

    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('offline', handleOffline);
    };
  }, [notify]);

  useEffect(() => {
    const handleGlobalShortcuts = (e: KeyboardEvent) => {
      if (checkShortcut(e, SHORTCUTS.EXPLORER)) {
        e.preventDefault();
        e.stopPropagation();
        setActiveTab('explorer');
        setActivePopup(null);
      }
      if (checkShortcut(e, SHORTCUTS.SEARCH)) {
        e.preventDefault();
        e.stopPropagation();
        setActiveTab('search');
        setActivePopup(null);
      }
      if (checkShortcut(e, SHORTCUTS.EXTENSIONS)) {
        e.preventDefault();
        e.stopPropagation();
        setActiveTab('extensions');
        setActivePopup(null);
      }
      if (checkShortcut(e, SHORTCUTS.SETTINGS)) {
        e.preventDefault();
        e.stopPropagation();
        setActivePopup(activePopup === 'settings' ? null : 'settings');
      }
    };

    window.addEventListener('keydown', handleGlobalShortcuts, {
      capture: true
    });
    return () =>
      window.removeEventListener('keydown', handleGlobalShortcuts, {
        capture: true
      });
  }, [activePopup]);

  return (
    <div
      data-theme={theme}
      className="flex flex-col h-screen w-screen bg-primary text-textColor overflow-hidden font-sans relative"
    >
      {/* Background Blobs for Glassmorphism */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute bottom-[0%] -right-[10%] w-[40%] h-[50%] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="flex flex-1 overflow-hidden z-10 relative">
        {/* Editor Main View */}
        <main className="flex-1 flex flex-col min-w-0 bg-transparent relative z-10">
          <EditorTabs />
          <div className="flex-1 overflow-auto relative">
            <CodeWindow>{children}</CodeWindow>
            <Analytics />
          </div>
          {/* Ghost Terminal is constrained to the code window area */}
          <GhostTerminal />
        </main>

        {/* Expandable Sidebar Panel */}
        <AnimatePresence mode="wait">
          <SidebarPanel activeTab={activeTab} setActiveTab={setActiveTab} />
        </AnimatePresence>

        {/* Activity Bar and Popups */}
        <div className="relative flex z-[100]">
          <ActivityBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            activePopup={activePopup}
            setActivePopup={setActivePopup}
          />

          <AnimatePresence>
            {activePopup && (
              <motion.div
                ref={popupRef}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className={`absolute right-[60px] z-[60] ${activePopup === 'account' ? 'bottom-[66px] w-64' : 'bottom-[16px] w-72'}`}
              >
                {activePopup === 'account' ? (
                  <AccountPanel />
                ) : (
                  <SettingsPanel />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Status Bar */}
      <StatusBar />

      {/* Global Command Palette */}
      <CommandPalette />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
