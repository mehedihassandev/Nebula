'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { VscSearch } from 'react-icons/vsc';
import { menus } from '@constants/menu';
import { IMenu } from '@models/Menu';
import { SHORTCUTS, checkShortcut } from '@constants/shortcuts';

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        checkShortcut(e, SHORTCUTS.COMMAND_PALETTE_P) ||
        checkShortcut(e, SHORTCUTS.COMMAND_PALETTE_K)
      ) {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen((prev) => !prev);
      }
      if (checkShortcut(e, SHORTCUTS.ESCAPE)) setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () =>
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, []);

  const filteredMenus = menus.filter(
    (menu: IMenu) =>
      menu.name.toLowerCase().includes(query.toLowerCase()) ||
      menu.path.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    setQuery('');
    router.push(path);
  };

  useEffect(() => {
    const handleNavigationKeys = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (checkShortcut(e, SHORTCUTS.DOWN)) {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredMenus.length);
      }
      if (checkShortcut(e, SHORTCUTS.UP)) {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + filteredMenus.length) % filteredMenus.length
        );
      }
      if (checkShortcut(e, SHORTCUTS.ENTER) && filteredMenus.length > 0) {
        e.preventDefault();
        handleNavigate(filteredMenus[selectedIndex].path);
      }
    };

    window.addEventListener('keydown', handleNavigationKeys);
    return () => window.removeEventListener('keydown', handleNavigationKeys);
  }, [isOpen, filteredMenus, selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999999999] flex items-start justify-center pt-[15vh]">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      <div className="relative w-[600px] max-w-[90vw] bg-primary rounded-xl border border-border shadow-2xl flex flex-col overflow-hidden font-sans animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center px-4 py-3 border-b border-border">
          <VscSearch className="text-textColor mr-3" size={20} />
          <input
            autoFocus
            className="flex-1 bg-transparent outline-none text-textColor placeholder-textMuted text-lg"
            placeholder="Type a command or search files..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="max-h-[300px] overflow-y-auto py-2">
          {filteredMenus.length > 0 ? (
            filteredMenus.map((menu: IMenu, index: number) => (
              <div
                key={menu.path}
                className={`flex items-center px-4 py-3 cursor-pointer ${
                  index === selectedIndex
                    ? 'bg-hover text-accent'
                    : 'text-textColor hover:bg-hover'
                }`}
                onClick={() => handleNavigate(menu.path)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="flex-1">{menu.name}</div>
                <div className="text-xs text-textMuted">{menu.path}</div>
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-textMuted">No files found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
