import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { VscSearch, VscChevronRight } from 'react-icons/vsc';
import { menus } from '@constants/menu';
import { IMenu } from '@models/Menu';

export const SearchPanel = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const filteredMenus = menus.filter((menu: IMenu) => 
    menu.name.toLowerCase().includes(query.toLowerCase()) || 
    menu.path.toLowerCase().includes(query.toLowerCase())
  );

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col h-full text-textColor">
      <div className="h-[36px] flex items-center px-4 text-[11px] font-semibold tracking-widest text-textMuted uppercase">
        Search
      </div>
      <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
        <div className="flex items-center bg-primary border border-border rounded px-2 py-1 gap-2 mb-4 focus-within:border-accent transition-colors">
          <VscSearch className="text-textMuted" size={16} />
          <input 
            type="text" 
            placeholder="Search files..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-textMuted"
          />
        </div>
        
        {query && (
          <div className="flex flex-col gap-[2px]">
            <div className="text-[11px] font-semibold text-textMuted uppercase mb-2">
              {filteredMenus.length} results
            </div>
            {filteredMenus.map((menu: IMenu) => (
              <div 
                key={menu.path}
                onClick={() => handleNavigate(menu.path)}
                className="flex flex-col px-2 py-1.5 hover:bg-hover cursor-pointer rounded transition-colors group"
              >
                <div className="flex items-center gap-1.5 text-textColor group-hover:text-white">
                  <VscChevronRight size={14} className="text-textMuted group-hover:text-accent" />
                  <span className="text-[13px] font-medium">{menu.name}</span>
                </div>
                <div className="text-[11px] text-textMuted pl-5 truncate">
                  {menu.path}
                </div>
              </div>
            ))}
            {filteredMenus.length === 0 && (
              <p className="text-xs text-textMuted mt-2">
                No matching files found.
              </p>
            )}
          </div>
        )}
        {!query && (
          <p className="text-xs text-textMuted mt-2 text-center opacity-70">
            Type to search across the portfolio pages.
          </p>
        )}
      </div>
    </div>
  );
};
