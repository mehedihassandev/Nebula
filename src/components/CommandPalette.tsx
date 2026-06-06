'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { VscSearch } from 'react-icons/vsc';
import { menus } from '@constants/menu';
import { IMenu } from '@models/Menu';
import { SHORTCUTS, checkShortcut } from '@constants/shortcuts';
import { useUiStore } from '../store/uiStore';
import { fuzzyMatch } from '../utils/search';
import Fuse from 'fuse.js';
import { globalSearchIndex } from '../constants/searchIndex';
import { useMemo } from 'react';

type PaletteItem = {
  id: string;
  title: string;
  subtitle?: string;
  action: () => void;
};

export const CommandPalette = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { toggleBottomPanel, setActiveBottomTab, commandPaletteOpen, commandPaletteQuery, setCommandPaletteOpen, setCommandPaletteQuery } = useUiStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (checkShortcut(e, SHORTCUTS.COMMAND_PALETTE_SHIFT_P)) {
        e.preventDefault();
        e.stopPropagation();
        setCommandPaletteOpen(true);
        setCommandPaletteQuery('> ');
      } else if (
        checkShortcut(e, SHORTCUTS.COMMAND_PALETTE_P) ||
        checkShortcut(e, SHORTCUTS.COMMAND_PALETTE_K)
      ) {
        e.preventDefault();
        e.stopPropagation();
        setCommandPaletteOpen(!commandPaletteOpen);
        if (!commandPaletteOpen) {
          setCommandPaletteQuery('');
        }
      }
      if (checkShortcut(e, SHORTCUTS.ESCAPE)) setCommandPaletteOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () =>
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [commandPaletteOpen, setCommandPaletteOpen, setCommandPaletteQuery]);

  const handleNavigate = (path: string) => {
    setCommandPaletteOpen(false);
    setCommandPaletteQuery('');
    router.push(path);
  };

  const fileItems: PaletteItem[] = menus.map(menu => ({
    id: menu.path,
    title: menu.name,
    subtitle: `src/app${menu.path}`,
    action: () => handleNavigate(menu.path)
  }));
  fileItems.push({
    id: '/settings',
    title: 'settings.json',
    subtitle: 'src/app/settings',
    action: () => handleNavigate('/settings')
  });

  const commandItems: PaletteItem[] = [
    {
      id: 'cmd-settings',
      title: 'Preferences: Open Settings (JSON)',
      action: () => handleNavigate('/settings')
    },
    {
      id: 'cmd-terminal',
      title: 'View: Toggle Terminal',
      action: () => {
        setCommandPaletteOpen(false);
        toggleBottomPanel();
        setActiveBottomTab('TERMINAL');
      }
    },
    {
      id: 'cmd-output',
      title: 'View: Toggle Output',
      action: () => {
        setCommandPaletteOpen(false);
        toggleBottomPanel();
        setActiveBottomTab('OUTPUT');
      }
    },
    {
      id: 'cmd-problems',
      title: 'View: Toggle Problems',
      action: () => {
        setCommandPaletteOpen(false);
        toggleBottomPanel();
        setActiveBottomTab('PROBLEMS');
      }
    }
  ];

  const isCommandMode = commandPaletteQuery.startsWith('>');
  const cleanQuery = isCommandMode ? commandPaletteQuery.substring(1).trim() : commandPaletteQuery.trim();

  const fuse = useMemo(() => new Fuse(globalSearchIndex, {
    keys: ['title', 'content'],
    threshold: 0.4,
    ignoreLocation: true, // Matches anywhere in the string
  }), []);

  let filteredItems: PaletteItem[] = [];

  if (isCommandMode) {
    filteredItems = commandItems.filter(item => 
      fuzzyMatch(cleanQuery, item.title) || 
      (item.subtitle && fuzzyMatch(cleanQuery, item.subtitle))
    );
  } else {
    if (!cleanQuery) {
      filteredItems = fileItems;
    } else {
      const results = fuse.search(cleanQuery);
      filteredItems = results.map(result => {
        const item = result.item;
        return {
          id: item.id,
          title: item.title,
          subtitle: item.content.length > 80 ? item.content.substring(0, 80) + '...' : item.content,
          action: () => handleNavigate(item.path + (item.sectionId ? '#' + item.sectionId : ''))
        };
      });
    }
  }

  useEffect(() => {
    setSelectedIndex(0);
  }, [commandPaletteQuery]);

  useEffect(() => {
    const handleNavigationKeys = (e: KeyboardEvent) => {
      if (!commandPaletteOpen) return;
      if (checkShortcut(e, SHORTCUTS.DOWN)) {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
      }
      if (checkShortcut(e, SHORTCUTS.UP)) {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + filteredItems.length) % filteredItems.length
        );
      }
      if (checkShortcut(e, SHORTCUTS.ENTER) && filteredItems.length > 0) {
        e.preventDefault();
        filteredItems[selectedIndex].action();
      }
    };

    window.addEventListener('keydown', handleNavigationKeys);
    return () => window.removeEventListener('keydown', handleNavigationKeys);
  }, [commandPaletteOpen, filteredItems, selectedIndex]);

  if (!commandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999999999] flex items-start justify-center pt-[15vh]">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setCommandPaletteOpen(false)}
      />

      <div className="relative w-[750px] max-w-[95vw] bg-primary rounded-xl border border-border shadow-2xl flex flex-col overflow-hidden font-sans animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center px-4 py-3 border-b border-border">
          <VscSearch className="text-textColor mr-3" size={20} />
          <input
            autoFocus
            className="flex-1 bg-transparent outline-none text-textColor placeholder-textMuted text-lg"
            placeholder="Type a command or search files..."
            value={commandPaletteQuery}
            onChange={(e) => setCommandPaletteQuery(e.target.value)}
          />
        </div>

        <div className="max-h-[60vh] overflow-y-auto py-2">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`flex flex-col px-5 py-3 cursor-pointer transition-colors ${
                  index === selectedIndex
                    ? 'bg-hover'
                    : 'hover:bg-hover/50'
                }`}
                onClick={() => item.action()}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className={`text-[15px] font-medium ${index === selectedIndex ? 'text-accent' : 'text-textColor'}`}>
                  {item.title}
                </div>
                {item.subtitle && (
                  <div className="text-[13px] text-textMuted mt-1.5 opacity-80 leading-relaxed truncate">
                    {item.subtitle}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-textMuted">No {isCommandMode ? 'commands' : 'files'} found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
