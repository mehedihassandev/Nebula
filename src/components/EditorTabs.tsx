"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { VscClose } from 'react-icons/vsc';
import { menus } from '@constants/menu';
import { iconHash } from '@utils/icons';
import { useTabStore, TabItem } from '../store/tabStore';
import { useEffect } from 'react';

export const EditorTabs = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { openTabs, openTab, closeTab, pinTab } = useTabStore();

  // Watch navigation and ensure the tab is open
  useEffect(() => {
    const currentMenuItem = menus.find(m => m.path === pathname);
    if (currentMenuItem) {
      openTab(currentMenuItem);
    }
  }, [pathname, openTab]);

  return (
    <div className="flex w-full h-[35px] bg-surface/50 backdrop-blur-xl select-none z-20 overflow-x-auto no-scrollbar">
      {openTabs.map((item: TabItem, index: number) => {
        const isActive = pathname === item.path;
        return (
          <div
            key={index}
            onDoubleClick={(e) => {
              e.stopPropagation();
              pinTab(item.path);
            }}
            className={`flex items-center min-w-[120px] max-w-[200px] px-3 h-full gap-2 transition-colors cursor-pointer group ${
              isActive 
                ? 'bg-white/[0.08] text-textColor border-t-[2px] border-t-accent' 
                : 'bg-transparent text-textMuted hover:bg-white/[0.04] border-t-[2px] border-t-transparent'
            }`}
            onClick={() => {
              if (!isActive) router.push(item.path);
            }}
          >
            <span className={`text-[14px] ${isActive ? 'opacity-100' : 'opacity-70'}`}>
              {iconHash[item.icon as keyof typeof iconHash]}
            </span>
            <span className={`text-[13px] font-sans truncate flex-1 ${isActive ? 'text-accent' : ''} ${!item.isPinned ? 'italic' : ''}`}>
              {item.name}
            </span>
            <span 
              className={`w-5 h-5 flex items-center justify-center rounded transition-colors ${isActive ? 'opacity-100 hover:bg-hover' : 'opacity-0 group-hover:opacity-100 hover:bg-hover'}`}
              onClick={(e) => {
                e.stopPropagation();
                closeTab(item.path);
                
                // If closing active tab, route to last remaining tab
                if (isActive && openTabs.length > 1) {
                   const currentIndex = openTabs.findIndex(t => t.path === item.path);
                   const nextTab = openTabs[currentIndex - 1] || openTabs[currentIndex + 1];
                   if (nextTab) {
                     router.push(nextTab.path);
                   }
                } else if (isActive && openTabs.length === 1) {
                   router.push('/welcome');
                }
              }}
            >
              <VscClose size={14} />
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default EditorTabs;
