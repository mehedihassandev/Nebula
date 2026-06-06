import {
  FiFile,
  FiSearch,
  FiGitBranch,
  FiTerminal,
  FiGrid,
  FiSettings,
  FiUser
} from 'react-icons/fi';
import { useAppStore } from '../store/appStore';

export type TabType =
  | 'explorer'
  | 'search'
  | 'git'
  | 'debug'
  | 'extensions'
  | null;
export type PopupType = 'account' | 'settings' | null;

interface ActivityBarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  activePopup: PopupType;
  setActivePopup: (popup: PopupType) => void;
}

export const ActivityBar = ({
  activeTab,
  setActiveTab,
  activePopup,
  setActivePopup
}: ActivityBarProps) => {
  const { gitChanges, extensionUpdates } = useAppStore();

  const toggleTab = (tab: TabType) => {
    setActiveTab(activeTab === tab ? null : tab);
    setActivePopup(null);
  };

  const togglePopup = (popup: PopupType) => {
    setActivePopup(activePopup === popup ? null : popup);
  };

  const NavButton = ({
    tab,
    Icon,
    badge,
    isPopup
  }: {
    tab: TabType | PopupType;
    Icon: any;
    badge?: string | number;
    isPopup?: boolean;
  }) => {
    const isActive = isPopup ? activePopup === tab : activeTab === tab;
    return (
      <button
        className={`relative flex items-center justify-center w-[50px] h-[50px] ${isActive ? 'text-white' : 'text-white/40'} hover:text-white transition-colors duration-300`}
        onClick={(e) => {
          e.stopPropagation();
          if (isPopup) togglePopup(tab as PopupType);
          else toggleTab(tab as TabType);
        }}
      >
        {/* Active Line Indicator */}
        {isActive && (
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-secondary" />
        )}

        <Icon size={18} strokeWidth={1.5} />

        {/* Badge - Modern borderless style */}
        {badge && (
          <div className="absolute bottom-[10px] right-[10px] bg-secondary text-black text-[10px] font-bold font-sans w-[16px] h-[16px] flex items-center justify-center rounded-full shadow-lg">
            {badge}
          </div>
        )}
      </button>
    );
  };

  return (
    <div className="w-[50px] min-w-[50px] bg-transparent border-r border-white/5 flex flex-col justify-between items-center py-4 z-50">
      <div className="flex flex-col w-full gap-2">
        <NavButton tab="explorer" Icon={FiFile} />
        <NavButton tab="search" Icon={FiSearch} />
        <NavButton tab="extensions" Icon={FiGrid} badge={extensionUpdates > 0 ? extensionUpdates : undefined} />
        <NavButton tab="git" Icon={FiGitBranch} badge={gitChanges > 0 ? gitChanges : undefined} />
        <NavButton tab="debug" Icon={FiTerminal} />
      </div>

      <div className="flex flex-col w-full gap-2">
        <NavButton tab="account" Icon={FiUser} isPopup />
        <NavButton tab="settings" Icon={FiSettings} isPopup />
      </div>
    </div>
  );
};

export default ActivityBar;
