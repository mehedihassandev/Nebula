"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { VscClose } from 'react-icons/vsc';
import { menus } from '@constants/menu';
import { iconHash } from '@utils/icons';
import { IMenu } from '@models/Menu';

export const EditorTabs = () => {
  const pathname = usePathname();

  return (
    <div className="flex w-full h-[35px] bg-surface/50 backdrop-blur-xl select-none z-20 overflow-x-auto no-scrollbar">
      {menus.map((item: IMenu, index: number) => {
        const isActive = pathname === item.path;
        return (
          <Link
            href={item.path}
            key={index}
            className={`flex items-center min-w-[120px] max-w-[200px] px-3 h-full gap-2 transition-colors group ${
              isActive 
                ? 'bg-white/[0.08] text-textColor border-t-[2px] border-t-accent' 
                : 'bg-transparent text-textMuted hover:bg-white/[0.04] border-t-[2px] border-t-transparent'
            }`}
          >
            <span className={`text-[14px] ${isActive ? 'opacity-100' : 'opacity-70'}`}>
              {iconHash[item.icon as keyof typeof iconHash]}
            </span>
            <span className={`text-[13px] font-sans truncate flex-1 ${isActive ? 'text-accent' : ''}`}>
              {item.name}
            </span>
            <span className={`w-5 h-5 flex items-center justify-center rounded transition-colors ${isActive ? 'opacity-100 hover:bg-hover' : 'opacity-0 group-hover:opacity-100 hover:bg-hover'}`}>
              <VscClose size={14} />
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default EditorTabs;
