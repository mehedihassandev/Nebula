"use client";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export const IntelliSenseTooltip = ({ 
  children, 
  keyword, 
  definition 
}: { 
  children: React.ReactNode; 
  keyword: string; 
  definition: { property: string; value: string | number | boolean }[];
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, showAbove: true });
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isHovered && spanRef.current) {
      const rect = spanRef.current.getBoundingClientRect();
      const showAbove = rect.top > 250; // Check if there is enough space above the element
      setCoords({
        left: rect.left + rect.width / 2,
        top: showAbove ? rect.top - 12 : rect.bottom + 12,
        showAbove,
      });
    }
  }, [isHovered]);

  return (
    <>
      <span 
        ref={spanRef}
        className="relative inline-block cursor-help group z-[99999]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="text-white hover:text-secondary border-b border-secondary/30 hover:border-secondary transition-all duration-300 relative z-[99999]">
          {children}
        </span>
      </span>
      
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: coords.showAbove ? 15 : -15, scale: 0.95, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: coords.showAbove ? 10 : -10, scale: 0.95, filter: "blur(4px)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`fixed -translate-x-1/2 w-max min-w-[220px] bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-xl p-4 z-[999999] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] font-saira text-sm text-left ${coords.showAbove ? 'bottom-auto' : 'top-auto'}`}
              style={{ 
                left: coords.left, 
                ...(coords.showAbove ? { bottom: window.innerHeight - coords.top } : { top: coords.top }),
                pointerEvents: "none" 
              }}
            >
              <div className="text-white/50 mb-3 font-normal tracking-wider text-xs uppercase border-b border-white/5 pb-2">
                <span className="text-secondary font-medium">interface</span> {keyword} {'{'}
              </div>
              {definition.map((def, i) => (
                <div key={i} className="ml-2 my-1.5 flex items-center gap-2">
                  <span className="text-white/80 font-medium">{def.property}</span>
                  <span className="text-white/30">:</span>
                  <span className={`font-syne ${typeof def.value === 'string' ? 'text-secondary/90' : 'text-white'}`}>
                    {typeof def.value === 'string' ? `"${def.value}"` : String(def.value)}
                  </span>
                </div>
              ))}
              <div className="text-white/50 mt-3 font-normal text-xs border-t border-white/5 pt-2">{'}'}</div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default IntelliSenseTooltip;
