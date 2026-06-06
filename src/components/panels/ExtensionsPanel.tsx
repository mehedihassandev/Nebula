import { useState } from 'react';
import { VscRefresh, VscFilter, VscListSelection, VscInfo, VscSettingsGear, VscCloudDownload, VscStarFull } from 'react-icons/vsc';
import { useThemeStore, ThemeId } from '../../store/themeStore';

const THEMES = [
  {
    id: 'flate' as ThemeId,
    name: 'Flate',
    displayName: 'Flate',
    description: 'A flat theme for VS Code',
    publisher: 'hiukky',
    icon: 'https://raw.githubusercontent.com/hiukky/flate/main/icon.png',
    downloads: '150K',
    rating: 5,
  },
  {
    id: 'everforest-pro' as ThemeId,
    name: 'Everforest Pro',
    displayName: 'Everforest Pro',
    description: 'A dark green theme for VS Code',
    publisher: 'AndreiLucaci',
    icon: 'https://raw.githubusercontent.com/AndreiLucaci/everforest-pro/main/icon.png',
    downloads: '50K',
    rating: 5,
  },
  {
    id: 'dracula' as ThemeId,
    name: 'Dracula Official',
    displayName: 'Dracula Official',
    description: 'Official Dracula Theme. A dark theme for many editors.',
    publisher: 'Dracula Theme',
    icon: 'https://raw.githubusercontent.com/dracula/visual-studio-code/master/icon.png',
    downloads: '5M',
    rating: 5,
  },
  {
    id: 'shades-of-purple' as ThemeId,
    name: 'Shades of Purple',
    displayName: 'Shades of Purple',
    description: 'A professional theme with hand-picked & bold shades of purple.',
    publisher: 'Ahmad Awais',
    icon: 'https://raw.githubusercontent.com/ahmadawais/shades-of-purple-vscode/master/images/sop-icon.png',
    downloads: '1.5M',
    rating: 5,
  }
];

export const ExtensionsPanel = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, setTheme } = useThemeStore();

  const filteredThemes = THEMES.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.publisher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full text-textColor bg-transparent font-sans overflow-hidden">
      {/* Header */}
      <div className="h-[36px] flex justify-between items-center px-4 text-[11px] font-semibold tracking-widest text-textMuted uppercase">
        <span>Extensions</span>
        <div className="flex gap-2 text-textColor">
          <button className="hover:text-white transition-colors" title="Filter">
            <VscFilter size={14} />
          </button>
          <button className="hover:text-white transition-colors" title="Refresh">
            <VscRefresh size={14} />
          </button>
        </div>
      </div>

      <div className="flex flex-col px-4 py-2 gap-2">
        <div className="relative flex items-center bg-black/20 border border-white/5 rounded-md focus-within:border-accent/50 transition-colors shadow-inner">
          <input 
            type="text"
            className="w-full bg-transparent px-3 py-1.5 text-[12px] text-white outline-none placeholder-textMuted/70"
            placeholder="Search Extensions in Marketplace"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex items-center gap-2 pr-3 text-textMuted/70">
            <VscListSelection size={14} className="hover:text-white cursor-pointer transition-colors" />
            <VscFilter size={14} className="hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
        <div className="flex items-center justify-between px-4 py-1 mt-1">
          <span className="text-[10px] font-semibold tracking-widest text-textMuted uppercase">Installed</span>
          <div className="bg-accent text-primary text-[9px] font-bold px-[6px] rounded-full">{filteredThemes.length}</div>
        </div>

        <div className="flex flex-col mt-1">
          {filteredThemes.length === 0 ? (
            <div className="px-4 py-4 text-xs text-textMuted">No extensions found.</div>
          ) : (
            filteredThemes.map((ext) => (
              <div 
                key={ext.id} 
                onClick={() => setTheme(ext.id)}
                className={`flex gap-3 px-4 py-3 transition-all cursor-pointer group border-l-[2px] ${theme === ext.id ? 'border-accent bg-white/5' : 'border-transparent hover:border-white/20 hover:bg-white/[0.02]'}`}
              >
                <img 
                  src={ext.icon} 
                  alt={ext.name} 
                  className="w-10 h-10 rounded-lg shrink-0 object-cover shadow-md bg-white/5 p-0.5"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://api.iconify.design/logos:visual-studio-code.svg';
                  }}
                />
                <div className="flex flex-col flex-1 min-w-0 justify-center">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-textColor group-hover:text-white truncate pr-2 transition-colors">{ext.displayName}</span>
                    <div className="flex items-center gap-1 text-[10px] text-textMuted shrink-0">
                      {theme === ext.id && <span className="text-accent font-medium uppercase text-[9px] mr-1">Active</span>}
                    </div>
                  </div>
                  <span className="text-[11px] text-textMuted/80 truncate leading-tight mt-[2px]">{ext.description}</span>
                  <div className="flex items-center justify-between mt-[4px]">
                    <div className="flex items-center gap-2 text-[10px] text-textMuted truncate">
                      <span className="truncate">{ext.publisher}</span>
                      <div className="flex items-center gap-[2px]">
                        <VscCloudDownload size={10} />
                        <span>{ext.downloads}</span>
                      </div>
                      <div className="flex items-center gap-[2px] text-[#e5c07b]">
                        <VscStarFull size={10} />
                        <span>{ext.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-textMuted opacity-0 group-hover:opacity-100 transition-opacity">
                      <VscSettingsGear size={12} className="hover:text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
