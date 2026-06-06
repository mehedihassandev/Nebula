"use client";
import { usePathname } from 'next/navigation';
import { VscTerminal, VscFileCode, VscSymbolMisc, VscClose } from 'react-icons/vsc';
import { FaReact } from 'react-icons/fa';

export const EditorTabs = () => {
  const pathname = usePathname();
  
  const getTabInfo = () => {
    switch(pathname) {
      case '/':
        return { name: 'home.tsx', icon: <FaReact className="text-[#61DAFB] text-lg" /> };
      case '/about':
        return { name: 'about.tsx', icon: <FaReact className="text-[#61DAFB] text-lg" /> };
      case '/experience':
        return { name: 'experience.json', icon: <VscFileCode className="text-[#CBCB41] text-lg" /> };
      case '/project':
        return { name: 'projects.ts', icon: <VscTerminal className="text-[#3178C6] text-lg" /> };
      case '/contact':
        return { name: 'contact.css', icon: <VscSymbolMisc className="text-[#2965F1] text-lg" /> };
      default:
        return { name: 'page.tsx', icon: <FaReact className="text-[#61DAFB] text-lg" /> };
    }
  };

  const { name, icon } = getTabInfo();

  return (
    <div className="w-full h-12 flex items-end px-2 sm:px-6 select-none z-20 sticky top-0 bg-primary/80 backdrop-blur-md border-b border-white/5">
      <div className="px-4 py-3 flex items-center gap-2 relative border-b-[1px] border-secondary text-white">
        <span className="opacity-80">{icon}</span>
        <span className="text-sm font-saira tracking-wider opacity-90">{name}</span>
        <VscClose className="ml-4 text-sm opacity-40 hover:opacity-100 hover:text-secondary transition-all cursor-pointer" />
      </div>
    </div>
  );
};

export default EditorTabs;
