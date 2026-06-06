import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { VscChevronDown, VscChevronRight, VscFolder, VscFolderOpened } from 'react-icons/vsc';
import { menus } from '@constants/menu';
import { iconHash } from '@utils/icons';
import { IMenu } from '@models/Menu';
import { useTabStore } from '../store/tabStore';

export const Menu = ({ setShowSidebar }: { setShowSidebar: (show: boolean) => void }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { openTab } = useTabStore();
  const [srcOpen, setSrcOpen] = useState(true);
  const [appOpen, setAppOpen] = useState(true);

  return (
    <div className="font-sans text-[13px] select-none pb-4">
      <div className="flex flex-col">
        {/* Fake src folder */}
        <div 
          className="flex items-center gap-1 px-2 py-1 hover:bg-hover/60 cursor-pointer text-textColor hover:text-white transition-colors"
          onClick={() => setSrcOpen(!srcOpen)}
        >
          {srcOpen ? <VscChevronDown size={14} /> : <VscChevronRight size={14} />}
          {srcOpen ? <VscFolderOpened size={14} className="text-accent mr-0.5" /> : <VscFolder size={14} className="text-accent mr-0.5" />}
          <span className="font-medium text-white/90">src</span>
        </div>

        {srcOpen && (
          <div className="flex flex-col relative before:absolute before:left-[15px] before:top-0 before:bottom-0 before:w-[1px] before:bg-white/5">
            {/* Fake app folder */}
            <div 
              className="flex items-center gap-1 px-2 py-1 pl-6 hover:bg-hover/60 cursor-pointer text-textColor hover:text-white transition-colors"
              onClick={() => setAppOpen(!appOpen)}
            >
              {appOpen ? <VscChevronDown size={14} /> : <VscChevronRight size={14} />}
              {appOpen ? <VscFolderOpened size={14} className="text-accent mr-0.5" /> : <VscFolder size={14} className="text-accent mr-0.5" />}
              <span className="font-medium text-white/90">app</span>
            </div>

            {appOpen && (
              <div className="flex flex-col relative before:absolute before:left-[31px] before:top-0 before:bottom-0 before:w-[1px] before:bg-white/5">
                {menus
                  .filter(m => !['package.json', '.gitignore', 'README.md'].includes(m.name))
                  .map((item: IMenu, index: number) => {
                  const isActive = pathname === item.path;
                  return (
                    <div
                      key={index}
                      className={`group relative flex items-center py-1 px-2 pl-10 gap-1.5 transition-all cursor-pointer select-none ${
                        isActive 
                          ? 'bg-hover/80 text-white before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-accent' 
                          : 'text-textColor hover:bg-hover/60 hover:text-white'
                      }`}
                      onClick={() => {
                        openTab(item);
                        router.push(item.path);
                        if (window.innerWidth < 768) {
                          setShowSidebar(false);
                        }
                      }}
                      onDoubleClick={(e) => {
                        e.stopPropagation();
                        openTab(item, true);
                        router.push(item.path);
                      }}
                    >
                      <span className="opacity-90">
                        {iconHash[item.icon as keyof typeof iconHash]}
                      </span>
                      <span className={isActive ? "font-medium" : ""}>
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Root files */}
        {menus
          .filter(m => ['package.json', '.gitignore', 'README.md'].includes(m.name))
          .map((item: IMenu, index: number) => {
          const isActive = pathname === item.path;
          return (
            <div
              key={index}
              className={`group relative flex items-center py-1 px-2 pl-2 gap-1.5 transition-all cursor-pointer select-none ${
                isActive 
                  ? 'bg-hover/80 text-white before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-accent' 
                  : 'text-textColor hover:bg-hover/60 hover:text-white'
              }`}
              onClick={() => {
                openTab(item);
                router.push(item.path);
                if (window.innerWidth < 768) {
                  setShowSidebar(false);
                }
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                openTab(item, true);
                router.push(item.path);
              }}
            >
              <span className="opacity-90">
                {iconHash[item.icon as keyof typeof iconHash]}
              </span>
              <span className={isActive ? "font-medium" : ""}>
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;

