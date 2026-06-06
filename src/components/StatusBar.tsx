import { VscRemote, VscError, VscWarning, VscFeedback, VscBell, VscSourceControl, VscFolderActive } from 'react-icons/vsc';
import { socialLinks } from '../constants/socialLinks';
import { contacts } from '../constants/contacts';
import { iconHash } from '../utils/icons';

export const StatusBar = () => {
  return (
    <div className="h-6 bg-primary/80 backdrop-blur-xl text-textColor flex items-center justify-between px-2 text-xs font-sans select-none z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-2 h-full">
        <div className="flex items-center gap-1.5 hover:bg-hover px-2 h-full cursor-pointer transition-colors text-white">
          <VscRemote className="text-accent" />
        </div>
        <div className="flex items-center gap-1.5 hover:bg-hover px-2 h-full cursor-pointer transition-colors">
          <VscSourceControl size={14} />
          <span>develop*</span>
        </div>
        <div className="flex items-center gap-1.5 hover:bg-hover px-2 h-full cursor-pointer transition-colors">
          <VscFolderActive size={14} />
          <span>Nebula</span>
        </div>
        <div className="flex items-center gap-1.5 hover:bg-hover px-2 h-full cursor-pointer transition-colors border-l border-white/10 ml-1 pl-3 text-textMuted hover:text-white">
          <span className="opacity-70">{iconHash[contacts[0].icon as keyof typeof iconHash]}</span>
          <span className="text-[11px] font-mono tracking-wide">{contacts[0].text}</span>
        </div>
        <div className="flex items-center gap-2 hover:bg-hover px-2 h-full cursor-pointer transition-colors ml-auto">
          <div className="flex items-center gap-1"><VscError className="text-accentRed" /> 0</div>
          <div className="flex items-center gap-1"><VscWarning className="text-yellow-500" /> 0</div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 h-full hidden md:flex">
        <div className="hover:bg-hover px-2 h-full flex items-center cursor-pointer transition-colors font-mono">-- VIM --</div>
        <div className="hover:bg-hover px-2 h-full flex items-center cursor-pointer transition-colors">UTF-8</div>
        <div className="hover:bg-hover px-2 h-full flex items-center cursor-pointer transition-colors">CRLF</div>
        <div className="hover:bg-hover px-2 h-full flex items-center cursor-pointer transition-colors">TypeScript React</div>
        <div className="flex items-center ml-2 border-l border-white/10 pl-2 h-4 gap-1">
          {socialLinks.map((social) => (
            <a 
              key={social.icon}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="text-white/50 hover:text-white transition-colors p-1"
            >
              {iconHash[social.icon as keyof typeof iconHash]}
            </a>
          ))}
        </div>
        <div className="hover:bg-hover px-2 h-full flex items-center cursor-pointer transition-colors ml-2">
          <VscFeedback size={14} />
        </div>
        <div className="hover:bg-hover px-2 h-full flex items-center cursor-pointer transition-colors">
          <VscBell size={14} />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
