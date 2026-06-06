import { useState } from 'react';
import { VscCheck, VscChevronRight, VscChevronLeft } from 'react-icons/vsc';
import { useThemeStore, ThemeId } from '../../store/themeStore';
import { useOS } from '../../hooks/useOS';
import { useRouter } from 'next/navigation';
import { useUiStore } from '../../store/uiStore';
import { TabType } from '../ActivityBar';

const THEMES: { id: ThemeId; name: string }[] = [
  { id: 'flate', name: 'Flate' },
  { id: 'everforest-pro', name: 'Everforest Pro' },
  { id: 'dracula', name: 'Dracula Official' },
  { id: 'shades-of-purple', name: 'Shades of Purple' }
];

export const SettingsPanel = ({
  closePopup,
  setActiveTab
}: {
  closePopup: () => void;
  setActiveTab: (tab: TabType) => void;
}) => {
  const [showThemes, setShowThemes] = useState(false);
  const { theme, setTheme } = useThemeStore();
  const { isMac, getShortcut } = useOS();
  const router = useRouter();
  const { setCommandPaletteOpen, setCommandPaletteQuery } = useUiStore();

  const handleCommandPalette = () => {
    closePopup();
    setCommandPaletteOpen(true);
    setCommandPaletteQuery('> ');
  };

  const handleSettings = () => {
    closePopup();
    router.push('/settings');
  };

  const handleExtensions = () => {
    closePopup();
    setActiveTab('extensions');
  };

  const glassmorphismClasses =
    'flex flex-col text-textColor bg-primary backdrop-blur-3xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.5)] rounded-lg font-sans overflow-hidden py-1 w-full';

  if (showThemes) {
    return (
      <div className={glassmorphismClasses}>
        <div className="flex flex-col py-2 text-[13px] overflow-y-auto custom-scrollbar">
          <div
            className="flex items-center py-1.5 hover:bg-hover cursor-pointer text-textColor transition-colors"
            onClick={() => setShowThemes(false)}
          >
            <VscChevronLeft size={14} className="mr-2" />
            <span className="font-semibold">Back</span>
          </div>
          <div className="h-[1px] bg-border/50 my-1 mx-2" />
          <div className="px-3 py-1 text-[10px] font-semibold text-textMuted uppercase tracking-widest mb-1">
            Color Theme
          </div>
          {THEMES.map((t) => (
            <div
              key={t.id}
              onClick={() => setTheme(t.id)}
              className="flex items-center px-2 py-1.5 hover:bg-accent hover:text-white cursor-pointer group text-textColor transition-colors"
            >
              <div className="w-6 flex justify-center text-accent group-hover:text-white">
                {theme === t.id && <VscCheck size={14} />}
              </div>
              <span>{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={glassmorphismClasses}>
      <div className="flex flex-col py-2 text-[13px] overflow-y-auto custom-scrollbar">
        {/* Top Commands */}
        <div 
          className="flex items-center justify-between px-2 py-1.5 hover:bg-accent hover:text-white cursor-pointer text-textColor group"
          onClick={handleCommandPalette}
        >
          <div className="flex items-center">
            <div className="w-6" />
            <span>Command Palette...</span>
          </div>
          <span className="text-[10px] text-textMuted tracking-widest pr-2 font-mono group-hover:text-white/80">
            {getShortcut('⇧⌘P', 'Ctrl+Shift+P')}
          </span>
        </div>

        <div className="h-[1px] bg-border/50 my-1 mx-2" />

        {/* Main Settings */}
        <div className="flex items-center justify-between px-2 py-1.5 hover:bg-accent hover:text-white cursor-pointer group text-textColor">
          <div className="flex items-center">
            <div className="w-6" />
            <span>Profile</span>
          </div>
          <VscChevronRight
            size={14}
            className="text-textMuted group-hover:text-white pr-2"
          />
        </div>

        <div 
          className="flex items-center justify-between px-2 py-1.5 hover:bg-accent hover:text-white cursor-pointer text-textColor group"
          onClick={handleSettings}
        >
          <div className="flex items-center">
            <div className="w-6" />
            <span>Settings</span>
          </div>
          <span className="text-[10px] text-textMuted tracking-widest pr-2 font-mono group-hover:text-white/80">
            {getShortcut('⌘,', 'Ctrl+,')}
          </span>
        </div>

        <div 
          className="flex items-center justify-between px-2 py-1.5 hover:bg-accent hover:text-white cursor-pointer text-textColor group"
          onClick={handleExtensions}
        >
          <div className="flex items-center">
            <div className="w-6" />
            <span>Extensions</span>
          </div>
          <span className="text-[10px] text-textMuted tracking-widest pr-2 font-mono group-hover:text-white/80">
            {getShortcut('⇧⌘X', 'Ctrl+Shift+X')}
          </span>
        </div>

        <div className="flex items-center px-2 py-1.5 hover:bg-accent hover:text-white cursor-pointer text-textColor">
          <div className="w-6" />
          <span>Keyboard Shortcuts</span>
        </div>

        <div className="flex items-center px-2 py-1.5 hover:bg-accent hover:text-white cursor-pointer text-textColor">
          <div className="w-6" />
          <span>Snippets</span>
        </div>

        <div className="flex items-center px-2 py-1.5 hover:bg-accent hover:text-white cursor-pointer text-textColor">
          <div className="w-6" />
          <span>Tasks</span>
        </div>

        <div
          className="flex items-center justify-between px-2 py-1.5 hover:bg-accent hover:text-white cursor-pointer group text-textColor"
          onClick={() => setShowThemes(true)}
        >
          <div className="flex items-center">
            <div className="w-6" />
            <span>Themes</span>
          </div>
          <VscChevronRight
            size={14}
            className="text-textMuted group-hover:text-white pr-2"
          />
        </div>

        <div className="h-[1px] bg-border/50 my-1 mx-2" />

        {/* Sync Status */}
        <div className="flex items-center px-2 py-1.5 hover:bg-accent hover:text-white cursor-pointer group text-textColor">
          <div className="w-6 flex justify-center text-textColor group-hover:text-white">
            <VscCheck size={14} />
          </div>
          <span>Settings Sync is On</span>
        </div>

        <div className="h-[1px] bg-border/50 my-1 mx-2" />

        {/* Update */}
        <div className="flex items-center px-2 py-1.5 hover:bg-accent hover:text-white cursor-pointer text-textColor">
          <div className="w-6" />
          <span>Check for Updates...</span>
        </div>
      </div>
    </div>
  );
};
