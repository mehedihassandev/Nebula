'use client';

import { useState, useRef, useEffect } from 'react';
import { useUiStore, BottomPanelTab } from '../store/uiStore';
import { VscClose } from 'react-icons/vsc';
import { GhostTerminal } from './GhostTerminal';

export const BottomPanel = () => {
  const { isBottomPanelOpen, activeBottomTab, toggleBottomPanel, setActiveBottomTab } = useUiStore();
  
  const [height, setHeight] = useState(300);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startHeight = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaY = startY.current - e.clientY;
      const newHeight = Math.min(Math.max(startHeight.current + deltaY, 150), 800);
      setHeight(newHeight);
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

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startY.current = e.clientY;
    startHeight.current = height;
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';
  };

  if (!isBottomPanelOpen) return null;

  const tabs: { id: BottomPanelTab; label: string }[] = [
    { id: 'PROBLEMS', label: 'PROBLEMS' },
    { id: 'OUTPUT', label: 'OUTPUT' },
    { id: 'DEBUG_CONSOLE', label: 'DEBUG CONSOLE' },
    { id: 'TERMINAL', label: 'TERMINAL' }
  ];

  return (
    <div 
      className="bg-primary flex flex-col font-sans shrink-0 relative z-40"
      style={{ height: `${height}px` }}
    >
      {/* Drag Handle on the top edge */}
      <div 
        className="absolute left-0 right-0 top-0 h-[4px] cursor-row-resize z-50 hover:bg-accent/50 active:bg-accent transition-colors translate-y-[-50%]"
        onMouseDown={handleMouseDown}
      />

      {/* Header Tabs */}
      <div className="flex items-center justify-between px-4 h-9 text-[11px] uppercase tracking-wide">
        <div className="flex h-full">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveBottomTab(tab.id)}
              className={`px-4 h-full flex items-center border-b-[1px] transition-colors ${
                activeBottomTab === tab.id
                  ? 'border-accent text-accent'
                  : 'border-transparent text-textMuted hover:text-textColor'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Actions */}
        <div className="flex items-center text-textMuted gap-2">
          <button onClick={toggleBottomPanel} className="p-1 hover:text-textColor rounded hover:bg-hover transition-colors">
            <VscClose size={16} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative">
        <div className={activeBottomTab === 'TERMINAL' ? 'h-full' : 'hidden'}>
          <GhostTerminal />
        </div>
        {activeBottomTab === 'OUTPUT' && (
          <div className="p-4 font-mono text-[12px] text-textColor overflow-auto h-full scrollbar-thin scrollbar-thumb-white/10">
            <div className="text-secondary mb-2">[INFO] System initializing...</div>
            <div className="mb-1">[NETWORK] Fetching profile data... <span className="text-secondary">200 OK</span></div>
            <div className="mb-1">[NETWORK] Connecting to wss://visitor.session... <span className="text-secondary">Connected</span></div>
            <div className="mb-1">[SYSTEM] Component tree mounted successfully.</div>
            <div className="text-accent mb-1">[WARN] Local storage sync delayed by 12ms.</div>
            <div className="mb-1 text-textMuted">[INFO] Ready to accept commands.</div>
          </div>
        )}
        {activeBottomTab === 'PROBLEMS' && (
          <div className="p-4 font-sans text-[13px] text-textMuted flex items-center h-full">
            No problems have been detected in the workspace.
          </div>
        )}
        {activeBottomTab === 'DEBUG_CONSOLE' && (
          <div className="p-4 font-mono text-[12px] text-textMuted flex items-center h-full italic">
            Please start a debug session to evaluate expressions.
          </div>
        )}
      </div>
    </div>
  );
};
