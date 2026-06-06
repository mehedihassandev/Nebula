import React, { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useSettingsStore } from '../store/settingsStore';
import { useTabStore } from '../store/tabStore';
import Image from 'next/image';

export const CodeWindow = ({ children }: { children: React.ReactNode }) => {
  const [lineCount, setLineCount] = useState<number>(1);
  const contentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  const { fontSize, wordWrap } = useSettingsStore();

  useEffect(() => {
    const updateLines = () => {
      if (contentRef.current) {
        // Approximate base line height based on font size setting. 
        // 1.5 is a standard line-height multiplier.
        const baseLineHeight = fontSize * 1.5;
        const count = Math.max(
          1,
          Math.floor(contentRef.current.scrollHeight / baseLineHeight)
        );
        setLineCount(count);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updateLines();
    });

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    window.addEventListener('resize', updateLines);
    updateLines();
    const timeout = setTimeout(updateLines, 500);

    return () => {
      window.removeEventListener('resize', updateLines);
      resizeObserver.disconnect();
      clearTimeout(timeout);
    };
  }, [children, pathname, fontSize, wordWrap]);

  const { openTabs } = useTabStore();

  if (openTabs.length === 0 || pathname === '/welcome') {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full bg-primary text-textMuted select-none pt-20">
        <Image src="/favicon.png" alt="Logo" width={140} height={140} className="mb-10 opacity-10 drop-shadow-2xl grayscale" />
        <div className="flex flex-col gap-4 text-[13px] opacity-40 items-center">
          <div className="flex items-center gap-4">
            <span className="w-36 text-right">Show All Commands</span>
            <span className="font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5 shadow-sm">Cmd + K</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-36 text-right">Toggle Terminal</span>
            <span className="font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5 shadow-sm">Cmd + `</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-36 text-right">Toggle Sidebar</span>
            <span className="font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5 shadow-sm">Cmd + B</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-36 text-right">Close Active Tab</span>
            <span className="font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5 shadow-sm">Cmd + W</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="flex w-full min-h-full font-sans items-start bg-transparent transition-all duration-200"
      style={{ fontSize: `${fontSize}px`, lineHeight: 1.5 }}
    >
      <div className="flex w-full h-full items-start pt-10 pb-16 pr-8 lg:pr-12 pl-2">
        {/* Gutter with line numbers */}
        <div className="flex flex-col items-end pr-4 pl-2 text-textMuted select-none mr-4 shrink-0 min-w-[40px]">
          {[...Array(lineCount)].map((_, i) => (
            <div key={i} className="font-mono opacity-40 text-sm" style={{ height: `${fontSize * 1.5}px` }}>
              {i + 1}
            </div>
          ))}
        </div>
        
        {/* Actual Content */}
        <div className={`flex-1 w-full text-textColor flex flex-col h-full ${wordWrap ? 'break-words whitespace-normal' : 'whitespace-nowrap overflow-x-auto'}`}>
          <div ref={contentRef} className="w-full max-w-screen-2xl flex-1 h-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeWindow;
