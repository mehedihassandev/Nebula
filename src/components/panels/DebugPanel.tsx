import { VscEllipsis } from 'react-icons/vsc';

export const DebugPanel = () => {
  return (
    <div className="flex flex-col h-full text-textColor bg-primary font-sans overflow-hidden">
      {/* Header */}
      <div className="h-[36px] flex justify-between items-center px-4 text-[11px] font-semibold tracking-widest text-textMuted uppercase">
        <span>Run and Debug</span>
        <div className="flex gap-2 text-textColor">
          <button className="hover:text-white transition-colors" title="More Actions...">
            <VscEllipsis size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col px-4 py-4 gap-4 text-[13px] leading-relaxed">
        
        <button className="w-full bg-accent hover:opacity-80 text-primary font-medium py-[6px] rounded-[3px] transition-all">
          Run and Debug
        </button>

        <p className="text-textColor">
          To customize Run and Debug <span className="text-accent hover:opacity-80 cursor-pointer transition-colors">create a launch.json file</span>.
        </p>

        <p className="text-textColor">
          Debug using a <span className="text-accent hover:opacity-80 cursor-pointer transition-colors">terminal command</span> or in an <span className="text-accent hover:opacity-80 cursor-pointer transition-colors">interactive chat</span>.
        </p>

        <button className="w-full bg-accent hover:opacity-80 text-primary font-medium py-[6px] rounded-[3px] transition-all mt-2">
          JavaScript Debug Terminal
        </button>

        <p className="text-textColor">
          You can use the JavaScript Debug Terminal to debug Node.js processes run on the command line.
        </p>

        <button className="w-full bg-accent hover:opacity-80 text-primary font-medium py-[6px] rounded-[3px] transition-all mt-2">
          Debug URL
        </button>

      </div>
    </div>
  );
};
