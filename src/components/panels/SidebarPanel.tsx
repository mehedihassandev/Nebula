import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TabType } from '../ActivityBar';
import { Menu } from '../Menu';
import { Footer } from '../Footer';
import { SearchPanel } from './SearchPanel';
import { GitPanel } from './GitPanel';
import { DebugPanel } from './DebugPanel';
import { ExtensionsPanel } from './ExtensionsPanel';

interface SidebarPanelProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const SidebarPanel = ({ activeTab, setActiveTab }: SidebarPanelProps) => {
  const [width, setWidth] = useState(300); // Increased default size
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      // Since sidebar is on the right, dragging left increases width
      const deltaX = startX.current - e.clientX;
      const newWidth = Math.min(Math.max(startWidth.current + deltaX, 200), 600);
      setWidth(newWidth);
    };

    const handleMouseUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
        document.body.style.cursor = 'default';
        document.body.style.userSelect = 'auto';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // If no active tab, don't render content inside, just collapse
  if (!activeTab) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startWidth.current = width;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none'; // Prevent text selection while dragging
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'explorer':
        return (
          <>
            <div className="h-[36px] flex items-center px-4 text-[11px] font-semibold tracking-widest text-textMuted uppercase shrink-0">
              Explorer
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <Menu setShowSidebar={(show) => !show && setActiveTab(null)} />
            </div>
            <div className="p-4 shrink-0">
              <Footer />
            </div>
          </>
        );
      case 'search':
        return <SearchPanel />;
      case 'git':
        return <GitPanel />;
      case 'debug':
        return <DebugPanel />;
      case 'extensions':
        return <ExtensionsPanel />;
      default:
        return null;
    }
  };

  return (
    <motion.div 
      initial={{ width: 0, opacity: 0 }}
      animate={{ width, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-transparent flex flex-col z-10 relative shrink-0"
    >
      {/* Drag Handle on the left edge */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-[4px] cursor-col-resize z-20 hover:bg-accent/50 active:bg-accent transition-colors translate-x-[-50%]"
        onMouseDown={handleMouseDown}
      />
      <div className="flex flex-col flex-1 overflow-hidden w-full h-full">
        {renderContent()}
      </div>
    </motion.div>
  );
};
