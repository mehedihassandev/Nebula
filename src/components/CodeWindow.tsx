import React, { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

export const CodeWindow = ({ children }: { children: React.ReactNode }) => {
  const [lineCount, setLineCount] = useState<number>(1);
  const contentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const updateLines = () => {
      if (contentRef.current) {
        const baseLineHeight = window.innerWidth >= 1024 ? 32 : 28;
        const count = Math.max(
          1,
          Math.floor(contentRef.current.scrollHeight / baseLineHeight)
        );
        setLineCount(count);
      }
    };

    // Use ResizeObserver for perfect dynamic updates whenever content dimensions change
    const resizeObserver = new ResizeObserver(() => {
      updateLines();
    });

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    // Also update on window resize
    window.addEventListener('resize', updateLines);

    // Initial check
    updateLines();
    
    // Fallback delay for external images/fonts
    const timeout = setTimeout(updateLines, 500);

    return () => {
      window.removeEventListener('resize', updateLines);
      resizeObserver.disconnect();
      clearTimeout(timeout);
    };
  }, [children, pathname]);

  return (
    <div className="flex w-full min-h-full font-sans text-base lg:text-lg leading-7 lg:leading-8 items-start bg-transparent">
      <div className="flex w-full h-full items-start pt-10 pb-16 pr-8 lg:pr-12 pl-2">
        {/* Gutter with line numbers */}
        <div className="flex flex-col items-end pr-4 pl-2 text-textMuted select-none mr-4 shrink-0 min-w-[40px]">
          {[...Array(lineCount)].map((_, i) => (
            <div key={i} className="leading-7 lg:leading-8 font-mono opacity-40 text-sm">
              {i + 1}
            </div>
          ))}
        </div>
        
        {/* Actual Content */}
        <div className="flex-1 w-full text-textColor">
          <div ref={contentRef} className="w-full max-w-screen-2xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeWindow;
