import { VscRemote, VscError, VscWarning, VscSync, VscFeedback, VscBell } from 'react-icons/vsc';

export const StatusBar = () => {
  return (
    <div className="h-6 bg-primary/80 backdrop-blur-xl text-textColor flex items-center justify-between px-2 text-xs font-sans select-none z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-4 h-full">
        <div className="flex items-center gap-1 hover:bg-hover px-2 h-full cursor-pointer transition-colors">
          <VscRemote className="text-accent" />
          <span>macOS / Linux</span>
        </div>
        <div className="flex items-center gap-1 hover:bg-hover px-2 h-full cursor-pointer transition-colors">
          <VscSync />
          <span className="truncate max-w-[200px] sm:max-w-[300px] lg:max-w-[500px]" title={process.env.NEXT_PUBLIC_GIT_COMMIT_MSG || 'main*'}>
            {process.env.NEXT_PUBLIC_GIT_COMMIT_MSG || 'main*'}
          </span>
        </div>
        <div className="flex items-center gap-2 hover:bg-hover px-2 h-full cursor-pointer transition-colors">
          <div className="flex items-center gap-1"><VscError className="text-accentRed" /> 0</div>
          <div className="flex items-center gap-1"><VscWarning className="text-yellow-500" /> 0</div>
        </div>
      </div>
      
      <div className="flex items-center gap-4 h-full hidden md:flex">
        <div className="hover:bg-hover px-2 h-full flex items-center cursor-pointer transition-colors">UTF-8</div>
        <div className="hover:bg-hover px-2 h-full flex items-center cursor-pointer transition-colors">CRLF</div>
        <div className="hover:bg-hover px-2 h-full flex items-center cursor-pointer transition-colors">TypeScript React</div>
        <div className="hover:bg-hover px-2 h-full flex items-center cursor-pointer transition-colors">
          <VscFeedback />
        </div>
        <div className="hover:bg-hover px-2 h-full flex items-center cursor-pointer transition-colors">
          <VscBell />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
